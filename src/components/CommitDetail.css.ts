import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'
import { dark } from '../styles/palette'

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

const lineIn = keyframes({
  from: { opacity: 0, transform: 'translateY(3px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})

const blink = keyframes({
  '0%, 49%': { opacity: 1 },
  '50%, 100%': { opacity: 0 }
})

/**
 * The Claude Code session is always a dark terminal — the machine voice —
 * so it draws from the dark palette in both themes.
 */
export const terminal = style({
  width: 'min(15.5rem, 100%)',
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  lineHeight: 1.75,
  backgroundColor: dark.bg,
  border: `1px solid ${dark.line}`,
  borderRadius: '10px',
  padding: '0.55rem 0.85rem 0.75rem',
  display: 'grid',
  overflow: 'hidden'
})

export const terminalBar = style({
  display: 'flex',
  gap: '0.35rem',
  marginBottom: '0.45rem'
})

export const terminalDot = style({
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '50%',
  backgroundColor: dark.line,
  selectors: {
    '&:first-child': { backgroundColor: '#C4574A' },
    '&:nth-child(2)': { backgroundColor: '#C9AC3E' },
    '&:nth-child(3)': { backgroundColor: '#4BBFA5' }
  }
})

export const terminalRow = style({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  opacity: 0,
  animation: `${lineIn} 0.3s ease-out forwards`
})

export const terminalKind = styleVariants({
  command: { color: dark.ink },
  claude: { color: '#D97757', fontWeight: 700 },
  tool: { color: dark.inkMuted },
  ok: { color: dark.lane.oss }
})

export const terminalCursor = style({
  display: 'inline-block',
  width: '0.55em',
  height: '1em',
  marginTop: '0.15rem',
  backgroundColor: dark.ink,
  opacity: 0,
  animation: `${blink} 1.1s step-end infinite`
})
