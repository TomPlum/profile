import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'react-git-log',
    name: 'react-git-log',
    oneLiner:
      'A React component that draws an interactive, themeable Git commit graph — ' +
      'branches, tags, pagination and all.',
    whatItShows:
      'This is my flagship open-source library. I can design, document, version and ' +
      'ship a public API that other developers depend on: 21 releases, semantic ' +
      'versioning, automated publishing from CI. It also inspired the page you are reading.',
    stack: ['React', 'TypeScript'],
    sections: [
      {
        label: 'Why it exists',
        text:
          'It grew out of my day job: working on the Git integration in Maia Foundation ' +
          '(formerly the Matillion Data Productivity Cloud), I wanted a Git log/graph ' +
          'component for the UI and could not find anything open source and off the ' +
          'shelf — so I wrote one myself.'
      }
    ],
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
      { label: 'npm', href: 'https://www.npmjs.com/package/@tomplum/react-git-log', icon: 'npm' },
      { label: 'Source', href: 'https://github.com/TomPlum/react-git-log', icon: 'GitHub' }
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
    links: [{ label: 'Source', href: 'https://github.com/TomPlum/learn-japanese', icon: 'GitHub' }]
  },
  {
    id: 'biodata',
    name: 'Biodata / Urban Sensing',
    oneLiner:
      'A client-data visualisation app for Urban Sensing: passenger counts, bus journeys, ' +
      'camera comparisons and live filters over generated demo data.',
    whatItShows:
      'Early end-to-end product work: backend configuration, authentication, tenant-specific ' +
      'data access, D3 visualisations, MongoDB-backed querying and AWS deployment work while ' +
      'still finishing university.',
    stack: ['Node.js', 'Express', 'MongoDB', 'D3.js', 'AWS'],
    sections: [
      {
        label: 'The original shape',
        text:
          'The app handled sensitive sensor data, so the public old-profile examples used ' +
          'script-generated fake data with the same model as the real system. The real work ' +
          'included admin source selection, bus/driver filters, date and time ranges, overflow ' +
          'breakdowns, journey charts, stop charts and map/weather context.'
      },
      {
        label: 'Camera comparison',
        text:
          'A second workflow compared people-counting cameras inside a building. A backend ' +
          'importer read `.wl` files and wrote the parsed counts into the database so the UI ' +
          'could compare devices over the same window.'
      }
    ],
    preview: {
      kind: 'biodata-dashboard',
      caption: 'Fake passenger-count data, recreated as a tiny version of the old D3 journey views.'
    },
    links: []
  },
  {
    id: 'will-writing-service',
    name: 'The Will Writing Service',
    oneLiner:
      'A final-year client-style web application for will-writing workflows, built from ' +
      'requirements and process diagrams through to a working Node/Express/MySQL app.',
    whatItShows:
      'I could turn a messy product brief into a buildable system: software requirements, ' +
      'BPMN process modelling, UI mockups, supporting documentation and implementation in one module.',
    stack: ['Node.js', 'Express', 'MySQL'],
    sections: [
      {
        label: 'University client brief',
        text:
          'The brief came from a local company idea rather than a toy exercise. I chose Node ' +
          'and Express because the module needed a lot of behaviour in a short delivery window, ' +
          'then backed it with MySQL and a full requirements package.'
      }
    ],
    preview: {
      kind: 'will-writing-service',
      caption: 'Requirements, process flow and implementation shipped as one final-year project.'
    },
    links: [
      { label: 'Source', href: 'https://github.com/TomPlum/thewillwritingservice', icon: 'GitHub' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=1QkBTLtjepw' }
    ]
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
    facts: [
      {
        text: 'Uses the Newscatcher API as a live news source for article information',
        source: { label: 'README data sources', href: 'https://github.com/TomPlum/nyuusu#data-sources' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Creates Anki cards through AnkiConnect, with graphical and direct add-note modes',
        source: {
          label: 'Anki card hook',
          href: 'https://github.com/TomPlum/nyuusu/blob/main/src/api/hooks/useCreateAnkiCard/useCreateAnkiCard.ts'
        },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Includes Vitest, backend Jest tests and Cypress e2e coverage for article flows',
        source: { label: 'Cypress article test', href: 'https://github.com/TomPlum/nyuusu/blob/main/cypress/e2e/articles.cy.ts' },
        verifiedAt: '2026-07-07'
      }
    ],
    preview: {
      kind: 'news-reader',
      caption: 'Japanese headlines flow into reader-friendly study cards.'
    },
    links: [
      { label: 'Live at nyusu.org', href: 'https://nyusu.org' },
      { label: 'Source', href: 'https://github.com/TomPlum/nyuusu', icon: 'GitHub' }
    ]
  },
  {
    id: 'natomski',
    name: 'natomski',
    oneLiner:
      'A Polish learning app with modular lessons, multiple exercise types, custom ' +
      'lesson presets, text-to-speech and Orlek, its animated eagle guide. It exists ' +
      'because I am learning Polish myself — every lesson is content I actually study.',
    whatItShows:
      'This is the second-generation version of the language-tooling idea, and my main ' +
      'testbed for AI-assisted delivery: React 19 on Vite, Supabase auth and progress, ' +
      'reusable lesson modules, SRS review, browser TTS and Cypress smoke tests — built ' +
      'with Claude Code and Codex working in tandem under my review.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel', 'Claude', 'Codex'],
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
      { label: 'Live at natomski.uk', href: 'https://www.natomski.uk/', icon: 'natomski-logo.svg' },
      { label: 'Source', href: 'https://github.com/TomPlum/natomski', icon: 'GitHub' }
    ]
  },
  {
    id: 'clocks',
    name: 'clocks',
    oneLiner:
      "A browser recreation of 'A Million Times' — the kinetic sculpture of analog " +
      'clock hands that sweep into patterns and type.',
    whatItShows:
      'Animation engineering from first principles: a `requestAnimationFrame` ' +
      'choreography written by hand, not a library preset — and built entirely ' +
      'myself, without any AI tooling.',
    stack: ['React', 'TypeScript', 'requestAnimationFrame'],
    facts: [
      {
        text: 'Built in React with requestAnimationFrame-driven clock-hand choreography',
        source: { label: 'README', href: 'https://github.com/TomPlum/clocks#clocks' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Time is rendered as a 26-column grid with explicit hand-angle definitions for each digit',
        source: { label: 'Grid source', href: 'https://github.com/TomPlum/clocks/blob/main/src/modules/TimeDisplay/grid.ts' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Configuration controls cover themes, language, clock patterns, manual time and animation settings',
        source: {
          label: 'Configuration drawer',
          href: 'https://github.com/TomPlum/clocks/blob/main/src/modules/ConfigurationDrawer/ConfigurationDrawer.tsx'
        },
        verifiedAt: '2026-07-07'
      }
    ],
    preview: {
      kind: 'clock-grid',
      caption: 'The hands sweep, slow and settle — here, into my name.'
    },
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/clocks/' },
      { label: 'Source', href: 'https://github.com/TomPlum/clocks', icon: 'GitHub' }
    ]
  },
  {
    id: 'sleep',
    name: 'sleep',
    oneLiner:
      'Line charts of years of my own nightly sleep data, recorded by my Apple ' +
      'Watch. Built after a long stretch of sleeping badly — I researched, ' +
      'experimented, and wanted to see whether the fixes actually worked.',
    whatItShows:
      'I instrument things — including myself — and turn the data into something ' +
      'legible. The trial and error genuinely paid off, and the charts show the ' +
      'clear line where my sleep started improving. It was also a welcome excuse ' +
      'to build something in my free time again.',
    stack: ['React', 'TypeScript'],
    facts: [
      {
        text: 'Parses a ~40MB Pillow export in a web worker before posting progress and parsed data back to the UI',
        source: { label: 'README data source', href: 'https://github.com/TomPlum/sleep#data-source' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Supports stacked, compare and single-metric 2D graph views plus an experimental 3D mode',
        source: { label: 'README graph views', href: 'https://github.com/TomPlum/sleep#2d-graph-views' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Vitest covers data parsing and worker utilities including timestamps, stage conversion and table scanning',
        source: { label: 'Worker utility tests', href: 'https://github.com/TomPlum/sleep/tree/release/src/modules/DataWorker/utility' },
        verifiedAt: '2026-07-07'
      }
    ],
    sections: [
      {
        label: 'Under the hood',
        text:
          'There is no backend: the ~40MB data export ships in the public ' +
          'directory, and a web worker parses it off the main thread, posting ' +
          'progress back as it goes — my first proper foray into workers.'
      }
    ],
    preview: {
      kind: 'sleep-chart',
      caption: 'Deep, light, REM and awake time across the years — with the visible step where the fixes took hold.'
    },
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/sleep/' },
      { label: 'Source', href: 'https://github.com/TomPlum/sleep', icon: 'GitHub' }
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
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Vercel'],
    facts: [
      {
        text: 'Next.js 15 and React 19 app on Vercel, backed by Supabase Postgres with public read-only RLS',
        source: { label: 'README stack', href: 'https://github.com/TomPlum/activity-trends#stack' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Local ingest script streams Apple Health XML, workout GPX routes and ECG CSV data into Supabase',
        source: { label: 'README ingest', href: 'https://github.com/TomPlum/activity-trends#ingesting-your-apple-health-data' },
        verifiedAt: '2026-07-07'
      },
      {
        text: 'Vitest covers dashboard domain logic plus ingest parsers for daily metrics, GPX routes and sleep sessions',
        source: { label: 'Ingest tests', href: 'https://github.com/TomPlum/activity-trends/tree/release/scripts/ingest/__tests__' },
        verifiedAt: '2026-07-07'
      }
    ],
    preview: {
      kind: 'activity-dashboard',
      caption: 'A Supabase-backed Next.js dashboard charting health and activity data.'
    },
    links: [
      { label: 'Live at activity.tomplumpton.me', href: 'https://activity.tomplumpton.me' },
      { label: 'Source', href: 'https://github.com/TomPlum/activity-trends', icon: 'GitHub' }
    ]
  },
  {
    id: 'advent-of-code',
    name: 'Advent of Code, 2018–2024',
    oneLiner:
      'Advent of Code every December since 2018, solved in deliberately ' +
      '“enterprise-style” Kotlin — test suites, documentation and CI for puzzle code.',
    whatItShows:
      'Consistency and craft: seven Decembers running of production discipline — ' +
      'test suites, clean architecture, shared libraries, CI — applied to code ' +
      'nobody was making me write well.',
    stack: ['Kotlin', 'JUnit', 'Gradle'],
    sections: [
      {
        label: 'The shared library',
        text:
          'After the second year I extracted the recurring concepts into ' +
          '`advent-of-code-libs`, a published Kotlin library: `Point2D`/`Point3D` ' +
          'cartesian grids, graphing algorithms, input de-serialisation, and a ' +
          '`SolutionRunner` that benchmarks every day and reports runtime deltas ' +
          'against the previous run. A companion test-support package and a ' +
          'template repository bootstrap each new December.'
      }
    ],
    facts: [
      {
        text: 'Seven consecutive years, 2018–2024, each in its own repository',
        source: { label: 'GitHub repositories', href: 'https://github.com/TomPlum?tab=repositories&q=advent-of-code' },
        verifiedAt: '2026-07-06'
      },
      {
        text: '2020, 2022 and 2023 solved to the full 50 stars',
        source: { label: '2023 README', href: 'https://github.com/TomPlum/advent-of-code-2023' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Every day documented with answers and benchmarked runtimes in the README',
        source: { label: '2024 answer table', href: 'https://github.com/TomPlum/advent-of-code-2024#answer-table' },
        verifiedAt: '2026-07-06'
      },
      {
        text: 'Shared utility library and test-support package published to GitHub Packages',
        source: { label: 'advent-of-code-libs', href: 'https://github.com/TomPlum/advent-of-code-libs' },
        verifiedAt: '2026-07-06'
      }
    ],
    preview: {
      kind: 'aoc-tests',
      caption: 'Puzzle code treated like production code: tests, Gradle and CI.'
    },
    links: [
      { label: 'All AoC repos', href: 'https://github.com/TomPlum?tab=repositories&q=advent-of-code', icon: 'GitHub' },
      { label: 'Shared libs', href: 'https://github.com/TomPlum/advent-of-code-libs', icon: 'GitHub' }
    ]
  }
]

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id)
