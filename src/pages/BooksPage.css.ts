import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const page = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(1.5rem, 5vh, 3rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 8vh, 5rem)'
})

/** With no display title above the wall, this carries the page on its own. */
export const command = style({
  fontFamily: vars.font.mono,
  fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)',
  fontWeight: 600,
  color: vars.colour.ink,
  marginBottom: '0.5rem'
})

export const prompt = style({
  color: vars.colour.accent,
  marginRight: '0.5em',
  userSelect: 'none'
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

export const stats = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem 2.75rem',
  marginTop: '2rem',
  paddingTop: '1.5rem',
  borderTop: `1px solid ${vars.colour.line}`
})

export const stat = style({
  display: 'flex',
  // Reversed so the markup can stay <dt> then <dd> while the number reads first.
  flexDirection: 'column-reverse',
  gap: '0.15rem'
})

export const statNumber = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 60, 'WONK' 1",
  fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: '-0.02em',
  color: vars.colour.ink,
  fontVariantNumeric: 'tabular-nums'
})

export const statLabel = style({
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: vars.colour.inkFaint
})

/** Filters on the left, view switch on the right; stacked on narrow screens. */
export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem 1.5rem',
  marginTop: '2rem'
})

export const filters = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.45rem'
})


