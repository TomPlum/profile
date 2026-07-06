import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import type { Branch, Commit } from '../data/types'
import { vars } from '../styles/theme.css'
import * as css from './GraphRail.css'

export interface RailGeometry {
  /** x of the first (career) lane. */
  laneX0: number
  /** Horizontal distance between lanes. */
  laneGap: number
  /** Total rail width — the log list is padded by this amount. */
  width: number
}

interface GraphRailProps {
  /** Visible commits, newest first. */
  commits: Commit[]
  /** Visible branches, in lane order (career first). */
  branches: Branch[]
  ys: Record<string, number>
  height: number
  geometry: RailGeometry
  hoveredCommitId?: string | null
}

const DOT_RADIUS = 5
const TIP_LENGTH = 34
const FORK_CURVE = 36
/** Half-size of the main trunk's diamond HEAD marker, flush at the very top. */
const HEAD_SIZE = 6

const diamondPath = (cx: number, cy: number, d: number): string =>
  `M ${cx} ${cy - d} L ${cx + d} ${cy} L ${cx} ${cy + d} L ${cx - d} ${cy} Z`

interface Segment {
  /** This branch segment's own commit rows. */
  nodes: Array<{ id: string; y: number }>
  /** Career row it forks off at its oldest (lower) end. */
  forkTargetY?: number
  /** Career row it merges back into at its newest (upper) end. */
  mergeTargetY?: number
}

interface Lane {
  branch: Branch
  x: number
  colour: string
  isMain: boolean
  /** One entry per short-lived branch on this lane (the trunk has just one). */
  segments: Segment[]
}

const buildLanes = (commits: Commit[], branches: Branch[], ys: Record<string, number>, geometry: RailGeometry): Lane[] => {
  const laneX = (index: number) => geometry.laneX0 + index * geometry.laneGap
  const careerVisible = branches.some((b) => b.name === 'career')
  const careerYs = commits
    .filter((c) => c.branch === 'career')
    .flatMap((c) => (ys[c.id] === undefined ? [] : [ys[c.id]!]))
  const careerAbove = (y: number) => careerYs.filter((c) => c < y).sort((a, b) => b - a)[0]
  const careerBelow = (y: number) => careerYs.filter((c) => c > y).sort((a, b) => a - b)[0]

  return branches.map((branch, index) => {
    const own = commits
      .filter((c) => c.branch === branch.name)
      .flatMap((c) => (ys[c.id] === undefined ? [] : [{ id: c.id, y: ys[c.id]! }]))
      .sort((a, b) => a.y - b.y)
    const isMain = branch.name === 'career'
    const lane: Lane = { branch, x: laneX(index), colour: vars.colour.lane[branch.lane], isMain, segments: [] }
    if (own.length === 0) return lane

    // The trunk (and any filtered single-branch view) is one continuous strand.
    if (isMain || !careerVisible) {
      lane.segments = [{ nodes: own }]
      return lane
    }

    // Otherwise every project is its own short-lived branch: it forks off the
    // nearest career commit below it and merges into the nearest one above.
    // Projects sitting between the same two career commits ride one branch.
    const groups = new Map<string, Segment>()
    for (const node of own) {
      const y = node.y
      const mergeTargetY = careerAbove(y)
      const forkTargetY = careerBelow(y)
      const key = `${mergeTargetY ?? 'x'}:${forkTargetY ?? 'x'}`
      const seg = groups.get(key) ?? { nodes: [], mergeTargetY, forkTargetY }
      seg.nodes.push(node)
      groups.set(key, seg)
    }
    lane.segments = [...groups.values()]
    return lane
  })
}

// A fork (downward) or merge (upward) curve between a lane and the career lane.
// `from` is the lane's own commit; `to` is the career row it joins.
const joinPath = (x: number, careerX: number, from: number, to: number): string => {
  if (Math.abs(to - from) <= FORK_CURVE) {
    return `M ${x} ${from} C ${x} ${to}, ${careerX} ${from}, ${careerX} ${to}`
  }
  const dir = Math.sign(to - from) // +1 forking down, -1 merging up
  const bend = to - dir * FORK_CURVE
  return [
    `M ${x} ${from}`,
    `L ${x} ${bend}`,
    `C ${x} ${bend + dir * FORK_CURVE * 0.6}, ${careerX} ${to - dir * FORK_CURVE * 0.4}, ${careerX} ${to}`
  ].join(' ')
}

