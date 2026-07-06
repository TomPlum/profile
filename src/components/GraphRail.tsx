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
}

const DOT_RADIUS = 5
const TIP_LENGTH = 34
const FORK_CURVE = 36
/** The main trunk's HEAD marker sits this far below the top of the graph. */
const HEAD_PAD = 20
const HEAD_SIZE = 6

const diamondPath = (cx: number, cy: number, d: number): string =>
  `M ${cx} ${cy - d} L ${cx + d} ${cy} L ${cx} ${cy + d} L ${cx - d} ${cy} Z`

interface Lane {
  branch: Branch
  x: number
  colour: string
  ys: number[]
  /** Career row this branch forks off at its oldest (lower) end. */
  forkTargetY?: number
  /** Career row this branch merges back into at its newest (upper) end. */
  mergeTargetY?: number
}

const buildLanes = (commits: Commit[], branches: Branch[], ys: Record<string, number>, geometry: RailGeometry): Lane[] => {
  const laneX = (index: number) => geometry.laneX0 + index * geometry.laneGap
  const careerVisible = branches.some((b) => b.name === 'career')
  const careerYs = commits
    .filter((c) => c.branch === 'career')
    .flatMap((c) => (ys[c.id] === undefined ? [] : [ys[c.id]!]))

  return branches.map((branch, index) => {
    const own = commits.filter((c) => c.branch === branch.name).flatMap((c) => (ys[c.id] === undefined ? [] : [ys[c.id]!]))
    const lane: Lane = {
      branch,
      x: laneX(index),
      colour: vars.colour.lane[branch.lane],
      ys: own
    }

    if (branch.name !== 'career' && careerVisible && own.length > 0) {
      const oldest = Math.max(...own)
      const newest = Math.min(...own)
      // Fork off career just below the oldest commit (the next career row down).
      lane.forkTargetY = careerYs.filter((y) => y > oldest).sort((a, b) => a - b)[0]
      // Merge back into career just above the newest commit (the next career row
      // up). If there's no career row above, the branch is still open — leave it
      // to draw a dashed "still alive" tip instead.
      lane.mergeTargetY = careerYs.filter((y) => y < newest).sort((a, b) => b - a)[0]
    }

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
export const GraphRail = ({ commits, branches, ys, height, geometry }: GraphRailProps) => {
  const reduceMotion = useReducedMotion() ?? false
  const svgRef = useRef<SVGSVGElement>(null)
  const [inView, setInView] = useState(false)
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

  // Rendered in two passes so every node sits above every line: a lane's own
  // through-line and other lanes' fork/merge curves would otherwise paint over
  // neighbouring dots. The nodes are donuts whose centres are filled with the
  // page background, so the line is hidden inside the ring rather than showing
  // through the gap.
  return (
    <svg ref={svgRef} className={css.rail} width={geometry.width} height={height} aria-hidden="true" focusable="false">
      {lanes.map((lane, index) => {
        if (lane.ys.length === 0) return null
        const newest = Math.min(...lane.ys)
        const oldest = Math.max(...lane.ys)
        const delay = laneDelay(index)
        const isMain = lane.branch.name === 'career'
        // The main branch is the trunk. Its commits carry a solid line down to
        // the root; above the newest commit a faint dashed line reaches up to a
        // distinct HEAD marker near the top (see the dots pass).
        if (isMain) {
          return (
            <g key={`lines-${lane.branch.name}`} stroke={lane.colour} fill="none" strokeWidth={2.5}>
              <line
                className={dotClass}
                style={{ transitionDelay: delay }}
                x1={lane.x}
                y1={HEAD_PAD + HEAD_SIZE + 4}
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
          <g key={`lines-${lane.branch.name}`} stroke={lane.colour} fill="none" strokeWidth={2}>
            {lane.mergeTargetY !== undefined ? (
              /* Merge back into career above the newest commit. */
              <path
                className={pathClass}
                style={{ transitionDelay: delay }}
                pathLength={1}
                d={joinPath(lane.x, careerX, newest, lane.mergeTargetY)}
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
            {lane.forkTargetY !== undefined && (
              <path
                className={pathClass}
                style={{ transitionDelay: delay }}
                pathLength={1}
                d={joinPath(lane.x, careerX, oldest, lane.forkTargetY)}
              />
            )}
          </g>
        )
      })}
      {lanes.map((lane, index) => {
        if (lane.ys.length === 0) return null
        const delay = laneDelay(index)
        const isMain = lane.branch.name === 'career'
        // Trunk commits are solid, slightly larger discs; branch commits are
        // hollow donuts (a bg-filled centre) so the two are easy to tell apart.
        return (
          <g key={`dots-${lane.branch.name}`} stroke={lane.colour} strokeWidth={2.5}>
            {isMain && (
              /* The trunk's HEAD marker: a distinct hollow diamond at the top. */
              <path
                className={dotClass}
                style={{ transitionDelay: delay, fill: vars.colour.bg }}
                d={diamondPath(lane.x, HEAD_PAD, HEAD_SIZE)}
              />
            )}
            {lane.ys.map((y) => (
              <circle
                key={y}
                className={dotClass}
                style={{ transitionDelay: delay, fill: isMain ? lane.colour : vars.colour.bg }}
                cx={lane.x}
                cy={y}
                r={isMain ? DOT_RADIUS + 1 : DOT_RADIUS}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
