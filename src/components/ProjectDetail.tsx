import type { CSSProperties } from 'react'
import type { Project } from '../data/types'
import { chip } from '../styles/controls.css'
import * as css from './ProjectDetail.css'
import { TechIcon } from './TechIcon'
import { ExternalIcon, LinkPill } from './LinkPill'
import { renderInline } from './InlineCode'
import { TypeInvadersCard } from './TypeInvadersCard'
import { ClockGrid } from './ClockGrid'

/**
 * A small area chart in the shape the live activity-trends dashboard draws with
 * Recharts — a smoothed trend line with a soft fill beneath it. Purely a visual
 * stand-in (fixed sample data), so it's aria-hidden; the caption carries meaning.
 */
const ActivityChart = () => {
  const values = [0.28, 0.52, 0.4, 0.68, 0.5, 0.86, 0.6, 0.44, 0.72, 0.55, 0.95, 0.78]
  const W = 100
  const H = 34
  const top = 3
  const bottom = 2
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W
    const y = top + (1 - v) * (H - top - bottom)
    return [x, y] as const
  })
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
  const area = `${line} L ${W} ${H} L 0 ${H} Z`

  return (
    <svg
      className={css.dashboardSvg}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className={css.dashboardArea} d={area} />
      <path className={css.dashboardLine} d={line} />
      {points.map(([x, y], i) => (
        <circle key={i} className={css.dashboardPoint} cx={x} cy={y} r={1.4} />
      ))}
    </svg>
  )
}

/**
 * A miniature of the sleep project's compare-metrics view: four stage lines
 * in the app's own metric colours (src/styles/_colours.scss in the sleep
 * repo). The shapes echo the real story — a visible step around two-thirds
 * in where deep sleep rises and awake time falls. Fixed sample data,
 * aria-hidden; the caption carries meaning.
 */
const sleepSeries: { label: string; colour: string; values: number[] }[] = [
  { label: 'light', colour: '#54EA99', values: [0.58, 0.62, 0.55, 0.6, 0.64, 0.57, 0.61, 0.58, 0.55, 0.6, 0.57, 0.59] },
  { label: 'deep', colour: '#1596FF', values: [0.18, 0.14, 0.2, 0.16, 0.13, 0.18, 0.15, 0.28, 0.33, 0.3, 0.35, 0.32] },
  { label: 'rem', colour: '#FF47E7', values: [0.2, 0.24, 0.18, 0.22, 0.19, 0.23, 0.2, 0.25, 0.27, 0.24, 0.28, 0.26] },
  { label: 'awake', colour: '#FFBC15', values: [0.34, 0.28, 0.38, 0.3, 0.36, 0.32, 0.35, 0.14, 0.1, 0.12, 0.08, 0.1] }
]

