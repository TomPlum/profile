import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { profile } from './data/profile'

/**
 * The five-second test, as a unit test: everything a recruiter must grasp
 * immediately has to actually be in the document.
 */
beforeAll(() => {
  // jsdom is missing the observers and matchMedia the log uses.
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false
  })) as typeof window.matchMedia

  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver ??= class {
    root = null
    rootMargin = ''
    thresholds = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  } as unknown as typeof IntersectionObserver
})

describe('the five-second test', () => {
  it('shows name, role, stack and value statement', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeDefined()
    expect(screen.getAllByText(profile.role).length).toBeGreaterThan(0)
    profile.stack.forEach((tech) => {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0)
    })
    expect(screen.getByText(profile.valueStatement)).toBeDefined()
  })

  it('offers Contact and CV routes in the sticky header', () => {
    render(<App />)
    const contact = screen.getAllByRole('link', { name: /contact/i })
    expect(contact.some((a) => a.getAttribute('href') === `mailto:${profile.email}`)).toBe(true)
    const cv = screen.getAllByRole('link', { name: /cv \(pdf\)/i })
    expect(cv.some((a) => a.getAttribute('href') === profile.cvHref)).toBe(true)
  })

  it('renders the log as a semantic list with expandable commits', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { expanded: false })
    expect(buttons.length).toBeGreaterThan(3)
  })
})
