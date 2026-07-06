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
  lane: {
    career: '#A63D0F',
    oss: '#0B6153',
    languages: '#77398D',
    puzzles: '#6E5A0E'
  }
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
  }
}
