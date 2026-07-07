import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

export const masthead = style({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: 'clamp(2rem, 5vh, 3rem) clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vh, 2.25rem)',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(180px, 260px)',
  alignItems: 'center',
  columnGap: 'clamp(1.5rem, 6vw, 4.5rem)',
  rowGap: '2rem',
  '@media': {
    '(max-width: 760px)': {
      gridTemplateColumns: '1fr',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      rowGap: '0.75rem'
    }
  }
})

export const copy = style({
  minWidth: 0
})

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: '0.8rem',
  color: vars.colour.inkMuted,
  marginBottom: '1.4rem',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: '0.6rem',
  rowGap: '0.35rem',
  '@media': {
    '(max-width: 760px)': {
      marginBottom: '0.9rem'
    }
  }
})

export const eyebrowDivider = style({
  color: vars.colour.inkFaint,
  userSelect: 'none'
})

export const name = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 144, 'SOFT' 0, 'WONK' 1",
  fontWeight: 540,
  fontSize: 'clamp(2.9rem, 8vw, 4.6rem)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  color: vars.colour.ink,
  textWrap: 'balance',
  marginBottom: '1.1rem',
  '@media': {
    // Above the mobile stack the name shares its row with the portrait, so
    // keep "Thomas Plumpton" on a single line.
    '(min-width: 761px)': {
      whiteSpace: 'nowrap'
    },
    '(max-width: 760px)': {
      marginBottom: '0.7rem'
    }
  }
})

export const roleLine = style({
  fontFamily: vars.font.display,
  fontStyle: 'italic',
  fontVariationSettings: "'opsz' 40",
  fontSize: 'clamp(1.25rem, 3.4vw, 1.7rem)',
  fontWeight: 480,
  color: vars.colour.ink,
  marginBottom: '1.4rem',
  '@media': {
    '(max-width: 760px)': {
      marginBottom: '1rem'
    }
  }
})

/** Company name + its Maia mark, kept together so they never wrap apart. */
export const company = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.34em',
  whiteSpace: 'nowrap'
})

/** Matillion brand teal (#00524E), lightened in dark mode to hold contrast. */
export const companyLink = style({
  color: '#00524E',
  textDecorationThickness: '1px',
  textUnderlineOffset: '4px',
  selectors: {
    '&:hover': {
      color: vars.colour.accent
    },
    ':root[data-theme="dark"] &': {
      color: '#4FBFA9'
    },
    ':root[data-theme="dark"] &:hover': {
      color: vars.colour.accent
    }
  }
})

// Height-driven with auto width so each mark keeps its own aspect ratio
// (the light Maia is square; the dark variant is taller than it is wide).
const companyLogoBase = {
  height: '0.83em',
  width: 'auto',
  flexShrink: 0
} as const

/** Light-theme Maia (dark eyes/sparkle); hidden when the dark variant shows. */
export const companyLogo = style({
  ...companyLogoBase,
  display: 'inline-block',
  selectors: {
    ':root[data-theme="dark"] &': {
      display: 'none'
    }
  }
})

/** Dark-theme Maia (light eyes/sparkle); only shown under the dark theme. */
export const companyLogoDark = style({
  ...companyLogoBase,
  display: 'none',
  selectors: {
    ':root[data-theme="dark"] &': {
      display: 'inline-block'
    }
  }
})

export const value = style({
  maxWidth: '58ch',
  fontSize: '1.1rem',
  lineHeight: 1.65,
  color: vars.colour.inkMuted,
  marginBottom: '1.8rem',
  '@media': {
    '(max-width: 760px)': {
      marginBottom: '1.2rem'
    }
  }
})

export const stackRow = style({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1.6rem',
  '@media': {
    '(max-width: 760px)': {
      marginBottom: '1.1rem'
    }
  }
})

export const proofRow = style({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.45rem',
  marginBottom: '1.3rem',
  '@media': {
    '(max-width: 760px)': {
      flexWrap: 'nowrap',
      marginBottom: '0.85rem',
      gap: '0.25rem'
    }
  }
})

