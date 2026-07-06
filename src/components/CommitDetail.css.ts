import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const bodyText = style({
  fontSize: '0.95rem',
  lineHeight: 1.65,
  color: vars.colour.inkMuted,
  maxWidth: '60ch'
})

/** Body text with a visual aside beside it; stacks on narrow viewports. */
export const bodyWithVisual = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: '1.1rem',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'start'
    }
  }
})

/** A rounded, theme-aware badge for a brand mark beside the body text. */
export const logoBadge = style({
  display: 'grid',
  placeItems: 'center',
  padding: '1.15rem',
  borderRadius: '16px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.inset
})
