import { type CSSProperties, type MouseEvent, useState } from 'react'
import { favouriteSeries } from '../data/favourites'
import type { Book } from '../data/types'
import { coverSrc, hasCover, seriesSummary, type SeriesSummary } from '../data/shelf'
import { SHELF_ROOT } from '../lib/paths'
import * as css from './Favourites.css'

/**
 * The line under each title, built from the export rather than written: how
 * long the run is, how much of it there is, and how it was rated. It stands in
 * for a blurb until one is written, and stays true when the export changes.
 */
const summarise = (run: SeriesSummary) => {
  // The rating moved to the stars below, so the line is counts and dates only.
  const parts = [`${run.books.length} books`, `${run.pages.toLocaleString('en-GB')} pp`]
  if (run.years) parts.push(run.years)
  return parts
}

const STAR =
  'M8 1.2l2.06 4.3 4.69.63-3.43 3.24.87 4.65L8 11.78 3.81 14.02l.87-4.65L1.25 6.13l4.69-.63z'

/**
 * The run's rating, drawn as five stars filled to the exact fraction earned.
 * The outline row sits underneath and a filled row is clipped over it, so a
 * 4.8 reads as very nearly five rather than being rounded into one.
 */
const Stars = ({ rating }: { rating: number }) => {
  const width = 16
  const row = (filled: boolean) => (
    <svg
      width={width * 5}
      height={width}
      viewBox={`0 0 ${width * 5} ${width}`}
      className={css.star}
      aria-hidden="true"
      focusable="false"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={STAR}
          transform={`translate(${i * width} 0)`}
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={1.3}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )

  // Every favourite is, by definition, a top-rated run — 4.8 to 5.0 — so the
  // clipped last star differs by a couple of pixels at its tapering tip and
  // reads as full. The figure beside it carries the distinction the stars
  // can't.
  return (
    <p className={css.rating}>
      <span
        className={css.stars}
        role="img"
        aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      >
        {row(false)}
        <span className={css.starsFill} style={{ width: `${(rating / 5) * 100}%` }}>
          {row(true)}
        </span>
      </span>
      {/* Only when the stars can't say it: an average of exactly five already
          means every book was a five, so the note would just repeat them. */}
      {rating < 5 && <span className={css.ratingNote}>{rating.toFixed(1)} average</span>}
    </p>
  )
}

/** How far the card leans at the edges of its own area. */
const MAX_TILT = 9

/**
 * One jacket that leans toward the pointer, with a highlight that follows it.
 *
 * The rotation is derived from the cursor's position inside the card and
 * written straight to CSS custom properties — no animation frames, no motion
 * library, and the whole effect falls away under `prefers-reduced-motion`
 * because both the transform and the highlight are disabled in CSS.
 */
const Jacket = ({ book }: { book: Book }) => {
  const [tilt, setTilt] = useState<CSSProperties>({})
  const [lifted, setLifted] = useState(false)

  const track = (event: MouseEvent<HTMLSpanElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    // −0.5 … 0.5 from the centre of the card, on both axes.
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5

    setTilt({
      // Leaning *toward* the pointer means rotateX follows -y, not y.
      '--tilt-x': `${(-y * MAX_TILT * 2).toFixed(2)}deg`,
      '--tilt-y': `${(x * MAX_TILT * 2).toFixed(2)}deg`,
      '--tilt-scale': '1.06',
      '--shine-x': `${((x + 0.5) * 100).toFixed(1)}%`,
      '--shine-y': `${((y + 0.5) * 100).toFixed(1)}%`
    } as CSSProperties)
  }

  return (
    <span
      className={css.jacket}
      style={tilt}
      data-lifted={lifted}
      onMouseEnter={() => setLifted(true)}
      onMouseMove={track}
      onMouseLeave={() => {
        setLifted(false)
        setTilt({})
      }}
    >
      <img
        className={css.jacketImage}
        src={coverSrc(book)}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className={css.shimmer} />
    </span>
  )
}

const Artwork = ({
  run,
  artwork,
  jackets: chosen
}: {
  run: SeriesSummary
  artwork?: string
  jackets?: number[]
}) => {
  // Bespoke art wins when it has been supplied; until then, the run's opening
  // jackets stand in, so a card is never an empty box.
  if (artwork) {
    return (
      <div className={css.artwork}>
        <img
          className={css.artworkImage}
          src={`${SHELF_ROOT}${artwork}`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  // Named volumes if the series lists them, else the opening three.
  const withArt = run.books.filter(hasCover)
  const jackets = chosen
    ? chosen
        .map((index) => withArt.find((book) => book.seriesIndex === index))
        .filter((book): book is NonNullable<typeof book> => Boolean(book))
    : withArt.slice(0, 3)

  // Each jacket keeps a book's 2:3, so the row's height follows from the
  // covers rather than being imposed on them and cropping the artwork.
  return (
    <div className={css.jackets} aria-hidden="true">
      {jackets.map((book) => (
        <Jacket key={book.id} book={book} />
      ))}
    </div>
  )
}

/**
 * The series Tom rates most highly, above the wall. Entries come from
 * `data/favourites.ts`; everything factual about them is computed here.
 */
export const Favourites = () => {
  const runs = favouriteSeries
    .map((favourite) => ({ favourite, run: seriesSummary(favourite.series) }))
    .filter((entry): entry is { favourite: (typeof favouriteSeries)[number]; run: SeriesSummary } =>
      Boolean(entry.run)
    )

  if (runs.length === 0) return null

  return (
    <section className={css.section} aria-labelledby="favourites">
      <h2 className={css.heading} id="favourites">
        Favourite series
      </h2>

      <div className={css.row}>
        {runs.map(({ favourite, run }) => (
          <article key={run.series} className={css.card}>
            <Artwork run={run} artwork={favourite.artwork} jackets={favourite.jackets} />
            <h3 className={css.name}>{run.series}</h3>
            <p className={css.author}>{run.author}</p>
            <p className={css.meta}>
              {summarise(run).map((part, index) => (
                <span key={part}>
                  {index > 0 && '· '}
                  {part}
                </span>
              ))}
            </p>
            {run.rating > 0 && <Stars rating={run.rating} />}

            {favourite.quotes && favourite.quotes.length > 0 && (
              <div className={css.quotes}>
                {favourite.quotes.map((quote) => (
                  <blockquote key={quote.source} className={css.quote}>
                    “{quote.text}”
                    <cite className={css.quoteSource}>— {quote.source}</cite>
                  </blockquote>
                ))}
              </div>
            )}

            {favourite.blurb && <p className={css.blurb}>{favourite.blurb}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
