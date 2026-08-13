#!/usr/bin/env node
/**
 * Fetches book covers from Open Library ONCE and commits them to
 * `public/covers/{id}.jpg`, then writes the manifest `src/data/covers.ts`.
 *
 *   node scripts/fetch-covers.mjs [--force] [--redo-approximate]
 *
 * Fetching at build time rather than hotlinking is deliberate: the site claims
 * "no tracking, no cookies, no analytics" in its colophon, and hotlinking would
 * hand every visitor's IP to a third party. It also means a cover can never
 * 404 in front of a reader.
 *
 * Coverage is imperfect — ISBN lookups miss for a good share of the shelf — so
 * the UI must keep its typographic fallback for anything not in the manifest.
 * The script is idempotent: it skips covers already on disk unless --force.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { books } from '../src/data/books.ts'
import { pinnedCovers } from '../src/data/coverOverrides.ts'

const COVERS = resolve(import.meta.dirname, '..', 'public', 'covers')
const MANIFEST = resolve(import.meta.dirname, '..', 'src', 'data', 'covers.ts')
const force = process.argv.includes('--force')

/**
 * Provenance is kept across runs so an incremental fetch doesn't forget how
 * good the covers already on disk are. `--redo-approximate` re-tries only the
 * ones we know are the wrong printing, which is the cheap way to pick up
 * artwork Open Library has gained since.
 */
let previousProvenance = {}
try {
  const existing = await import('../src/data/covers.ts')
  const approximate = new Set(existing.approximateCovers ?? [])
  existing.coverIds.forEach((id) => {
    previousProvenance[id] = approximate.has(id) ? 'approximate' : 'goodreads'
  })
} catch {
  previousProvenance = {}
}

// A full re-run re-derives provenance from scratch; carrying the old values
// over would let a stale "exact" survive a fetch that actually fell back.
if (force) previousProvenance = {}

// Hand-supplied jackets are never refetched, not even with --force: they exist
// precisely because the lookup can't find the edition read.
const pinned = new Set(pinnedCovers)

const refetch = new Set(
  process.argv.includes('--redo-approximate')
    ? Object.entries(previousProvenance).filter(([, kind]) => kind === 'approximate').map(([id]) => id)
    : []
)

// Open Library asks for a contactable User-Agent and modest request rates.
const HEADERS = { 'User-Agent': 'tomplum-profile/1.0 (https://github.com/TomPlum/profile)' }
const PAUSE_MS = 250

const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

/**
 * One flaky connection shouldn't abandon a 232-book run half-done. Retries a
 * couple of times, then gives up on that book rather than the whole script —
 * the manifest is rebuilt from what is on disk, so a rerun picks up the gaps.
 */
const request = async (url, attempt = 1) => {
  try {
    return await fetch(url, { headers: HEADERS })
  } catch (error) {
    if (attempt > 3) {
      console.log(`  ! ${error.code ?? error.message} — giving up on ${url}`)
      return undefined
    }
    await sleep(attempt * 2_000)
    return request(url, attempt + 1)
  }
}

/**
 * JPEG dimensions, straight from the SOF marker — no image library needed.
 * Open Library occasionally serves a landscape crop or a banner in place of a
 * jacket, and those look obviously broken standing in a row of book covers.
 */
const jpegSize = (bytes) => {
  let offset = 2
  while (offset < bytes.length - 9) {
    if (bytes[offset] !== 0xff) {
      offset++
      continue
    }
    const marker = bytes[offset + 1]
    // SOF0–SOF15, skipping the non-frame markers in that range.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) }
    }
    offset += 2 + bytes.readUInt16BE(offset + 2)
  }
  return undefined
}

/** A cover-shaped response: 200, image/*, and big enough to be real artwork. */
const readImage = async (url) => {
  const response = await request(url)
  if (!response) return undefined

  if (response.status === 429 || response.status === 403) {
    console.log('  rate limited — waiting 60s')
    await sleep(60_000)
    return readImage(url)
  }
  if (!response.ok) return undefined
  if (!(response.headers.get('content-type') ?? '').startsWith('image/')) return undefined

  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.byteLength <= 2_000) return undefined

  // Jackets are portrait, or square for an audiobook edition. Anything wider
  // than it is tall is not a cover.
  const size = jpegSize(bytes)
  if (size && size.height < size.width) return undefined

  return bytes
}

