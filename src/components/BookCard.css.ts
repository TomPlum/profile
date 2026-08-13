import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

/** Where the pointer is, in viewport coordinates. */
export const CARD_X = '--card-x'
export const CARD_Y = '--card-y'

/**
 * Pinned just above the pointer rather than to the shelf, so it never covers
 * the spine being pointed at. Fixed positioning keeps it out of the row's
 * `overflow-x` clip. `data-flip` swaps it below the pointer near the top of
 * the viewport, where there is no room above.
 */
export const card = style({
  vars: { [CARD_X]: '50vw', [CARD_Y]: '50vh' },
  position: 'fixed',
  left: `var(${CARD_X})`,
  top: `var(${CARD_Y})`,
  transform: 'translate(-50%, calc(-100% - 1rem))',
  zIndex: 30,
  width: '17.5rem',
  display: 'flex',
  gap: '0.8rem',
  padding: '0.8rem',
  backgroundColor: vars.colour.surface,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '10px',
  boxShadow: '0 14px 30px rgb(0 0 0 / 0.22)',
  pointerEvents: 'none',
  selectors: {
    '&[data-flip="true"]': {
      transform: 'translate(-50%, 1.25rem)'
    }
  },
  '@media': {
    // On touch there is no pointer to track, so the card becomes a sheet
    // pinned to the bottom of the viewport instead.
    'screen and (max-width: 640px)': {
      left: '0.75rem',
      right: '0.75rem',
      top: 'auto',
      bottom: '0.75rem',
      width: 'auto',
      transform: 'none',
      selectors: {
        '&[data-flip="true"]': {
          transform: 'none'
        }
      }
    }
  }
})

export const cover = style({
  flexShrink: 0,
  width: '4rem',
  height: '6rem',
  objectFit: 'cover',
  borderRadius: '3px',
  border: `1px solid ${vars.colour.line}`,
  backgroundColor: vars.colour.inset
})

/**
 * Open Library has no artwork for 21 of these, so the fallback is set rather
 * than left as a grey box — a plausible plain-typography jacket.
 */
export const fallbackCover = style([
  cover,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.3rem',
    padding: '0.4rem',
    overflow: 'hidden',
    borderTop: `4px solid ${vars.colour.lane.languages}`
  }
])

export const fallbackTitle = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 9, 'WONK' 1",
  fontSize: '0.56rem',
  lineHeight: 1.15,
  fontWeight: 600,
  color: vars.colour.ink,
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
})

export const fallbackAuthor = style({
  fontFamily: vars.font.mono,
  fontSize: '0.45rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: vars.colour.inkFaint,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const body = style({
  minWidth: 0
})

export const title = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 20, 'WONK' 1",
  fontSize: '0.98rem',
  fontWeight: 600,
  lineHeight: 1.25,
  color: vars.colour.ink
})

export const author = style({
  fontSize: '0.85rem',
  color: vars.colour.inkMuted,
  marginTop: '0.1rem'
})

export const series = style({
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  color: vars.colour.lane.languages,
  marginTop: '0.35rem'
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  color: vars.colour.inkFaint,
  marginTop: '0.45rem',
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.15rem 0.5rem'
})

export const stars = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  color: vars.colour.lane.languages,
  marginTop: '0.4rem'
})

export const unrated = style({
  fontFamily: vars.font.mono,
  fontSize: '0.68rem',
  color: vars.colour.inkFaint,
  marginTop: '0.4rem'
})
