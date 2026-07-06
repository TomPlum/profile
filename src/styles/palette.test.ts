import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../lib/contrast'
import { dark, light, type Palette } from './palette'

/**
 * The colour system is quality-gated: every foreground/background pair the UI
 * actually uses must meet WCAG AA for normal text (≥ 4.5:1). Change a colour
 * and break a pairing, and the build fails.
 */
const themes: Array<[string, Palette]> = [
  ['light', light],
  ['dark', dark]
]

describe.each(themes)('%s theme contrast (WCAG AA, normal text)', (_name, p) => {
  const pairs: Array<[string, string, string]> = [
    ['ink on bg', p.ink, p.bg],
    ['ink on surface', p.ink, p.surface],
    ['ink on inset (chips)', p.ink, p.inset],
    ['inkMuted on bg', p.inkMuted, p.bg],
    ['inkMuted on surface', p.inkMuted, p.surface],
    ['inkFaint on bg', p.inkFaint, p.bg],
    ['inkFaint on surface', p.inkFaint, p.surface],
    ['accent on bg', p.accent, p.bg],
    ['accentInk on accent (primary button)', p.accentInk, p.accent],
    ['bg on ink (primary button hover)', p.bg, p.ink],
    ['career lane on bg', p.lane.career, p.bg],
    ['career lane on surface', p.lane.career, p.surface],
    ['oss lane on bg', p.lane.oss, p.bg],
    ['oss lane on surface', p.lane.oss, p.surface],
    ['languages lane on bg', p.lane.languages, p.bg],
    ['languages lane on surface', p.lane.languages, p.surface],
    ['puzzles lane on bg', p.lane.puzzles, p.bg],
    ['puzzles lane on surface', p.lane.puzzles, p.surface]
  ]

  it.each(pairs)('%s ≥ 4.5:1', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })
})
