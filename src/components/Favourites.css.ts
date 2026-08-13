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

export const row = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '1.5rem',
  '@media': {
    'screen and (max-width: 860px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
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

/**
 * Bespoke artwork when there is any; otherwise the opening book's jacket,
 * cropped to the same band so the row stays even either way.
 */
export const artwork = style({
  position: 'relative',
  // Bespoke artwork is a landscape band; the jacket fallback overrides this
  // with the ratio that makes its covers fit flush and uncropped.
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
 * The stand-in until bespoke artwork arrives: the jackets of the run, filling
 * the band edge to edge. Equal columns whatever the count, each jacket cropped
 * to fill its share rather than letterboxed inside it — a row of floating
 * thumbnails reads as a gallery, a flush band reads as one piece of artwork.
 */
export const jackets = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  width: '100%',
  height: '100%'
})

export const jacket = style({
  width: '100%',
  height: '100%',
  // `cover` still, as a guard: a jacket that isn't quite 2:3 fills its column
  // rather than leaving a gap in the band.
  objectFit: 'cover'
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
