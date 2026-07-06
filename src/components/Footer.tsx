import { profile } from '../data/profile'
import { buttonGhost, buttonPrimary } from '../styles/controls.css'
import * as css from './Footer.css'

export const Footer = () => (
  <>
    <section id="contact" className={css.contact} aria-label="Contact">
      <div className={css.contactInner}>
        <h2 className={css.heading}>Let’s talk.</h2>
        <p className={css.blurb}>
          The fastest route is email — I read everything. The CV is the same story as the log
          above, in a format your ATS will like.
        </p>
        <p className={css.actions}>
          <a className={`${buttonPrimary} ${css.emailButton}`} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className={buttonGhost} href={profile.cvHref} target="_blank" rel="noopener">
            CV (PDF)
          </a>
          <a className={buttonGhost} href={profile.links.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a className={buttonGhost} href={profile.links.twitter} target="_blank" rel="noopener">
            X / Twitter
          </a>
        </p>
      </div>
    </section>

    <footer className={css.colophon}>
      <div className={css.colophonInner}>
        <p>
          Designed and built by me — React, TypeScript, vanilla-extract. Type set in Fraunces and
          JetBrains Mono. No tracking, no cookies, no analytics.
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
          , my own npm component. Keyboard users: j / k walk the commits.
        </p>
      </div>
    </footer>
  </>
)
