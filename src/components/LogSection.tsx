import { useMemo, useState } from 'react'
import { branches, sortedCommits } from '../data/commits'
import type { BranchName } from '../data/types'
import { vars } from '../styles/theme.css'
import { CommitLog } from './CommitLog'
import * as css from './LogSection.css'

type Filter = 'all' | BranchName

export const LogSection = () => {
  const [filter, setFilter] = useState<Filter>('all')

  const visibleBranches = useMemo(
    () => branches.filter((b) => filter === 'all' || b.name === filter),
    [filter]
  )
  const visibleCommits = useMemo(
    () => sortedCommits.filter((c) => filter === 'all' || c.branch === filter),
    [filter]
  )

  const commandArg = filter === 'all' ? '--all' : filter

  return (
    <section id="log" className={css.section} aria-label="Career log">
      <h2 className={css.command}>
        <span className={css.prompt} aria-hidden="true">
          $
        </span>
        git log --graph {commandArg}
        <span className={css.caret} aria-hidden="true" />
      </h2>
      <p className={css.caption}>
        My career and side projects, newest first. Read straight down, pick a branch to
        filter, or open a commit for the detail.
      </p>

      <div className={css.filters} role="group" aria-label="Filter the log by branch">
        <button type="button" className={css.filterChip} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          all branches
        </button>
        {branches.map((branch) => {
          const total = sortedCommits.filter((c) => c.branch === branch.name).length
          return (
            <button
              key={branch.name}
              type="button"
              className={css.filterChip}
              aria-pressed={filter === branch.name}
              onClick={() => setFilter(filter === branch.name ? 'all' : branch.name)}
              title={branch.blurb}
            >
              <span className={css.laneDot} style={{ color: vars.colour.lane[branch.lane] }} aria-hidden="true" />
              {branch.name}
              <span className={css.count}>{total}</span>
            </button>
          )
        })}
      </div>

      <CommitLog commits={visibleCommits} branches={visibleBranches} />
    </section>
  )
}
