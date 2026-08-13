import { Masthead } from './components/Masthead'
import { LogSection } from './components/LogSection'
import { SiteShell } from './SiteShell'

export const App = () => (
  <SiteShell>
    <Masthead />
    <LogSection />
  </SiteShell>
)
