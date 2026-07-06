import { profile } from '../data/profile'
import { buttonGhost, buttonPrimary } from '../styles/controls.css'
import { TechIcon } from './TechIcon'
import * as css from './Footer.css'

const SPARKLE =
  'M12 1.6C12.35 7.9 16.1 11.65 22.4 12 16.1 12.35 12.35 16.1 12 22.4 11.65 16.1 7.9 12.35 1.6 12 7.9 11.65 11.65 7.9 12 1.6Z'

/** The animated Claude mark — a twinkling sparkle, like the CLI spinner. */
const ClaudeMark = () => (
  <svg className={css.claudeMark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={SPARKLE} />
    <path d={SPARKLE} opacity={0.55} transform="rotate(45 12 12) translate(12 12) scale(0.5) translate(-12 -12)" />
  </svg>
)

export const Footer = () => (
  <>
    <section id="contact" className={css.contact} aria-label="Contact">
      <div className={css.contactInner}>
        <h2 className={css.heading}>Get in touch</h2>
        <p className={css.blurb}>
          Email is the best way to reach me — I read everything that comes in. My CV covers the
          same ground as the log above, if you’d like it in a more traditional format.
        </p>
        <p className={css.actions}>
          <a className={`${buttonPrimary} ${css.emailButton}`} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className={buttonGhost} href={profile.cvHref} target="_blank" rel="noopener">
            CV (PDF)
          </a>
          <a className={buttonGhost} href={profile.links.github} target="_blank" rel="noopener">
            <TechIcon name="GitHub" />
            GitHub
          </a>
          <a className={buttonGhost} href={profile.links.linkedin} target="_blank" rel="noopener">
            <TechIcon name="LinkedIn" />
            LinkedIn
          </a>
        </p>
      </div>
    </section>

    <footer className={css.colophon}>
      <div className={css.colophonInner}>
        <p>
          Built by Thomas Plumpton with{' '}
          <a className={css.claudeLink} href="https://claude.com/claude-code" target="_blank" rel="noopener">
            <ClaudeMark />
            Claude Code
          </a>
          . React, TypeScript and vanilla-extract; type set in Fraunces and JetBrains Mono. No
          tracking, no cookies, no analytics.
        </p>
        <p>
          The log is drawn in the style of{' '}
          <a
            className={css.colophonLink}
            href="https://github.com/TomPlum/react-git-log"
            target="_blank"
            rel="noopener"
          >
            react-git-log
          </a>
          , my own npm component. Keyboard users:{' '}
          <kbd className={css.kbd}>j</kbd> <kbd className={css.kbd}>k</kbd> walk the commits.
        </p>
      </div>
    </footer>
  </>
)
