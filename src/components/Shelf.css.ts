import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

/**
 * Set per spine from the book's page count, and a per-spine height wobble so a
 * shelf reads as books rather than as a bar chart. Plain custom properties
 * rather than `createVar`, matching how `--lane` is passed elsewhere.
 */
export const SPINE_WIDTH = '--spine-w'
export const SPINE_HEIGHT = '--spine-h'

export const board = style({
  position: 'relative',
  marginBottom: '2.5rem'
})

export const boardHead = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '0.5rem'
})

export const boardAuthor = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 40, 'WONK' 1",
  fontSize: '1.05rem',
  fontWeight: 600,
  color: vars.colour.ink
})

export const boardMeta = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap'
})

/**
 * The board itself: spines stand on a baseline rule, with the row scrolling
 * sideways rather than wrapping — a wrapped shelf reads as a bar chart, and
 * the length of the Sanderson run is the information.
 */
export const shelfRow = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '2px',
  // A fixed height, not a minimum: the spines size themselves as a percentage
  // of the board, and a long title must clip rather than stretch the shelf.
  height: '11rem',
  padding: '0 0.25rem',
  borderBottom: `3px solid ${vars.colour.line}`,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'thin',
  '@media': {
    'screen and (max-width: 640px)': {
      height: '8.5rem'
    }
  }
})

export const spine = style({
  vars: {
    [SPINE_WIDTH]: '20px',
    [SPINE_HEIGHT]: '92%'
  },
  position: 'relative',
  flexShrink: 0,
  width: `var(${SPINE_WIDTH})`,
  height: `var(${SPINE_HEIGHT})`,
  minHeight: '4.5rem',
  padding: '0.55rem 0 0.35rem',
  border: `1px solid ${vars.colour.line}`,
  borderBottom: 'none',
  borderRadius: '3px 3px 0 0',
  cursor: 'pointer',
  overflow: 'hidden',
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 9",
  fontSize: '0.6rem',
  lineHeight: 1,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  textAlign: 'start',
  color: vars.colour.ink,
  transition: 'transform 160ms ease, box-shadow 160ms ease',
  selectors: {
    // Pulling a book half out of the shelf.
    '&:hover, &:focus-visible': {
      transform: 'translateY(-10px)',
      boxShadow: `0 6px 14px rgb(0 0 0 / 0.18)`,
      outline: 'none'
    },
    '&[aria-pressed="true"]': {
      transform: 'translateY(-10px)',
      boxShadow: `0 6px 14px rgb(0 0 0 / 0.22)`
    },
    // The head band: the only place the lane colour runs at full strength.
    // Physical left/right, not `inset-inline` — the spine is in a vertical
    // writing mode, where the inline axis runs top-to-bottom and a logical
    // inset would collapse the band to nothing.
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '6px',
      backgroundColor: vars.colour.lane.languages
    }
  }
})

/**
 * Rating drives both the fill and the strength of the head band. The fill
 * alone can't carry it — it has to stay pale enough for ink lettering to keep
 * WCAG AA on top of it (see `spineRamp`), which leaves the rungs close
 * together. The band has no text on it, so it can run the full range.
 * Unrated books stay bare and dashed, which is honest.
 */
export const spineRating = styleVariants({
  five: { backgroundColor: vars.colour.spine.five },
  four: {
    backgroundColor: vars.colour.spine.four,
    selectors: { '&::before': { opacity: 0.7 } }
  },
  three: {
    backgroundColor: vars.colour.spine.three,
    selectors: { '&::before': { opacity: 0.45 } }
  },
  low: {
    backgroundColor: vars.colour.spine.low,
    selectors: { '&::before': { opacity: 0.25 } }
  },
  none: {
    backgroundColor: vars.colour.surface,
    borderStyle: 'dashed',
    selectors: { '&::before': { opacity: 0.12 } }
  }
})

export const spineLabel = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxHeight: '100%'
})

/** Books too thin to letter still need an accessible name. */
export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0
})