export const proofLink = style({
  fontFamily: vars.font.mono,
  fontSize: '0.74rem',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.42rem 0.55rem',
  borderLeft: `2px solid ${vars.colour.accent}`,
  backgroundColor: vars.colour.inset,
  color: vars.colour.ink,
  textDecoration: 'none',
  transition: 'color 0.18s ease, background-color 0.18s ease',
  selectors: {
    '&:hover': {
      color: vars.colour.accent,
      backgroundColor: vars.colour.surface
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.colour.accent}`,
      outlineOffset: '2px'
    }
  },
  '@media': {
    '(max-width: 760px)': {
      fontSize: '0.64rem',
      padding: '0.34rem 0.36rem',
      whiteSpace: 'nowrap'
    }
  }
})

/** Core-stack pill with its brand icon inline before the label. */
export const techChip = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.42em',
  padding: '0.28rem 0.6rem 0.28rem 0.5rem',
  borderRadius: '7px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.surface,
  color: vars.colour.ink,
  whiteSpace: 'nowrap'
})

export const techIcon = style({
  fontSize: '1.05em',
  display: 'inline-flex'
})

/** A mono link that leads with a brand glyph (e.g. the GitHub mark). */
export const iconLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4em'
})

export const linksRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: '1.1rem',
  rowGap: '0.5rem',
  marginBottom: '1.2rem',
  '@media': {
    '(max-width: 760px)': {
      marginBottom: '0.85rem'
    }
  }
})

export const currently = style({
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  color: vars.colour.inkFaint
})

export const portrait = style({
  justifySelf: 'end',
  width: 'min(100%, 260px)',
  margin: 0,
  position: 'relative',
  selectors: {
    // Offset frame behind the single desktop portrait; dropped on mobile
    // where two photos sit edge-to-edge across the full width.
    '&::before': {
      content: '',
      position: 'absolute',
      inset: '0.75rem -0.75rem -0.75rem 0.75rem',
      border: `1px solid ${vars.colour.line}`,
      backgroundColor: vars.colour.surface,
      zIndex: -1
    }
  },
  '@media': {
    '(max-width: 760px)': {
      justifySelf: 'stretch',
      width: 'min(100%, 320px)',
      selectors: {
        '&::before': {
          display: 'none'
        }
      }
    }
  }
})

/**
 * Desktop: a single 3:4 frame; the photos stack and cross-fade on click.
 * Mobile: a two-column grid so both photos render side-by-side, filling the
 * row's width (clicking is a no-op there — you can already see both).
 */
export const portraitButton = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  aspectRatio: '3 / 4',
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  '@media': {
    '(max-width: 760px)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.6rem',
      aspectRatio: 'auto',
      cursor: 'default'
    }
  }
})

/**
 * Corner badge that marks the stacked desktop portrait as clickable: a cycle
 * glyph + "1/2" counter in the mono machine-voice. Always visible so the
 * affordance reads without a hover; lifts to the accent on hover/focus.
 * Hidden on mobile, where both photos already show side-by-side.
 */
export const portraitCycle = style({
  position: 'absolute',
  right: '0.55rem',
  bottom: '0.55rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35em',
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  fontWeight: 500,
  lineHeight: 1,
  color: vars.colour.inkMuted,
  backgroundColor: vars.colour.surface,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '6px',
  padding: '0.3rem 0.45rem',
  pointerEvents: 'none',
  transition: 'color 0.2s ease, border-color 0.2s ease',
  selectors: {
    [`${portraitButton}:hover &, ${portraitButton}:focus-visible &`]: {
      color: vars.colour.accent,
      borderColor: vars.colour.accent
    }
  },
  '@media': {
    '(max-width: 760px)': {
      display: 'none'
    }
  }
})

export const portraitImage = style({
  display: 'block',
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: '50% 32%',
  border: `1px solid ${vars.colour.ink}`,
  backgroundColor: vars.colour.inset,
  filter: 'saturate(0.86) contrast(1.04)',
  opacity: 0,
  transition: 'opacity 0.45s ease',
  selectors: {
    '&[data-active="true"]': {
      opacity: 1
    }
  },
  '@media': {
    '(max-width: 760px)': {
      // Both visible in the grid, each in its own column.
      position: 'static',
      inset: 'auto',
      height: 'auto',
      aspectRatio: '1',
      opacity: 1
    }
  }
})
