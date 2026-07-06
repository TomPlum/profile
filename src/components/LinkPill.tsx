import { TechIcon } from './TechIcon'
import * as css from './LinkPill.css'

/** The conventional external-link mark: a box with an arrow escaping it. */
export const ExternalIcon = () => (
  <svg
    className={css.externalIcon}
    viewBox="0 0 24 24"
    width="0.85em"
    height="0.85em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
  </svg>
)

interface LinkPillProps {
  label: string
  href: string
  /** A TechIcon name, or a path to an image asset (contains a dot). */
  icon?: string
}

/** External links as pills: brand mark, label, and the external-link icon. */
export const LinkPill = ({ label, href, icon }: LinkPillProps) => (
  <a className={css.pill} href={href} target="_blank" rel="noopener">
    {icon &&
      (icon.includes('.') ? (
        <img className={css.iconImage} src={icon} alt="" width="15" height="15" />
      ) : (
        <TechIcon name={icon} />
      ))}
    <span>{label}</span>
    <ExternalIcon />
  </a>
)
