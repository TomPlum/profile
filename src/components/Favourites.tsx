import { favouriteSeries } from '../data/favourites'
import { coverSrc, hasCover, seriesSummary, type SeriesSummary } from '../data/shelf'
import { SHELF_ROOT } from '../lib/paths'
import * as css from './Favourites.css'

/**
 * The line under each title, built from the export rather than written: how
 * long the run is, how much of it there is, and how it was rated. It stands in
 * for a blurb until one is written, and stays true when the export changes.
 */
const summarise = (run: SeriesSummary) => {
  const parts = [`${run.books.length} books`, `${run.pages.toLocaleString('en-GB')} pp`]
  if (run.fiveStars === run.books.length) parts.push('every one five stars')
  else if (run.rating > 0) parts.push(`${run.rating.toFixed(1)} average`)
  if (run.years) parts.push(run.years)
  return parts
}

const Artwork = ({ run, artwork }: { run: SeriesSummary; artwork?: string }) => {
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

  const jackets = run.books.filter(hasCover).slice(0, 3)

  return (
    <div className={css.artwork}>
      <div className={css.jackets} aria-hidden="true">
        {jackets.map((book) => (
          <img
            key={book.id}
            className={css.jacket}
            src={coverSrc(book)}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
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
            <Artwork run={run} artwork={favourite.artwork} />
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
            {favourite.blurb && <p className={css.blurb}>{favourite.blurb}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
