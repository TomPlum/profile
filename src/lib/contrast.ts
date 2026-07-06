/** WCAG 2.x relative luminance and contrast ratio, used by the palette tests. */

const channel = (value: number): number => {
  const c = value / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export const relativeLuminance = (hex: string): number => {
  const value = hex.replace('#', '')
  const r = channel(parseInt(value.slice(0, 2), 16))
  const g = channel(parseInt(value.slice(2, 4), 16))
  const b = channel(parseInt(value.slice(4, 6), 16))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contrastRatio = (a: string, b: string): number => {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [darker, lighter] = la < lb ? [la, lb] : [lb, la]
  return (lighter + 0.05) / (darker + 0.05)
}
