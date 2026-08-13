import { books } from './books'
import { coverIds } from './covers'
import type { Book, LaneKey } from './types'
import { SHELF_ROOT } from '../lib/paths'

const covers = new Set(coverIds)

export const hasCover = (book: Book): boolean => covers.has(book.id)

/** Covers live at the site root; the shelf page renders from one below. */
export const coverSrc = (book: Book): string => `${SHELF_ROOT}covers/${book.id}.jpg`

export const finished = books.filter((book) => book.shelf === 'read')
export const reading = books.filter((book) => book.shelf === 'currently-reading')
export const wantToRead = books.filter((book) => book.shelf === 'to-read')

/** Everything actually on the shelf — read, plus whatever is open right now. */
export const shelved = [...reading, ...finished]

export type ShelfFilter = 'all' | 'five-star' | 'reading' | 'want-to-read'

export const filterBooks = (filter: ShelfFilter): Book[] => {
  switch (filter) {
    case 'five-star':
      return shelved.filter((book) => book.rating === 5)
    case 'reading':
      return reading
    case 'want-to-read':
      return wantToRead
    default:
      return shelved
  }
}

/**
 * The lane a spine is drawn in. Runs cycle through the four so that adjacent
 * series on the same shelf never share a colour — the hue separates one run
 * from the next, it doesn't name a particular series globally.
 */
const RUN_LANES: LaneKey[] = ['languages', 'oss', 'puzzles', 'career']

export interface ShelfEntry {
  book: Book
  lane: LaneKey
}

export interface AuthorShelf {
  author: string
  entries: ShelfEntry[]
  pages: number
}

/** Standalones sit together at the end of an author's shelf, as one run. */
const runKey = (book: Book) => book.series ?? '(standalone)'

const withRunLanes = (list: Book[]): ShelfEntry[] => {
  let run = -1
  let previous: string | undefined
  return list.map((book) => {
    const key = runKey(book)
    if (key !== previous) {
      run++
      previous = key
    }
    return { book, lane: RUN_LANES[run % RUN_LANES.length]! }
  })
}

/**
 * One shelf board per author, biggest run first — which is the whole point of
 * the page: 39 Sanderson spines in a row say more about how this reader reads
 * than any number could. Authors with a single book collect onto one last
 * board rather than each getting a near-empty shelf of their own.
 */
export const groupByAuthor = (
  list: Book[]
): { shelves: AuthorShelf[]; singles: ShelfEntry[] } => {
  const byAuthor = new Map<string, Book[]>()
  list.forEach((book) => {
    const existing = byAuthor.get(book.author)
    if (existing) existing.push(book)
    else byAuthor.set(book.author, [book])
  })

  const shelves: AuthorShelf[] = []
  const singles: Book[] = []

  byAuthor.forEach((group, author) => {
    if (group.length === 1) singles.push(group[0]!)
    else {
      shelves.push({
        author,
        entries: withRunLanes([...group].sort(seriesOrder)),
        pages: group.reduce((total, book) => total + (book.pages ?? 0), 0)
      })
    }
  })

  shelves.sort((a, b) => b.entries.length - a.entries.length || a.author.localeCompare(b.author))
  singles.sort((a, b) => a.author.localeCompare(b.author))

  // Every one-off is its own run, so the last board reads as a mixed shelf
  // rather than a block of one colour.
  return {
    shelves,
    singles: singles.map((book, index) => ({
      book,
      lane: RUN_LANES[index % RUN_LANES.length]!
    }))
  }
}

/** Series run in order on a real shelf; standalones follow, alphabetically. */
const seriesOrder = (a: Book, b: Book): number =>
  (a.series ?? 'zzz').localeCompare(b.series ?? 'zzz') ||
  (a.seriesIndex ?? 0) - (b.seriesIndex ?? 0) ||
  a.title.localeCompare(b.title)

const sum = (list: Book[], of: (book: Book) => number) =>
  list.reduce((total, book) => total + of(book), 0)

/**
 * Every number the page prints is computed here from the export — nothing on
 * the shelf page is a hand-typed figure that could quietly go stale.
 *
 * Counted over `finished` rather than `shelved`: a book that is open right now
 * is on the wall, but its pages have not been read yet.
 */
export const shelfStats = {
  books: finished.length,
  pages: sum(finished, (book) => book.pages ?? 0),
  authors: new Set(finished.map((book) => book.author)).size,
  series: new Set(finished.map((book) => book.series).filter(Boolean)).size,
  fiveStars: finished.filter((book) => book.rating === 5).length,
  unrated: finished.filter((book) => book.rating === 0).length,
  /** Goodreads recorded a finish date for a minority — see the page's caveat. */
  withFinishDate: finished.filter((book) => book.dateRead).length,
  reading: reading.length,
  wantToRead: wantToRead.length,
  /** The single longest book on the shelf — a nice, checkable fact. */
  longest: finished.reduce((longest, book) =>
    (book.pages ?? 0) > (longest.pages ?? 0) ? book : longest
  ),
  topAuthor: [...new Set(finished.map((book) => book.author))]
    .map((author) => ({
      author,
      count: finished.filter((book) => book.author === author).length
    }))
    .sort((a, b) => b.count - a.count)[0]!
}

/**
 * Spine width, in pixels, from page count — the whole conceit of the wall.
 * Clamped so a 55-page novella is still clickable and an 1100-page doorstop
 * doesn't eat the row.
 */
export const spineWidth = (book: Book): number =>
  Math.round(Math.min(34, Math.max(13, 11 + (book.pages ?? 320) / 34)))

/**
 * Wide enough to letter. The floor is set so that all but the shortest
 * novellas take their title: at 0.56rem the vertical lettering needs about
 * 14px of spine once the borders are paid for.
 */
export const fitsLettering = (book: Book): boolean => spineWidth(book) >= 15
