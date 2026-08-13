import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import type { Book } from '../data/types'
import { fitsLettering, spineWidth } from '../data/shelf'
import { shortHash } from '../lib/hash'
import { BookCard } from './BookCard'
import * as css from './Shelf.css'

const ratingClass = (rating: number) => {
  if (rating >= 5) return css.spineRating.five
  if (rating === 4) return css.spineRating.four
  if (rating === 3) return css.spineRating.three
  if (rating > 0) return css.spineRating.low
  return css.spineRating.none
}

/**
 * A deterministic 84–100% height per book, seeded from its id the same way the
 * log's commit hashes are — so the wobble is stable across builds rather than
 * reshuffling on every render.
 */
const spineHeight = (book: Book) => 84 + (parseInt(shortHash(book.id), 16) % 17)

const label = (book: Book) => {
  const series = book.series ? ` (${book.series}${book.seriesIndex ? ` #${book.seriesIndex}` : ''})` : ''
  const rating = book.rating > 0 ? `, rated ${book.rating} of 5` : ', not rated'
  return `${book.title} by ${book.author}${series}${rating}`
}

interface ShelfProps {
  /** Shown above the board — an author, or the label for the one-offs board. */
  heading: string
  books: Book[]
  /** Right-hand mono line: counts computed by the caller. */
  meta: string
}

/**
 * One shelf board. Spines stand on a rule, widths set by page count, and the
 * pulled-out book shows its card above the board.
 *
 * Keyboard: the board is a single tab stop with a roving tabindex, so 232 books
 * don't become 232 tab stops; arrows walk the shelf, Home/End jump to its ends.
 */
export const Shelf = ({ heading, books, meta }: ShelfProps) => {
  const [active, setActive] = useState<number | undefined>(undefined)
  const [focusIndex, setFocusIndex] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  // On a touch screen there is no mouse to leave the shelf, so a tap anywhere
  // else is what puts the book back.
  useEffect(() => {
    if (active === undefined) return
    const dismiss = (event: PointerEvent) => {
      if (!rowRef.current?.contains(event.target as Node)) setActive(undefined)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [active])

  const focusSpine = (index: number) => {
    const clamped = Math.max(0, Math.min(books.length - 1, index))
    setFocusIndex(clamped)
    const spine = rowRef.current?.querySelectorAll('button')[clamped]
    if (spine instanceof HTMLElement) spine.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 }
    if (event.key in moves) {
      event.preventDefault()
      focusSpine(focusIndex + moves[event.key]!)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusSpine(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusSpine(books.length - 1)
    }
  }

  // The card is anchored to the spine, clamped so it can't hang off the board.
  const cardLeft = () => {
    if (active === undefined) return 0
    const spine = rowRef.current?.querySelectorAll('button')[active]
    if (!(spine instanceof HTMLElement)) return 0
    const offset = spine.offsetLeft - (rowRef.current?.scrollLeft ?? 0) - 100
    const limit = (rowRef.current?.clientWidth ?? 0) - 280
    return Math.max(0, Math.min(Math.max(0, limit), offset))
  }

  return (
    <section className={css.board}>
      <header className={css.boardHead}>
        <h3 className={css.boardAuthor}>{heading}</h3>
        <span className={css.boardMeta}>{meta}</span>
      </header>

      {active !== undefined && books[active] && <BookCard book={books[active]} left={cardLeft()} />}

      <div
        className={css.shelfRow}
        ref={rowRef}
        role="group"
        aria-label={`${heading} — ${books.length} books`}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setActive(undefined)}
      >
        {books.map((book, index) => (
          <button
            key={book.id}
            type="button"
            className={`${css.spine} ${ratingClass(book.rating)}`}
            style={
              {
                [css.SPINE_WIDTH]: `${spineWidth(book)}px`,
                [css.SPINE_HEIGHT]: `${spineHeight(book)}%`
              } as CSSProperties
            }
            tabIndex={index === focusIndex ? 0 : -1}
            aria-pressed={index === active}
            aria-label={label(book)}
            onMouseEnter={() => setActive(index)}
            onFocus={() => {
              setActive(index)
              setFocusIndex(index)
            }}
            onBlur={() => setActive((current) => (current === index ? undefined : current))}
            onClick={() => setActive(index)}
          >
            {fitsLettering(book) && (
              <span className={css.spineLabel} aria-hidden="true">
                {book.title}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
