import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const contact = style({
  borderTop: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.surface
})

export const contactInner = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(2.5rem, 7vh, 4.5rem) clamp(1rem, 4vw, 2rem)'
})

export const heading = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 144, 'WONK' 1",
  fontWeight: 540,
  fontSize: 'clamp(2rem, 6vw, 3.2rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.015em',
  marginBottom: '0.9rem'
})

export const blurb = style({
  fontSize: '1.02rem',
  lineHeight: 1.65,
  color: vars.colour.inkMuted,
  maxWidth: '52ch',
  marginBottom: '1.6rem'
})

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem'
})

/** Email addresses shouldn't be shouted in uppercase. */
export const emailButton = style({
  textTransform: 'none',
  letterSpacing: '0.02em'
})

export const colophon = style({
  borderTop: `1px solid ${vars.colour.line}`
})

export const colophonInner = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '1.4rem clamp(1rem, 4vw, 2rem) 2rem',
  display: 'grid',
  gap: '0.4rem',
  fontFamily: vars.font.mono,
  fontSize: '0.74rem',
  lineHeight: 1.7,
  color: vars.colour.inkFaint
})

export const copyright = style({
  marginTop: '0.5rem',
  color: vars.colour.inkFaint,
  letterSpacing: '0.02em'
})

export const colophonLink = style({
  color: 'inherit',
  textUnderlineOffset: '3px',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  }
})

/** Keyboard hints rendered as little keycaps — the j / k shortcuts. */
export const kbd = style({
  fontFamily: vars.font.mono,
  fontSize: '0.9em',
  lineHeight: 1,
  padding: '0.15em 0.45em',
  borderRadius: '5px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.inset,
  color: vars.colour.ink,
  boxShadow: `inset 0 -1px 0 ${vars.colour.line}`
})

/** The "built with Claude Code" lockup: the animated mark + its label. */
export const claudeLink = style({
  color: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.32em',
  lineHeight: 'inherit',
  verticalAlign: 'baseline',
  textDecoration: 'none',
  fontWeight: 500,
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  }
})

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const twinkle = keyframes({
  '0%, 100%': { opacity: 0.7 },
  '50%': { opacity: 1 }
})

/**
 * The Claude "sparkle", echoing the spinner the CLI draws. Rotates slowly and
 * pulses; the site accent keeps it Claude-coloured without adding a new colour.
 * Motion is dropped under prefers-reduced-motion.
 */
export const claudeMark = style({
  display: 'inline-block',
  width: '0.95em',
  height: '0.95em',
  flexShrink: 0,
  color: vars.colour.accent,
  fill: 'currentColor',
  position: 'relative',
  top: '0.12em',
  transformBox: 'fill-box',
  transformOrigin: 'center',
  animation: `${spin} 16s linear infinite, ${twinkle} 3.4s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none'
    }
  }
})
