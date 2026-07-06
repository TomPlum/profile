import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'react-git-log',
    name: 'react-git-log',
    oneLiner:
      'A React component that draws an interactive, themeable Git commit graph — ' +
      'branches, tags, pagination and all.',
    whatItShows:
      'I can design, document, version and ship a public API that other developers ' +
      'depend on: 21 releases, semantic versioning, automated publishing from CI. ' +
      'It also inspired the page you are reading.',
    stack: ['React', 'TypeScript'],
    facts: [
      {
        text: 'v3.5.1 · 21 releases',
        source: { label: 'GitHub releases', href: 'https://github.com/TomPlum/react-git-log/releases' },
        verifiedAt: '2026-07-06'
      },
      {
        text: '1,188 npm downloads in the last month',
        source: {
          label: 'npm downloads API',
          href: 'https://api.npmjs.org/downloads/point/last-month/%40tomplum%2Freact-git-log'
        },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Published as @tomplum/react-git-log',
        source: { label: 'npm package', href: 'https://www.npmjs.com/package/@tomplum/react-git-log' },
        verifiedAt: '2026-07-06'
      }
    ],
    preview: {
      kind: 'git-log',
      caption: 'Branches, hashes and tags rendered as a reusable React component.'
    },
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/react-git-log/' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@tomplum/react-git-log' },
      { label: 'Source', href: 'https://github.com/TomPlum/react-git-log' }
    ]
  },
  {
    id: 'learn-japanese',
    name: 'learn-japanese',
    oneLiner:
      'A Japanese study app that grew from kana drills into configurable learn/play ' +
      'sessions for kana, numbers, Jōyō kanji, Genki vocabulary, grammar and more.',
    whatItShows:
      'This is the older, larger version of my language-learning pattern: a real app ' +
      'with routing, account flows, custom presets, high scores, profile statistics, ' +
      'kanji search, spaced-repetition flashcards and test coverage around the learning logic.',
    stack: ['React', 'TypeScript'],
    facts: [
      {
        text: 'Covers kana, numbers, calendar, basics, grammar and Jōyō kanji topics',
        source: { label: 'GitHub repository', href: 'https://github.com/TomPlum/learn-japanese' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Includes Genki vocabulary/grammar pages, kanji bank, profile stats and high scores',
        source: { label: 'GitHub repository', href: 'https://github.com/TomPlum/learn-japanese' },
        verifiedAt: '2026-07-06'
      }
    ],
    preview: {
      kind: 'kana-drills',
      caption: 'Configurable Japanese study sessions: kana, kanji, Genki and SRS.'
    },
    links: [{ label: 'Source', href: 'https://github.com/TomPlum/learn-japanese' }]
  },
  {
    id: 'nyuusu',
    name: 'nyuusu',
    oneLiner:
      'Read real Japanese news — live headlines from Japan, with export to Anki ' +
      'flashcards for anything you had to look up.',
    whatItShows:
      'Shipping a real hosted product: third-party content integration, a domain, ' +
      'a deployment pipeline, and users other than me.',
    stack: ['React', 'TypeScript'],
    preview: {
      kind: 'news-reader',
      caption: 'Japanese headlines flow into reader-friendly study cards.'
    },
    links: [
      { label: 'Live at nyusu.org', href: 'https://nyusu.org' },
      { label: 'Source', href: 'https://github.com/TomPlum/nyuusu' }
    ]
  },
  {
    id: 'natomski',
    name: 'natomski',
    oneLiner:
      'A Polish learning app with modular lessons, multiple exercise types, custom ' +
      'lesson presets, text-to-speech and Orlek, its animated eagle guide.',
    whatItShows:
      'This is the second-generation version of the language-tooling idea: React 19, ' +
      'Supabase auth/progress, reusable lesson modules, SRS review, browser TTS, ' +
      'Cypress smoke tests and a small mascot system rather than just a set of drills.',
    stack: ['React', 'TypeScript'],
    facts: [
      {
        text: '27 lesson modules, from alphabet and numbers to verbs, pronouns and everyday vocabulary',
        source: { label: 'Source modules', href: 'https://github.com/TomPlum/natomski/tree/main/src/features' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Supports flashcards, typed answers, multiple choice, memory match, line match and listen-and-type',
        source: { label: 'Learning types', href: 'https://github.com/TomPlum/natomski/blob/main/src/types/learning.ts' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Orlek is a White Eagle mascot with idle, speaking, correct, incorrect and thinking animation states',
        source: { label: 'Mascot config', href: 'https://github.com/TomPlum/natomski/blob/main/src/config/mascot.ts' },
        verifiedAt: '2026-07-06'
      }
    ],
    preview: {
      kind: 'natomski-mascot',
      caption: 'Orlek, the app’s animated White Eagle tutor, inside a lesson-style prompt.'
    },
    links: [
      { label: 'Live at natomski.uk', href: 'https://natomski.uk' },
      { label: 'Source', href: 'https://github.com/TomPlum/natomski' }
    ]
  },
  {
    id: 'clocks',
    name: 'clocks',
    oneLiner:
      "A browser recreation of 'A Million Times' — the kinetic sculpture of analog " +
      'clock hands that sweep into patterns and type.',
    whatItShows:
      'Animation engineering from first principles: a requestAnimationFrame ' +
      'choreography written by hand, not a library preset.',
    stack: ['React', 'TypeScript', 'requestAnimationFrame'],
    preview: {
      kind: 'clock-grid',
      caption: 'A field of clock hands sweeps into choreographed shapes.'
    },
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/clocks' },
      { label: 'Source', href: 'https://github.com/TomPlum/clocks' }
    ]
  },
  {
    id: 'sleep',
    name: 'sleep',
    oneLiner: 'Charts of my own sleep data, night by night, across years.',
    whatItShows:
      'I instrument things — including myself — and turn the data into something ' +
      'legible. Data visualisation with a real, messy dataset.',
    stack: ['React', 'TypeScript'],
    preview: {
      kind: 'sleep-chart',
      caption: 'Years of nightly data reduced to readable rhythm and variance.'
    },
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/sleep' },
      { label: 'Source', href: 'https://github.com/TomPlum/sleep' }
    ]
  },
  {
    id: 'activity-trends',
    name: 'activity-trends',
    oneLiner:
      'A dashboard that visualises years of my Apple Watch & Health data — workouts, ' +
      'activity rings, heart, sleep and more — built on Next.js and Supabase.',
    whatItShows:
      'Full-stack ownership end to end: a streaming parser that ingests the raw ' +
      'Apple Health export into Postgres, and a Next.js dashboard that charts it — ' +
      'data modelling, backend and visualisation all in one project.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    preview: {
      kind: 'activity-dashboard',
      caption: 'A Supabase-backed Next.js dashboard charting health and activity data.'
    },
    links: [
      { label: 'Live at activity.tomplumpton.me', href: 'https://activity.tomplumpton.me' },
      { label: 'Source', href: 'https://github.com/TomPlum/activity-trends' }
    ]
  },
  {
    id: 'advent-of-code',
    name: 'Advent of Code, 2018–2024',
    oneLiner:
      'Every Advent of Code puzzle from seven consecutive years, solved in ' +
      'deliberately “enterprise-style” Kotlin.',
    whatItShows:
      'Consistency and craft: seven Decembers of production discipline — test ' +
      'suites, clean architecture, shared libraries, CI — applied to code nobody ' +
      'was making me write well.',
    stack: ['Kotlin', 'JUnit', 'Gradle'],
    facts: [
      {
        text: '7 consecutive years completed',
        source: { label: 'GitHub repositories', href: 'https://github.com/TomPlum?tab=repositories&q=advent-of-code' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Shared utility library + template repo extracted along the way',
        source: { label: 'Shared libs', href: 'https://github.com/TomPlum/advent-of-code-libs' },
        verifiedAt: '2026-07-06'
      }
    ],
    preview: {
      kind: 'aoc-tests',
      caption: 'Puzzle code treated like production code: tests, Gradle and CI.'
    },
    links: [
      { label: 'All AoC repos', href: 'https://github.com/TomPlum?tab=repositories&q=advent-of-code' },
      { label: 'Shared libs', href: 'https://github.com/TomPlum/advent-of-code-libs' }
    ]
  }
]

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id)
