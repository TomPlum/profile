# CLAUDE.md

Tom's portfolio site. The concept is **"The Log"**: his career rendered as
`git log --graph --all`, drawn in the style of his own npm package
`@tomplum/react-git-log` (a bespoke SVG renderer here — deliberately *not* the
package itself, so the design stays free). Audience: technical recruiters on a
30–60 second first visit, often mobile, possibly non-technical.

## Design intent — protect these decisions

These were explicit choices, made against alternatives. Don't drift from them:

- **Tone: editorial-engineering.** Warm paper light theme / warm terminal dark.
  Fraunces (display + prose, with `opsz`/`WONK` axes) + JetBrains Mono (log
  metadata, buttons, chips — the "machine voice"). The mono is a deliberate
  nod: JetBrains makes Kotlin.
- **Anti-generic is the brief.** No gradient blobs, glassmorphism cards, skill
  logo clouds, emoji-as-personality, or fade-in-on-scroll as the only
  interaction. Tom asked for polarising over safe. If a change makes the site
  look like a template, it's wrong even if it looks "nicer".
- **The header and contact footer are boring on purpose.** Contact + CV must
  stay one click away, above the fold, at every viewport. Playfulness lives in
  the log only; it must accelerate comprehension, never gate it.
- **The four branch lane colours ARE the accent system** (`career` terracotta
  doubles as the CTA colour). Don't introduce new accent colours.
- **Content is typed data** in `src/data/` (`profile.ts`, `commits.ts`,
  `projects.ts`) — never hard-code prose into JSX. Commit messages stay plain
  English (no `feat:` jargon); every project card has a plain-English one-liner
  plus a "what it shows" recruiter translation. Real, verifiable facts only —
  no invented numbers.

## Commands

```sh
npm run dev / test / build / preview   # build = tsc && vite build
```

## Architecture notes

- **vanilla-extract** for styling. `src/styles/palette.ts` holds raw hex as
  plain TS (so tests can read it); `theme.css.ts` maps it onto a
  `createThemeContract` applied via `:root[data-theme="light|dark"]`. Theme is
  resolved *before first paint* by an inline script in `index.html`;
  `useTheme` toggles `dataset.theme` + localStorage.
- **Contrast is quality-gated**: `src/styles/palette.test.ts` fails if any
  used fg/bg pair drops below WCAG AA (4.5:1). If you change a colour, the
  test tells you what broke. `App.test.tsx` is a "five-second test" asserting
  the recruiter-critical content (name, role, stack, Contact/CV routes) exists.
- **The graph rail** (`GraphRail.tsx`) is `aria-hidden` SVG decoration over a
  semantic `<ol>`. Lane geometry comes from *measured* DOM row positions —
  `useAnchors` (ResizeObserver on the log container) — so the graph can't
  drift from the text at any viewport or mid-animation. Row expansion resizes
  the container → RO fires per frame → the rail tracks the animation.
- Draw-in uses `pathLength={1}` + `stroke-dashoffset` transitions, triggered
  by IntersectionObserver. **Gotcha (bug fixed once already):** the SVG
  returns `null` until the container is measured, so any effect that observes
  it must re-run when `height > 0` flips — observing on mount alone silently
  no-ops and the rail stays invisible.
- Displayed commit hashes are deterministic FNV-1a of the entry `id`
  (`lib/hash.ts`) — stable across builds by design.
- Motion via `motion/react` behind `LazyMotion strict` — only `m.*`
  components (never `motion.*`, it throws under strict). `MotionConfig
  reducedMotion="user"` + a global CSS kill-switch handle
  `prefers-reduced-motion`; the rail renders fully drawn.
- `j`/`k` walk the commit rows (advertised in the colophon).
- **Card system**: expanded rows render `ProjectDetail` (projects) or
  `CommitDetail` (body-only commits — these take optional `stack` chips and
  bespoke visuals keyed by commit id, e.g. the Codex badge and the animated
  Claude Code terminal). Both cards receive the branch lane colour as a
  `--lane` CSS var — section labels and fact markers use it. External links
  render as `LinkPill`s; `ProjectLink.icon` is a TechIcon name ('GitHub',
  'npm') or an image path ('natomski-logo.svg'). Backticks in any data string
  render as `InlineCode` via `renderInline`.
