import { profile } from '../data/profile'
import { chip, monoLink } from '../styles/controls.css'
import * as css from './Masthead.css'

export const Masthead = () => (
  <section className={css.masthead} aria-label="Introduction">
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
      <a className={css.companyLink} href={profile.companyHref} target="_blank" rel="noopener">
        {profile.company}
      </a>
    </p>

    <p className={css.value}>{profile.valueStatement}</p>

    <ul className={css.stackRow} aria-label="Core stack">
      {profile.stack.map((tech) => (
        <li key={tech} className={chip}>
          {tech}
        </li>
      ))}
    </ul>

    <p className={css.linksRow}>
      <a className={monoLink} href={profile.links.github} target="_blank" rel="noopener">
        GitHub ↗
      </a>
      <a className={monoLink} href={profile.links.twitter} target="_blank" rel="noopener">
        X / Twitter ↗
      </a>
      <a className={monoLink} href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
    </p>

    <p className={css.currently}>{profile.currently}</p>
  </section>
)
