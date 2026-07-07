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
 * Career dates are verified against Tom's own records.
 */
export const commits: Commit[] = [
  {
    id: 'claude-code-adoption',
    branch: 'career',
    date: '2025-12-01',
    dateLabel: 'Dec 2025',
    title: 'Adopted Claude Code as a daily engineering tool',
    summary:
      'Matillion rolled out agentic coding to everyone, and I moved it into my professional ' +
      'workflow: implementation, iteration and review, not blind generation.',
    body:
      'I started with careful experiments around Claude Code, then built a working rhythm around ' +
      'repo context, bespoke `CLAUDE.md` files, skills, plugins and an agentic SDLC. These days I ' +
      'orchestrate several Claude Code instances at once — one implementing while others review, ' +
      'explore or verify — which multiplies my delivery speed without loosening the bar: precise ' +
      'context, rigorous PR review and repeated implementation feedback.',
    stack: ['Claude', 'CLI'],
    tags: ['ai', 'head']
  },
  {
    id: 'codex-adoption',
    branch: 'open-source',
    date: '2026-04-01',
    dateLabel: 'Apr 2026',
    title: 'Added Codex to the personal-project workflow',
    summary:
      'Started using Codex alongside Claude Code on personal projects, pairing agents to build, ' +
      'review and refine changes.',
    body:
      'For personal work I use Codex and Claude Code in tandem: one agent can implement while ' +
      'another reviews, explores alternatives or checks the shape of the finished experience. ' +
      'The useful part is not the novelty; it is the loop of context, critique, iteration and ' +
      'ownership that keeps AI-assisted code aligned with the project.',
    stack: ['Codex', 'CLI'],
    tags: ['ai']
  },
  {
    id: 'staff-engineer',
    branch: 'career',
    date: '2024-04-01',
    dateLabel: 'Apr 2024',
    title: 'Promoted to Staff Software Engineer',
    summary:
      'The senior-most individual-contributor track at Matillion — setting technical ' +
      'direction across teams on a data integration platform.',
    body:
      'This is where the job became less about owning one slice of implementation ' +
      'and more about shaping the technical path around it: clarifying trade-offs, ' +
      'reviewing designs, raising the quality bar and helping teams keep front-end ' +
      'and service work understandable as the platform grows.',
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
    title: 'Advent of Code 2024 — the seventh year running',
    summary:
      'Back every December since 2018, in Kotlin held to production standards.',
    tags: ['7-years'],
    projectId: 'advent-of-code'
  },
  {
    id: 'sleep',
    branch: 'open-source',
    date: '2024-10-06',
    title: 'Fixed my sleep, then charted the proof',
    summary:
      'Years of nightly Apple Watch data, made legible — with a visible line where things got better.',
    projectId: 'sleep'
  },
  {
    id: 'natomski',
    branch: 'languages',
    date: '2026-05-09',
    title: 'Built natomski — a modular Polish learning app',
    summary:
      'Lessons, exercises, SRS, TTS and Orlek the eagle mascot — the Japanese-tooling playbook, run again for Polish.',
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
    id: 'senior-engineer',
    branch: 'career',
    date: '2022-08-01',
    dateLabel: 'Aug 2022',
    title: 'Promoted to Senior Software Engineer',
    summary:
      'RESTful Spring Boot microservices with React and TypeScript front-ends, ' +
      'on Matillion’s cloud data platform.'
  },
  {
    id: 'joined-matillion',
    branch: 'career',
    date: '2021-05-01',
    dateLabel: 'May 2021',
    title: 'Joined Matillion',
    summary:
      'Started on Matillion ETL — Java and GWT — and brought Cypress testing to a ' +
      'legacy codebase. Two promotions followed in the next three years.'
  },
  {
    id: 'learn-japanese',
    branch: 'languages',
    date: '2021-02-17',
    title: 'Built learn-japanese — a full Japanese study app',
    summary:
      'Configurable kana, kanji, Genki, grammar and number sessions for the app’s toughest user: me, daily.',
    projectId: 'learn-japanese'
  },
  {
    id: 'activity-trends',
    branch: 'open-source',
    date: '2020-08-23',
    title: 'Built a dashboard for my Apple Health data',
    summary: 'A Next.js dashboard on Supabase, charting my Apple Health data.',
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
    id: 'barclays-ba4',
    branch: 'career',
    date: '2019-08-26',
    dateLabel: 'Aug 2019',
    title: 'Promoted at Barclays — identity & verification',
    summary:
      'Java developer on Barclaycard’s Identification & Verification team, promoted ' +
      'fourteen months into the graduate role.',
    body:
      'The work sat around RESTful Spring Boot services and React/TypeScript UI work, ' +
      'with test-driven delivery, Gradle, JUnit, Tomcat and the realities of changing ' +
      'large legacy systems without making them harder to reason about.',
    stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Gradle', 'JUnit']
  },
  {
    id: 'joined-barclays',
    branch: 'career',
    date: '2018-06-04',
    dateLabel: 'Jun 2018',
    title: 'Joined Barclays as a Software Developer',
    summary:
      'Graduate role in Personal & Corporate Banking at the Radbroke technology ' +
      'centre — Java, Spring, TDD and DDD. Named best newcomer that December.',
    body:
      'This was the leap from university and small-company web apps into enterprise ' +
      'software: code reviews, domain language, production constraints, long-lived ' +
      'systems and teams where the human process mattered as much as the code.',
    stack: ['Java', 'Spring Boot', 'JUnit']
  },
  {
    id: 'graduated',
    branch: 'career',
    date: '2018-06-01', // year verified; graduation month assumed
    dateLabel: '2018',
    title: 'Graduated — BSc Computing, First Class (Hons)',
    summary:
      'University of Bolton, with the Governors Prize in years two and three. ' +
      'Final-year project: analysing the randomness of social media streams and ' +
      'using it to drive Robocode AI.',
    body:
      'The strongest thread through the degree was applied software, not just marks: ' +
      'Course Representative, Governors Prize recognition in years two and three, a ' +
      'double-credit dissertation called "Determining the Randomness of Social Media", ' +
      'and a final-year client-style web app built in Node, Express and MySQL.',
    tags: ['bsc']
  },
  {
    id: 'will-writing-service',
    branch: 'career',
    date: '2018-05-01', // year verified; month used only for log ordering
    dateLabel: '2018',
    title: 'Built The Will Writing Service for a final-year client brief',
    summary:
      'A Node, Express and MySQL application backed by an SRS, BPMN process diagrams, UI mockups and supporting documentation.',
    projectId: 'will-writing-service'
  },
  {
    id: 'retail-sensing',
    branch: 'career',
    date: '2017-05-01',
    dateLabel: 'May 2017',
    title: 'Joined Retail Sensing as a MEAN-stack developer',
    summary:
      'Part-time through final year of university: D3.js visualisations of live data ' +
      'from public vehicles worldwide, on MongoDB Atlas and AWS.',
    projectId: 'biodata'
  },
  {
    id: 'ocean82',
    branch: 'career',
    date: '2016-06-01',
    dateLabel: 'Jun 2016',
    title: 'First industry code — summer placement at Ocean82',
    summary:
      'Built WordPress sites front to back — PHP, MySQL, IIS — the summer after ' +
      'first year.',
    body:
      'The placement covered practical web work at small-business pace: WordPress ' +
      'sites, PHP, MySQL and MSSQL, HTML/CSS/JavaScript, IIS on Microsoft Server, ' +
      'plus plugins and tools such as LimeSurvey, GravityForms and UPME.',
    stack: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'IIS']
  },
  {
    id: 'a-levels',
    branch: 'career',
    date: '2015-06-01',
    dateLabel: '2015',
    title: 'A-Levels — Maths, Physics, Computer Science',
    summary: 'Rochdale Sixth Form College. Where the computing started.'
  }
]

/** Newest first — the only order the log is ever shown in. */
export const sortedCommits: Commit[] = [...commits].sort((a, b) => b.date.localeCompare(a.date))

export const branchByName = (name: string): Branch | undefined => branches.find((b) => b.name === name)
