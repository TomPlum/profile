import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const page = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(1.5rem, 5vh, 3rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 8vh, 5rem)'
})

export const title = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 96, 'WONK' 1",
  fontSize: 'clamp(2.1rem, 7vw, 3.2rem)',
  fontWeight: 600,
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  color: vars.colour.ink
})

export const command = style({
  fontFamily: vars.font.mono,
  fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
  color: vars.colour.inkMuted,
  marginBottom: '0.9rem'
})

export const prompt = style({
  color: vars.colour.accent,
  marginRight: '0.5em',
  userSelect: 'none'
})

export const intro = style({
  fontSize: '1.02rem',
  lineHeight: 1.65,
  color: vars.colour.inkMuted,
  maxWidth: '58ch',
  marginTop: '0.9rem'
})

export const back = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  color: vars.colour.inkMuted,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em',
  marginTop: '2.5rem',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  }
})

export const shelves = style({
  marginTop: '2.5rem'
})

/**
 * The key sits with the wall it explains — without it the rating tint is just
 * decoration, and a reader has no way to know the widths mean anything.
 */
export const key = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.4rem 1.1rem',
  marginTop: '1.5rem',
  paddingTop: '1rem',
  borderTop: `1px solid ${vars.colour.line}`,
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  color: vars.colour.inkFaint
})

export const keyItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45em'
})

export const keySwatch = style({
  display: 'inline-block',
  width: '0.7rem',
  height: '1.1rem',
  borderRadius: '2px 2px 0 0',
  border: `1px solid ${vars.colour.line}`,
  borderTop: `3px solid ${vars.colour.lane.languages}`
})
