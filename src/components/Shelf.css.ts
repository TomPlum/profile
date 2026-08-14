import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'
import { spineWash } from '../styles/palette'

/**
 * Set per spine from the book's page count, and a per-spine height wobble so a
 * shelf reads as books rather than as a bar chart. Plain custom properties
 * rather than `createVar`, matching how `--lane` is passed elsewhere.
 */
export const SPINE_WIDTH = '--spine-w'
export const SPINE_HEIGHT = '--spine-h'

export const board = style({
  position: 'relative',
  marginBottom: '2.5rem'
})

export const boardHead = style({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '0.5rem'
})

export const boardAuthor = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 40, 'WONK' 1",
  fontSize: '1.05rem',
  fontWeight: 600,
  color: vars.colour.ink
})

export const boardMeta = style({
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  color: vars.colour.inkFaint,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap'
})

/**
 * The board itself: spines stand on a baseline rule, with the row scrolling
 * sideways rather than wrapping — a wrapped shelf reads as a bar chart, and
 * the length of the Sanderson run is the information.
 */
export const shelfRow = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '2px',
  // A fixed height, not a minimum: the spines size themselves as a percentage
  // of the board, and a long title must clip rather than stretch the shelf.
  height: '11rem',
  padding: '0 0.25rem',
  borderBottom: `3px solid ${vars.colour.line}`,
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'thin',
  '@media': {
    'screen and (max-width: 640px)': {
      height: '8.5rem'
    }
  }
})

/**
 * Face-out view: the books turn to show their jackets, the way a bookshop
 * displays the ones it wants you to notice. These wrap rather than scroll —
 * a cover is wide enough that a 39-book run would otherwise be several
 * screens of sideways scrolling.
 */
export const coversRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: '0.6rem 0.5rem',
  padding: '0 0.25rem 0.6rem',
  borderBottom: `3px solid ${vars.colour.line}`
})

export const cover = style({
  position: 'relative',
  flexShrink: 0,
  width: '4.25rem',
  aspectRatio: '2 / 3',
  padding: 0,
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '2px',
  backgroundColor: vars.colour.inset,
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'transform 160ms ease, box-shadow 160ms ease',
  selectors: {
    '&:hover, &:focus-visible': {
      transform: 'translateY(-6px)',
      boxShadow: '0 8px 18px rgb(0 0 0 / 0.24)',
      outline: 'none'
    },
    '&[aria-pressed="true"]': {
      transform: 'translateY(-6px)',
      boxShadow: '0 8px 18px rgb(0 0 0 / 0.28)'
    },
    // The run's colour survives the view change, as a foot band.
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '4px'
    }
  },
  '@media': {
    'screen and (max-width: 640px)': {
      width: '3.6rem'
    }
  }
})

export const coverImage = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

/** No artwork for 21 of them, so the jacket is set instead of left blank. */
export const coverFallback = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.25rem',
  width: '100%',
  height: '100%',
  padding: '0.4rem 0.35rem',
  textAlign: 'left',
  backgroundColor: vars.colour.surface
})

export const coverFallbackTitle = style({
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 9, 'WONK' 1",
  fontSize: '0.54rem',
  lineHeight: 1.15,
  fontWeight: 600,
  color: vars.colour.ink,
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
})

