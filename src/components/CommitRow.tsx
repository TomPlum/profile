import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import type { Branch, Commit } from '../data/types'
import { projectById } from '../data/projects'
import { formatMonthYear } from '../lib/dates'
import { shortHash } from '../lib/hash'
import { vars } from '../styles/theme.css'
import { ProjectDetail } from './ProjectDetail'
import * as css from './CommitLog.css'

interface CommitRowProps {
  commit: Commit
  branch: Branch
  /** True when this is the newest visible commit on its branch. */
  isHead: boolean
  expanded: boolean
  onToggle: (id: string) => void
  onHoverChange: (id: string | null) => void
  registerAnchor: (el: HTMLElement | null) => void
}

const Chevron = ({ open }: { open: boolean }) => (
  <span className={`${css.chevron} ${open ? css.chevronOpen : ''}`} aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </span>
)

export const CommitRow = ({ commit, branch, isHead, expanded, onToggle, onHoverChange, registerAnchor }: CommitRowProps) => {
  const reduceMotion = useReducedMotion() ?? false
  const project = commit.projectId ? projectById(commit.projectId) : undefined
  const expandable = Boolean(project || commit.body)
  const laneColour = vars.colour.lane[branch.lane]
  const detailId = `${commit.id}-detail`

  const header = (
    <>
      <span className={css.meta}>
        <span className={css.hash} style={{ color: laneColour }}>
          {shortHash(commit.id)}
        </span>
        <span className={css.date}>{commit.dateLabel ?? formatMonthYear(commit.date)}</span>
        {isHead && (
          <span className={css.branchChip} style={{ color: laneColour }}>
            {branch.name === 'career' ? 'HEAD → career' : branch.name}
          </span>
        )}
        {commit.tags?.map((tag) => (
          <span key={tag} className={css.tagChip}>
            tag: {tag}
          </span>
        ))}
        {expandable && <Chevron open={expanded} />}
      </span>
      <span className={css.title}>{commit.title}</span>
      <span className={css.summary}>{commit.summary}</span>
    </>
  )

  return (
    <li className={css.row}>
      {expandable ? (
        <div ref={registerAnchor}>
          <button
            type="button"
            className={css.headerButton}
            data-log-row
            aria-expanded={expanded}
            aria-controls={detailId}
            onClick={() => onToggle(commit.id)}
            onPointerEnter={() => onHoverChange(commit.id)}
            onPointerLeave={() => onHoverChange(null)}
            onFocus={() => onHoverChange(commit.id)}
            onBlur={() => onHoverChange(null)}
          >
            {header}
          </button>
        </div>
      ) : (
        <div
          ref={registerAnchor}
          className={css.headerStatic}
          data-log-row
          tabIndex={-1}
          onPointerEnter={() => onHoverChange(commit.id)}
          onPointerLeave={() => onHoverChange(null)}
          onFocus={() => onHoverChange(commit.id)}
          onBlur={() => onHoverChange(null)}
        >
          {header}
        </div>
      )}

      {expandable && (
        <AnimatePresence initial={false}>
          {expanded && (
            <m.div
              key="detail"
              className={css.detailRegion}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div id={detailId} className={css.detailInner}>
                {project ? <ProjectDetail project={project} /> : <p className={css.summary}>{commit.body}</p>}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      )}
    </li>
  )
}
