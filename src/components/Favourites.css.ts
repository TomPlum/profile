import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const section = style({
  marginTop: '2.5rem'
})

export const heading = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colour.inkFaint,
  paddingBottom: '0.75rem',
  borderBottom: `1px solid ${vars.colour.line}`,
  marginBottom: '1.25rem'
})

/** One column per favourite, so the band never leaves an orphan on its own row. */
export const row = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '1.25rem',
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '1.5rem'
    },
    'screen and (max-width: 560px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: '1.75rem'
    }
  }
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0
})

/** Bespoke artwork, when a series has any: one landscape band. */
export const artwork = style({
  position: 'relative',
  aspectRatio: '3 / 2',
  overflow: 'hidden',
  borderRadius: '8px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.inset
})

export const artworkImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 32%',
  display: 'block'
})

/**
 * The stand-in until bespoke artwork arrives: the jackets of the run, stood
 * side by side in equal columns. Each keeps a book's own 2:3 so nothing is
 * trimmed, and the row's height follows from that rather than being imposed.
 */
export const jackets = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  gap: '0.5rem',
  width: '100%',
  // Room for the tilt to lean out of the row without clipping its neighbours.
  perspective: '700px'
})

/**
 * A jacket that leans toward the pointer. The rotation and the highlight's
 * origin both come from where the cursor is inside the card, set as CSS custom
 * properties on mouse move — cheap enough to do without animation frames, and
 * it reads as picking a book up rather than as a hover state.
 */
export const jacket = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  aspectRatio: '2 / 3',
  borderRadius: '3px',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  transform:
    'perspective(700px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(var(--tilt-scale, 1))',
  transition: 'transform 320ms cubic-bezier(0.2, 0.8, 0.3, 1), box-shadow 320ms ease',
  boxShadow: '0 1px 3px rgb(0 0 0 / 0.18)',
  selectors: {
    '&[data-lifted="true"]': {
      transition: 'transform 80ms linear, box-shadow 320ms ease',
      boxShadow: '0 18px 34px rgb(0 0 0 / 0.34)',
      zIndex: 1
    }
  },
  '@media': {
    // A tilt is motion; the highlight below goes with it.
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      transition: 'none'
    }
  }
})

export const jacketImage = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

/**
 * The shimmer: a soft specular highlight tracking the pointer, plus a fixed
 * diagonal sheen so the card still catches light when the cursor is dead
 * centre. Screen blending keeps it as light on the artwork rather than a grey
 * film over it.
 */
export const shimmer = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 260ms ease',
  mixBlendMode: 'screen',
  backgroundImage: [
    'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgb(255 255 255 / 0.45), rgb(255 255 255 / 0) 55%)',
    'linear-gradient(105deg, rgb(255 255 255 / 0) 40%, rgb(255 255 255 / 0.22) 50%, rgb(255 255 255 / 0) 60%)'
  ].join(','),
  backgroundBlendMode: 'screen',
  selectors: {
    '[data-lifted="true"] &': {
      opacity: 1
    }
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      display: 'none'
    }
  }
})

export const name = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 40, 'WONK' 1",
  fontSize: '1.15rem',
  fontWeight: 600,
  lineHeight: 1.2,
  color: vars.colour.ink,
  marginTop: '0.75rem'
})

export const author = style({
  fontSize: '0.9rem',
  color: vars.colour.inkMuted,
  marginTop: '0.1rem'
})

/**
 * Five outlined stars with a filled row clipped over them, so 4.8 of 5 shows
 * as four and four-fifths rather than rounding up to a full house. Plain ink,
 * no gold: the rating is a fact, not a badge.
 */
/** Stars and the figure they stand for, on one line. */
export const rating = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '0.5rem'
})

export const ratingNote = style({
  fontFamily: vars.font.mono,
  fontSize: '0.7rem',
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums'
})

export const stars = style({
  position: 'relative',
  display: 'inline-block',
  // The card is a flex column, which stretches its children — without this the
  // span is as wide as the card and the fill percentage below is measured
  // against the wrong box, so every rating renders as a full five.
  alignSelf: 'flex-start',
  lineHeight: 0
})

export const starsFill = style({
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
  lineHeight: 0
})

export const star = style({
  display: 'block',
  color: vars.colour.ink
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: '0.7rem',
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums',
  marginTop: '0.45rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.1rem 0.5rem'
})

/**
 * A line from the books themselves. Set in Fraunces italic with the display
 * axes wound up — the one place on this page the type is allowed to perform.
 */
export const quote = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 24, 'SOFT' 40, 'WONK' 1",
  fontStyle: 'italic',
  fontSize: '1rem',
  lineHeight: 1.4,
  color: vars.colour.ink,
  marginTop: '0.7rem',
  paddingLeft: '0.8rem',
  borderLeft: `2px solid ${vars.colour.line}`
})

export const quoteSource = style({
  display: 'block',
  fontFamily: vars.font.mono,
  fontSize: '0.66rem',
  fontStyle: 'normal',
  letterSpacing: '0.02em',
  color: vars.colour.inkFaint,
  marginTop: '0.4rem'
})

export const blurb = style({
  fontSize: '0.92rem',
  lineHeight: 1.55,
  color: vars.colour.inkMuted,
  marginTop: '0.6rem'
})
