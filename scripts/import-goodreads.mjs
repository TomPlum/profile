#!/usr/bin/env node
/**
 * Turns a Goodreads CSV export into `src/data/books.ts`.
 *
 *   node scripts/import-goodreads.mjs [path-to-export.csv]
 *
 * The generated file is the committed artefact — the export itself is not kept
 * in the repo (re-export from Goodreads → Settings → Import/Export and re-run).
 * Columns that are private or unused are dropped here rather than in the UI, so
 * nothing personal can leak into the bundle by accident: Book Id, My Review,
 * Private Notes, Spoiler, Owned Copies and the shelf-position column never
 * reach `books.ts`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'

const DEFAULT_EXPORT = join(homedir(), 'Downloads', 'goodreads_library_export.csv')
const OUT = resolve(import.meta.dirname, '..', 'src', 'data', 'books.ts')

/** RFC 4180-ish parser: quoted fields, embedded commas/newlines, "" escapes. */
const parseCsv = (text) => {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          quoted = false
        }
      } else {
        field += char
      }
      continue
    }

    if (char === '"') quoted = true
    else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (char !== '\r') field += char
  }

  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

/** Goodreads writes ISBNs as `="9781804940822"` to stop Excel eating them. */
const isbn = (value) => value.replace(/^="?|"?$/g, '').trim()

const slug = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
    .replace(/-$/, '')

/** `2026/03/02` → `2026-03-02`; blank stays blank. */
const isoDate = (value) => {
  const match = value.trim().match(/^(\d{4})\/(\d{2})\/(\d{2})$/)
  return match ? `${match[1]}-${match[2]}-${match[3]}` : undefined
}

/**
 * Goodreads encodes series in the title, in several shapes:
 *   `Wool (Silo, #1)`                             → Silo #1
 *   `The Dark Forest (The Three-Body Problem #2)`  → no comma
 *   `The Way of Kings, Part 1 (…, #1, Part 1 of 2)`→ split volumes
 *   `The Assassin's Blade (Throne of Glass, #0.1-0.5)` → omnibus range
 *   `Pines (Wayward Pines Trilogy Book 1)`         → "Book N" instead of #N
 *   `Hyperion (S.F. Masterworks)`                  → an imprint, NOT a series
 * The last shape is why bare parentheticals are only accepted in a second pass,
 * once we know which names appear as real numbered series elsewhere.
 */
const splitSeries = (rawTitle) => {
  const match = rawTitle.match(/^(.*?)\s*\(([^()]*)\)\s*$/)
  if (!match) return { title: rawTitle.trim() }

  const [, title, inner] = match
  const trimmed = title.trim()

  // `Series, #4, Part 1 of 2` / `Series #2` / `Series, #0.1-0.5`
  const numbered = inner.match(/^(.*?),?\s*#\s*([\d.]+)(?:\s*-\s*[\d.]+)?(?:\s*,\s*Part\s+.*)?$/i)
  if (numbered) {
    return { title: trimmed, series: numbered[1].trim(), seriesIndex: Number(numbered[2]) }
  }

  // `Wayward Pines Trilogy Book 1`
  const booked = inner.match(/^(.*?)\s+Book\s+([\d.]+)$/i)
  if (booked) {
    return { title: trimmed, series: booked[1].trim(), seriesIndex: Number(booked[2]) }
  }

  return { title: trimmed, bareSeries: inner.trim() }
}

/** `Wayward Pines Trilogy` and `Wayward Pines` are the same shelf run. */
const seriesKey = (name) =>
  name
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/\s+(trilogy|saga|series|cycle|novels?)$/g, '')
    .trim()

const source = resolve(process.argv[2] ?? DEFAULT_EXPORT)
const [header, ...rows] = parseCsv(readFileSync(source, 'utf8'))
const column = Object.fromEntries(header.map((name, i) => [name, i]))
const cell = (row, name) => (row[column[name]] ?? '').trim()

