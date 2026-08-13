import { SiteShell } from '../SiteShell'

export const BooksPage = () => (
  <SiteShell homeHref="index.html" skipHref="#shelf" skipLabel="Skip to the shelf">
    <section id="shelf" aria-label="Bookshelf">
      <h1>The Shelf</h1>
    </section>
  </SiteShell>
)
