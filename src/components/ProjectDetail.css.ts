import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const card = style({
  backgroundColor: vars.colour.surface,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '12px',
  padding: 'clamp(1rem, 3vw, 1.4rem)',
  display: 'grid',
  gap: '0.85rem'
})

export const cardHeader = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem'
})

export const projectName = style({
  fontFamily: vars.font.mono,
  fontWeight: 700,
  fontSize: '0.95rem',
  color: vars.colour.ink,
  marginRight: '0.4rem'
})

export const stackChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em'
})

export const oneLiner = style({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: vars.colour.ink,
  maxWidth: '60ch'
})

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: vars.colour.inkFaint,
  marginBottom: '0.25rem'
})

export const shows = style({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: vars.colour.inkMuted,
  maxWidth: '60ch'
})

export const facts = style({
  listStyle: 'none',
  padding: 0,
  display: 'grid',
  gap: '0.25rem',
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  color: vars.colour.inkMuted
})

export const factItem = style({
  selectors: {
    '&::before': {
      content: '"·  "',
      color: vars.colour.inkFaint
    }
  }
})

export const links = style({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '1.1rem',
  rowGap: '0.4rem'
})

export const privateNote = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  fontStyle: 'italic',
  color: vars.colour.inkFaint
})
