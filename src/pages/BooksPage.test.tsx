import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BooksPage } from './BooksPage'
import { groupByAuthor, seriesSummary, shelfStats, shelved, spineWidth } from '../data/shelf'
import { favouriteSeries } from '../data/favourites'
import { books } from '../data/books'

beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false
  })) as typeof window.matchMedia
})

afterEach(cleanup)

/** Books only — the toolbar's filter and view groups are groups of buttons too. */
const boards = () => [...document.querySelectorAll('[data-board]')]
const spines = () => boards().flatMap((board) => [...board.querySelectorAll('button')])
/** Artwork on the wall itself — the favourites cards use covers too. */
const boardImages = () => boards().flatMap((board) => [...board.querySelectorAll('img')])
/** Face-out jackets, as opposed to the wash of one down a spine. */
const boardCovers = () => boardImages().filter((image) => !image.hasAttribute('data-wash'))

describe('the shelf page', () => {
  it('puts every shelved book on a board', () => {
    render(<BooksPage />)
    // One button per book — the spines are the content, not decoration.
    expect(spines().length).toBe(shelved.length)
  })

  it('names every spine for assistive tech, including the ones too thin to letter', () => {
    render(<BooksPage />)
    const thinnest = [...shelved].sort((a, b) => spineWidth(a) - spineWidth(b))[0]!
    expect(screen.getByRole('button', { name: new RegExp(thinnest.title.slice(0, 20), 'i') })).toBeDefined()
  })

  it('leads with the biggest run — the point of the page', () => {
    const { shelves } = groupByAuthor(shelved)
    expect(shelves[0]!.author).toBe('Brandon Sanderson')
    expect(shelves[0]!.entries.length).toBeGreaterThan(shelves[1]!.entries.length - 1)
  })

  it('gives neighbouring series runs different colours', () => {
    const sanderson = groupByAuthor(shelved).shelves[0]!
    const runs: Array<{ series: string | undefined; lane: string }> = []
    sanderson.entries.forEach(({ book, lane }) => {
      if (runs.at(-1)?.series !== book.series) runs.push({ series: book.series, lane })
    })
    // Sanderson's shelf is several runs — Mistborn, Stormlight, Skyward — and
    // no two adjacent ones may share a lane, or the boundary disappears.
    expect(runs.length).toBeGreaterThan(3)
    runs.forEach((run, index) => {
      if (index > 0) expect(run.lane, `run '${run.series}'`).not.toBe(runs[index - 1]!.lane)
    })
  })

  it('colours a series run consistently along its length', () => {
    const sanderson = groupByAuthor(shelved).shelves[0]!
    const byRun = new Map<string, Set<string>>()
    sanderson.entries.forEach(({ book, lane }) => {
      const key = book.series ?? '(standalone)'
      byRun.set(key, (byRun.get(key) ?? new Set()).add(lane))
    })
    byRun.forEach((lanes, series) => {
      expect(lanes.size, `lanes used by '${series}'`).toBe(1)
    })
  })

  it('keeps the shelf to a single tab stop per board', () => {
    render(<BooksPage />)
    boards().forEach((board) => {
      const tabbable = [...board.querySelectorAll('button')].filter(
        (spine) => spine.getAttribute('tabindex') === '0'
      )
      expect(tabbable.length, `tab stops on '${board.getAttribute('aria-label')}'`).toBe(1)
    })
  })

  it('shows a book card when a spine is pulled out', () => {
    render(<BooksPage />)
    const spine = spines()[0]!
    fireEvent.click(spine)
    expect(spine.getAttribute('aria-pressed')).toBe('true')
  })

  it('does not put the to-read shelf on the wall', () => {
    render(<BooksPage />)
    const wanted = books.find((book) => book.shelf === 'to-read')!
    expect(spines().some((spine) => spine.getAttribute('aria-label')?.startsWith(wanted.title))).toBe(false)
  })

  it('prints only computed figures, never a typed-in number', () => {
    render(<BooksPage />)
    expect(screen.getByText(shelfStats.books.toLocaleString('en-GB'))).toBeDefined()
    expect(screen.getByText(shelfStats.pages.toLocaleString('en-GB'))).toBeDefined()
    expect(screen.getByText(shelfStats.authors.toLocaleString('en-GB'))).toBeDefined()
  })

  it('filters the wall down to five-star books', () => {
    render(<BooksPage />)
    fireEvent.click(screen.getByRole('button', { name: /five stars/i }))
    expect(spines().length).toBe(shelfStats.fiveStars)
  })

  it('switches the wall to the to-read shelf', () => {
    render(<BooksPage />)
    fireEvent.click(screen.getByRole('button', { name: /next up/i }))
    expect(spines().length).toBe(shelfStats.wantToRead)
  })

  it('keeps a single top-level heading once the display title is gone', () => {
    render(<BooksPage />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBe(1)
    expect(headings[0]!.textContent).toContain('~/bookshelf')
  })

  it('turns the books face-out without changing what is on the shelf', () => {
    render(<BooksPage />)
    const before = spines().map((spine) => spine.getAttribute('aria-label'))
    // The page opens face-out — the jackets are the draw, and the spine wall is
    // the denser second look.
    expect(boardCovers().length).toBeGreaterThan(100)

    fireEvent.click(screen.getByRole('button', { name: 'Spines' }))

    // Same books, same order, same accessible names — only the drawing changes.
    expect(spines().map((spine) => spine.getAttribute('aria-label'))).toEqual(before)
    expect(boardCovers().length).toBe(0)
  })

  it('lazy-loads every jacket, face-out as well as spine-out', () => {
    // The spine wash is a jacket too. It has to stay an <img> rather than a CSS
    // background, or turning the wall spine-out fetches all 232 at once.
    render(<BooksPage />)
    const faceOut = boardImages()

    fireEvent.click(screen.getByRole('button', { name: 'Spines' }))
    const washes = boardImages()
    expect(washes.length).toBeGreaterThan(100)
    ;[...faceOut, ...washes].forEach((img) => {
      expect(img.getAttribute('loading')).toBe('lazy')
      expect(img.getAttribute('alt')).toBe('')
    })
  })

  it('every favourite series resolves to a run on the shelf', () => {
    // A typo in favourites.ts would otherwise render a card with nothing in it.
    favouriteSeries.forEach((favourite) => {
      const run = seriesSummary(favourite.series)
      expect(run, `'${favourite.series}' is not a series in books.ts`).toBeDefined()
      expect(run!.books.length, `'${favourite.series}' run length`).toBeGreaterThan(1)
    })
  })

  it('describes each favourite with computed figures, not typed-in ones', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      const run = seriesSummary(favourite.series)!
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      expect(card.textContent).toContain(`${run.books.length} books`)
      expect(card.textContent).toContain(run.pages.toLocaleString('en-GB'))
      expect(card.textContent).toContain(run.author)
    })
  })

  it('stands the run’s own jackets in until artwork is supplied', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      const run = seriesSummary(favourite.series)!
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      const images = [...card.querySelectorAll('img')]
      expect(images.length, `artwork for '${favourite.series}'`).toBeGreaterThan(0)
      if (favourite.artwork) {
        expect(images).toHaveLength(1)
        expect(images[0]!.getAttribute('src')).toContain(favourite.artwork)
      } else {
        // Up to three jackets, all of them from this run.
        expect(images.length).toBeLessThanOrEqual(3)
        const ids = run.books.map((book) => book.id)
        images.forEach((image) => {
          expect(ids.some((id) => image.getAttribute('src')?.includes(id))).toBe(true)
        })
      }
    })
  })

  it('shows the volumes a series names, not just its opening three', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      if (!favourite.jackets || favourite.artwork) return
      const run = seriesSummary(favourite.series)!
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      const shown = [...card.querySelectorAll('img')].map((img) => img.getAttribute('src'))
      // Every named volume must exist in the run and have artwork, or the card
      // quietly renders fewer jackets than asked for.
      expect(shown).toHaveLength(favourite.jackets.length)
      favourite.jackets.forEach((index) => {
        const book = run.books.find((entry) => entry.seriesIndex === index)
        expect(book, `'${favourite.series}' has no volume #${index}`).toBeDefined()
        expect(shown.some((src) => src?.includes(book!.id))).toBe(true)
      })
    })
  })

  it('fills the stars to the exact rating, not a rounded one', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      const run = seriesSummary(favourite.series)!
      // Scoped to the card: two series can share a rating.
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      const stars = card.querySelector('[role="img"]') as HTMLElement
      expect(stars.getAttribute('aria-label')).toBe(`Rated ${run.rating.toFixed(1)} out of 5`)
      // The fill is a percentage of the star row, so a 4.8 must clip short of
      // full. It renders inside a flex column, which will stretch the row and
      // silently defeat the clip unless the span opts out.
      const fill = stars.querySelector('span') as HTMLElement
      const expected = (run.rating / 5) * 100
      expect(Number.parseFloat(fill.style.width)).toBeCloseTo(expected, 1)
      if (run.rating < 5) expect(Number.parseFloat(fill.style.width)).toBeLessThan(100)
    })
  })

  it('attributes every quote to a volume', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      const quotes = favourite.quotes ?? []
      quotes.forEach((quote) => {
        // An unattributed quote is the kind of unverifiable claim this site avoids.
        expect(quote.source.length, `source for '${favourite.series}'`).toBeGreaterThan(3)
        expect(card.textContent).toContain(quote.text)
        expect(card.textContent).toContain(quote.source)
      })
      // The volume names key the rendered list, so two quotes from the same one
      // would drop silently rather than fail here.
      expect(new Set(quotes.map((quote) => quote.source)).size).toBe(quotes.length)
      expect(card.querySelectorAll('blockquote')).toHaveLength(quotes.length)
    })
  })

  it('keeps the quoted cards within a paragraph of each other in length', () => {
    // The band is a row of equal columns: one card with a long passage and its
    // neighbour with a single short line leaves a visible hole under the short
    // one. Second quotes are how that is closed, so the spread is worth gating.
    const lengths = favouriteSeries.map((favourite) =>
      (favourite.quotes ?? []).reduce((total, quote) => total + quote.text.length, 0)
    )
    expect(Math.min(...lengths)).toBeGreaterThan(Math.max(...lengths) * 0.5)
  })

  it('routes back to the log', () => {
    render(<BooksPage />)
    expect(screen.getByRole('link', { name: /back to the log/i }).getAttribute('href')).toBe('../')
  })
})
