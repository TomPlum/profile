import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/jetbrains-mono'
import './styles/global.css'
import { BooksPage } from './pages/BooksPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BooksPage />
  </StrictMode>
)
