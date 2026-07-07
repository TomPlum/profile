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

/**
 * A miniature CLI session running Claude Code. Lines type themselves in when
 * the card expands (the global reduced-motion kill-switch reveals them
 * instantly); the session it plays back mirrors the orchestration workflow
 * the body text describes.
 */
const claudeSession: { text: string; kind: 'command' | 'claude' | 'tool' | 'ok' }[] = [
  { text: '$ claude', kind: 'command' },
  { text: '✻ Claude Code', kind: 'claude' },
  { text: '> fix the flaky SRS test', kind: 'command' },
  { text: '⏺ Read scheduler.test.ts', kind: 'tool' },
  { text: '⏺ Edit srs/scheduler.ts', kind: 'tool' },
  { text: '⏺ Bash npm test', kind: 'tool' },
  { text: '✓ 58 passed · 2 agents reviewing', kind: 'ok' }
]

const ClaudeCodeTerminal = () => (
  <div className={css.terminal} aria-hidden="true">
    <div className={css.terminalBar}>
      <span className={css.terminalDot} />
      <span className={css.terminalDot} />
      <span className={css.terminalDot} />
    </div>
    {claudeSession.map((line, index) => (
      <span
        key={line.text}
        className={`${css.terminalRow} ${css.terminalKind[line.kind]}`}
        style={{ animationDelay: `${0.35 + index * 0.55}s` }}
      >
        {line.text}
      </span>
    ))}
    <span
      className={css.terminalCursor}
      style={{ animationDelay: `${0.35 + claudeSession.length * 0.55}s` }}
    />
  </div>
)

const serviceSteps = ['request', 'Spring API', 'verify', 'decision']

const BarclaysIdvFlow = () => (
  <div className={css.idvPreview} aria-hidden="true">
    <div className={css.idvFlow}>
      {serviceSteps.map((step, index) => (
        <span
          key={step}
          className={css.idvStep}
          style={{ animationDelay: `${0.1 + index * 0.12}s` }}
        >
          {step}
        </span>
      ))}
    </div>
    <div className={css.idvTrace}>
      <span className={css.idvTraceLine}>POST /identity/check</span>
      <span className={css.idvTraceLine}>domain event: verification.started</span>
      <span className={css.idvTraceOk}>JUnit PASS · contract tests green</span>
    </div>
  </div>
)

const randomnessSamples = [0.72, 0.24, 0.58, 0.91, 0.39, 0.66, 0.18, 0.83]

const DegreeRandomnessPreview = () => (
  <div className={css.degreePreview} aria-hidden="true">
    <div className={css.degreeStream}>
      <span className={css.degreeLabel}>social stream</span>
      <div className={css.degreeBars}>
        {randomnessSamples.map((sample, index) => (
          <span
            key={index}
            className={css.degreeBar}
            style={{ '--level': sample, animationDelay: `${0.12 + index * 0.06}s` } as CSSProperties}
          />
        ))}
      </div>
    </div>
    <div className={css.degreePipe}>
      <span className={css.degreePipeStep}>Twitter API</span>
      <span className={css.degreePipeStep}>entropy</span>
      <span className={css.degreePipeStep}>Robocode</span>
    </div>
    <div className={css.robocodeArena}>
      <span className={css.robocodeBotA} />
      <span className={css.robocodeBotB} />
      <span className={css.robocodeShot} />
    </div>
  </div>
)

const Ocean82Workbench = () => (
  <div className={css.oceanPreview} aria-hidden="true">
    <div className={css.oceanBrowser}>
      <div className={css.oceanBrowserBar}>
        <span className={css.oceanBrowserDot} />
        <span className={css.oceanBrowserDot} />
        <span className={css.oceanBrowserDot} />
      </div>
      <div className={css.oceanLayout}>
        <span className={css.oceanSidebar}>WP</span>
        <span className={css.oceanHero} />
        <span className={css.oceanLine} />
        <span className={css.oceanLineShort} />
      </div>
    </div>
    <div className={css.oceanStack}>
      <span className={css.oceanStackItem}>GravityForms</span>
      <span className={css.oceanStackItem}>LimeSurvey</span>
      <span className={css.oceanStackItem}>IIS</span>
    </div>
  </div>
)

/** Bespoke visual asides for body-only commits, keyed by commit id. */
const visualFor = (id: string): ReactNode => {
  switch (id) {
    case 'barclays-ba4':
    case 'joined-barclays':
      return <BarclaysIdvFlow />
    case 'codex-adoption':
      return <CodexMark />
    case 'claude-code-adoption':
      return <ClaudeCodeTerminal />
    case 'graduated':
      return <DegreeRandomnessPreview />
    case 'ocean82':
      return <Ocean82Workbench />
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
