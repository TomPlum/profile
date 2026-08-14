import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../lib/contrast'
import { dark, light, washedSpine, type Palette } from './palette'

/**
 * The colour system is quality-gated: every foreground/background pair the UI
 * actually uses must meet WCAG AA for normal text (≥ 4.5:1). Change a colour
 * and break a pairing, and the build fails.
 */
const themes: Array<['light' | 'dark', Palette]> = [
  ['light', light],
  ['dark', dark]
]

describe.each(themes)('%s theme contrast (WCAG AA, normal text)', (name, p) => {
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
    ['puzzles lane on surface', p.lane.puzzles, p.surface],
    ['puzzles lane on inset (tag chips)', p.lane.puzzles, p.inset],
    ['languages lane on inset', p.lane.languages, p.inset],
    ['oss lane on inset', p.lane.oss, p.inset],
    // Spine lettering is plain ink over the tint, so every rung of every lane
    // has to hold on its own — a series run can land on any of the four.
    // A wash of the book's own jacket sits over that tint, and an image is the
    // one background this file can't read. `washedSpine` stands in for it with
    // the worst pixel a cover can contain, so the wash is gated like a colour.
    ...(Object.entries(p.spine).flatMap(([lane, ramp]) =>
      Object.entries(ramp).flatMap(([rung, tint]) => [
        [`ink on ${lane} ${rung}-star spine`, p.ink, tint],
        [`inkMuted on ${lane} ${rung}-star spine`, p.inkMuted, tint],
        [`ink on washed ${lane} ${rung}-star spine`, p.ink, washedSpine(tint, name)]
      ])
    ) as Array<[string, string, string]>)
  ]

  it.each(pairs)('%s ≥ 4.5:1', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })
})
