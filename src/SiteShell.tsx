import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Header, type HeaderRoutes } from './components/Header'
import { Footer } from './components/Footer'

/**
 * The chrome shared by every page in the build: motion config, the boring
 * header, and the contact footer. Pages supply only their own main content, so
 * a second page can never quietly drift from the first on the things that
 * matter (contact + CV, one click away, at every viewport).
 */
interface ShellProps extends HeaderRoutes {
  children: ReactNode
  /**
   * How far this page sits below the site root — `''` at the root, `'../'` for
   * the shelf. The chrome links to files (the CV) and to other pages, so it
   * has to know. See `lib/paths.ts`.
   */
  root?: string
}

export const SiteShell = ({ children, root = '', ...routes }: ShellProps) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Header root={root} {...routes} />
        <main>{children}</main>
        <Footer root={root} />
      </div>
    </MotionConfig>
  </LazyMotion>
)
