import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const card = style({
  backgroundColor: vars.colour.surface,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  padding: 'clamp(1rem, 3vw, 1.4rem)',
  display: 'grid',
  gap: '0.85rem',
  // The branch's lane colour, set inline by ProjectDetail; accent fallback.
  vars: { '--lane': vars.colour.accent }
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

export const preview = style({
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.inset,
  overflow: 'hidden',
  margin: 0
})

const previewPanel = {
  minHeight: '8.5rem',
  padding: '1rem',
  position: 'relative' as const
}

export const previewCaption = style({
  borderTop: `1px solid ${vars.colour.line}`,
  padding: '0.65rem 0.85rem',
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  lineHeight: 1.45,
  color: vars.colour.inkMuted
})

export const gitPreview = style([
  previewPanel,
  {
    display: 'grid',
    alignContent: 'center',
    gap: '0.45rem',
    paddingLeft: '3.4rem',
    fontFamily: vars.font.mono,
    fontSize: '0.78rem'
  }
])

export const previewRail = style({
  position: 'absolute',
  left: '1.35rem',
  top: '0.8rem',
  bottom: '0.8rem',
  width: '2px',
  backgroundColor: vars.colour.lane.oss
})

export const previewRailAlt = style({
  position: 'absolute',
  left: '2rem',
  top: '2.2rem',
  bottom: '1.4rem',
  width: '2px',
  backgroundColor: vars.colour.lane.languages
})

export const previewDot = style({
  position: 'absolute',
  left: '1.05rem',
  top: '2rem',
  width: '0.65rem',
  height: '0.65rem',
  borderRadius: '50%',
  border: `2px solid ${vars.colour.lane.oss}`,
  backgroundColor: vars.colour.inset
})

export const previewDotAlt = style({
  position: 'absolute',
  left: '1.7rem',
  top: '4.2rem',
  width: '0.65rem',
  height: '0.65rem',
  borderRadius: '50%',
  border: `2px solid ${vars.colour.lane.languages}`,
  backgroundColor: vars.colour.inset
})

export const previewLine = style({
  color: vars.colour.ink,
  fontWeight: 700
})

export const previewLineMuted = style({
  color: vars.colour.inkMuted
})

export const drillPreview = style([
  previewPanel,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '0.7rem',
    alignItems: 'stretch',
    fontFamily: vars.font.mono
  }
])

const previewTile = {
  display: 'grid',
  placeItems: 'center',
  minHeight: '3.1rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface
}

export const previewToken = style({
  ...previewTile,
  color: vars.colour.inkMuted,
  fontSize: '0.72rem'
})

export const previewGlyph = style({
  ...previewTile,
  color: vars.colour.lane.languages,
  fontFamily: vars.font.display,
  fontSize: '2rem',
  lineHeight: 1
})

export const newsPreview = style([
  previewPanel,
  {
    display: 'grid',
    alignContent: 'center',
    gap: '0.55rem',
    fontFamily: vars.font.mono
  }
])

const newsLine = {
  display: 'block',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  padding: '0.55rem 0.7rem'
}

export const newsMeta = style({
  ...newsLine,
  color: vars.colour.inkMuted,
  fontSize: '0.72rem'
})

export const newsHeadline = style({
  ...newsLine,
  color: vars.colour.ink,
  fontSize: '0.86rem'
})

export const mascotPreview = style([
  previewPanel,
  {
    minHeight: '10rem',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 7rem',
    alignItems: 'end',
    gap: '0.8rem',
    overflow: 'hidden',
    '@media': {
      '(max-width: 520px)': {
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        alignItems: 'center'
      }
    }
  }
])

export const mascotBubble = style({
  alignSelf: 'center',
  position: 'relative',
  display: 'grid',
  gap: '0.35rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  backgroundColor: vars.colour.surface,
  padding: '0.8rem 0.95rem',
  fontFamily: vars.font.mono,
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      right: '-0.45rem',
      bottom: '1.1rem',
      width: '0.8rem',
      height: '0.8rem',
      transform: 'rotate(45deg)',
      borderTop: `1px solid ${vars.colour.line}`,
      borderRight: `1px solid ${vars.colour.line}`,
      backgroundColor: vars.colour.surface
    }
  },
  '@media': {
    '(max-width: 520px)': {
      width: '100%',
      selectors: {
        '&::after': {
          right: '2rem',
          bottom: '-0.45rem',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: `1px solid ${vars.colour.line}`,
          borderBottom: `1px solid ${vars.colour.line}`
        }
      }
    }
  }
})

