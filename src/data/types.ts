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

export type BookShelf = 'read' | 'currently-reading' | 'to-read'

/**
 * One row of the Goodreads export, after `scripts/import-goodreads.mjs` has
 * stripped the private columns. Most fields are optional because the export
 * genuinely is patchy — see the caveats rendered on the shelf page.
 */
export interface Book {
  /** Stable slug of author + title. Also names the cover file in public/covers. */
  id: string
  title: string
  author: string
  /** Goodreads hides series in the title string; the importer splits them out. */
  series?: string
  seriesIndex?: number
  shelf: BookShelf
  /** 1–5, or 0 for unrated — a third of the read shelf never got a rating. */
  rating: number
  pages?: number
  /** Original publication year where known, else the edition's year. */
  published?: number
  /** Goodreads only recorded a finish date for a minority of these. */
  dateRead?: string
  dateAdded?: string
  /**
   * The edition on the shelf. `scripts/fetch-covers.mjs` uses these to fetch
   * the jacket of the printing actually read rather than any old edition: the
   * ISBN pins it exactly, and publisher + year narrow it down when Goodreads
   * recorded no ISBN.
   */
  isbn13?: string
  isbn10?: string
  publisher?: string
  binding?: string
  /** The edition's year, as opposed to `published` (the work's first). */
  editionYear?: number
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
