const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

/** '2025-03-20' → 'Mar 2025'. Falls back to the raw string if unparseable. */
export const formatMonthYear = (iso: string): string => {
  const [year, month] = iso.split('-')
  const index = Number(month) - 1
  const name = MONTHS[index]
  if (!year || !name) {
    return iso
  }
  return `${name} ${year}`
}
