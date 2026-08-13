import { type CSSProperties, type KeyboardEvent, type MouseEvent, useEffect, useRef, useState } from 'react'
import type { Book, LaneKey } from '../data/types'
import { fitsLettering, spineWidth, type ShelfEntry } from '../data/shelf'
import { shortHash } from '../lib/hash'
import { BookCard, type CardAnchor } from './BookCard'
import * as css from './Shelf.css'

const ratingRung = (rating: number): keyof typeof css.spineTint.languages => {
  if (rating >= 5) return 'five'
  if (rating === 4) return 'four'
  if (rating === 3) return 'three'
  if (rating > 0) return 'low'
  return 'none'
}

const tintClass = (lane: LaneKey, rating: number) => css.spineTint[lane][ratingRung(rating)]

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
  entries: ShelfEntry[]
  /** Right-hand mono line: counts computed by the caller. */
  meta: string
}

/**
 * One shelf board. Spines stand on a rule, widths set by page count, hue set by
 * which series run they belong to, and the pulled-out book shows its card just
 * above the pointer.
 *
 * Keyboard: the board is a single tab stop with a roving tabindex, so 232 books
 * don't become 232 tab stops; arrows walk the shelf, Home/End jump to its ends.
 */
export const Shelf = ({ heading, entries, meta }: ShelfProps) => {
  const [active, setActive] = useState<number | undefined>(undefined)
  const [anchor, setAnchor] = useState<CardAnchor | undefined>(undefined)
  const [focusIndex, setFocusIndex] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  const close = () => {
    setActive(undefined)
    setAnchor(undefined)
  }

  // On a touch screen there is no mouse to leave the shelf, so a tap anywhere
  // else is what puts the book back.
  useEffect(() => {
    if (active === undefined) return
    const dismiss = (event: PointerEvent) => {
      if (!rowRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [active])

  const open = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    setActive(index)
    setAnchor({ x: event.clientX, y: event.clientY })
  }

  /** Keyboard focus has no pointer, so the card hangs off the spine itself. */
  const openFromSpine = (index: number, spine: HTMLElement) => {
    const rect = spine.getBoundingClientRect()
    setActive(index)
    setFocusIndex(index)
    setAnchor({ x: rect.left + rect.width / 2, y: rect.top })
  }

  const focusSpine = (index: number) => {
    const clamped = Math.max(0, Math.min(entries.length - 1, index))
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
      focusSpine(entries.length - 1)
    } else if (event.key === 'Escape') {
      close()
    }
  }

  return (
    <section className={css.board}>
      <header className={css.boardHead}>
        <h3 className={css.boardAuthor}>{heading}</h3>
        <span className={css.boardMeta}>{meta}</span>
      </header>

      {active !== undefined && anchor && entries[active] && (
        <BookCard book={entries[active].book} anchor={anchor} />
      )}

      <div
        className={css.shelfRow}
        ref={rowRef}
        role="group"
        aria-label={`${heading} — ${entries.length} books`}
        onKeyDown={onKeyDown}
        onMouseLeave={close}
      >
        {entries.map(({ book, lane }, index) => (
          <button
            key={book.id}
            type="button"
            className={`${css.spine} ${tintClass(lane, book.rating)}`}
            style={
              {
                [css.SPINE_WIDTH]: `${spineWidth(book)}px`,
                [css.SPINE_HEIGHT]: `${spineHeight(book)}%`
              } as CSSProperties
            }
            tabIndex={index === focusIndex ? 0 : -1}
            aria-pressed={index === active}
            aria-label={label(book)}
            onMouseEnter={(event) => open(index, event)}
            onMouseMove={(event) => open(index, event)}
            onFocus={(event) => openFromSpine(index, event.currentTarget)}
            onBlur={() => setActive((current) => (current === index ? undefined : current))}
            onClick={(event) => open(index, event)}
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