const parsed = rows
  .filter((row) => row.length > 1 && cell(row, 'Title'))
  .map((row) => {
    const { title, series, seriesIndex, bareSeries } = splitSeries(cell(row, 'Title'))
    const author = cell(row, 'Author')
    const pages = Number(cell(row, 'Number of Pages'))
    const published = Number(cell(row, 'Original Publication Year') || cell(row, 'Year Published'))

    return {
      id: slug(`${author}-${title}`),
      title,
      author,
      series,
      seriesIndex,
      bareSeries,
      shelf: cell(row, 'Exclusive Shelf'),
      rating: Number(cell(row, 'My Rating')) || 0,
      pages: Number.isFinite(pages) && pages > 0 ? pages : undefined,
      published: Number.isFinite(published) && published !== 0 ? published : undefined,
      dateRead: isoDate(cell(row, 'Date Read')),
      dateAdded: isoDate(cell(row, 'Date Added')),
      // The edition Tom actually read. ISBN pins it exactly; publisher and the
      // edition's own year narrow it down when Goodreads recorded no ISBN
      // (which it doesn't, for most Kindle rows).
      isbn13: isbn(cell(row, 'ISBN13')) || undefined,
      isbn10: isbn(cell(row, 'ISBN')) || undefined,
      publisher: cell(row, 'Publisher') || undefined,
      binding: cell(row, 'Binding') || undefined,
      editionYear: Number(cell(row, 'Year Published')) || undefined
    }
  })

// Second pass: adopt a bare parenthetical only when it names a series we have
// already seen numbered — so imprints ("S.F. Masterworks") stay out.
const knownSeries = new Map()
parsed.forEach((book) => {
  if (book.series) knownSeries.set(seriesKey(book.series), book.series)
})
parsed.forEach((book) => {
  if (!book.series && book.bareSeries) {
    const known = knownSeries.get(seriesKey(book.bareSeries))
    if (known) book.series = known
  }
  delete book.bareSeries
})

// Canonicalise series names that differ only by a "Trilogy"/"Saga" suffix.
parsed.forEach((book) => {
  if (book.series) book.series = knownSeries.get(seriesKey(book.series)) ?? book.series
})

// Ids must be stable and unique — they name the cover files on disk.
const seen = new Map()
parsed.forEach((book) => {
  const count = seen.get(book.id) ?? 0
  seen.set(book.id, count + 1)
  if (count) book.id = `${book.id}-${count + 1}`
})

const order = { 'currently-reading': 0, read: 1, 'to-read': 2 }
parsed.sort(
  (a, b) =>
    (order[a.shelf] ?? 9) - (order[b.shelf] ?? 9) ||
    a.author.localeCompare(b.author) ||
    (a.series ?? '').localeCompare(b.series ?? '') ||
    (a.seriesIndex ?? 0) - (b.seriesIndex ?? 0) ||
    a.title.localeCompare(b.title)
)

const literal = (value) =>
  typeof value === 'string' ? `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : String(value)

const serialise = (book) => {
  const fields = Object.entries(book)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}: ${literal(value)}`)
  return `  { ${fields.join(', ')} }`
}

const generated = `/**
 * GENERATED by scripts/import-goodreads.mjs from a Goodreads CSV export.
 * Do not edit by hand — re-export and re-run the script instead.
 *
 * Private columns (reviews, notes, ownership, Goodreads ids) are dropped at
 * import time; what is here is the shelf as it appears publicly.
 */
import type { Book } from './types'

export const books: Book[] = [
${parsed.map(serialise).join(',\n')}
]
`

writeFileSync(OUT, generated)

const counts = parsed.reduce((acc, book) => ({ ...acc, [book.shelf]: (acc[book.shelf] ?? 0) + 1 }), {})
const pages = parsed
  .filter((book) => book.shelf === 'read')
  .reduce((total, book) => total + (book.pages ?? 0), 0)

console.log(`Wrote ${parsed.length} books to src/data/books.ts`)
console.log(`  shelves: ${JSON.stringify(counts)}`)
console.log(`  series detected: ${new Set(parsed.filter((b) => b.series).map((b) => b.series)).size}`)
console.log(`  pages on the read shelf: ${pages.toLocaleString('en-GB')}`)
console.log(`  finish dates recorded: ${parsed.filter((b) => b.dateRead).length}`)
