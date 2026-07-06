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
