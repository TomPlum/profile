import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css'
import { dark, light, type Palette } from './palette'

const colourContract = {
  bg: null,
  surface: null,
  inset: null,
  ink: null,
  inkMuted: null,
  inkFaint: null,
  line: null,
  accent: null,
  accentInk: null,
  lane: {
    career: null,
    oss: null,
    languages: null,
    puzzles: null
  },
  spine: {
    five: null,
    four: null,
    three: null,
    low: null
  }
}

export const vars = createThemeContract({
  colour: colourContract,
  font: {
    display: null,
    mono: null
  }
})

const fonts = {
  display: "'Fraunces Variable', 'Iowan Old Style', Georgia, serif",
  mono: "'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"
}

const theme = (palette: Palette) => ({
  colour: palette,
  font: fonts
})

createGlobalTheme(':root[data-theme="light"]', vars, theme(light))
createGlobalTheme(':root[data-theme="dark"]', vars, theme(dark))
