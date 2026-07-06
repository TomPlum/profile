import type { Branch, Commit } from './types'

export const branches: Branch[] = [
  { name: 'career', lane: 'career', blurb: 'Roles, promotions, education' },
  { name: 'open-source', lane: 'oss', blurb: 'Published packages & builds' },
  { name: 'languages', lane: 'languages', blurb: 'Japanese & Polish tooling' },
  { name: 'puzzles', lane: 'puzzles', blurb: 'Advent of Code, every year' }
]

/**
 * The log. One entry per real career event, newest first (sorting is enforced
 * at render time and by tests, so order here doesn't strictly matter).
 *
 * TODO(tom): the three dates marked below are my best guesses from public
 * data — correct them, and consider adding commits for any roles between
 * graduation (2018) and Matillion.
 */
export const commits: Commit[] = [
  {
    id: 'staff-engineer',
    branch: 'career',
    date: '2024-04-01', // TODO(tom): real promotion date
    dateLabel: '2024',
    title: 'Promoted to Staff Software Engineer',
    summary:
      'The senior-most individual-contributor track at Matillion — setting technical ' +
      'direction across teams on a data integration platform.',
    tags: ['staff']
  },
  {
    id: 'clocks',
    branch: 'open-source',
    date: '2025-07-21',
    title: 'Recreated a kinetic clock sculpture in the browser',
    summary:
      "A virtual 'A Million Times': a grid of clock hands choreographed by hand " +
      'with requestAnimationFrame.',
    projectId: 'clocks'
  },
  {
    id: 'react-git-log',
    branch: 'open-source',
    date: '2025-03-20',
    title: 'Published react-git-log to npm',
    summary:
      'An interactive, themeable Git commit graph as a React component — the idea ' +
      'this page is built on.',
    tags: ['v3.5.1'],
    projectId: 'react-git-log'
  },
  {
    id: 'aoc-2024',
    branch: 'puzzles',
    date: '2024-12-25',
    title: 'Completed Advent of Code 2024 — the seventh year running',
    summary:
      'Every puzzle, every year since 2018, in Kotlin held to production standards.',
    tags: ['7/7'],
    projectId: 'advent-of-code'
  },
  {
    id: 'sleep',
    branch: 'open-source',
    date: '2024-10-06',
    title: 'Started charting my own sleep',
    summary: 'Years of nightly data from my phone, made legible.',
    projectId: 'sleep'
  },
  {
    id: 'natomski',
    branch: 'languages',
    date: '2024-06-01', // TODO(tom): real date; repo isn't public so I couldn't verify
    dateLabel: '2024',
    title: 'Built natomski — games for learning Polish',
    summary: 'The Japanese-tooling playbook, run again for my second language.',
    projectId: 'natomski'
  },
  {
    id: 'nyuusu',
    branch: 'languages',
    date: '2023-09-20',
    title: 'Shipped nyuusu — read real Japanese news',
    summary: 'Live headlines from Japan, with Anki flashcard export. Hosted at nyusu.org.',
    projectId: 'nyuusu'
  },
  {
    id: 'joined-matillion',
    branch: 'career',
    date: '2021-06-01', // TODO(tom): real start date (and starting title, if different)
    dateLabel: '2021',
    title: 'Joined Matillion',
    summary:
      'Building data integration products: Kotlin and Spring Boot on the back, ' +
      'React and TypeScript on the front.'
  },
  {
    id: 'learn-japanese',
    branch: 'languages',
    date: '2021-02-17',
    title: 'Built learn-japanese — a kana & vocabulary trainer',
    summary: 'Duolingo-inspired drills for the app’s toughest user: me, daily.',
    projectId: 'learn-japanese'
  },
  {
    id: 'activity-trends',
    branch: 'open-source',
    date: '2020-08-23',
    title: 'Built a dashboard for my Apple Health data',
    summary: 'Kotlin & Spring Boot API underneath, React charts on top.',
    projectId: 'activity-trends'
  },
  {
    id: 'aoc-2018',
    branch: 'puzzles',
    date: '2018-12-25',
    title: 'First Advent of Code, solved like it was going to production',
    summary:
      'Started the tradition: full test suites, clean architecture and CI on code ' +
      'nobody was making me write well.',
    projectId: 'advent-of-code'
  },
  {
    id: 'graduated',
    branch: 'career',
    date: '2018-07-01', // TODO(tom): university name + real graduation date
    dateLabel: '2018',
    title: 'Graduated — BSc Computer Science',
    summary:
      'Final-year project: analysing the randomness of social media streams and ' +
      'using it to drive Robocode AI.',
    tags: ['bsc']
  }
]

/** Newest first — the only order the log is ever shown in. */
export const sortedCommits: Commit[] = [...commits].sort((a, b) => b.date.localeCompare(a.date))

export const branchByName = (name: string): Branch | undefined => branches.find((b) => b.name === name)
