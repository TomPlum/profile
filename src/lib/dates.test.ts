import { describe, expect, it } from 'vitest'
import { formatMonthYear } from './dates'

describe('formatMonthYear', () => {
  it('formats an ISO date', () => {
    expect(formatMonthYear('2025-03-20')).toBe('Mar 2025')
  })

  it('formats December correctly', () => {
    expect(formatMonthYear('2018-12-25')).toBe('Dec 2018')
  })

  it('falls back to the raw string when unparseable', () => {
    expect(formatMonthYear('sometime')).toBe('sometime')
  })
})
