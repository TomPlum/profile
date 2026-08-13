/**
 * The series that head the shelf page.
 *
 * These were picked from the export rather than asserted: they are the longest
 * runs Tom rated highest — Mistborn is the longest unbroken five-star run on
 * the shelf, Stormlight the biggest by page count, Sun Eater the highest-rated
 * of the science fiction. Everything shown about them (book counts, pages,
 * ratings, years) is computed from `books.ts` at render time, so none of it can
 * drift when the export is refreshed.
 *
 * TODO(tom): two things only you can supply —
 *   1. `blurb` — a sentence in your own voice on why each one is here. Until
 *      then the card shows the computed line alone.
 *   2. `artwork` — drop a file in `public/series/` and name it here. Landscape,
 *      about 3:2, 600px wide is plenty. Without one the card falls back to the
 *      cover of the first book in the run, so it never renders empty.
 * Reorder, cut or add entries freely; `series` must match the series name in
 * `books.ts` exactly, and a test fails the build if it doesn't.
 */
export interface FavouriteSeries {
  /** Must match `Book.series` exactly — the books are resolved from the shelf. */
  series: string
  /** Path under `public/`, e.g. `series/mistborn.jpg`. */
  artwork?: string
  /** Tom's own words. Omitted until written. */
  blurb?: string
}

export const favouriteSeries: FavouriteSeries[] = [
  { series: 'Mistborn' },
  { series: 'The Stormlight Archive' },
  { series: 'The Sun Eater' }
]
