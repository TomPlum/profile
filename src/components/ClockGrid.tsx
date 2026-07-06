import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import * as css from './ClockGrid.css'

/**
 * A miniature of the clocks project's trick: a field of analog clock faces
 * whose hands sweep, decelerate and settle into a picture — here, TOM.
 *
 * Rendered the way the real ClockClock displays draw type: every letter
 * stroke is two clocks thick, and the clocks trace the stroke's *outline* —
 * each face's two hands point at the previous and next cell of a closed
 * loop around the letter, so straights read as lines through the face and
 * corners as right angles. Faces outside the letters align with a swirling
 * field (each points along the tangent of its radius from the grid centre),
 * and a one-clock ring of that field pads the whole grid.
 *
 * The choreography is hand-rolled requestAnimationFrame, true to the
 * project: every hand spins through whole extra revolutions and eases out
 * into its target, always settling in its direction of travel. Reduced
 * motion renders the finished word.
 */

/** A closed loop of [row, col] cells; hands point at loop neighbours. */
type Loop = [row: number, col: number][]

// T: a 2×6 bar with a 2-wide stem — one loop around the polyomino.
const T_LOOP: Loop = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 5], [1, 4], [1, 3],
  [2, 3], [3, 3], [4, 3], [5, 3],
  [5, 2], [4, 2], [3, 2], [2, 2],
  [1, 2], [1, 1], [1, 0]
]

// O: a 4×6 ring — the outer edge and the inner hole are separate loops.
const O_OUTER: Loop = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
  [5, 2], [5, 1], [5, 0],
  [4, 0], [3, 0], [2, 0], [1, 0]
]
const O_INNER: Loop = [
  [1, 1], [1, 2], [2, 2], [3, 2], [4, 2], [4, 1], [3, 1], [2, 1]
]

// M: a 2×8 bar with three 2-wide legs (blocky m) — one loop.
const M_LOOP: Loop = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 7], [2, 7], [3, 7], [4, 7], [5, 7],
  [5, 6], [4, 6], [3, 6], [2, 6],
  [1, 6], [1, 5], [1, 4],
  [2, 4], [3, 4], [4, 4], [5, 4],
  [5, 3], [4, 3], [3, 3], [2, 3],
  [1, 3], [1, 2], [1, 1],
  [2, 1], [3, 1], [4, 1], [5, 1],
  [5, 0], [4, 0], [3, 0], [2, 0], [1, 0]
]

/** Letters and the text column each starts at (1-col gaps between them). */
const LETTERS: { loops: Loop[]; at: number }[] = [
  { loops: [T_LOOP], at: 0 },
  { loops: [O_OUTER, O_INNER], at: 7 },
  { loops: [M_LOOP], at: 12 }
]

const TEXT_COLS = 20
const TEXT_ROWS = 6
const PAD = 1
const COLS = TEXT_COLS + PAD * 2
const ROWS = TEXT_ROWS + PAD * 2

/** Angle (degrees clockwise, 0 = 3 o'clock) from a cell to a neighbour. */
const directionOf = (from: [number, number], to: [number, number]) => {
  if (to[1] > from[1]) return 0 // east
  if (to[0] > from[0]) return 90 // south
  if (to[1] < from[1]) return 180 // west
  return 270 // north
}

const buildTargets = (): Map<number, [number, number]> => {
  const targets = new Map<number, [number, number]>()
  LETTERS.forEach((letter) => {
    letter.loops.forEach((loop) => {
      loop.forEach((cell, index) => {
        const prev = loop[(index - 1 + loop.length) % loop.length]!
        const next = loop[(index + 1) % loop.length]!
        const row = cell[0] + PAD
        const col = cell[1] + letter.at + PAD
        targets.set(row * COLS + col, [directionOf(cell, prev), directionOf(cell, next)])
      })
    })
  })
  return targets
}

const LETTER_TARGETS = buildTargets()

/** Field cells align with the tangent of their radius from the grid centre. */
const fieldAngle = (row: number, col: number) => {
  const angle = (Math.atan2(row - (ROWS - 1) / 2, col - (COLS - 1) / 2) * 180) / Math.PI + 90
  return (angle + 360) % 360
}

interface Cell {
  targetHour: number
  targetMinute: number
  startHour: number
  startMinute: number
  /** Extra whole revolutions before settling. */
  spinsHour: number
  spinsMinute: number
  delay: number
  duration: number
}

const buildCells = (): Cell[] =>
  Array.from({ length: ROWS * COLS }, (_, index) => {
    const letter = LETTER_TARGETS.get(index)
    const field = fieldAngle(Math.floor(index / COLS), index % COLS)
    const [targetHour, targetMinute] = letter ?? [field, field]
    return {
      targetHour,
      targetMinute,
      // Deterministic pseudo-random starts/spins so every expansion looks
      // alive but renders identically (and tests stay stable).
      startHour: (index * 137) % 360,
      startMinute: (index * 223 + 90) % 360,
      spinsHour: 1 + ((index * 7) % 2),
      spinsMinute: 1 + ((index * 11) % 2),
      delay: (index % COLS) * 40 + ((index * 13) % 5) * 50,
      duration: 1700 + ((index * 29) % 800)
    }
  })

const CELLS = buildCells()

/** Total sweep for one hand: extra revolutions plus the arc to the target. */
const sweep = (start: number, target: number, spins: number) => spins * 360 + ((target - start + 360) % 360)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const ClockGrid = () => {
  const reduceMotion = useReducedMotion() ?? false
  const handRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return

    const begin = performance.now()
    let raf: number

    const tick = (now: number) => {
      let settled = true
      CELLS.forEach((cell, index) => {
        const t = Math.min(1, Math.max(0, (now - begin - cell.delay) / cell.duration))
        if (t < 1) settled = false
        const eased = easeOutCubic(t)
        const hour = cell.startHour + sweep(cell.startHour, cell.targetHour, cell.spinsHour) * eased
        const minute = cell.startMinute + sweep(cell.startMinute, cell.targetMinute, cell.spinsMinute) * eased
        handRefs.current[index * 2]?.style.setProperty('transform', `rotate(${hour}deg)`)
        handRefs.current[index * 2 + 1]?.style.setProperty('transform', `rotate(${minute}deg)`)
      })
      if (!settled) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return (
    <div className={css.grid} aria-hidden="true">
      {CELLS.map((cell, index) => (
        <span key={index} className={css.face}>
          <span
            ref={(el) => {
              handRefs.current[index * 2] = el
            }}
            className={css.handHour}
            style={{ transform: `rotate(${reduceMotion ? cell.targetHour : cell.startHour}deg)` }}
          />
          <span
            ref={(el) => {
              handRefs.current[index * 2 + 1] = el
            }}
            className={css.handMinute}
            style={{ transform: `rotate(${reduceMotion ? cell.targetMinute : cell.startMinute}deg)` }}
          />
        </span>
      ))}
    </div>
  )
}