const SleepChart = () => {
  const W = 100
  const H = 38
  const top = 3
  const bottom = 3
  const toPath = (values: number[]) =>
    values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * W
        const y = top + (1 - v) * (H - top - bottom)
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(' ')
  // The night the fixes took hold, between samples 6 and 7.
  const shiftX = (6.5 / 11) * W

  return (
    <div className={css.sleepPreview} aria-hidden="true">
      <svg className={css.dashboardSvg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" focusable="false">
        <line className={css.sleepShiftLine} x1={shiftX} y1="0" x2={shiftX} y2={H} />
        {sleepSeries.map((series) => (
          <path key={series.label} className={css.sleepLine} style={{ stroke: series.colour }} d={toPath(series.values)} />
        ))}
      </svg>
      <div className={css.sleepLegend}>
        {sleepSeries.map((series) => (
          <span key={series.label} className={css.sleepLegendItem}>
            <span className={css.sleepLegendDot} style={{ backgroundColor: series.colour }} />
            {series.label}
          </span>
        ))}
      </div>
    </div>
  )
}

const ProjectPreview = ({ project }: { project: Project }) => {
  if (!project.preview) return null

  const body = (() => {
    switch (project.preview.kind) {
      case 'git-log':
        return (
          <div className={css.gitPreview}>
            <span className={css.previewRail} />
            <span className={css.previewRailAlt} />
            <span className={css.previewDot} />
            <span className={css.previewDotAlt} />
            <span className={css.previewLine}>41a69b2 Published react-git-log</span>
            <span className={css.previewLineMuted}>tag: v3.5.1 · branch: open-source</span>
          </div>
        )
      case 'kana-drills':
        return (
          <div className={css.drillPreview}>
            <span className={css.previewToken}>kana</span>
            <strong className={css.previewGlyph}>あ</strong>
            <span className={css.previewToken}>vocab</span>
            <strong className={css.previewGlyph}>日</strong>
          </div>
        )
      case 'polish-drills':
        return (
          <div className={css.drillPreview}>
            <span className={css.previewToken}>słowo</span>
            <strong className={css.previewGlyph}>ść</strong>
            <span className={css.previewToken}>tryb</span>
            <strong className={css.previewGlyph}>ż</strong>
          </div>
        )
      case 'natomski-mascot':
        return (
          <div className={css.mascotPreview}>
            <div className={css.mascotBubble}>
              <span>listen-and-type</span>
              <strong>dzień dobry</strong>
              <em>type what Orlek says</em>
            </div>
            <img
              className={css.mascotGif}
              src="natomski-orlek-idle.gif"
              alt="Orlek, Natomski's animated White Eagle mascot"
              width="124"
              height="124"
            />
            <img
              className={css.mascotStatic}
              src="natomski-orlek-idle.png"
              alt="Orlek, Natomski's White Eagle mascot"
              width="124"
              height="124"
            />
          </div>
        )
      case 'news-reader':
        return (
          <div className={css.newsPreview}>
            <span className={css.newsMeta}>日本のニュース</span>
            <strong className={css.newsHeadline}>Headline study queue</strong>
            <span className={css.newsMeta}>lookup → Anki export</span>
          </div>
        )
      case 'clock-grid':
        return <ClockGrid />
      case 'sleep-chart':
        return <SleepChart />
      case 'activity-dashboard':
        return (
          <div className={css.dashboardPreview}>
            <span className={css.dashboardLabel}>steps</span>
            <strong className={css.dashboardValue}>12.4k</strong>
            <span className={css.dashboardLabel}>active</span>
            <strong className={css.dashboardValue}>84m</strong>
            <div className={css.dashboardChart}>
              <ActivityChart />
            </div>
          </div>
        )
      case 'aoc-tests':
        return (
          <div className={css.terminalPreview}>
            <span className={css.terminalCommand}>$ ./gradlew test</span>
            <span className={css.terminalLine}>Day25Test PASSED</span>
            <span className={css.terminalSuccess}>BUILD SUCCESSFUL</span>
          </div>
        )
    }
  })()

  return (
    <figure className={css.preview} aria-label={`${project.name} visual preview`}>
      {body}
      <figcaption className={css.previewCaption}>{project.preview.caption}</figcaption>
    </figure>
  )
}

interface ProjectDetailProps {
  project: Project
  /** The branch lane colour, used as the card's accent. */
  laneColour?: string
}

export const ProjectDetail = ({ project, laneColour }: ProjectDetailProps) => (
  <div className={css.card} style={laneColour ? ({ '--lane': laneColour } as CSSProperties) : undefined}>
    <div className={css.cardHeader}>
      <span className={css.projectName}>{project.name}</span>
      {project.stack.map((tech) => (
        <span key={tech} className={`${chip} ${css.stackChip}`}>
          <TechIcon name={tech} />
          {tech}
        </span>
      ))}
    </div>

    <p className={css.oneLiner}>{renderInline(project.oneLiner)}</p>

    <ProjectPreview project={project} />

    <div>
      <p className={css.label}>What it shows</p>
      <p className={css.shows}>{renderInline(project.whatItShows)}</p>
    </div>

    {/* Bespoke second visual: natomski's arcade mode is a core feature. */}
    {project.id === 'natomski' && <TypeInvadersCard />}

    {project.sections?.map((section) => (
      <div key={section.label}>
        <p className={css.label}>{section.label}</p>
        <p className={css.shows}>{renderInline(section.text)}</p>
      </div>
    ))}

    {project.facts && project.facts.length > 0 && (
      <ul className={css.facts}>
        {project.facts.map((fact) => (
          <li key={fact.text} className={css.factItem}>
            <span className={css.factMarker} aria-hidden="true" />
            <span className={css.factText}>
              {renderInline(fact.text)}{' '}
              <a className={css.factSource} href={fact.source.href} target="_blank" rel="noopener">
                {fact.source.label}
                <ExternalIcon />
              </a>
            </span>
          </li>
        ))}
      </ul>
    )}

    {project.links.length > 0 ? (
      <p className={css.links}>
        {project.links.map((link) => (
          <LinkPill key={link.href} label={link.label} href={link.href} icon={link.icon} />
        ))}
      </p>
    ) : (
      <p className={css.privateNote}>source not public (yet)</p>
    )}
  </div>
)
