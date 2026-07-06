import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: vars.colour.bg,
  borderBottom: `1px solid ${vars.colour.line}`
})

export const inner = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '0.65rem clamp(0.75rem, 4vw, 2rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '0.5rem'
    }
  }
})

export const identity = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.75rem',
  minWidth: 0
})

export const name = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 40",
  fontWeight: 600,
  fontSize: '1.1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0,
  color: vars.colour.ink,
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    }
  },
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: '1rem'
    }
  }
})

export const role = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: vars.colour.inkMuted,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': {
    'screen and (max-width: 560px)': {
      display: 'none'
    }
  }
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexShrink: 0,
  '@media': {
    'screen and (max-width: 480px)': {
      gap: '0.35rem'
    }
  }
})

/** The "(PDF)" suffix is dropped on narrow screens to keep the CTAs fitting. */
export const cvSuffix = style({
  '@media': {
    'screen and (max-width: 480px)': {
      display: 'none'
    }
  }
})

export const themeToggle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.35rem',
  height: '2.35rem',
  borderRadius: '8px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: 'transparent',
  color: vars.colour.ink,
  cursor: 'pointer',
  transition: 'border-color 150ms ease',
  selectors: {
    '&:hover': {
      borderColor: vars.colour.ink
    }
  }
})

export const skipLink = style({
  position: 'absolute',
  left: '-9999px',
  selectors: {
    '&:focus': {
      position: 'fixed',
      left: '1rem',
      top: '1rem',
      zIndex: 100,
      padding: '0.6rem 1rem',
      backgroundColor: vars.colour.ink,
      color: vars.colour.bg,
      fontFamily: vars.font.mono,
      fontSize: '0.8rem',
      borderRadius: '8px'
    }
  }
})