export const mascotGif = style({
  width: '8.4rem',
  height: '8.4rem',
  objectFit: 'contain',
  imageRendering: 'pixelated',
  alignSelf: 'end',
  justifySelf: 'center',
  transform: 'scaleX(-1)',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      display: 'none'
    }
  }
})

export const mascotStatic = style({
  width: '8.4rem',
  height: '8.4rem',
  objectFit: 'contain',
  imageRendering: 'pixelated',
  alignSelf: 'end',
  justifySelf: 'center',
  transform: 'scaleX(-1)',
  display: 'none',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      display: 'block'
    }
  }
})

export const sleepPreview = style([
  previewPanel,
  {
    display: 'grid',
    gridTemplateRows: 'minmax(0, 1fr) auto',
    gap: '0.55rem'
  }
])

export const sleepLine = style({
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  // preserveAspectRatio="none" scales x/y unevenly; keep strokes crisp.
  vectorEffect: 'non-scaling-stroke'
})

/** Marks the night the sleep fixes took hold. */
export const sleepShiftLine = style({
  stroke: vars.colour.inkFaint,
  strokeWidth: 1,
  strokeDasharray: '3 3',
  vectorEffect: 'non-scaling-stroke'
})

export const sleepLegend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.35rem 0.9rem',
  fontFamily: vars.font.mono,
  fontSize: '0.62rem',
  color: vars.colour.inkMuted
})

export const sleepLegendItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em'
})

export const sleepLegendDot = style({
  width: '0.5em',
  height: '0.5em',
  borderRadius: '50%'
})

export const dashboardPreview = style([
  previewPanel,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '0.65rem',
    fontFamily: vars.font.mono
  }
])

const dashboardTile = {
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  padding: '0.55rem 0.7rem'
}

export const dashboardLabel = style({
  ...dashboardTile,
  color: vars.colour.inkMuted,
  fontSize: '0.72rem'
})

export const dashboardValue = style({
  ...dashboardTile,
  color: vars.colour.lane.career,
  fontSize: '1.1rem'
})

export const dashboardChart = style({
  gridColumn: '1 / -1',
  height: '3.2rem',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  backgroundColor: vars.colour.surface,
  padding: '0.4rem 0.55rem',
  overflow: 'hidden'
})

export const dashboardSvg = style({
  display: 'block',
  width: '100%',
  height: '100%'
})

export const dashboardArea = style({
  fill: vars.colour.lane.career,
  fillOpacity: 0.2,
  stroke: 'none'
})

export const dashboardLine = style({
  fill: 'none',
  stroke: vars.colour.lane.career,
  strokeWidth: 1.75,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  // preserveAspectRatio="none" scales x/y unevenly; keep the stroke crisp.
  vectorEffect: 'non-scaling-stroke'
})

export const dashboardPoint = style({
  fill: vars.colour.lane.career,
  stroke: vars.colour.surface,
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke'
})

export const terminalPreview = style([
  previewPanel,
  {
    display: 'grid',
    alignContent: 'center',
    gap: '0.45rem',
    fontFamily: vars.font.mono,
    fontSize: '0.78rem'
  }
])

export const terminalCommand = style({
  display: 'block',
  color: vars.colour.lane.puzzles
})

export const terminalLine = style({
  display: 'block',
  color: vars.colour.inkMuted
})

export const terminalSuccess = style({
  display: 'block',
  color: vars.colour.ink,
  fontWeight: 700
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
  gap: '0.55rem'
})

export const factItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.65rem',
  fontSize: '0.88rem',
  lineHeight: 1.55,
  color: vars.colour.inkMuted
})

export const factMarker = style({
  flexShrink: 0,
  width: '0.42rem',
  height: '0.42rem',
  borderRadius: '1.5px',
  transform: 'rotate(45deg)',
  backgroundColor: 'var(--lane)',
  // Optically align the diamond with the first line of text.
  position: 'relative',
  top: '-0.12em'
})

export const factText = style({
  minWidth: 0
})

export const factSource = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3em',
  whiteSpace: 'nowrap',
  fontFamily: vars.font.mono,
  fontSize: '0.7rem',
  color: vars.colour.inkFaint,
  textDecoration: 'none',
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '999px',
  padding: '0.06rem 0.5rem',
  verticalAlign: '0.1em',
  transition: 'border-color 150ms ease, color 150ms ease',
  selectors: {
    '&:hover': {
      color: vars.colour.accent,
      borderColor: vars.colour.accent
    }
  }
})

export const links = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.55rem'
})

export const privateNote = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  fontStyle: 'italic',
  color: vars.colour.inkFaint
})
