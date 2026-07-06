import type { CSSProperties } from 'react'
import type { Project } from '../data/types'
import { chip } from '../styles/controls.css'
import * as css from './ProjectDetail.css'
import { TechIcon } from './TechIcon'
import { ExternalIcon, LinkPill } from './LinkPill'
import { renderInline } from './InlineCode'

const clockAngles = [
  ['0deg', '90deg'],
  ['45deg', '135deg'],
  ['90deg', '0deg'],
  ['135deg', '45deg'],
  ['180deg', '270deg'],
  ['225deg', '315deg'],
  ['270deg', '180deg'],
  ['315deg', '225deg'],
  ['30deg', '210deg'],
  ['60deg', '240deg'],
  ['120deg', '300deg'],
  ['150deg', '330deg']
] as const

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
        return (
          <div className={css.clockPreview}>
            {clockAngles.map(([a, b], index) => (
              <span key={`${a}-${b}-${index}`} className={css.clockFace}>
                <span className={css.clockHand} style={{ '--angle': a } as CSSProperties} />
                <span className={css.clockHandAlt} style={{ '--angle': b } as CSSProperties} />
              </span>
            ))}
          </div>
        )
      case 'sleep-chart':
        return (
          <div className={css.chartPreview}>
            {[42, 64, 55, 72, 48, 81, 68, 58, 76, 62].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className={index % 2 === 0 ? css.chartBar : css.chartBarAlt}
                style={{ '--height': `${height}%` } as CSSProperties}
              />
            ))}
          </div>
        )
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
