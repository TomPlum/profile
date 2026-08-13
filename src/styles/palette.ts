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
  spine: {
    five: string
    four: string
    three: string
    low: string
  }
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
 * A spine's fill encodes its rating. The tints are the `languages` lane washed
 * into the page surface rather than four new colours — the four-lane accent
 * system still holds — and they stop well short of full saturation so that
 * spine lettering stays plain `ink` and keeps its contrast in both themes.
 * The saturated lane colour appears only as the spine's head band, which
 * carries no text.
 */
const spineRamp = (lane: string, surface: string) => ({
  five: mix(lane, surface, 0.25),
  four: mix(lane, surface, 0.155),
  three: mix(lane, surface, 0.085),
  low: mix(lane, surface, 0.045)
})

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
  lane: {
    career: '#A63D0F',
    oss: '#0B6153',
    languages: '#77398D',
    puzzles: '#6E5A0E'
  },
  spine: spineRamp('#77398D', '#FBF8F1')
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
  lane: {
    career: '#E08948',
    oss: '#4BBFA5',
    languages: '#C68BDB',
    puzzles: '#C9AC3E'
  },
  spine: spineRamp('#C68BDB', '#1E1A12')
}
