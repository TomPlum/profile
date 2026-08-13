import { useState } from 'react'
import { SiteShell } from '../SiteShell'
import { Shelf } from '../components/Shelf'
import { filterChip, filterCount } from '../styles/controls.css'
import { filterBooks, groupByAuthor, shelfStats, type ShelfFilter } from '../data/shelf'
import { SHELF_ROOT } from '../lib/paths'
import * as css from './BooksPage.css'

const number = (value: number) => value.toLocaleString('en-GB')

const pages = (total: number) => `${number(total)} pp`

const FILTERS: Array<{ id: ShelfFilter; label: string; count: number }> = [
  { id: 'all', label: 'On the shelf', count: shelfStats.books + shelfStats.reading },
  { id: 'five-star', label: 'Five stars', count: shelfStats.fiveStars },
  { id: 'reading', label: 'Reading now', count: shelfStats.reading },
  { id: 'want-to-read', label: 'Next up', count: shelfStats.wantToRead }
]

/** The last board collects authors with a single book — but not under every
 * filter: "one-offs" would be a lie on a shelf that is one book long. */
const SINGLES_HEADING: Record<ShelfFilter, string> = {
  all: 'One-offs',
  'five-star': 'One-offs',
  reading: 'Reading now',
  'want-to-read': 'Next up'
}

const STATS = [
  { number: number(shelfStats.books), label: 'books read' },
  { number: number(shelfStats.pages), label: 'pages' },
  { number: number(shelfStats.authors), label: 'authors' },
  { number: number(shelfStats.series), label: 'series' },
  { number: number(shelfStats.fiveStars), label: 'five stars' }
]

export const BooksPage = () => {
  const [filter, setFilter] = useState<ShelfFilter>('all')
  const { shelves, singles } = groupByAuthor(filterBooks(filter))

  return (
    <SiteShell root={SHELF_ROOT} homeHref={SHELF_ROOT} skipHref="#shelf" skipLabel="Skip to the shelf">
      <div className={css.page}>
        <p className={css.command}>
          <span className={css.prompt}>$</span>ls ~/shelf
        </p>
        <h1 className={css.title}>The Shelf</h1>
        <p className={css.intro}>
          Everything I&rsquo;ve read, drawn as the shelf it would make. One spine per book, its
          width set by the page count, grouped by author and standing in series order — so the
          shape of the wall is the shape of the reading. Mostly fantasy and science fiction; I
          don&rsquo;t pretend otherwise.
        </p>

        <dl className={css.stats}>
          {STATS.map((item) => (
            // Term then description, as the spec wants; the column is reversed
            // in CSS so the number still reads first.
            <div key={item.label} className={css.stat}>
              <dt className={css.statLabel}>{item.label}</dt>
              <dd className={css.statNumber}>{item.number}</dd>
            </div>
          ))}
        </dl>

        <div className={css.filters}>
          {FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={filterChip}
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
              <span className={filterCount}>{option.count}</span>
            </button>
          ))}
        </div>

        <div className={css.key} aria-hidden="true">
          <span className={css.keyItem}>
            <span className={css.keySwatch} />
            wider spine = longer book
          </span>
          <span className={css.keyItem}>colour separates series runs</span>
          <span className={css.keyItem}>darker = higher rating</span>
          <span className={css.keyItem}>dashed = unrated</span>
        </div>

        <div id="shelf" className={css.shelves}>
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.author}
              heading={shelf.author}
              entries={shelf.entries}
              meta={`${shelf.entries.length} books · ${pages(shelf.pages)}`}
            />
          ))}

          {singles.length > 0 && (
            <Shelf
              heading={SINGLES_HEADING[filter]}
              entries={singles}
              meta={singles.length === 1 ? '1 book' : `${singles.length} authors · one book each`}
            />
          )}
        </div>

        <p className={css.caveat}>
          Two honest caveats. Goodreads only recorded a finish date for{' '}
          {shelfStats.withFinishDate} of the {number(shelfStats.books)} — the rest were shelved
          from memory years later, so there is no reading timeline here to draw. And{' '}
          {shelfStats.unrated} of them never got a rating, which is why some spines are blank
          rather than guessed at.
        </p>

        <a className={css.back} href={SHELF_ROOT}>
          ← back to the log
        </a>
      </div>
    </SiteShell>
  )
}
