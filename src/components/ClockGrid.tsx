import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { vars } from '../styles/theme.css'
import * as css from './ClockGrid.css'

/**
 * A miniature of the clocks project's trick: a field of analog clock faces
 * whose hands sweep, decelerate and settle into a picture. Here they spell
 * TOM in 3×5 / 5×5 pixel letters (13×5 clocks — the smallest grid that keeps
 * the M honest), one branch-lane colour per letter.
 *
 * "On" clocks settle with both hands opposed (NE + SW), drawing a full
 * diagonal through the face; "off" clocks park both hands quietly at NW.
 * Like the real project, the choreography is hand-rolled
 * requestAnimationFrame — each hand eases out through whole extra
 * revolutions, so it settles travelling in the direction it was already
 * spinning. Reduced motion renders the finished word.
 */

const LETTERS: { rows: string[]; colour: string }[] = [
  { rows: ['XXX', '.X.', '.X.', '.X.', '.X.'], colour: vars.colour.lane.career },
  { rows: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], colour: vars.colour.lane.oss },
  { rows: ['X...X', 'XX.XX', 'X.X.X', 'X...X', 'X...X'], colour: vars.colour.lane.languages }
]

const ROWS = 5

interface Cell {
  on: boolean
  colour: string
  /** Final angles (degrees clockwise, 0 = 3 o'clock) for each hand. */
  targetA: number
  targetB: number
  startA: number
  startB: number
  /** Extra whole revolutions before settling. */
  spinsA: number
  spinsB: number
  delay: number
  duration: number
}

const buildCells = (): Cell[] => {
  // Stitch the letters into rows with a one-column gap between them.
  const gridRows = Array.from({ length: ROWS }, (_, row) =>
    LETTERS.map((letter) => letter.rows[row]!.split('').map((ch) => ({ on: ch === 'X', colour: letter.colour }))).reduce(
      (acc, cols) => (acc.length === 0 ? cols : [...acc, { on: false, colour: '' }, ...cols]),
      [] as { on: boolean; colour: string }[]
    )
  )

  return gridRows.flat().map((pixel, index) => ({
    on: pixel.on,
    colour: pixel.on ? pixel.colour : '',
    // On: hands opposed on the NE–SW diagonal. Off: both parked NW.
    targetA: pixel.on ? 315 : 225,
    targetB: pixel.on ? 135 : 225,
    // Deterministic pseudo-random starts/spins so every expansion looks alive
    // but renders identically (and tests stay stable).
    startA: (index * 137) % 360,
    startB: (index * 223 + 90) % 360,
    spinsA: 1 + ((index * 7) % 2),
    spinsB: 1 + ((index * 11) % 2),
    delay: (index % 13) * 45 + ((index * 13) % 5) * 55,
    duration: 1700 + ((index * 29) % 800)
  }))
}

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
        const a = cell.startA + sweep(cell.startA, cell.targetA, cell.spinsA) * eased
        const b = cell.startB + sweep(cell.startB, cell.targetB, cell.spinsB) * eased
        handRefs.current[index * 2]?.style.setProperty('transform', `rotate(${a}deg)`)
        handRefs.current[index * 2 + 1]?.style.setProperty('transform', `rotate(${b}deg)`)
      })
      if (!settled) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return (
    <div className={css.grid} aria-hidden="true">
      {CELLS.map((cell, index) => {
        const handColour = cell.on ? cell.colour : vars.colour.line
        const initialA = reduceMotion ? cell.targetA : cell.startA
        const initialB = reduceMotion ? cell.targetB : cell.startB
        return (
          <span key={index} className={css.face}>
            <span
              ref={(el) => {
                handRefs.current[index * 2] = el
              }}
              className={css.hand}
              style={{ backgroundColor: handColour, transform: `rotate(${initialA}deg)` }}
            />
            <span
              ref={(el) => {
                handRefs.current[index * 2 + 1] = el
              }}
              className={css.hand}
              style={{ backgroundColor: handColour, transform: `rotate(${initialB}deg)` }}
            />
          </span>
        )
      })}
    </div>
  )
}
