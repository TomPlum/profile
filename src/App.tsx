import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Header } from './components/Header'
import { Masthead } from './components/Masthead'
import { LogSection } from './components/LogSection'
import { Footer } from './components/Footer'

export const App = () => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Header />
        <main>
          <Masthead />
          <LogSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  </LazyMotion>
)
