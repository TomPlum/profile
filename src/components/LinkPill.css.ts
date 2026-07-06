import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const pill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5em',
  fontFamily: vars.font.mono,
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  color: vars.colour.ink,
  textDecoration: 'none',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '999px',
  padding: '0.42rem 0.85rem',
  backgroundColor: vars.colour.surface,
  transition: 'border-color 150ms ease, color 150ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.colour.accent,
      color: vars.colour.accent
    }
  }
})

export const iconImage = style({
  display: 'block',
  flexShrink: 0
})

export const externalIcon = style({
  opacity: 0.55,
  flexShrink: 0
})
