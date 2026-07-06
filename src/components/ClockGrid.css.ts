import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(22, minmax(0, 1fr))',
  gap: '0.2rem',
  alignContent: 'center',
  padding: '0.85rem',
  '@media': {
    '(max-width: 520px)': {
      gap: '0.1rem',
      padding: '0.6rem'
    }
  }
})

export const face = style({
  aspectRatio: '1',
  borderRadius: '50%',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.surface,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    '(max-width: 520px)': {
      border: 'none'
    }
  }
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
  willChange: 'transform',
  '@media': {
    // Faces are ~12px at phone widths; keep hands hairline-thin there.
    '(max-width: 520px)': {
      height: '1px',
      marginTop: '-0.5px'
    }
  }
}

// Near-equal lengths so letter outlines stay continuous across faces; the
// hour hand is just slightly shorter.
export const handHour = style({
  ...handBase,
  width: '40%'
})

export const handMinute = style({
  ...handBase,
  width: '48%'
})
