export const profile = {
  name: 'Thomas Plumpton',
  role: 'Staff Software Engineer',
  company: 'Matillion',
  companyHref: 'https://www.matillion.com',
  companyLogo: 'maia.png', // Matillion's "Maia" mark; relative so it resolves under any base
  companyLogoDark: 'maia-dark-mode.png', // dark-theme variant (light eyes/sparkle)
  location: 'Cheshire, UK',
  valueStatement:
    'Full-stack engineer with a strong front-end focus — React and TypeScript, ' +
    'backed by Kotlin and Spring Boot services. I like building things properly: ' +
    'well-tested, readable, and easy for the next person to pick up.',
  photo: {
    src: 'me.jpeg',
    alt: 'Thomas Plumpton in the mountains'
  },
  stack: ['React', 'TypeScript', 'Cypress', 'Kotlin', 'Java', 'Spring Boot', 'Claude', 'Codex'],
  /** The small human line under the masthead. */
  currently: 'Currently: learning Japanese & Polish, lifting, reading fantasy, building PCs.',
  email: 'Thomas.Plumpton@hotmail.co.uk', // matches the contact address on the CV
  cvHref: 'cv.pdf', // drop your CV at public/cv.pdf; relative so it resolves under any base
  links: {
    github: 'https://github.com/TomPlum',
    twitter: 'https://twitter.com/TomPlumpton',
    site: 'https://tomplumpton.me'
  }
} as const
