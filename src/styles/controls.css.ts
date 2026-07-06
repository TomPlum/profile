import { style } from '@vanilla-extract/css'
import { vars } from './theme.css'

/** Buttons and chips are set in mono — the "machine" voice of the site. */
const buttonBase = style({
  fontFamily: vars.font.mono,
  fontSize: '0.75rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45em',
  padding: '0.55rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid transparent',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease'
})

export const buttonPrimary = style([
  buttonBase,
  {
    backgroundColor: vars.colour.accent,
    borderColor: vars.colour.accent,
    color: vars.colour.accentInk,
    selectors: {
      '&:hover': {
        backgroundColor: vars.colour.ink,
        borderColor: vars.colour.ink,
        color: vars.colour.bg
      }
    }
  }
])

export const buttonGhost = style([
  buttonBase,
  {
    backgroundColor: 'transparent',
    borderColor: vars.colour.line,
    color: vars.colour.ink,
    selectors: {
      '&:hover': {
        borderColor: vars.colour.ink
      }
    }
  }
])

export const chip = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  padding: '0.2rem 0.55rem',
  borderRadius: '6px',
  backgroundColor: vars.colour.inset,
  color: vars.colour.ink,
  whiteSpace: 'nowrap'
})

export const monoLink = style({
  fontFamily: vars.font.mono,
  fontSize: '0.8rem',
  color: vars.colour.ink,
  textDecorationThickness: '1px',
  textUnderlineOffset: '3px',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  }
})
