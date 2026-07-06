import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'
const listeners = new Set<() => void>()

const getTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

const setTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Private browsing — the choice just won't persist.
  }
  listeners.forEach((notify) => notify())
}

const subscribe = (notify: () => void) => {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

/** Theme is resolved before first paint by the inline script in index.html. */
export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)
  const toggle = useCallback(() => setTheme(getTheme() === 'dark' ? 'light' : 'dark'), [])
  return { theme, toggle }
}
