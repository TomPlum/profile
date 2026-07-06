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

Search the repo for `TODO(tom)`:

1. **`public/cv.pdf`** is a placeholder — replace it with the real CV.
2. **Matillion start date** and starting title (`joined-matillion` commit).
3. **Staff promotion date** (`staff-engineer` commit).
4. **University name + graduation date** (`graduated` commit).
5. **natomski** date and links (repo isn't public, so nothing could be verified).
6. Confirm the **public contact email** in `profile.ts`.
7. Consider adding commits for any roles between 2018 and Matillion.

## Architecture notes

- The log is a semantic `<ol>`; the SVG graph rail is `aria-hidden` decoration.
  Lane geometry comes from *measured* DOM row positions (`useAnchors`,
  ResizeObserver), so the graph can never drift from the text at any viewport,
  font-load state, or mid-animation.
- `prefers-reduced-motion` renders the graph fully drawn and disables all
  transitions; theme is resolved before first paint by an inline script.
- Keyboard: everything is tabbable; `j`/`k` walk the commit rows.

## Deployment

Static output in `dist/`. Not wired to a host yet — for GitHub Pages with the
custom domain `tomplumpton.me`, keep Vite's default `base: '/'` and add a
`public/CNAME` file; note the domain currently points at activity-trends.
