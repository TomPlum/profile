import { style } from '@vanilla-extract/css'

export const rail = style({
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'none'
})

export const lane = style({
  opacity: 1,
  transition: 'opacity 180ms ease'
})

export const laneDimmed = style({
  opacity: 0.16
})

/** A forgiving invisible stroke over each visible lane path. */
export const laneHitArea = style({
  pointerEvents: 'stroke',
  stroke: 'transparent',
  strokeWidth: 12,
  cursor: 'default'
})

/** Paths are normalised with pathLength=1 and drawn in by shrinking the dash offset. */
export const path = style({
  strokeDasharray: 1,
  strokeDashoffset: 1,
  transition: 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)'
})

export const pathDrawn = style({
  strokeDashoffset: 0
})

export const dot = style({
  opacity: 0,
  transformBox: 'fill-box',
  transformOrigin: 'center',
  transition: 'opacity 500ms ease, transform 150ms ease, stroke-width 150ms ease'
})

export const dotDrawn = style({
  opacity: 1
})

export const dotHovered = style({
  transform: 'scale(1.4)',
  strokeWidth: 3.5
})

export const instant = style({
  transition: 'none'
})
