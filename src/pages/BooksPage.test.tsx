import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BooksPage } from './BooksPage'
import { groupByAuthor, shelved, spineWidth } from '../data/shelf'
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

describe('the shelf page', () => {
  it('puts every shelved book on a board', () => {
    render(<BooksPage />)
    // One button per book — the spines are the content, not decoration.
    const spines = screen.getAllByRole('button').filter((node) => node.getAttribute('aria-pressed') !== null)
    expect(spines.length).toBe(shelved.length)
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
    const spine = screen.getAllByRole('button').find((node) => node.getAttribute('aria-pressed') !== null)!
    fireEvent.click(spine)
    expect(spine.getAttribute('aria-pressed')).toBe('true')
  })

  it('does not put the to-read shelf on the wall', () => {
    render(<BooksPage />)
    const wanted = books.find((book) => book.shelf === 'to-read')!
    const spines = screen.getAllByRole('button')
    expect(spines.some((spine) => spine.getAttribute('aria-label')?.startsWith(wanted.title))).toBe(false)
  })

  it('routes back to the log', () => {
    render(<BooksPage />)
    expect(screen.getByRole('link', { name: /back to the log/i }).getAttribute('href')).toBe('index.html')
  })
})
