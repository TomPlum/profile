import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0
})

globalStyle('html', {
  scrollBehavior: 'smooth',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto'
    }
  }
})

globalStyle('body', {
  backgroundColor: vars.colour.bg,
  color: vars.colour.ink,
  fontFamily: vars.font.display,
  fontSize: '1.0625rem',
  lineHeight: 1.6,
  fontVariationSettings: "'opsz' 14, 'SOFT' 0, 'WONK' 0",
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  transition: 'background-color 200ms ease, color 200ms ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none'
    }
  }
})

globalStyle('::selection', {
  backgroundColor: vars.colour.accent,
  color: vars.colour.accentInk
})

globalStyle(':focus-visible', {
  outline: `2px solid ${vars.colour.accent}`,
  outlineOffset: '2px',
  borderRadius: '2px'
})

globalStyle('a', {
  color: 'inherit'
})

globalStyle('button', {
  fontFamily: 'inherit'
})

/* Belt-and-braces: kill residual animation for reduced-motion users.
   Components also check the preference before animating. */
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important'
    }
  }
})