/**
 * The jacket Goodreads shows for this exact edition — which is, by definition,
 * the one on the shelf, since the id comes from the export row itself. Far more
 * reliable than matching an ISBN against Open Library's catalogue, where whole
 * editions are missing or carry another printing's artwork.
 *
 * `/book/show` is permitted by Goodreads' robots.txt for general agents
 * (`/review/list` is not, so the shelf listing is never touched). The pages are
 * ~750KB, and og:image sits in the <head>, so the body is read in chunks and
 * the request aborted the moment the tag appears — a few KB instead of 170MB
 * across the whole shelf.
 */
let goodreadsBlocked = false
const missedGoodreads = []

const byGoodreads = async (book, attempt = 1) => {
  if (!book.goodreadsId || goodreadsBlocked) {
    if (book.goodreadsId) missedGoodreads.push(book)
    return undefined
  }

  const controller = new AbortController()
  let head = ''
  let throttled = false
  try {
    const response = await fetch(`https://www.goodreads.com/book/show/${book.goodreadsId}`, {
      headers: HEADERS,
      signal: controller.signal
    })
    // Goodreads answers a rate-limited client with 202 and an empty body.
    // That is not "this book has no cover" — falling through to Open Library
    // here silently swaps the shelved edition for a guess, so it has to be
    // told apart from a genuine miss.
    if (response.status === 202 || response.status === 429 || response.status === 403) {
      throttled = true
      return undefined
    }
    if (!response.ok) return undefined

    for await (const chunk of response.body) {
      head += Buffer.from(chunk).toString('utf8')
      if (head.includes('og:image') || head.length > 200_000) break
    }
  } catch (error) {
    if (error.name !== 'AbortError') return undefined
  } finally {
    controller.abort()
  }

  if (throttled || (!head && !goodreadsBlocked)) {
    if (attempt < 2) {
      console.log('  … Goodreads is throttling; waiting 90s before retrying')
      await sleep(90_000)
      return byGoodreads(book, attempt + 1)
    }
    goodreadsBlocked = true
    missedGoodreads.push(book)
    console.log('  ! Goodreads still throttling — falling back for the rest of this run')
    return undefined
  }

  const url = head.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  if (!url || url.includes('nophoto')) return undefined

  // Ask Amazon's image server for a 200px-wide copy rather than the full size:
  // same jacket, a fifth of the bytes, and still sharper than Open Library's.
  const sized = url.replace(/\.jpg$/, '._SX200_.jpg')
  const image = (await readImage(sized)) ?? (await readImage(url))
  return image ? { image, provenance: 'goodreads' } : undefined
}

