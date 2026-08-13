import { books } from './books'
import { coverIds } from './covers'
import type { Book } from './types'

const covers = new Set(coverIds)

export const hasCover = (book: Book): boolean => covers.has(book.id)

export const coverSrc = (book: Book): string => `covers/${book.id}.jpg`

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

export interface AuthorShelf {
  author: string
  books: Book[]
  pages: number
}

/**
 * One shelf board per author, biggest run first — which is the whole point of
 * the page: 39 Sanderson spines in a row say more about how this reader reads
 * than any number could. Authors with a single book collect onto one last
 * board rather than each getting a near-empty shelf of their own.
 */
export const groupByAuthor = (list: Book[]): { shelves: AuthorShelf[]; singles: Book[] } => {
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
        books: [...group].sort(seriesOrder),
        pages: group.reduce((total, book) => total + (book.pages ?? 0), 0)
      })
    }
  })

  shelves.sort((a, b) => b.books.length - a.books.length || a.author.localeCompare(b.author))
  singles.sort((a, b) => a.author.localeCompare(b.author))

  return { shelves, singles }
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
 */
export const shelfStats = {
  books: shelved.length,
  pages: sum(shelved, (book) => book.pages ?? 0),
  authors: new Set(shelved.map((book) => book.author)).size,
  series: new Set(shelved.map((book) => book.series).filter(Boolean)).size,
  fiveStars: shelved.filter((book) => book.rating === 5).length,
  unrated: shelved.filter((book) => book.rating === 0).length,
  withFinishDate: shelved.filter((book) => book.dateRead).length,
  wantToRead: wantToRead.length,
  /** The single longest book on the shelf — a nice, checkable fact. */
  longest: shelved.reduce((longest, book) =>
    (book.pages ?? 0) > (longest.pages ?? 0) ? book : longest
  ),
  topAuthor: [...new Set(shelved.map((book) => book.author))]
    .map((author) => ({
      author,
      count: shelved.filter((book) => book.author === author).length
    }))
    .sort((a, b) => b.count - a.count)[0]!
}

/**
 * Spine width, in pixels, from page count — the whole conceit of the wall.
 * Clamped so a 55-page novella is still clickable and an 1100-page doorstop
 * doesn't eat the row.
 */
export const spineWidth = (book: Book): number =>
  Math.round(Math.min(34, Math.max(11, 7 + (book.pages ?? 320) / 36)))

/** Wide enough to letter the spine without the text turning to ellipsis soup. */
export const fitsLettering = (book: Book): boolean => spineWidth(book) >= 17
