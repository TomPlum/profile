import { useCallback, useEffect, useRef, useState } from 'react'
import type { Branch, Commit } from '../data/types'
import { branchByName } from '../data/commits'
import { useAnchors } from '../hooks/useAnchors'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { GraphRail, type RailGeometry } from './GraphRail'
import { CommitRow } from './CommitRow'
import * as css from './CommitLog.css'

interface CommitLogProps {
  /** Visible commits, newest first. */
  commits: Commit[]
  /** Visible branches, in lane order (career first). */
  branches: Branch[]
}

const geometryFor = (laneCount: number, compact: boolean): RailGeometry => {
  const laneX0 = compact ? 11 : 16
  const laneGap = compact ? 13 : 22
  const padRight = compact ? 12 : 22
  return {
    laneX0,
    laneGap,
    width: laneX0 + Math.max(laneCount - 1, 0) * laneGap + padRight
  }
}

export const CommitLog = ({ commits, branches }: CommitLogProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCommitId, setHoveredCommitId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    const id = new URLSearchParams(window.location.search).get('commit')
    return id || null
  })
  const compact = useMediaQuery('(max-width: 640px)')
  const geometry = geometryFor(branches.length, compact)

  const visibleIds = commits.map((c) => c.id).join(',')
  const { anchors, registerAnchor } = useAnchors(containerRef, visibleIds)

  const toggle = useCallback((id: string) => {
    const next = expandedId === id ? null : id
    const url = new URL(window.location.href)
    if (next) {
      url.searchParams.set('commit', next)
    } else {
      url.searchParams.delete('commit')
    }
    window.history.pushState({}, '', url)
    setExpandedId(next)
  }, [expandedId])

  useEffect(() => {
    const restoreFromUrl = () => {
      const id = new URLSearchParams(window.location.search).get('commit')
      setExpandedId(id || null)
    }
    window.addEventListener('popstate', restoreFromUrl)
    return () => window.removeEventListener('popstate', restoreFromUrl)
  }, [])

  // j/k moves focus through the commit rows — a small courtesy for the
  // engineer doing due diligence. Advertised in the footer colophon.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'j' && event.key !== 'k') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      const rows = Array.from(containerRef.current?.querySelectorAll<HTMLElement>('[data-log-row]') ?? [])
      if (rows.length === 0) return
      const current = rows.findIndex((row) => row === document.activeElement)
      const next =
        event.key === 'j'
          ? rows[Math.min(current + 1, rows.length - 1)]
          : rows[Math.max(current - 1, 0)]
      next?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // The newest visible commit on each branch is that branch's head and gets
  // the ref decoration, like git log's `(HEAD -> main)`.
  const headIds = new Set(branches.map((b) => commits.find((c) => c.branch === b.name)?.id).filter(Boolean))

  return (
    <div ref={containerRef} className={css.wrap}>
      <GraphRail
        commits={commits}
        branches={branches}
        ys={anchors.ys}
        height={anchors.height}
        geometry={geometry}
        hoveredCommitId={hoveredCommitId}
      />
      <ol className={css.list} style={{ paddingLeft: geometry.width }}>
        {commits.map((commit) => {
          const branch = branchByName(commit.branch)
          if (!branch) return null
          return (
            <CommitRow
              key={commit.id}
              commit={commit}
              branch={branch}
              isHead={headIds.has(commit.id)}
              expanded={expandedId === commit.id}
              onToggle={toggle}
              onHoverChange={setHoveredCommitId}
              registerAnchor={registerAnchor(commit.id)}
            />
          )
        })}
      </ol>
      <p className={css.endMarker} aria-hidden="true">
        (END)
      </p>
    </div>
  )
}
