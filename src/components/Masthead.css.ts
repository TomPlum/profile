import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const masthead = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(3rem, 8vh, 5.5rem) clamp(1rem, 4vw, 2rem) clamp(2.5rem, 6vh, 4rem)'
})

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: '0.8rem',
  color: vars.colour.inkMuted,
  marginBottom: '1.4rem',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: '0.6rem',
  rowGap: '0.35rem'
})

export const eyebrowDivider = style({
  color: vars.colour.inkFaint,
  userSelect: 'none'
})

export const name = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 144, 'SOFT' 0, 'WONK' 1",
  fontWeight: 540,
  fontSize: 'clamp(2.9rem, 9.5vw, 5.9rem)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  color: vars.colour.ink,
  textWrap: 'balance',
  marginBottom: '1.1rem'
})

export const roleLine = style({
  fontFamily: vars.font.display,
  fontStyle: 'italic',
  fontVariationSettings: "'opsz' 40",
  fontSize: 'clamp(1.25rem, 3.4vw, 1.7rem)',
  fontWeight: 480,
  color: vars.colour.ink,
  marginBottom: '1.4rem'
})

export const companyLink = style({
  color: vars.colour.accent,
  textDecorationThickness: '1px',
  textUnderlineOffset: '4px',
  selectors: {
    '&:hover': {
      color: vars.colour.ink
    }
  }
})

export const value = style({
  maxWidth: '58ch',
  fontSize: '1.1rem',
  lineHeight: 1.65,
  color: vars.colour.inkMuted,
  marginBottom: '1.8rem'
})

export const stackRow = style({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.6rem'
})

/** Core-stack pill with its brand icon inline before the label. */
export const techChip = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.42em',
  padding: '0.28rem 0.6rem 0.28rem 0.5rem',
  borderRadius: '7px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.surface,
  color: vars.colour.ink,
  whiteSpace: 'nowrap'
})

export const techIcon = style({
  fontSize: '1.05em',
  display: 'inline-flex'
})

export const linksRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: '1.1rem',
  rowGap: '0.5rem',
  marginBottom: '1.2rem'
})

export const currently = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  color: vars.colour.inkFaint
})
