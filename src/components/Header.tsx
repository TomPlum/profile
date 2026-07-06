import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { buttonGhost, buttonPrimary } from '../styles/controls.css'
import * as css from './Header.css'

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

/**
 * Deliberately boring. The always-visible routes to Contact and the CV live
 * here so nothing playful ever stands between a recruiter and either one.
 */
export const Header = () => {
  const { theme, toggle } = useTheme()

  return (
    <header className={css.header}>
      <a href="#log" className={css.skipLink}>
        Skip to the log
      </a>
      <div className={css.inner}>
        <div className={css.identity}>
          <a href="#top" className={css.name}>
            {profile.name}
          </a>
          <span className={css.role}>{profile.role}</span>
        </div>
        <div className={css.actions}>
          <button
            type="button"
            className={css.themeToggle}
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a className={buttonGhost} href={`mailto:${profile.email}`}>
            Contact
          </a>
          <a className={buttonPrimary} href={profile.cvHref} target="_blank" rel="noopener">
            CV<span className={css.cvSuffix}>&nbsp;(PDF)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
