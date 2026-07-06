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
```

## Editing content

All content is typed data — no prose lives in JSX:

- `src/data/profile.ts` — name, role, value statement, stack, links, email
- `src/data/commits.ts` — the log itself (one object per entry) and the branches
- `src/data/projects.ts` — expanded project cards (one-liner, "what it shows", links)

The displayed commit hashes are deterministic (derived from each entry's `id`),
so they're stable across builds.

## TODO — facts only Tom knows

1. **`public/cv.pdf`** is a placeholder — export a redacted PDF (no home address /
   DOB / phone) from `~/git/curriculum-vitae` and drop it in.

All career dates (Matillion May 2021 → Senior Aug 2022 → Staff Apr 2024;
Barclays Jun 2018 → BA4 Aug 2019; Retail Sensing; Ocean82; Bolton; Rochdale
Sixth Form) are verified against Tom's LinkedIn export, July 2026.

## Architecture notes

- The log is a semantic `<ol>`; the SVG graph rail is `aria-hidden` decoration.
  Lane geometry comes from *measured* DOM row positions (`useAnchors`,
  ResizeObserver), so the graph can never drift from the text at any viewport,
  font-load state, or mid-animation.
- `prefers-reduced-motion` renders the graph fully drawn and disables all
  transitions; theme is resolved before first paint by an inline script.
- Keyboard: everything is tabbable; `j`/`k` walk the commit rows.

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
