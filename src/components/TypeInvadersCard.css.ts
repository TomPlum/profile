import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../styles/theme.css'

const float = keyframes({
  '0%, 100%': { transform: 'translateY(-50%)' },
  '50%': { transform: 'translateY(calc(-50% - 7px))' }
})

const drift = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(5px)' }
})

const twinkle = keyframes({
  '0%, 100%': { opacity: 0.9 },
  '50%': { opacity: 0.25 }
})

export const frame = style({
  border: `1px solid ${vars.colour.line}`,
  borderRadius: '8px',
  overflow: 'hidden',
  margin: 0
})

/**
 * The one deliberately non-paper surface on the site: the arcade is space.
 * Light theme gets natomski's pale daytime sky, dark theme gets deep space.
 */
export const scene = style({
  position: 'relative',
  minHeight: '8.5rem',
  padding: '1.1rem 1.2rem',
  display: 'grid',
  alignContent: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, hsl(202 100% 97%) 0%, hsl(209 95% 93%) 54%, hsl(214 80% 88%) 100%)',
  selectors: {
    ':root[data-theme="dark"] &': {
      background: 'hsl(217 64% 5%)'
    }
  }
})

const starLayer = {
  position: 'absolute' as const,
  inset: 0,
  pointerEvents: 'none' as const,
  backgroundImage: [
    'radial-gradient(circle at 78% 22%, currentColor 0 1.5px, transparent 2.5px)',
    'radial-gradient(circle at 62% 68%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 88% 55%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 48% 30%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 70% 84%, currentColor 0 1.5px, transparent 2.5px)',
    'radial-gradient(circle at 94% 30%, currentColor 0 1px, transparent 2px)'
  ].join(', ')
}

export const stars = style({
  ...starLayer,
  color: 'hsl(210 60% 60% / 0.55)',
  animation: `${twinkle} 3.4s ease-in-out infinite`,
  selectors: {
    ':root[data-theme="dark"] &': {
      color: 'hsl(210 80% 88% / 0.9)'
    }
  }
})

export const starsAlt = style({
  ...starLayer,
  backgroundImage: [
    'radial-gradient(circle at 55% 15%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 83% 76%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 40% 78%, currentColor 0 1px, transparent 2px)',
    'radial-gradient(circle at 96% 62%, currentColor 0 1.5px, transparent 2.5px)'
  ].join(', '),
  color: 'hsl(210 60% 60% / 0.4)',
  animation: `${twinkle} 4.6s ease-in-out 1.2s infinite`,
  selectors: {
    ':root[data-theme="dark"] &': {
      color: 'hsl(45 90% 85% / 0.7)'
    }
  }
})

export const copy = style({
  position: 'relative',
  zIndex: 2,
  display: 'grid',
  gap: '0.25rem',
  maxWidth: '60%'
})

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: '0.6rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'hsl(207 64% 42%)',
  selectors: {
    ':root[data-theme="dark"] &': {
      color: 'hsl(200 80% 65%)'
    }
  }
})

export const title = style({
  fontFamily: vars.font.display,
  fontWeight: 700,
  fontSize: '1.25rem',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'hsl(219 39% 17%)',
  selectors: {
    ':root[data-theme="dark"] &': {
      color: '#ffffff'
    }
  }
})

export const blurb = style({
  fontSize: '0.82rem',
  lineHeight: 1.45,
  color: 'hsl(210 32% 34%)',
  selectors: {
    ':root[data-theme="dark"] &': {
      color: 'hsl(200 55% 70%)'
    }
  }
})

export const invader = style({
  position: 'absolute',
  top: '0.8rem',
  right: '5.6rem',
  zIndex: 1,
  display: 'grid',
  justifyItems: 'center',
  gap: '0.2rem',
  animation: `${drift} 3.2s ease-in-out infinite`,
  '@media': {
    '(max-width: 560px)': {
      display: 'none'
    }
  }
})

export const alien = style({
  imageRendering: 'pixelated',
  filter: 'drop-shadow(0 4px 8px hsl(210 60% 40% / 0.25))'
})

export const word = style({
  fontFamily: vars.font.mono,
  fontSize: '0.62rem',
  fontWeight: 600,
  padding: '0.1rem 0.45rem',
  borderRadius: '999px',
  color: 'hsl(219 39% 22%)',
  backgroundColor: 'hsl(0 0% 100% / 0.75)',
  border: '1px solid hsl(207 61% 66% / 0.8)',
  selectors: {
    ':root[data-theme="dark"] &': {
      color: 'hsl(200 70% 80%)',
      backgroundColor: 'hsl(200 80% 50% / 0.12)',
      border: '1px solid hsl(200 60% 52% / 0.4)'
    }
  }
})

export const ship = style({
  position: 'absolute',
  right: '1.1rem',
  top: '50%',
  zIndex: 2,
  imageRendering: 'pixelated',
  transform: 'translateY(-50%)',
  animation: `${float} 2.8s ease-in-out infinite`,
  filter:
    'drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 10px 22px rgba(83,129,184,0.24))',
  selectors: {
    ':root[data-theme="dark"] &': {
      filter:
        'drop-shadow(0 0 10px hsl(200 85% 65% / 0.9)) drop-shadow(0 0 22px hsl(200 75% 50% / 0.55))'
    }
  }
})

export const caption = style({
  borderTop: `1px solid ${vars.colour.line}`,
  padding: '0.65rem 0.85rem',
  fontFamily: vars.font.mono,
  fontSize: '0.72rem',
  lineHeight: 1.45,
  color: vars.colour.inkMuted,
  backgroundColor: vars.colour.inset
})