- Bespoke in-card visuals live beside their card: `ClockGrid` (rAF hands that
  settle into TOM), `TypeInvadersCard`, `SleepChart`/`ActivityChart` (inline
  SVGs, `preserveAspectRatio="none"` + `vectorEffect: 'non-scaling-stroke'`).
  Every stack entry needs a TechIcon — `App.test.tsx` enforces it.

## The shelf page (`/books/`)

A second, deliberately low-key page: Tom's reading, drawn as a bookcase.

- **It is a real second document**, not a route — `books/index.html` +
  `src/books.tsx` as a second Rollup input. The directory-style page is what
  keeps `.html` out of the URL: on GitHub Pages a client-side route at `/books`
  would need a 404.html redirect hack *and* an absolute `base`, losing the
  relative-base portability. The home page also never downloads 232 books.
  `SiteShell` holds the chrome both pages share; `Header`'s home/skip targets
  are props.
- **Being one directory down has a cost**: Vite rewrites its own asset URLs
  (`../assets/…`) automatically, but every hand-written path — the CV, cover
  images, links home — must climb out. `lib/paths.ts` holds the single
  definition (`SHELF_ROOT`), passed to the chrome as `SiteShell`'s `root` prop.
  A page nested deeper would need its own. `App.test.tsx` asserts no internal
  link contains `.html`.
- **Reached from exactly two places** — the masthead's "Currently: … *reading
  fantasy* …" line (dotted underline) and the colophon. `App.test.tsx` asserts
  both, and asserts the header never links to it. Keep it that way: the header
  is still contact + CV only.
- **Data is generated, not authored.** `scripts/import-goodreads.mjs` turns a
  Goodreads CSV export into `src/data/books.ts` (series are parsed out of the
  title, private columns dropped); `scripts/fetch-covers.mjs` pulls covers once
  from Open Library into `public/covers/` and writes `src/data/covers.ts`.
  Re-export from Goodreads and re-run both; never hand-edit either file.
  Covers are committed rather than hotlinked so the colophon's "no tracking"
  line stays literally true — 211 of 232 have artwork, the rest render the
  typographic fallback in `BookCard`. The fetcher rejects landscape images
  (Open Library sometimes serves a banner instead of a jacket) by reading the
  JPEG SOF marker, and retries a flaky connection rather than abandoning the run.
- **Covers match the edition actually read, where the data allows.** The export
  pins it: ISBN13 first (Open Library resolves ISBN → edition), then publisher
  + edition year to rank candidate editions when that ISBN has no artwork. 183
  of 211 match the shelved printing; the other 28 are listed in
  `approximateCovers` in the generated manifest and *counted on the page* in the
  caveat. Don't drop `publisher`/`binding`/`editionYear` from the import — they
  are the only signal for the ~24 Kindle rows Goodreads gives no ISBN for.
  `--redo-approximate` re-tries just those without refetching everything.
- **Spine width is page count; hue is the series run; strength is the rating.**
  Runs cycle the four lane colours so adjacent runs on a shelf never share one
  (a run keeps its colour along its length — both are tested). The fill can
  only go so dark because spine lettering is plain `ink` over it, so the ramp
  (`spineRamp` in `palette.ts`) stays pale and the head band — which carries no
  text — runs the full range. All sixteen tints are gated by `palette.test.ts`;
  0.22 is the ceiling for the top rung. **No new accent colours.**
- **A favourites band heads the page** (`data/favourites.ts` → `Favourites`).
  Entries name a series; everything factual on the card — books, pages, rating,
  years, author — is computed from `books.ts`, and a test fails if a name
  doesn't resolve to a run. `blurb` and `artwork` are Tom's to supply
  (`TODO(tom)`); until artwork lands, the run's first three jackets stand in,
  because one portrait cover stretched to a landscape band crops badly.
