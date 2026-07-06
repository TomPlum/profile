export type BranchName = 'career' | 'open-source' | 'languages' | 'puzzles'

/** Key into the palette's lane colours. */
export type LaneKey = 'career' | 'oss' | 'languages' | 'puzzles'

export interface Branch {
  name: BranchName
  lane: LaneKey
  /** Shown in the branch legend / filter. */
  blurb: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  name: string
  /** Plain English: what it is, for a reader who may not be technical. */
  oneLiner: string
  /** The recruiter translation: what this proves about me. */
  whatItShows: string
  stack: string[]
  /** Real, verifiable numbers only. */
  facts?: string[]
  links: ProjectLink[]
}

export interface Commit {
  /** Stable slug — also seeds the displayed (deterministic) short hash. */
  id: string
  branch: BranchName
  /** ISO date (yyyy-mm-dd). Drives sort order of the log. */
  date: string
  /** Optional display override, e.g. when only the year is certain. */
  dateLabel?: string
  /** The commit subject line. Plain English, no conventional-commit jargon. */
  title: string
  /** One or two sentences, always visible under the title. */
  summary: string
  /** Rendered as git tags on the row. */
  tags?: string[]
  /** Longer body revealed on expansion (used when there is no project). */
  body?: string
  /** Expanding the row reveals this project's card. */
  projectId?: string
}
