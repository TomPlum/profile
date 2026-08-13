/**
 * The shelf is served from `/books/` rather than `/books.html`, so its URL
 * carries no file extension. That puts it one directory below the site root.
 *
 * Vite rewrites its own asset URLs for the extra depth automatically, but
 * anything written by hand — the CV, the cover images, links back to the home
 * page — has to climb out explicitly. This is the single definition of how far
 * out that is; a page nested deeper would need its own.
 *
 * The site's `base` stays relative (`./`) so the same build works at the
 * project-page URL and at a custom-domain root, which is why this can't just
 * be an absolute path.
 */
export const SHELF_ROOT = '../'

/** The shelf's URL as written from the site root. */
export const SHELF_PATH = 'books/'
