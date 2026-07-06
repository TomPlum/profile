import { describe, expect, it } from 'vitest'
import { shortHash } from './hash'

describe('shortHash', () => {
  it('is deterministic', () => {
    expect(shortHash('react-git-log')).toBe(shortHash('react-git-log'))
  })

  it('is 7 lowercase hex chars', () => {
    expect(shortHash('staff-engineer')).toMatch(/^[0-9a-f]{7}$/)
  })

  it('differs across ids', () => {
    expect(shortHash('nyuusu')).not.toBe(shortHash('natomski'))
  })
})
