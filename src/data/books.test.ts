import { describe, expect, it } from 'vitest'
import { books } from './books'

/**
 * The shelf is generated data, so the gate here is on the *importer*: if a
 * re-export ever mangles a title, drops an id or smuggles a private column
 * through, these fail before the page renders it.
 */
describe('shelf data integrity', () => {
  it('book ids are unique — they name the cover files on disk', () => {
    const ids = books.map((book) => book.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ids are filename-safe slugs', () => {
    books.forEach((book) => {
      expect(book.id, `id for '${book.title}'`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })
  })

  it('every book has a title and an author', () => {
    books.forEach((book) => {
      expect(book.title.length, `title of '${book.id}'`).toBeGreaterThan(0)
      expect(book.author.length, `author of '${book.id}'`).toBeGreaterThan(0)
    })
  })

  it('no book title still carries its series suffix', () => {
    books.forEach((book) => {
      expect(book.title, `title of '${book.id}'`).not.toMatch(/#\d/)
    })
  })

  it('every shelf is one of the three Goodreads exclusive shelves', () => {
    books.forEach((book) => {
      expect(['read', 'currently-reading', 'to-read'], `shelf of '${book.id}'`).toContain(book.shelf)
    })
  })

  it('ratings are 0–5', () => {
    books.forEach((book) => {
      expect(book.rating, `rating of '${book.id}'`).toBeGreaterThanOrEqual(0)
      expect(book.rating, `rating of '${book.id}'`).toBeLessThanOrEqual(5)
    })
  })

  it('page counts and years are sane where present', () => {
    books.forEach((book) => {
      if (book.pages !== undefined) {
        expect(book.pages, `pages of '${book.id}'`).toBeGreaterThan(0)
        expect(book.pages, `pages of '${book.id}'`).toBeLessThan(5000)
      }
      if (book.published !== undefined) {
        expect(book.published, `published year of '${book.id}'`).toBeGreaterThan(1000)
        expect(book.published, `published year of '${book.id}'`).toBeLessThanOrEqual(
          new Date().getFullYear() + 2
        )
      }
    })
  })

  it('dates are full ISO dates', () => {
    books.forEach((book) => {
      ;[book.dateRead, book.dateAdded].forEach((date) => {
        if (date === undefined) return
        expect(date, `date on '${book.id}'`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(Number.isNaN(Date.parse(date)), `date on '${book.id}' parses`).toBe(false)
      })
    })
  })

  it('a series entry always carries its position', () => {
    books.forEach((book) => {
      if (book.seriesIndex !== undefined) {
        expect(book.series, `series name for '${book.id}'`).toBeDefined()
        expect(Number.isFinite(book.seriesIndex), `series index of '${book.id}'`).toBe(true)
      }
    })
  })

  it('imprints are not mistaken for series', () => {
    const series = new Set(books.map((book) => book.series).filter(Boolean))
    expect(series.has('S.F. Masterworks')).toBe(false)
    expect(series.has('Word Cloud Classics')).toBe(false)
  })

  it('series variants collapse onto one name', () => {
    // "Pines (Wayward Pines Trilogy Book 1)" and "Wayward (Wayward Pines, #2)"
    // are the same run and must group together on the shelf.
    const wayward = books.filter((book) => book.series?.startsWith('Wayward Pines'))
    expect(wayward.length).toBeGreaterThan(1)
    expect(new Set(wayward.map((book) => book.series)).size).toBe(1)
  })

  it('keeps the edition identifiable, so covers can match the printing read', () => {
    const shelved = books.filter((book) => book.shelf !== 'to-read')
    const identified = shelved.filter((book) => book.isbn13 || book.isbn10)
    // Most rows name an ISBN; Goodreads omits it for most Kindle editions,
    // which is why publisher and year are kept as a fallback signal.
    expect(identified.length / shelved.length).toBeGreaterThan(0.7)
    shelved.forEach((book) => {
      if (book.isbn13) expect(book.isbn13, `isbn13 of '${book.id}'`).toMatch(/^\d{13}$/)
      if (book.editionYear) {
        expect(book.editionYear, `edition year of '${book.id}'`).toBeGreaterThan(1900)
      }
    })
  })

  it('carries no private column out of the export', () => {
    const allowed = new Set([
      'id',
      'title',
      'author',
      'series',
      'seriesIndex',
      'shelf',
      'rating',
      'pages',
      'published',
      'dateRead',
      'dateAdded',
      'isbn13',
      'isbn10',
      'goodreadsId',
      // Bibliographic, not private: these identify the edition read, and
      // scripts/fetch-covers.mjs uses them to fetch that printing's jacket.
      'publisher',
      'binding',
      'editionYear'
    ])
    books.forEach((book) => {
      Object.keys(book).forEach((key) => {
        expect(allowed, `unexpected field '${key}' on '${book.id}'`).toContain(key)
      })
    })
  })
})
