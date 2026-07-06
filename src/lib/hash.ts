/**
 * Deterministic 7-char "short hash" for a commit id (FNV-1a). The hashes are
 * cosmetic, but deriving them from the id keeps them stable across builds —
 * a hash that changed on every deploy would be a lie twice over.
 */
export const shortHash = (seed: string): string => {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}
