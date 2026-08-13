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
export const SiteShell = ({ children, ...routes }: { children: ReactNode } & HeaderRoutes) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Header {...routes} />
        <main>{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  </LazyMotion>
)
