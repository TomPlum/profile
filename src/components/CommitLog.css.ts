import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const wrap = style({
  position: 'relative'
})

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0
})

export const row = style({
  borderBottom: `1px solid ${vars.colour.line}`,
  selectors: {
    '&:first-child': {
      borderTop: `1px solid ${vars.colour.line}`
    }
  }
})

const headerBase = {
  display: 'grid',
  gap: '0.3rem',
  width: '100%',
  padding: '1.15rem 0.75rem 1.15rem 0.25rem',
  textAlign: 'left' as const
}

export const headerStatic = style(headerBase)

export const headerButton = style([
  headerBase,
  {
    background: 'none',
    border: 'none',
    color: 'inherit',
    font: 'inherit',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 150ms ease',
    selectors: {
      '&:hover': {
        backgroundColor: vars.colour.surface
      }
    }
  }
])

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  columnGap: '0.65rem',
  rowGap: '0.3rem',
  fontFamily: vars.font.mono,
  fontSize: '0.76rem',
  letterSpacing: '0.01em'
})

export const hash = style({
  fontWeight: 600
})

export const date = style({
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums'
})

export const branchChip = style({
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: '0.08rem 0.45rem',
  borderRadius: '999px',
  border: '1.5px solid currentcolor'
})

export const tagChip = style({
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: '0.1rem 0.5rem',
  borderRadius: '6px',
  backgroundColor: vars.colour.inset,
  // git decorates tags yellow; the puzzles gold is this palette's yellow.
  color: vars.colour.lane.puzzles
})

export const chevron = style({
  marginLeft: 'auto',
  color: vars.colour.inkFaint,
  display: 'inline-flex',
  transition: 'transform 200ms ease'
})

export const chevronOpen = style({
  transform: 'rotate(180deg)'
})

export const title = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 32",
  fontWeight: 560,
  fontSize: 'clamp(1.1rem, 2.6vw, 1.3rem)',
  lineHeight: 1.25,
  color: vars.colour.ink,
  textWrap: 'balance'
})

export const summary = style({
  fontSize: '0.98rem',
  lineHeight: 1.55,
  color: vars.colour.inkMuted,
  maxWidth: '62ch'
})

export const detailRegion = style({
  overflow: 'hidden'
})

export const detailInner = style({
  padding: '0.15rem 0.75rem 1.35rem 0.25rem'
})

export const endMarker = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  color: vars.colour.inkFaint,
  padding: '1.6rem 0 0.4rem',
  textAlign: 'center'
})
