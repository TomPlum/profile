import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'
import { commandCaret, commandLine, commandPrompt } from '../styles/controls.css'

export const section = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '0 clamp(1rem, 4vw, 2rem) clamp(3rem, 8vh, 5rem)'
})

/** Both pages are headed by the same command line — see `controls.css`. */
export const command = commandLine
export const prompt = commandPrompt
export const caret = commandCaret

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

export const laneDot = style({
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  border: '2px solid currentcolor',
  display: 'inline-block',
  flexShrink: 0
})