- **Two views of the same books**: spine-out (default) and face-out covers,
  toggled top-right by the `ViewSwitch` segmented control (shared `segmented`/
  `segment` styles in `controls.css`). Same boards, same grouping, same order, same accessible
  names — only the drawing changes, so selection and keyboard handling are
  shared. Covers wrap rather than scroll (a 39-book run face-out would be
  several screens sideways) and are lazy-loaded.
- **No display title, no intro, no key** — Tom removed all three deliberately.
  The mono command line (`$ ls ~/bookshelf`) is the `h1`, the same trick the
  log uses; a test asserts the page still has exactly one top-level heading.
  Don't reintroduce a legend: the encodings are meant to be discovered by
  hovering a book, not explained up front.
- **The book card tracks the pointer** (fixed position, above the cursor,
  flipping below near the top of the viewport) rather than anchoring to the
  shelf, so it never covers the spine being pointed at. On touch it's a bottom
  sheet, dismissed by a tap outside.
- **Gotcha:** spines are in `writing-mode: vertical-rl`, where the inline axis
  runs top-to-bottom. Logical properties (`inset-inline`, `padding-inline`)
  flip there — use physical ones inside a spine. Percentage spine heights also
  need the row's fixed `height`, or a long title stretches the shelf.
- Boards use a roving tabindex (one tab stop each; arrows walk, Home/End jump)
  rather than making 232 books into 232 tab stops.
- **The page states what the data can't support**: Goodreads recorded a finish
  date for only 65 of 210, so there is no reading timeline — don't add one, and
  don't invent dates to enable it.

## Verifying changes visually

Playwright's Chromium is cached at
`~/Library/Caches/ms-playwright/chromium-*/chrome-mac-x64/Google Chrome for Testing.app/...`
— install `playwright-core` in the scratchpad and launch with
`executablePath` (no `npx playwright install` needed). Serve `dist/` with
`npx vite preview --port 4173`. Check both themes, 1440px and 390px, an
expanded commit, a filtered branch, and `reducedMotion: 'reduce'`.
**Screenshot gotchas:** the rail's draw-in is scroll-triggered, so
`fullPage` screenshots can catch it undrawn — `scrollIntoView` the log and
wait ~1s first; sticky headers also smear across `fullPage` captures.

## Data policy

- Public-facing content lives in `src/data/`; keep facts verifiable and avoid
  publishing private source material.
- `public/cv.pdf` must be a redacted export with no home address, DOB or phone
  number.
- npm stats can be checked at
  `api.npmjs.org/downloads/point/last-month/@tomplum/react-git-log` (the package
  is scoped — plain `react-git-log` 404s).
- Fact-check against Tom's local clones in `~/git/` (natomski, sleep,
  activity-trends, learn-japanese, nyuusu) or `gh api .../readme` before
  writing project claims. Known trap: AoC is **not** "every puzzle, every
  year" — only 2020/2022/2023 are full 50-star years (per README badges).
  The sleep chart's stage colours come from that repo's
  `src/styles/_colours.scss`; brand colours in previews (sleep metrics,
  Type Invaders sky, Codex gradient) are quotations of other projects'
  palettes and are allowed — the four-lane rule governs this site's own
  accents, and new text-on-inset pairs must be added to `palette.test.ts`.
- If a fact can't be verified, flag it with a `TODO(tom)` comment in
  `src/data/` — never silently invent dates or numbers.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push
to `main` (runs `npm test` first — the contrast/data/smoke gates block a bad
deploy). Requires the one-time repo setting Pages → Source = **GitHub Actions**.
`vite.config.ts` sets `base: './'` (relative) so the same build works at the
project-page URL and at a custom-domain root; internal asset links must stay
relative (`cvHref` is `cv.pdf`, not `/cv.pdf`). For `tomplumpton.me`, add
`public/CNAME` + set the domain in Pages settings — no code change. The domain
currently serves his activity-trends dashboard, so cutting over is Tom's call.
