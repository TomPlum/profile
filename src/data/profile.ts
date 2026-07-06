export const profile = {
  name: 'Thomas Plumpton',
  role: 'Staff Software Engineer',
  company: 'Matillion',
  companyHref: 'https://www.matillion.com',
  location: 'Cheshire, UK',
  valueStatement:
    'Full-stack engineer with a strong front-end focus — React and TypeScript, ' +
    'backed by Kotlin and Spring Boot services. I like building things properly: ' +
    'well-tested, readable, and easy for the next person to pick up.',
  stack: ['React', 'TypeScript', 'Kotlin', 'Spring Boot'],
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
