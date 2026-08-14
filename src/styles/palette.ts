/**
 * The raw colour values for both themes, kept as plain data (rather than
 * inside .css.ts files) so unit tests can assert WCAG contrast against them.
 *
 * Rationale: the light theme is "warm engineering paper" — ink on cream, like
 * a printed log. The dark theme is a warm terminal near-black. The four branch
 * lane colours ARE the accent system; `career` doubles as the CTA colour.
 */
export interface Palette {
  bg: string
  surface: string
  inset: string
  ink: string
  inkMuted: string
  inkFaint: string
  line: string
  accent: string
  accentInk: string
  lane: {
    career: string
    oss: string
    languages: string
    puzzles: string
  }
  /** Book-spine tints on the shelf page — see `spineRamp` below. */
  spine: Record<'career' | 'oss' | 'languages' | 'puzzles', SpineRamp>
}

interface SpineRamp {
  five: string
  four: string
  three: string
  low: string
}

const channels = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16)
]

/** Linear blend of two hex colours; `weight` is how much of `a` survives. */
const mix = (a: string, b: string, weight: number): string => {
  const [ar, ag, ab] = channels(a)
  const [br, bg, bb] = channels(b)
  const channel = (x: number, y: number) =>
    Math.round(x * weight + y * (1 - weight))
      .toString(16)
      .padStart(2, '0')
  return `#${channel(ar, br)}${channel(ag, bg)}${channel(ab, bb)}`.toUpperCase()
}

/**
 * A spine's hue says which series run it belongs to; its strength says how the
 * book was rated. The hues are the four existing lane colours washed into the
 * page surface — no new accents — and they stop well short of full saturation
 * so spine lettering stays plain `ink` and keeps its contrast in both themes.
 * The lane colour runs at full strength only in the head band, which carries
 * no text. Every rung of every lane is gated in `palette.test.ts`.
 */
const spineRamp = (lane: string, surface: string): SpineRamp => ({
  // 0.22 is the ceiling: above it, inkMuted on a five-star `puzzles` spine
  // drops under 4.5:1 in the dark theme.
  five: mix(lane, surface, 0.22),
  four: mix(lane, surface, 0.14),
  three: mix(lane, surface, 0.08),
  low: mix(lane, surface, 0.042)
})

/**
 * How much of a book's own jacket is allowed to show through its spine.
 *
 * Shared with `Shelf.css.ts` so the figure the contrast gate below reasons
 * about is the one actually rendered. Paper multiplies the artwork into the
 * tint; the dark theme screens it, or the spines would crush to black.
 */
export const spineWash = { light: 0.18, dark: 0.135 } as const

/**
 * The worst a wash can do to a spine, which is what the lettering has to hold
 * against. Jacket art is full-range, so assume the extreme pixel: a black one
 * multiplied into the tint on paper, a white one screened over it in the dark.
 * Anything less extreme lands between that and the bare tint.
 */
export const washedSpine = (tint: string, mode: keyof typeof spineWash): string =>
  mix(tint, mode === 'light' ? '#000000' : '#FFFFFF', 1 - spineWash[mode])

const spines = (lanes: Palette['lane'], surface: string): Palette['spine'] => ({
  career: spineRamp(lanes.career, surface),
  oss: spineRamp(lanes.oss, surface),
  languages: spineRamp(lanes.languages, surface),
  puzzles: spineRamp(lanes.puzzles, surface)
})

const lightLanes = {
  career: '#A63D0F',
  oss: '#0B6153',
  languages: '#77398D',
  puzzles: '#6E5A0E'
}

const darkLanes = {
  career: '#E08948',
  oss: '#4BBFA5',
  languages: '#C68BDB',
  puzzles: '#C9AC3E'
}

export const light: Palette = {
  bg: '#F4EFE6',
  surface: '#FBF8F1',
  inset: '#EAE3D3',
  ink: '#211D16',
  inkMuted: '#5F5647',
  inkFaint: '#6E6452',
  line: '#DCD3C0',
  accent: '#A63D0F',
  accentInk: '#FFF6EA',
  lane: lightLanes,
  spine: spines(lightLanes, '#FBF8F1')
}

export const dark: Palette = {
  bg: '#15120C',
  surface: '#1E1A12',
  inset: '#282217',
  ink: '#EAE2D3',
  inkMuted: '#B3A78F',
  inkFaint: '#A2967E',
  line: '#3B3425',
  accent: '#E08948',
  accentInk: '#231205',
  lane: darkLanes,
  spine: spines(darkLanes, '#1E1A12')
}
