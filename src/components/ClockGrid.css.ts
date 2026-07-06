import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(11, minmax(0, 1fr))',
  gap: '0.32rem',
  alignContent: 'center',
  minHeight: '8.5rem',
  padding: '1rem',
  '@media': {
    '(max-width: 520px)': {
      gap: '0.2rem',
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

// All hands share one colour: the card's lane colour (set by ProjectDetail).
const handBase = {
  position: 'absolute' as const,
  left: '50%',
  top: '50%',
  height: '2px',
  marginTop: '-1px',
  transformOrigin: 'left center',
  borderRadius: '999px',
  backgroundColor: 'var(--lane)',
  willChange: 'transform'
}

export const handHour = style({
  ...handBase,
  width: '30%'
})

export const handMinute = style({
  ...handBase,
  width: '46%'
})
