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
  /** A line from the books themselves, with the volume it comes from. */
  quote?: { text: string; source: string }
  /**
   * Which volumes to show when there is no bespoke `artwork`, by series
   * number — `[3, 6, 7]` picks those three jackets. Defaults to the first
   * three of the run, which is rarely where a series looks its best.
   */
  jackets?: number[]
}

/**
 * The quotes below were checked against the published text rather than quoted
 * from memory — a misattributed line would be exactly the kind of unverified
 * claim the rest of this site avoids. Swap them for your own favourites
 * freely; keep them short, and keep `source` naming the volume.
 */
export const favouriteSeries: FavouriteSeries[] = [
  {
    series: 'Mistborn',
    quote: {
      text: 'I write these words in steel, for anything not set in metal cannot be trusted.',
      // Kwaan's inscription, which supplies the epigraphs of book two — not
      // The Final Empire, whose epigraphs are Alendi's journal.
      source: 'Kwaan, The Well of Ascension'
    }
  },
  {
    series: 'The Stormlight Archive',
    quote: {
      text: 'Life before death. Strength before weakness. Journey before destination.',
      source: 'The First Ideal, The Way of Kings'
    }
  },
  {
    series: 'The Sun Eater',
    jackets: [3, 6, 7],
    quote: {
      text: 'Always forward, always down, and never left or right.',
      source: 'Howling Dark'
    }
  }
]
