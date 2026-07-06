import type { CSSProperties, ReactNode } from 'react'
import type { Commit } from '../data/types'
import { chip } from '../styles/controls.css'
import * as css from './CommitDetail.css'
import * as projectCss from './ProjectDetail.css'
import { TechIcon } from './TechIcon'
import { renderInline } from './InlineCode'

interface CommitDetailProps {
  commit: Commit
  /** The branch lane colour, used as the card's accent. */
  laneColour?: string
}

/** The Codex mark on a rounded, theme-aware badge. */
const CodexMark = () => (
  <div className={css.logoBadge}>
    <img src="codex-logo.svg" alt="Codex logo" width="68" height="68" />
  </div>
)

/** Bespoke visual asides for body-only commits, keyed by commit id. */
const visualFor = (id: string): ReactNode => {
  switch (id) {
    case 'codex-adoption':
      return <CodexMark />
    default:
      return null
  }
}

/**
 * The expanded card for commits that carry a body rather than a project —
 * same dress as ProjectDetail (stack chips, card chrome) so the log reads
 * as one system.
 */
export const CommitDetail = ({ commit, laneColour }: CommitDetailProps) => {
  const visual = visualFor(commit.id)

  return (
    <div
      className={projectCss.card}
      style={laneColour ? ({ '--lane': laneColour } as CSSProperties) : undefined}
    >
      {commit.stack && commit.stack.length > 0 && (
        <div className={projectCss.cardHeader}>
          {commit.stack.map((tech) => (
            <span key={tech} className={`${chip} ${projectCss.stackChip}`}>
              <TechIcon name={tech} />
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className={visual ? css.bodyWithVisual : undefined}>
        <p className={css.bodyText}>{commit.body && renderInline(commit.body)}</p>
        {visual}
      </div>
    </div>
  )
}
