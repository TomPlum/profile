import { SiteShell } from '../SiteShell'
import { Shelf } from '../components/Shelf'
import { groupByAuthor, shelved } from '../data/shelf'
import * as css from './BooksPage.css'

const pages = (total: number) => `${total.toLocaleString('en-GB')} pp`

export const BooksPage = () => {
  const { shelves, singles } = groupByAuthor(shelved)

  return (
    <SiteShell homeHref="index.html" skipHref="#shelf" skipLabel="Skip to the shelf">
      <div className={css.page}>
        <p className={css.command}>
          <span className={css.prompt}>$</span>ls ~/shelf
        </p>
        <h1 className={css.title}>The Shelf</h1>
        <p className={css.intro}>
          Everything I&rsquo;ve read, drawn as the shelf it would make. One spine per book, its
          width set by the page count, grouped by author and standing in series order — so the
          shape of the wall is the shape of the reading.
        </p>

        <div className={css.key} aria-hidden="true">
          <span className={css.keyItem}>
            <span className={css.keySwatch} />
            wider spine = longer book
          </span>
          <span className={css.keyItem}>darker fill = higher rating</span>
          <span className={css.keyItem}>dashed = unrated</span>
        </div>

        <div id="shelf" className={css.shelves}>
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.author}
              heading={shelf.author}
              books={shelf.books}
              meta={`${shelf.books.length} books · ${pages(shelf.pages)}`}
            />
          ))}

          {singles.length > 0 && (
            <Shelf
              heading="One-offs"
              books={singles}
              meta={`${singles.length} authors · one book each`}
            />
          )}
        </div>

        <a className={css.back} href="index.html">
          ← back to the log
        </a>
      </div>
    </SiteShell>
  )
}
