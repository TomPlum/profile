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
  // Click the portrait to cycle these; on mobile both render side-by-side.
  photos: [
    { src: 'me.jpeg', alt: 'Thomas Plumpton in the mountains', width: 724, height: 1086 },
    { src: 'me2.jpeg', alt: 'Thomas Plumpton', width: 768, height: 1024 }
  ],
  stack: ['React', 'TypeScript', 'Cypress', 'Kotlin', 'Java', 'Spring Boot', 'Claude', 'Codex'],
  /** The small human line under the masthead. */
  currently: 'Currently: learning Japanese & Polish, lifting, reading fantasy, building PCs.',
  email: 'Thomas.Plumpton@hotmail.co.uk', // matches the contact address on the CV
  cvHref: 'cv.pdf', // drop your CV at public/cv.pdf; relative so it resolves under any base
  links: {
    github: 'https://github.com/TomPlum',
    linkedin: 'https://www.linkedin.com/in/thomas-plumpton',
    site: 'https://tomplumpton.me'
  }
} as const
