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

/**
 * The pill toggle used by both the log's branch filter and the shelf's — one
 * definition so the two pages can't drift apart on the same control.
 */
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

/**
 * A segmented toggle: one bordered track holding mutually exclusive options,
 * so the choice reads as one control rather than two loose chips.
 */
export const segmented = style({
  display: 'inline-flex',
  gap: '2px',
  padding: '2px',
  borderRadius: '999px',
  border: `1px solid ${vars.colour.line}`
})

export const segment = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45em',
  padding: '0.36rem 0.75rem',
  borderRadius: '999px',
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  color: vars.colour.inkMuted,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, color 150ms ease',
  selectors: {
    '&:hover': {
      color: vars.colour.ink
    },
    '&[aria-pressed="true"]': {
      backgroundColor: vars.colour.ink,
      color: vars.colour.bg,
      fontWeight: 600
    }
  }
})

/** The tally on a filter chip. */
export const filterCount = style({
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums'
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

/** Inline code references (`CLAUDE.md`) — sized to sit flush in running prose. */
export const inlineCode = style({
  fontFamily: vars.font.mono,
  fontSize: '0.84em',
  backgroundColor: vars.colour.inset,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '4px',
  padding: '0.06em 0.36em',
  whiteSpace: 'nowrap'
})
