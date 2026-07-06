import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(13, minmax(0, 1fr))',
  gap: '0.28rem',
  alignContent: 'center',
  minHeight: '8.5rem',
  padding: '1rem',
  '@media': {
    '(max-width: 520px)': {
      gap: '0.18rem',
      padding: '0.75rem'
    }
  }
})

export const face = style({
  aspectRatio: '1',
  borderRadius: '50%',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.surface,
  position: 'relative',
  overflow: 'hidden'
})

export const hand = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '46%',
  height: '1.5px',
  marginTop: '-0.75px',
  transformOrigin: 'left center',
  borderRadius: '999px',
  willChange: 'transform'
})
