import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { App } from './App'
import { TechIcon } from './components/TechIcon'
import { sortedCommits } from './data/commits'
import { projects } from './data/projects'
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

afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
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

  it('lets j/k walk every commit row, including static career milestones', () => {
    const { container } = render(<App />)
    const rows = Array.from(container.querySelectorAll<HTMLElement>('[data-log-row]'))
    expect(rows).toHaveLength(sortedCommits.length)

    fireEvent.keyDown(window, { key: 'j' })
    expect(document.activeElement).toBe(rows[0])

    fireEvent.keyDown(window, { key: 'j' })
    expect(document.activeElement).toBe(rows[1])

    fireEvent.keyDown(window, { key: 'k' })
    expect(document.activeElement).toBe(rows[0])
  })

  it('serialises the expanded commit in the URL and restores it on navigation', () => {
    window.history.replaceState({}, '', '/?from=recruiter&commit=staff-engineer')
    render(<App />)

    const staff = screen.getByRole('button', { name: /Promoted to Staff Software Engineer/i })
    const clocks = screen.getByRole('button', { name: /Recreated a kinetic clock sculpture/i })
    expect(staff.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(clocks)
    expect(staff.getAttribute('aria-expanded')).toBe('false')
    expect(clocks.getAttribute('aria-expanded')).toBe('true')
    expect(new URLSearchParams(window.location.search).get('commit')).toBe('clocks')
    expect(new URLSearchParams(window.location.search).get('from')).toBe('recruiter')

    window.history.replaceState({}, '', '/?from=recruiter&commit=staff-engineer')
    fireEvent.popState(window)
    expect(staff.getAttribute('aria-expanded')).toBe('true')
    expect(clocks.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(staff)
    expect(new URLSearchParams(window.location.search).has('commit')).toBe(false)
    expect(new URLSearchParams(window.location.search).get('from')).toBe('recruiter')
  })

  it('renders an icon for every technology pill', () => {
    const technologies = new Set([
      ...profile.stack,
      ...projects.flatMap((project) => project.stack)
    ])
    render(
      <>
        {[...technologies].map((technology) => (
          <span key={technology} data-testid={`icon-${technology}`}>
            <TechIcon name={technology} />
          </span>
        ))}
      </>
    )

    technologies.forEach((technology) => {
      expect(
        screen.getByTestId(`icon-${technology}`).querySelector('svg'),
        `missing icon for ${technology}`
      ).not.toBeNull()
    })
  })
})
