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

const cardIn = keyframes({
  from: { opacity: 0, transform: 'translateY(0.25rem)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})

const growUp = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(var(--level, 1))' }
})

const traceIn = keyframes({
  from: { clipPath: 'inset(0 100% 0 0)' },
  to: { clipPath: 'inset(0 0 0 0)' }
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

export const idvPreview = style({
  width: 'min(18rem, 100%)',
  display: 'grid',
  gap: '0.65rem',
  fontFamily: vars.font.mono,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.inset,
  padding: '0.8rem'
})

export const idvFlow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(3.8rem, 1fr))',
  gap: '0.35rem',
  '@media': {
    '(max-width: 520px)': {
      gridTemplateColumns: 'repeat(2, minmax(5.8rem, 1fr))'
    }
  }
})

export const idvStep = style({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  boxSizing: 'border-box',
  minHeight: '2.1rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  color: vars.colour.ink,
  fontSize: '0.56rem',
  fontWeight: 700,
  lineHeight: 1.25,
  padding: '0.35rem 0.42rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  opacity: 0,
  animation: `${cardIn} 0.38s ease-out forwards`,
  selectors: {
    '&:not(:last-child)::after': {
      content: '',
      position: 'absolute',
      right: '-0.35rem',
      top: '50%',
      width: '0.35rem',
      height: '1px',
      backgroundColor: 'var(--lane)'
    }
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms'
    }
  }
})

export const idvTrace = style({
  display: 'grid',
  gap: '0.25rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  padding: '0.55rem 0.65rem',
  fontSize: '0.58rem',
  lineHeight: 1.45
})

export const idvTraceLine = style({
  display: 'block',
  color: vars.colour.inkMuted,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  animation: `${traceIn} 0.75s ease-out forwards`
})

export const idvTraceOk = style([
  idvTraceLine,
  {
    color: vars.colour.lane.oss,
    fontWeight: 700
  }
])

export const degreePreview = style({
  width: 'min(18rem, 100%)',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gridTemplateRows: 'auto auto',
  gap: '0.65rem',
  fontFamily: vars.font.mono,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.inset,
  padding: '0.8rem',
  '@media': {
    '(max-width: 420px)': {
      gridTemplateColumns: '1fr'
    }
  }
})

export const degreeStream = style({
  display: 'grid',
  gap: '0.45rem',
  minWidth: 0
})

export const degreeLabel = style({
  fontSize: '0.58rem',
  color: vars.colour.inkMuted
})

export const degreeBars = style({
  display: 'flex',
  alignItems: 'end',
  gap: '0.25rem',
  height: '4.4rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  padding: '0.45rem'
})

export const degreeBar = style({
  flex: 1,
  minWidth: '0.34rem',
  height: '100%',
  borderRadius: '999px 999px 2px 2px',
  backgroundColor: vars.colour.lane.career,
  transformOrigin: 'bottom center',
  transform: 'scaleY(0)',
  animation: `${growUp} 0.7s ease-out forwards`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms'
    }
  }
})

export const degreePipe = style({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(4.7rem, 1fr))',
  gap: '0.35rem',
  fontSize: '0.55rem',
  color: vars.colour.inkMuted,
  '@media': {
    '(max-width: 420px)': {
      gridTemplateColumns: '1fr'
    }
  }
})

export const degreePipeStep = style({
  display: 'grid',
  placeItems: 'center',
  boxSizing: 'border-box',
  minHeight: '2rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  lineHeight: 1.25,
  padding: '0.34rem 0.5rem',
  textAlign: 'center',
  whiteSpace: 'nowrap'
})

export const robocodeArena = style({
  position: 'relative',
  minWidth: '5.3rem',
  minHeight: '4.4rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  overflow: 'hidden',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      inset: '0',
      backgroundImage:
        `linear-gradient(${vars.colour.line} 1px, transparent 1px), ` +
        `linear-gradient(90deg, ${vars.colour.line} 1px, transparent 1px)`,
      backgroundSize: '1rem 1rem',
      opacity: 0.35
    }
  }
})

const roboBot = {
  position: 'absolute' as const,
  width: '0.85rem',
  height: '0.85rem',
  border: `2px solid ${vars.colour.lane.career}`,
  backgroundColor: vars.colour.inset,
  transform: 'rotate(45deg)'
}

export const robocodeBotA = style({
  ...roboBot,
  left: '1rem',
  bottom: '0.8rem'
})

export const robocodeBotB = style({
  ...roboBot,
  right: '1rem',
  top: '0.8rem',
  borderColor: vars.colour.lane.oss
})

export const robocodeShot = style({
  position: 'absolute',
  left: '2.05rem',
  right: '2.05rem',
  top: '50%',
  height: '2px',
  backgroundColor: vars.colour.lane.career,
  transform: 'rotate(-28deg)',
  transformOrigin: 'left center',
  animation: `${traceIn} 0.8s ease-out forwards`
})

export const oceanPreview = style({
  width: 'min(17rem, 100%)',
  display: 'grid',
  gap: '0.55rem',
  fontFamily: vars.font.mono,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.inset,
  padding: '0.75rem'
})

export const oceanBrowser = style({
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '7px',
  backgroundColor: vars.colour.surface,
  overflow: 'hidden'
})

export const oceanBrowserBar = style({
  display: 'flex',
  gap: '0.28rem',
  borderBottom: `1px solid ${vars.colour.line}`,
  padding: '0.45rem'
})

export const oceanBrowserDot = style({
  width: '0.42rem',
  height: '0.42rem',
  borderRadius: '50%',
  backgroundColor: vars.colour.line
})

export const oceanLayout = style({
  display: 'grid',
  gridTemplateColumns: '2.6rem minmax(0, 1fr)',
  gridTemplateRows: '2rem 0.42rem 0.42rem',
  gap: '0.45rem',
  padding: '0.65rem'
})

export const oceanSidebar = style({
  gridRow: '1 / -1',
  display: 'grid',
  placeItems: 'center',
  borderRadius: '6px',
  backgroundColor: vars.colour.lane.career,
  color: vars.colour.bg,
  fontSize: '0.72rem',
  fontWeight: 700
})

export const oceanHero = style({
  borderRadius: '6px',
  backgroundColor: vars.colour.line
})

export const oceanLine = style({
  width: '100%',
  borderRadius: '999px',
  backgroundColor: vars.colour.line
})

export const oceanLineShort = style([
  oceanLine,
  {
    width: '68%'
  }
])

export const oceanStack = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.35rem',
  fontSize: '0.56rem',
  color: vars.colour.inkMuted
})

export const oceanStackItem = style({
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '999px',
  backgroundColor: vars.colour.surface,
  padding: '0.16rem 0.45rem'
})
