import { useState } from 'react'
import { SiteShell } from '../SiteShell'
import { Shelf, type ShelfView } from '../components/Shelf'
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

/** Spine-out or face-out — the two ways a bookcase can hold the same books. */
const VIEWS: Array<{ id: ShelfView; label: string }> = [
  { id: 'spines', label: 'Spines' },
  { id: 'covers', label: 'Covers' }
]

const STATS = [
  { number: number(shelfStats.books), label: 'books read' },
  { number: number(shelfStats.pages), label: 'pages' },
  { number: number(shelfStats.authors), label: 'authors' },
  { number: number(shelfStats.series), label: 'series' },
  { number: number(shelfStats.fiveStars), label: 'five stars' }
]

export const BooksPage = () => {
  const [filter, setFilter] = useState<ShelfFilter>('all')
  const [view, setView] = useState<ShelfView>('spines')
  const { shelves, singles } = groupByAuthor(filterBooks(filter))

  return (
    <SiteShell root={SHELF_ROOT} homeHref={SHELF_ROOT} skipHref="#shelf" skipLabel="Skip to the shelf">
      <div className={css.page}>
        {/* The command line is the heading, as it is on the log — the page
            keeps a real h1 without carrying a display title above the wall. */}
        <h1 className={css.command}>
          <span className={css.prompt} aria-hidden="true">
            $
          </span>
          ls ~/bookshelf
        </h1>

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

        <div className={css.toolbar}>
          <div className={css.filters} role="group" aria-label="Filter the shelf">
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

          <div className={css.views} role="group" aria-label="Change the view">
            {VIEWS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={filterChip}
                aria-pressed={view === option.id}
                onClick={() => setView(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div id="shelf" className={css.shelves}>
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.author}
              heading={shelf.author}
              entries={shelf.entries}
              meta={`${shelf.entries.length} books · ${pages(shelf.pages)}`}
              view={view}
            />
          ))}

          {singles.length > 0 && (
            <Shelf
              heading={SINGLES_HEADING[filter]}
              entries={singles}
              meta={singles.length === 1 ? '1 book' : `${singles.length} authors · one book each`}
              view={view}
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
