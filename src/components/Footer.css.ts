import { style } from '@vanilla-extract/css'
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

export const colophonLink = style({
  color: 'inherit',
  textUnderlineOffset: '3px',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  }
})
