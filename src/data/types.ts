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
  /** A TechIcon name (e.g. 'GitHub'), or an image path for bespoke marks. */
  icon?: string
}

export interface ProjectFact {
  text: string
  source: ProjectLink
  /** ISO date when the fact was last checked. */
  verifiedAt: string
}

export type ProjectPreviewKind =
  | 'git-log'
  | 'kana-drills'
  | 'polish-drills'
  | 'natomski-mascot'
  | 'news-reader'
  | 'clock-grid'
  | 'biodata-dashboard'
  | 'will-writing-service'
  | 'sleep-chart'
  | 'activity-dashboard'
  | 'aoc-tests'

export interface ProjectPreview {
  kind: ProjectPreviewKind
  caption: string
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
  facts?: ProjectFact[]
  /** Extra labelled paragraphs after "What it shows" (backticks render as code). */
  sections?: { label: string; text: string }[]
  /** Compact visual proof point shown inside the expandable project card. */
  preview?: ProjectPreview
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
  /** Tech chips shown on the expanded body card (each needs a TechIcon). */
  stack?: string[]
  /** Expanding the row reveals this project's card. */
  projectId?: string
}
