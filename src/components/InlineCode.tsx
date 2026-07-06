import type { ReactNode } from 'react'
import { inlineCode } from '../styles/controls.css'

/** A code reference set snugly inline with prose — `CLAUDE.md`, `requestAnimationFrame`. */
export const InlineCode = ({ children }: { children: ReactNode }) => (
  <code className={inlineCode}>{children}</code>
)

/**
 * Renders a plain-English data string, wrapping any `backticked` spans in
 * InlineCode. Content stays typed data in src/data/ — this is the one
 * formatting affordance it gets.
 */
export const renderInline = (text: string): ReactNode =>
  text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>
    ) : (
      part
    )
  )