export const coverFallbackAuthor = style({
  fontFamily: vars.font.mono,
  fontSize: '0.44rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: vars.colour.inkFaint,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

/** The foot band's colour, per run. */
export const coverLane = styleVariants({
  career: { selectors: { '&::after': { backgroundColor: vars.colour.lane.career } } },
  oss: { selectors: { '&::after': { backgroundColor: vars.colour.lane.oss } } },
  languages: { selectors: { '&::after': { backgroundColor: vars.colour.lane.languages } } },
  puzzles: { selectors: { '&::after': { backgroundColor: vars.colour.lane.puzzles } } }
})

export const spine = style({
  vars: {
    [SPINE_WIDTH]: '20px',
    [SPINE_HEIGHT]: '92%'
  },
  position: 'relative',
  flexShrink: 0,
  width: `var(${SPINE_WIDTH})`,
  height: `var(${SPINE_HEIGHT})`,
  minHeight: '4.5rem',
  padding: '0.55rem 0 0.35rem',
  border: `1px solid ${vars.colour.line}`,
  borderBottom: 'none',
  borderRadius: '3px 3px 0 0',
  cursor: 'pointer',
  overflow: 'hidden',
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  fontFamily: vars.font.display,
  fontVariationSettings: "'opsz' 9",
  // Small enough that a 13px spine can still be lettered — only the shortest
  // novella on the shelf goes blank.
  fontSize: '0.56rem',
  lineHeight: 1,
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap',
  textAlign: 'start',
  color: vars.colour.ink,
  transition: 'transform 160ms ease, box-shadow 160ms ease',
  selectors: {
    // Pulling a book half out of the shelf.
    '&:hover, &:focus-visible': {
      transform: 'translateY(-10px)',
      boxShadow: `0 6px 14px rgb(0 0 0 / 0.18)`,
      outline: 'none'
    },
    '&[aria-pressed="true"]': {
      transform: 'translateY(-10px)',
      boxShadow: `0 6px 14px rgb(0 0 0 / 0.22)`
    },
    // The head band: the only place the lane colour runs at full strength.
    // Its colour comes from the run's lane, set by `spineTint` below.
    // Physical left/right, not `inset-inline` — the spine is in a vertical
    // writing mode, where the inline axis runs top-to-bottom and a logical
    // inset would collapse the band to nothing.
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '6px'
    }
  }
})

/**
 * Hue says which series run a spine belongs to; strength says how it was rated.
 *
 * The fill alone can't carry the rating — it has to stay pale enough for ink
 * lettering to keep WCAG AA on top of it (see `spineRamp`), which leaves the
 * rungs close together. The head band carries no text, so its opacity can run
 * the full range. Unrated books stay bare and dashed, which is honest.
 */
const LANES = ['career', 'oss', 'languages', 'puzzles'] as const

const rungs = (lane: (typeof LANES)[number]) =>
  styleVariants({
    five: {
      backgroundColor: vars.colour.spine[lane].five,
      selectors: { '&::before': { backgroundColor: vars.colour.lane[lane] } }
    },
    four: {
      backgroundColor: vars.colour.spine[lane].four,
      selectors: { '&::before': { backgroundColor: vars.colour.lane[lane], opacity: 0.7 } }
    },
    three: {
      backgroundColor: vars.colour.spine[lane].three,
      selectors: { '&::before': { backgroundColor: vars.colour.lane[lane], opacity: 0.45 } }
    },
    low: {
      backgroundColor: vars.colour.spine[lane].low,
      selectors: { '&::before': { backgroundColor: vars.colour.lane[lane], opacity: 0.25 } }
    },
    none: {
      backgroundColor: vars.colour.surface,
      borderStyle: 'dashed',
      selectors: { '&::before': { backgroundColor: vars.colour.lane[lane], opacity: 0.12 } }
    }
  })

export const spineTint = {
  career: rungs('career'),
  oss: rungs('oss'),
  languages: rungs('languages'),
  puzzles: rungs('puzzles')
}

/**
 * A wash of the book's own jacket down the spine.
 *
 * A real wrapped jacket continues around the hinge, so the slice taken is the
 * cover's left-hand edge (`object-fit: cover` fills the spine's height and
 * crops the overflowing width) rather than the middle, which is where the
 * title and the face usually are. It is held well back: the lettering above it
 * is plain `ink`, and unlike the flat tints in `spineRamp` an image can't be
 * gated by `palette.test.ts` — so the tint stays the thing carrying contrast
 * and the artwork only has to hint at the book.
 *
 * An `<img>` rather than a background: the row scrolls sideways, and this is
 * the one thing that keeps the spine view from downloading all 232 jackets up
 * front the way a CSS background would.
 */
export const SPINE_ART_OPACITY = '--spine-art-opacity'

export const spineArt = style({
  // 0.18, not higher: a jacket is mostly *type*, and by 0.3 the ghost of the
  // author's name is legible enough to fight the spine's own lettering. The
  // figure comes from `palette.ts` because `palette.test.ts` gates the tint it
  // produces — raise it there and the contrast gate answers.
  vars: { [SPINE_ART_OPACITY]: String(spineWash.light) },
  position: 'absolute',
  // Physical offsets: `inset` is the top/right/bottom/left shorthand, so it is
  // safe in the spine's vertical writing mode where logical ones would flip.
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'left center',
  opacity: `var(${SPINE_ART_OPACITY})`,
  // Multiply keeps the run's tint reading through the artwork on paper; on the
  // dark theme it would crush the spine to black, so the wash lightens instead.
  mixBlendMode: 'multiply',
  pointerEvents: 'none',
  selectors: {
    ':root[data-theme="dark"] &': {
      mixBlendMode: 'screen',
      opacity: String(spineWash.dark)
    }
  }
})

export const spineLabel = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxHeight: '100%',
  // Both the wash and the label are positioned with `z-index: auto`, so they
  // paint in DOM order — without this the absolutely positioned wash would sit
  // over the lettering.
  position: 'relative'
})

/** Books too thin to letter still need an accessible name. */
export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0
})
