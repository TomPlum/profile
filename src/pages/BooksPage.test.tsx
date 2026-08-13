import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BooksPage } from './BooksPage'
import { groupByAuthor, shelfStats, shelved, spineWidth } from '../data/shelf'
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

/** Spines only — the filter chips are buttons with aria-pressed too. */
const spines = () =>
  screen.getAllByRole('group').flatMap((board) => [...board.querySelectorAll('button')])

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
    expect(shelves[0]!.books.length).toBeGreaterThan(shelves[1]!.books.length - 1)
  })

  it('keeps the shelf to a single tab stop per board', () => {
    render(<BooksPage />)
    const boards = screen.getAllByRole('group')
    boards.forEach((board) => {
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

  it('routes back to the log', () => {
    render(<BooksPage />)
    expect(screen.getByRole('link', { name: /back to the log/i }).getAttribute('href')).toBe('index.html')
  })
})
