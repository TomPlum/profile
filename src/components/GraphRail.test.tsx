import { fireEvent, render } from '@testing-library/react'
import { MotionConfig } from 'motion/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { branches, commits } from '../data/commits'
import { GraphRail } from './GraphRail'

const career = branches.find((branch) => branch.name === 'career')!
const openSource = branches.find((branch) => branch.name === 'open-source')!
const staff = commits.find((commit) => commit.id === 'staff-engineer')!
const reactGitLog = commits.find((commit) => commit.id === 'react-git-log')!

beforeAll(() => {
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

const renderRail = (hoveredCommitId: string | null = null) => render(
  <MotionConfig reducedMotion="always">
    <GraphRail
      commits={[staff, reactGitLog]}
      branches={[career, openSource]}
      ys={{ [staff.id]: 120, [reactGitLog.id]: 60 }}
      height={180}
      geometry={{ laneX0: 16, laneGap: 22, width: 60 }}
      hoveredCommitId={hoveredCommitId}
    />
  </MotionConfig>
)

describe('GraphRail hover states', () => {
  it('emphasises the node belonging to the hovered commit row', () => {
    const { container } = renderRail(reactGitLog.id)

    expect(container.querySelector(`[data-commit-id="${reactGitLog.id}"]`)?.getAttribute('data-hovered')).toBe('true')
    expect(container.querySelector(`[data-commit-id="${staff.id}"]`)?.hasAttribute('data-hovered')).toBe(false)
  })

  it('dims the other lanes while a branch path is hovered', () => {
    const { container } = renderRail()
    const openSourceHitArea = container.querySelector<SVGGElement>(
      '[data-rail-layer="hit"][data-branch="open-source"]'
    )!

    fireEvent.pointerEnter(openSourceHitArea)
    expect(
      container.querySelector('[data-rail-layer="lines"][data-branch="career"]')?.getAttribute('data-dimmed')
    ).toBe('true')
    expect(
      container.querySelector('[data-rail-layer="nodes"][data-branch="open-source"]')?.hasAttribute('data-dimmed')
    ).toBe(false)

    fireEvent.pointerLeave(openSourceHitArea)
    expect(container.querySelector('[data-dimmed="true"]')).toBeNull()
  })
})
