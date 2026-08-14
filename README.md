# tomplumpton.me — a career, rendered as a git log

Personal profile of Thomas Plumpton. The site's information architecture is
`git log --graph --all` of my last eight years: commits are real career events,
branches are the strands of my life (`career`, `open-source`, `languages`,
`puzzles`), and the graph is drawn in the style of my own npm component,
[react-git-log](https://github.com/TomPlum/react-git-log).

## Stack

- **React 19 + TypeScript + Vite**
- **vanilla-extract** — zero-runtime CSS; the theme is a typed contract
- **motion** (LazyMotion, ~15 kB) for row expansion; raw SVG stroke animation for the graph
- **Fraunces** (display/prose) + **JetBrains Mono** (log metadata), self-hosted via Fontsource
- **Vitest** — including tests that fail the build if any theme colour pair
  drops below WCAG AA contrast, and a "five-second test" asserting the
  recruiter-critical content is present

## Commands

```sh
npm run dev       # dev server
npm test          # vitest (contrast gates, data integrity, smoke)
npm run build     # type-check + production build
npm run preview   # serve the production build

npm run import:books   # Goodreads CSV export → src/data/books.ts
npm run fetch:covers   # book jackets → public/covers/ + src/data/covers.ts
```

## The shelf — `/books/`

A second page, linked only from the masthead's *"reading fantasy"* and the
colophon: 232 books drawn as the bookcase they'd make. Each spine's width is its
page count, its colour marks which series run it belongs to, and its shade is
how I rated it. A switch turns the whole wall face-out to show the jackets.

It's a real second document (`books/index.html` + its own bundle), not a client
route — so the URL has no `.html` in it without a redirect hack, and the home
page never downloads 232 books.

## Editing content

All content is typed data — no prose lives in JSX:

- `src/data/profile.ts` — name, role, value statement, stack, links, email
- `src/data/commits.ts` — the log itself (one object per entry) and the branches
- `src/data/projects.ts` — expanded project cards (one-liner, "what it shows", links)
- `src/data/favourites.ts` — the series that head the shelf page: a quote, and
  optionally your own `blurb`, `artwork` and which `jackets` to show

The displayed commit hashes are deterministic (derived from each entry's `id`),
so they're stable across builds.

### Refreshing the shelf

`src/data/books.ts` and `src/data/covers.ts` are **generated — don't hand-edit
them.** After re-exporting from Goodreads (Settings → Import/Export):

```sh
npm run import:books ~/Downloads/goodreads_library_export.csv
npm run fetch:covers
```

Covers are fetched once and committed rather than hotlinked, so the colophon's
"no tracking" line stays literally true. They come from the `Book Id` in the
export, which is Goodreads' id for the *edition* — so each jacket is the
printing actually shelved rather than a lookalike.

Two things to know when the export changes rather than grows: `fetch:covers`
skips any cover already on disk, so a book whose **edition** changed keeps its
old jacket until that file is deleted, and a **retitled** book gets a new slug
and orphans the old one. And Goodreads rate-limits by IP after a few hundred
requests — the script detects it and says so rather than quietly substituting a
worse cover, but a full refetch is not something to run twice in a row.

## Before publishing

1. **`public/cv.pdf`** is a placeholder — export a redacted PDF (no home address /
   DOB / phone) and drop it in.

All career dates (Matillion May 2021 → Senior Aug 2022 → Staff Apr 2024;
Barclays Jun 2018 → BA4 Aug 2019; Retail Sensing; Ocean82; Bolton; Rochdale
Sixth Form) have been verified against Tom's own records.

## Architecture notes

- Two documents, one shared shell: `SiteShell` holds the header and contact
  footer, and each page supplies its own main content. Vite's relative `base`
  means the shelf, one directory down, gets its asset URLs rewritten for free —
  but hand-written paths (the CV, cover images) climb out via `lib/paths.ts`.
- The log is a semantic `<ol>`; the SVG graph rail is `aria-hidden` decoration.
  Lane geometry comes from *measured* DOM row positions (`useAnchors`,
  ResizeObserver), so the graph can never drift from the text at any viewport,
  font-load state, or mid-animation.
- `prefers-reduced-motion` renders the graph fully drawn and disables all
  transitions; theme is resolved before first paint by an inline script.
- Keyboard: everything is tabbable; `j`/`k` walk the commit rows. The shelf's
  232 books would be 232 tab stops, so each board is one stop with a roving
  tabindex — arrows walk a shelf, Home/End jump to its ends.

## Deployment

Pushes to `main` build and publish to GitHub Pages via
`.github/workflows/deploy.yml` (the same `npm test` quality gates run first, so
a failing contrast or data test blocks the deploy). Vite's `base` is `'./'`, so
the build is host-agnostic: it works as-is at the project-page URL
(`tomplum.github.io/profile/`) and at the custom-domain root.

**One-time setup:** in the repo, Settings → Pages → *Build and deployment* →
Source = **GitHub Actions**.

To move to the `tomplumpton.me` domain later, add a `public/CNAME` file
containing `tomplumpton.me` and set the domain under Settings → Pages — no code
change needed (the relative base already handles the root mount). Note the
domain currently points at the activity-trends dashboard, so cutting over is
Tom's call.
