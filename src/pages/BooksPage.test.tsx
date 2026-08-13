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
    // The caveat has to state the real shortfall, not a rounded story.
    expect(screen.getByText(new RegExp(`only recorded a finish date for ${shelfStats.withFinishDate}`))).toBeDefined()
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
    expect(boardImages().length).toBe(0)

    fireEvent.click(screen.getByRole('button', { name: 'Covers' }))

    // Same books, same order, same accessible names — only the drawing changes.
    expect(spines().map((spine) => spine.getAttribute('aria-label'))).toEqual(before)
    expect(boardImages().length).toBeGreaterThan(100)
  })

  it('lazy-loads the cover artwork', () => {
    render(<BooksPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Covers' }))
    boardImages().forEach((img) => {
      expect(img.getAttribute('loading')).toBe('lazy')
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

  it('attributes every quote to a volume', () => {
    render(<BooksPage />)
    favouriteSeries.forEach((favourite) => {
      if (!favourite.quote) return
      // An unattributed quote is the kind of unverifiable claim this site avoids.
      expect(favourite.quote.source.length, `source for '${favourite.series}'`).toBeGreaterThan(3)
      const card = screen.getByRole('heading', { level: 3, name: favourite.series }).parentElement!
      expect(card.textContent).toContain(favourite.quote.text)
      expect(card.textContent).toContain(favourite.quote.source)
    })
  })

  it('routes back to the log', () => {
    render(<BooksPage />)
    expect(screen.getByRole('link', { name: /back to the log/i }).getAttribute('href')).toBe('../')
  })
})
