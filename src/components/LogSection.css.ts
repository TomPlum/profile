import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const section = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '0 clamp(1rem, 4vw, 2rem) clamp(3rem, 8vh, 5rem)'
})

export const command = style({
  fontFamily: vars.font.mono,
  fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)',
  fontWeight: 600,
  color: vars.colour.ink,
  display: 'inline-flex',
  alignItems: 'center',
  maxWidth: '100%',
  padding: '0.62rem 0.8rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.inset,
  boxShadow: `inset 0 1px 0 ${vars.colour.surface}`,
  marginBottom: '0.8rem',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 760px)': {
      display: 'flex',
      width: '100%'
    }
  }
})

export const prompt = style({
  color: vars.colour.accent,
  marginRight: '0.5em',
  userSelect: 'none'
})

export const caption = style({
  fontSize: '0.98rem',
  lineHeight: 1.6,
  color: vars.colour.inkMuted,
  maxWidth: '58ch',
  marginBottom: '1.5rem'
})

export const filters = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.45rem',
  marginBottom: '1.75rem'
})

export const filterChip = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45em',
  padding: '0.45rem 0.8rem',
  borderRadius: '999px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: 'transparent',
  color: vars.colour.inkMuted,
  cursor: 'pointer',
  transition: 'border-color 150ms ease, color 150ms ease, background-color 150ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.colour.ink,
      color: vars.colour.ink
    },
    '&[aria-pressed="true"]': {
      borderColor: 'currentcolor',
      backgroundColor: vars.colour.surface,
      color: vars.colour.ink,
      fontWeight: 600
    }
  }
})

export const laneDot = style({
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  border: '2px solid currentcolor',
  display: 'inline-block',
  flexShrink: 0
})

export const count = style({
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums'
})
