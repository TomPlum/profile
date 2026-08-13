/**
 * Covers pinned by hand, for books where the automatic lookup can't get the
 * edition actually read.
 *
 * `scripts/fetch-covers.mjs` matches on the ISBN in the Goodreads export, which
 * is right most of the time — but Open Library's catalogue is patchy. The Sun
 * Eater is the worked example: the UK Gollancz / Head of Zeus paperbacks are
 * the editions on the shelf, and Open Library has no artwork for four of them
 * (Howling Dark has no record at all; Demon in White and Kingdoms of Death have
 * records with no covers; Empire of Silence's only image is a broken landscape
 * banner).
 *
 * To pin one:
 *   1. Save the jacket as `public/covers/<book id>.jpg` — portrait, ~180px wide
 *      to match the rest, though larger is fine.
 *   2. Add the id below.
 * The script then leaves that file alone on every future run, including
 * `--force`, and the manifest counts it as the edition read rather than an
 * approximation.
 *
 * Book ids are the slugs in `books.ts` (author + title), e.g.
 * `christopher-ruocchio-howling-dark`.
 */
export const pinnedCovers: string[] = [
  // Add ids here as you supply the artwork, e.g.
  // 'christopher-ruocchio-empire-of-silence',
  // 'christopher-ruocchio-howling-dark',
  // 'christopher-ruocchio-demon-in-white',
  // 'christopher-ruocchio-kingdoms-of-death'
]
