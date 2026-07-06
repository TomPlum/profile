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

## Data sources & access

- `gh` CLI is authenticated as TomPlum with `repo` scope → **private repos are
  queryable** (`gh api repos/TomPlum/<name>/...`). Use it before asking Tom
  for facts.
- The real CV lives in **`~/git/curriculum-vitae`** (local clone of the
  private repo): `Thomas Plumpton - Technical CV.pages` (unzip it;
  `preview.jpg` is page 1 only) plus older PDFs/docx under `old/`. It contains
  DOB, home address and phone numbers — **never publish any of it directly**;
  `public/cv.pdf` must be a redacted export Tom provides.
- Career history is fully verified from Tom's LinkedIn PDF export (July 2026):
  Matillion SE May 2021 → Senior Aug 2022 → Staff Apr 2024; Barclays BA3
  Jun 2018 → BA4 Aug 2019 (Barclaycard IDV); Retail Sensing May 2017–Jun 2018;
  Ocean82 summer 2016; Bolton BSc Computing First Class 2015–2018 (Governors
  Prize years 2 & 3); Rochdale Sixth Form 2013–2015. Only the graduation
  *month* is assumed.
- LinkedIn cannot be fetched live (HTTP 999 bot wall) — ask Tom for a fresh
  PDF export instead.
- npm stats: `api.npmjs.org/downloads/point/last-month/@tomplum/react-git-log`
  (the package is scoped — plain `react-git-log` 404s).
- If a fact can't be verified, flag it with a `TODO(tom)` comment in
  `src/data/` — never silently invent dates or numbers.

## Deployment

Not wired up yet. Static `dist/`; for GitHub Pages + the `tomplumpton.me`
domain keep `base: '/'` and add `public/CNAME` — but note the domain currently
points at his activity-trends dashboard, so cutting over is Tom's call.
