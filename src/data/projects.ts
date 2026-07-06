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
    facts: ['v3.5.1 · 21 releases', '~1,200 downloads/month on npm', 'Published as @tomplum/react-git-log'],
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
      'A Duolingo-inspired trainer for Japanese kana and vocabulary — built because ' +
      'I am the user.',
    whatItShows:
      'End-to-end product thinking: I designed the learning modes, built the app, ' +
      'and study with it. Side projects with a real user are held to a higher bar.',
    stack: ['React', 'TypeScript'],
    facts: ['My most-starred learning project on GitHub'],
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
    links: [
      { label: 'Live at nyusu.org', href: 'https://nyusu.org' },
      { label: 'Source', href: 'https://github.com/TomPlum/nyuusu' }
    ]
  },
  {
    id: 'natomski',
    name: 'natomski',
    oneLiner: 'Games for drilling Polish vocabulary and grammar.',
    whatItShows:
      'The same trick twice proves the method: after building my own Japanese ' +
      'tooling, I did it again for Polish.',
    stack: ['React', 'TypeScript'],
    links: [] // TODO(tom): add repo/live links if natomski is public anywhere
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
    links: [
      { label: 'Live demo', href: 'https://tomplum.github.io/sleep' },
      { label: 'Source', href: 'https://github.com/TomPlum/sleep' }
    ]
  },
  {
    id: 'activity-trends',
    name: 'activity-trends',
    oneLiner:
      'A dashboard-style report of a year of my Apple Watch & Health data, backed ' +
      'by a Kotlin & Spring Boot API.',
    whatItShows:
      'Full-stack in one project: data pipeline and API in my day-job stack, ' +
      'visualisation layer in my front-end stack.',
    stack: ['Kotlin', 'Spring Boot', 'React', 'TypeScript'],
    links: [
      { label: 'Live at tomplumpton.me', href: 'https://tomplumpton.me' },
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
    facts: ['7 consecutive years completed', 'Shared utility library + template repo extracted along the way'],
    links: [
      { label: 'All AoC repos', href: 'https://github.com/TomPlum?tab=repositories&q=advent-of-code' },
      { label: 'Shared libs', href: 'https://github.com/TomPlum/advent-of-code-libs' }
    ]
  }
]

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id)
