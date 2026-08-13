import { segment, segmented } from '../styles/controls.css'
import type { ShelfView } from './Shelf'

/** Books stood on end, at the heights the wall actually draws them. */
const SpinesIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <rect x="1" y="3" width="2.6" height="11" rx="0.6" />
    <rect x="4.4" y="5" width="2.2" height="9" rx="0.6" />
    <rect x="7.4" y="2" width="3" height="12" rx="0.6" />
    <rect x="11.2" y="4.5" width="2.4" height="9.5" rx="0.6" />
  </svg>
)

/** The same books turned face-out. */
const CoversIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <rect x="1.4" y="1.8" width="5.6" height="5.6" rx="0.8" />
    <rect x="9" y="1.8" width="5.6" height="5.6" rx="0.8" />
    <rect x="1.4" y="8.8" width="5.6" height="5.6" rx="0.8" />
    <rect x="9" y="8.8" width="5.6" height="5.6" rx="0.8" />
  </svg>
)

const OPTIONS: Array<{ id: ShelfView; label: string; Icon: () => React.JSX.Element }> = [
  { id: 'spines', label: 'Spines', Icon: SpinesIcon },
  { id: 'covers', label: 'Covers', Icon: CoversIcon }
]

/**
 * One control, two segments — spine-out or face-out. The pressed state carries
 * the choice, so it stays a single toggle rather than two chips that could both
 * look unselected.
 */
export const ViewSwitch = ({
  view,
  onChange
}: {
  view: ShelfView
  onChange: (view: ShelfView) => void
}) => (
  <div className={segmented} role="group" aria-label="Change the view">
    {OPTIONS.map(({ id, label, Icon }) => (
      <button
        key={id}
        type="button"
        className={segment}
        aria-pressed={view === id}
        onClick={() => onChange(id)}
      >
        <Icon />
        {label}
      </button>
    ))}
  </div>
)