/** The exact printing on the shelf: Open Library resolves ISBN → edition. */
const byIsbn = async (isbn) => {
  if (!isbn) return undefined
  const image = await readImage(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`)
  return image ? { image, provenance: 'isbn' } : undefined
}

const normalise = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

/**
 * Last resort: ask the search index for a cover id by title + author.
 *
 * Constrained to English editions and to results whose title actually matches
 * — an unfiltered search happily returns a Spanish translation of Red Rising,
 * or a box-set collage of the whole Witcher series, and both look like a bug
 * rather than a book on the shelf.
 */
const isEnglish = (entry) =>
  (entry.languages ?? []).some((language) => language.key === '/languages/eng')

const cover = (entry) => entry.covers?.find((id) => id > 0)

/**
 * How well an Open Library edition matches the one on Tom's shelf. Publisher
 * and year come straight from the Goodreads row, so a printing that agrees on
 * both is almost certainly the book he actually held — which matters, because
 * a series shelved as a matching set looks wrong if one volume shows up in a
 * different publisher's jacket.
 */
const editionScore = (entry, book) => {
  if (!cover(entry) || !isEnglish(entry)) return -1

  let score = 0
  const publishers = (entry.publishers ?? []).map(normalise)
  if (book.publisher && publishers.some((name) => name === normalise(book.publisher))) score += 3
  else if (book.publisher && publishers.some((name) => name.includes(normalise(book.publisher).split(' ')[0]))) score += 2

  const year = Number((entry.publish_date ?? '').match(/\d{4}/)?.[0])
  if (book.editionYear && year === book.editionYear) score += 3
  else if (book.editionYear && Math.abs(year - book.editionYear) <= 1) score += 1

  return score
}

/**
 * Fallback when the shelved ISBN has no artwork on Open Library. Finds the
 * work, then picks the edition closest to the one on the shelf rather than
 * whichever one Open Library happens to prefer — an unranked pick returns
 * Spanish translations and box-set collages.
 */
const bySearch = async (book) => {
  const query = new URLSearchParams({
    title: book.title,
    author: book.author,
    language: 'eng',
    limit: '8',
    fields: 'key,title'
  })
  const response = await request(`https://openlibrary.org/search.json?${query}`)
  if (!response?.ok) return undefined

  const { docs = [] } = await response.json()
  const wanted = normalise(book.title)
  const work = docs.find((doc) => {
    if (!doc.key || !doc.title) return false
    const found = normalise(doc.title)
    return found === wanted || found.startsWith(wanted) || wanted.startsWith(found)
  })
  if (!work) return undefined

  await sleep(PAUSE_MS)
  const editions = await request(`https://openlibrary.org${work.key}/editions.json?limit=100`)
  if (!editions?.ok) return undefined

  const { entries = [] } = await editions.json()
  const ranked = entries
    .map((entry) => ({ entry, score: editionScore(entry, book) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)

  const best = ranked[0]
  if (!best) return undefined

  const image = await readImage(`https://covers.openlibrary.org/b/id/${cover(best.entry)}-M.jpg`)
  // A publisher *and* year match is as good as the ISBN; anything less is a
  // stand-in, and the manifest says so.
  return image ? { image, provenance: best.score >= 6 ? 'edition' : 'approximate' } : undefined
}

mkdirSync(COVERS, { recursive: true })

const onDisk = new Set(
  readdirSync(COVERS)
    .filter((name) => name.endsWith('.jpg'))
    .map((name) => name.replace(/\.jpg$/, ''))
)

let fetched = 0
let missed = 0
const misses = []
/** id → 'isbn' | 'edition' | 'approximate'; carried into the manifest. */
const provenance = new Map(Object.entries(previousProvenance))

for (const book of books) {
  if (pinned.has(book.id)) {
    provenance.set(book.id, 'pinned')
    continue
  }
  if (onDisk.has(book.id) && !force && !refetch.has(book.id)) continue

  const found =
    (await byGoodreads(book)) ??
    (await byIsbn(book.isbn13)) ??
    (await byIsbn(book.isbn10)) ??
    (await bySearch(book))

  if (found) {
    writeFileSync(resolve(COVERS, `${book.id}.jpg`), found.image)
    onDisk.add(book.id)
    provenance.set(book.id, found.provenance)
    fetched++
    console.log(`  ✓ [${found.provenance.padEnd(11)}] ${book.title} — ${book.author}`)
  } else {
    missed++
    misses.push(`${book.title} — ${book.author}`)
    console.log(`  · no cover: ${book.title} — ${book.author}`)
  }

  await sleep(PAUSE_MS)
}

const have = books.filter((book) => onDisk.has(book.id)).map((book) => book.id)
const exact = have.filter((id) =>
  ['goodreads', 'isbn', 'edition', 'pinned'].includes(provenance.get(id))
)

writeFileSync(
  MANIFEST,
  `/**
 * GENERATED by scripts/fetch-covers.mjs — the ids in public/covers.
 * Books absent from this list render the typographic fallback cover instead.
 *
 * approximateCovers are the ones where the jacket shown is a different
 * printing from the edition on the shelf: either Goodreads recorded no ISBN
 * (it usually doesn't for Kindle rows) or Open Library holds no artwork for
 * that exact printing. The page counts them rather than pretending.
 */
export const coverIds: string[] = [
${have.map((id) => `  '${id}'`).join(',\n')}
]

export const approximateCovers: string[] = [
${have.filter((id) => provenance.get(id) === 'approximate').map((id) => `  '${id}'`).join(',\n')}
]
`
)

console.log(`\nFetched ${fetched} new, ${missed} without a cover.`)
console.log(`Manifest: ${have.length}/${books.length} books have artwork.`)
console.log(`Editions: ${exact.length} match the shelved printing, ${have.length - exact.length} approximate.`)
if (misses.length) console.log(`\nNo cover found for:\n  ${misses.join('\n  ')}`)

if (missedGoodreads.length) {
  console.log(
    `\n${missedGoodreads.length} books fell back to Open Library because Goodreads was ` +
      `throttling. Their jacket may not be the edition on the shelf. Re-run later to fix:\n` +
      `  npm run fetch:covers -- --redo-approximate`
  )
}