/**
 * The commit graph, in the style of react-git-log. Purely decorative — the
 * log itself is a semantic list — so the whole SVG is hidden from assistive
 * tech. Lane positions come from measured row positions (see useAnchors).
 */
export const GraphRail = ({ commits, branches, ys, height, geometry, hoveredCommitId = null }: GraphRailProps) => {
  const reduceMotion = useReducedMotion() ?? false
  const svgRef = useRef<SVGSVGElement>(null)
  const [inView, setInView] = useState(false)
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null)
  const drawn = reduceMotion || inView
  const hasSize = height > 0

  // hasSize is a dependency because the svg doesn't exist until the container
  // has been measured — observing must wait for the element.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !hasSize || reduceMotion) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [reduceMotion, hasSize])

  if (!hasSize) return null

  const lanes = buildLanes(commits, branches, ys, geometry)
  const careerX = lanes.find((l) => l.branch.name === 'career')?.x ?? geometry.laneX0
  const pathClass = [css.path, drawn && css.pathDrawn, reduceMotion && css.instant].filter(Boolean).join(' ')
  const dotClass = [css.dot, drawn && css.dotDrawn, reduceMotion && css.instant].filter(Boolean).join(' ')
  // Lanes draw in with a slight stagger, applied as an inline transition delay.
  const laneDelay = (index: number) => (reduceMotion ? undefined : `${index * 130}ms`)
  const isLaneDimmed = (branchName: string) => hoveredBranch !== null && hoveredBranch !== branchName
  const laneClass = (branchName: string) =>
    [css.lane, isLaneDimmed(branchName) && css.laneDimmed]
      .filter(Boolean)
      .join(' ')

  // Visible lines and nodes render in separate passes so every node sits above
  // every line. A transparent middle pass provides forgiving hover targets.
  // A lane's own
  // through-line and other lanes' fork/merge curves would otherwise paint over
  // neighbouring dots. The nodes are donuts whose centres are filled with the
  // page background, so the line is hidden inside the ring rather than showing
  // through the gap.
  return (
    <svg ref={svgRef} className={css.rail} width={geometry.width} height={height} aria-hidden="true" focusable="false">
      {lanes.map((lane, index) => {
        if (lane.segments.length === 0) return null
        const delay = laneDelay(index)

        // The main branch is the trunk: a faint dashed line reaches from the
        // diamond HEAD marker at the very top down to the newest commit, then a
        // solid line runs on to the root.
        if (lane.isMain) {
          const ownYs = lane.segments[0]!.nodes.map((node) => node.y)
          const newest = Math.min(...ownYs)
          const oldest = Math.max(...ownYs)
          return (
            <g
              key={`lines-${lane.branch.name}`}
              className={laneClass(lane.branch.name)}
              data-branch={lane.branch.name}
              data-dimmed={isLaneDimmed(lane.branch.name) ? 'true' : undefined}
              data-rail-layer="lines"
              stroke={lane.colour}
              fill="none"
              strokeWidth={2.5}
            >
              <line
                className={dotClass}
                style={{ transitionDelay: delay }}
                x1={lane.x}
                y1={HEAD_SIZE * 2 + 3}
                x2={lane.x}
                y2={newest - DOT_RADIUS - 3}
                strokeDasharray="2 6"
                strokeLinecap="round"
                strokeOpacity={0.4}
              />
              <path
                className={pathClass}
                style={{ transitionDelay: delay }}
                pathLength={1}
                d={`M ${lane.x} ${newest} L ${lane.x} ${oldest}`}
              />
            </g>
          )
        }

        return (
          <g
            key={`lines-${lane.branch.name}`}
            className={laneClass(lane.branch.name)}
            data-branch={lane.branch.name}
            data-dimmed={isLaneDimmed(lane.branch.name) ? 'true' : undefined}
            data-rail-layer="lines"
            stroke={lane.colour}
            fill="none"
            strokeWidth={2}
          >
            {lane.segments.map((seg, si) => {
              const ownYs = seg.nodes.map((node) => node.y)
              const newest = Math.min(...ownYs)
              const oldest = Math.max(...ownYs)
              return (
                <g key={si}>
                  {seg.mergeTargetY !== undefined ? (
                    /* Merge back into career above the newest commit. */
                    <path
                      className={pathClass}
                      style={{ transitionDelay: delay }}
                      pathLength={1}
                      d={joinPath(lane.x, careerX, newest, seg.mergeTargetY)}
                    />
                  ) : (
                    /* No career row above: the branch is still alive — dashed tip. */
                    <line
                      className={dotClass}
                      style={{ transitionDelay: delay }}
                      x1={lane.x}
                      y1={Math.max(newest - TIP_LENGTH, 4)}
                      x2={lane.x}
                      y2={newest - DOT_RADIUS - 3}
                      strokeDasharray="2 6"
                      strokeLinecap="round"
                      strokeOpacity={0.55}
                    />
                  )}
                  {oldest > newest && (
                    <path
                      className={pathClass}
                      style={{ transitionDelay: delay }}
                      pathLength={1}
                      d={`M ${lane.x} ${newest} L ${lane.x} ${oldest}`}
                    />
                  )}
                  {seg.forkTargetY !== undefined && (
                    <path
                      className={pathClass}
                      style={{ transitionDelay: delay }}
                      pathLength={1}
                      d={joinPath(lane.x, careerX, oldest, seg.forkTargetY)}
                    />
                  )}
                </g>
              )
            })}
          </g>
        )
      })}
      {lanes.map((lane) => {
        if (lane.segments.length === 0) return null

        const hitGeometry = lane.isMain ? (() => {
          const ownYs = lane.segments[0]!.nodes.map((node) => node.y)
          const newest = Math.min(...ownYs)
          const oldest = Math.max(...ownYs)
          return (
            <>
              <line x1={lane.x} y1={HEAD_SIZE * 2 + 3} x2={lane.x} y2={newest - DOT_RADIUS - 3} />
              <path d={`M ${lane.x} ${newest} L ${lane.x} ${oldest}`} />
            </>
          )
        })() : lane.segments.map((seg, si) => {
          const ownYs = seg.nodes.map((node) => node.y)
          const newest = Math.min(...ownYs)
          const oldest = Math.max(...ownYs)
          return (
            <g key={si}>
              {seg.mergeTargetY !== undefined ? (
                <path d={joinPath(lane.x, careerX, newest, seg.mergeTargetY)} />
              ) : (
                <line
                  x1={lane.x}
                  y1={Math.max(newest - TIP_LENGTH, 4)}
                  x2={lane.x}
                  y2={newest - DOT_RADIUS - 3}
                />
              )}
              {oldest > newest && <path d={`M ${lane.x} ${newest} L ${lane.x} ${oldest}`} />}
              {seg.forkTargetY !== undefined && (
                <path d={joinPath(lane.x, careerX, oldest, seg.forkTargetY)} />
              )}
            </g>
          )
        })

        return (
          <g
            key={`hit-${lane.branch.name}`}
            className={css.laneHitArea}
            data-branch={lane.branch.name}
            data-rail-layer="hit"
            fill="none"
            onPointerEnter={() => setHoveredBranch(lane.branch.name)}
            onPointerLeave={() => setHoveredBranch(null)}
          >
            {hitGeometry}
          </g>
        )
      })}
      {lanes.map((lane, index) => {
        if (lane.segments.length === 0) return null
        const delay = laneDelay(index)
        const allNodes = lane.segments.flatMap((segment) => segment.nodes)
        // Trunk commits are solid, slightly larger discs; branch commits are
        // hollow donuts (a bg-filled centre) so the two are easy to tell apart.
        return (
          <g
            key={`dots-${lane.branch.name}`}
            className={laneClass(lane.branch.name)}
            data-branch={lane.branch.name}
            data-dimmed={isLaneDimmed(lane.branch.name) ? 'true' : undefined}
            data-rail-layer="nodes"
            stroke={lane.colour}
            strokeWidth={2.5}
            pointerEvents="none"
          >
            {lane.isMain && (
              /* The trunk's HEAD marker: a distinct hollow diamond at the top. */
              <path
                className={dotClass}
                style={{ transitionDelay: delay, fill: vars.colour.bg }}
                d={diamondPath(lane.x, HEAD_SIZE, HEAD_SIZE)}
              />
            )}
            {allNodes.map(({ id, y }) => {
              const hovered = hoveredCommitId === id
              return (
                <circle
                  key={id}
                  className={`${dotClass} ${hovered ? css.dotHovered : ''}`}
                  data-commit-id={id}
                  data-hovered={hovered ? 'true' : undefined}
                  style={{
                    transitionDelay: reduceMotion ? undefined : `${delay}, 0ms, 0ms`,
                    fill: lane.isMain ? lane.colour : vars.colour.bg
                  }}
                  cx={lane.x}
                  cy={y}
                  r={lane.isMain ? DOT_RADIUS + 1 : DOT_RADIUS}
                />
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
