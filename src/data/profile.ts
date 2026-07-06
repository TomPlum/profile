export const profile = {
  name: 'Thomas Plumpton',
  role: 'Staff Software Engineer',
  company: 'Matillion',
  companyHref: 'https://www.matillion.com',
  location: 'Cheshire, UK',
  valueStatement:
    'Backend-leaning full-stack: data platforms in Kotlin & Spring Boot, ' +
    'front-ends in React & TypeScript — engineered like they’ll be read for ' +
    'a decade, because good code is.',
  stack: ['Kotlin', 'Spring Boot', 'React', 'TypeScript'],
  /** The small human line under the masthead. */
  currently: 'Currently: learning Japanese & Polish, lifting, reading fantasy, building PCs.',
  email: 'Thomas.Plumpton@hotmail.co.uk', // TODO(tom): confirm this is the address you want public
  cvHref: '/cv.pdf', // drop your CV at public/cv.pdf
  links: {
    github: 'https://github.com/TomPlum',
    twitter: 'https://twitter.com/TomPlumpton',
    site: 'https://tomplumpton.me'
  }
} as const
