import type { CSSProperties } from 'react'
import type { Book } from '../data/types'
import { coverSrc, hasCover } from '../data/shelf'
import { formatMonthYear } from '../lib/dates'
import * as css from './BookCard.css'

const stars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating)

/** The jacket, or a set fallback when Open Library had no artwork. */
const Cover = ({ book }: { book: Book }) =>
  hasCover(book) ? (
    <img className={css.cover} src={coverSrc(book)} alt="" loading="lazy" decoding="async" />
  ) : (
    <div className={css.fallbackCover} aria-hidden="true">
      <span className={css.fallbackTitle}>{book.title}</span>
      <span className={css.fallbackAuthor}>{book.author}</span>
    </div>
  )

export interface CardAnchor {
  /** Viewport coordinates of the pointer, or of the focused spine's top edge. */
  x: number
  y: number
}

/** Roughly the card's own height — enough to know when it won't fit above. */
const CARD_HEIGHT = 190

/**
 * What a pulled-out spine shows: the jacket and the handful of facts the export
 * actually contains. Purely presentational — the accessible name lives on the
 * spine button itself, so this is hidden from assistive tech.
 */
export const BookCard = ({ book, anchor }: { book: Book; anchor: CardAnchor }) => (
  <div
    className={css.card}
    // Kept inside the viewport: half the card either side of the pointer.
    style={
      {
        [css.CARD_X]: `${Math.round(Math.min(Math.max(anchor.x, 148), window.innerWidth - 148))}px`,
        [css.CARD_Y]: `${Math.round(anchor.y)}px`
      } as CSSProperties
    }
    data-flip={anchor.y < CARD_HEIGHT}
    aria-hidden="true"
  >
    <Cover book={book} />
    <div className={css.body}>
      <p className={css.title}>{book.title}</p>
      <p className={css.author}>{book.author}</p>

      {book.series && (
        <p className={css.series}>
          {book.series}
          {book.seriesIndex !== undefined && ` #${book.seriesIndex}`}
        </p>
      )}

      {book.rating > 0 ? (
        <p className={css.stars}>{stars(book.rating)}</p>
      ) : (
        <p className={css.unrated}>not rated</p>
      )}

      <p className={css.meta}>
        {book.pages && <span>{book.pages} pp</span>}
        {book.published && <span>· {book.published}</span>}
        {book.dateRead && <span>· finished {formatMonthYear(book.dateRead)}</span>}
      </p>
    </div>
  </div>
)
