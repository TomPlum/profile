import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import * as css from './ClockGrid.css'

/**
 * A miniature of the clocks project's trick: a field of analog clock faces
 * whose hands sweep, decelerate and settle into a picture — here, TOM.
 *
 * Like a digital clock's segments, every hand settles at 12, 3, 6 or
 * 9 o'clock, so each face shows a straight line or a right angle. Faces that
 * aren't part of a letter park at 9 and 3 (one straight horizontal line);
 * the letters emerge from the corners and verticals that break that field.
 * Each face has a shorter hour hand and a longer minute hand, all in one
 * colour (the card's lane colour).
 *
 * The choreography is hand-rolled requestAnimationFrame, true to the
 * project: every hand spins through whole extra revolutions and eases out
 * into its target, always settling in its direction of travel. Reduced
 * motion renders the finished word.
 */

/** Hand angles in degrees clockwise where 0 = 3 o'clock (pointing right). */
type Hands = [hour: number, minute: number]

/** The resting pose for faces outside the letters: a 9-to-3 horizontal. */
const OFF: Hands = [180, 0]

// Letters as 3×3 faces. ┌ = [90, 0], ┐ = [90, 180], └ = [270, 0],
// ┘ = [270, 180], │ = [270, 90], ─ = [180, 0].
const T: (Hands | null)[][] = [
  [[0, 0], [180, 0], [180, 180]], // ╶ ─ ╴  end caps mark the bar's extent
  [null, [270, 90], null],
  [null, [270, 90], null]
]

const O: (Hands | null)[][] = [
  [[90, 0], [180, 0], [90, 180]],
  [[270, 90], null, [270, 90]],
  [[270, 0], [180, 0], [270, 180]]
]

const M: (Hands | null)[][] = [
  [[90, 0], [180, 0], [90, 180]],
  [[270, 90], [270, 90], [270, 90]],
  [[270, 90], [270, 270], [270, 90]] // centre stem stops short, like an M
]

const ROWS = 3

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

const buildCells = (): Cell[] => {
  // Stitch the letters into rows with a one-column gap between them.
  const gridRows = Array.from({ length: ROWS }, (_, row) =>
    [T, O, M]
      .map((letter) => letter[row]!)
      .reduce((acc, cols) => (acc.length === 0 ? cols : [...acc, null, ...cols]), [] as (Hands | null)[])
  )

  return gridRows.flat().map((hands, index) => {
    const [targetHour, targetMinute] = hands ?? OFF
    return {
      targetHour,
      targetMinute,
      // Deterministic pseudo-random starts/spins so every expansion looks
      // alive but renders identically (and tests stay stable).
      startHour: (index * 137) % 360,
      startMinute: (index * 223 + 90) % 360,
      spinsHour: 1 + ((index * 7) % 2),
      spinsMinute: 1 + ((index * 11) % 2),
      delay: (index % 11) * 50 + ((index * 13) % 5) * 55,
      duration: 1700 + ((index * 29) % 800)
    }
  })
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
