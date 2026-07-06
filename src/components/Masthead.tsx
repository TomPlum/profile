import { useState } from 'react'
import { profile } from '../data/profile'
import { monoLink } from '../styles/controls.css'
import { TechIcon } from './TechIcon'
import * as css from './Masthead.css'

export const Masthead = () => {
  const [active, setActive] = useState(0)
  const cyclePhoto = () => setActive((i) => (i + 1) % profile.photos.length)

  return (
  <section className={css.masthead} aria-label="Introduction">
    <div className={css.copy}>
      <p className={css.eyebrow}>
        <span>~/thomas-plumpton</span>
        <span className={css.eyebrowDivider} aria-hidden="true">
          ·
        </span>
        <span>{profile.location}</span>
      </p>

      <h1 className={css.name}>{profile.name}</h1>

      <p className={css.roleLine}>
        {profile.role} at{' '}
        <span className={css.company}>
          <a className={css.companyLink} href={profile.companyHref} target="_blank" rel="noopener">
            {profile.company}
          </a>
          <img className={css.companyLogo} src={profile.companyLogo} alt="" aria-hidden="true" />
          <img className={css.companyLogoDark} src={profile.companyLogoDark} alt="" aria-hidden="true" />
        </span>
      </p>

      <p className={css.value}>{profile.valueStatement}</p>

      <ul className={css.stackRow} aria-label="Core stack">
        {profile.stack.map((tech) => (
          <li key={tech} className={css.techChip}>
            <span className={css.techIcon}>
              <TechIcon name={tech} />
            </span>
            {tech}
          </li>
        ))}
      </ul>

      <p className={css.linksRow}>
        <a className={`${monoLink} ${css.iconLink}`} href={profile.links.github} target="_blank" rel="noopener">
          <TechIcon name="GitHub" />
          GitHub
        </a>
        <a className={monoLink} href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>

      <p className={css.currently}>{profile.currently}</p>
    </div>

    <figure className={css.portrait}>
      <button
        type="button"
        className={css.portraitButton}
        onClick={cyclePhoto}
        aria-label="Show another photo of Thomas"
        title="Show another photo"
      >
        {profile.photos.map((photo, i) => (
          <img
            key={photo.src}
            className={css.portraitImage}
            data-active={i === active}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        ))}
        <span className={css.portraitCycle} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v5h-5" />
          </svg>
          {active + 1}/{profile.photos.length}
        </span>
      </button>
    </figure>
  </section>
  )
}
