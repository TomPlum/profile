import type { Project } from '../data/types'
import { chip, monoLink } from '../styles/controls.css'
import * as css from './ProjectDetail.css'
import { TechIcon } from './TechIcon'

export const ProjectDetail = ({ project }: { project: Project }) => (
  <div className={css.card}>
    <div className={css.cardHeader}>
      <span className={css.projectName}>{project.name}</span>
      {project.stack.map((tech) => (
        <span key={tech} className={`${chip} ${css.stackChip}`}>
          <TechIcon name={tech} />
          {tech}
        </span>
      ))}
    </div>

    <p className={css.oneLiner}>{project.oneLiner}</p>

    <div>
      <p className={css.label}>What it shows</p>
      <p className={css.shows}>{project.whatItShows}</p>
    </div>

    {project.facts && project.facts.length > 0 && (
      <ul className={css.facts}>
        {project.facts.map((fact) => (
          <li key={fact} className={css.factItem}>
            {fact}
          </li>
        ))}
      </ul>
    )}

    {project.links.length > 0 ? (
      <p className={css.links}>
        {project.links.map((link) => (
          <a key={link.href} className={monoLink} href={link.href} target="_blank" rel="noopener">
            {link.label} ↗
          </a>
        ))}
      </p>
    ) : (
      <p className={css.privateNote}>source not public (yet)</p>
    )}
  </div>
)
