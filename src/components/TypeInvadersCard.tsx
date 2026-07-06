import * as css from './TypeInvadersCard.css'

/**
 * A miniature of the Type Invaders card from natomski's home page — the app's
 * arcade mode where falling Polish words are destroyed by typing their
 * translation. Adapted from the original (starfield, floating player ship)
 * to fit this site's card chrome and both themes.
 */
export const TypeInvadersCard = () => (
  <figure className={css.frame} aria-label="Type Invaders arcade mode preview">
    <div className={css.scene}>
      <div className={css.stars} aria-hidden="true" />
      <div className={css.starsAlt} aria-hidden="true" />

      <div className={css.copy}>
        <p className={css.eyebrow}>Arcade</p>
        <p className={css.title}>Type Invaders</p>
        <p className={css.blurb}>Destroy falling words by typing their translation.</p>
      </div>

      <div className={css.invader} aria-hidden="true">
        <img className={css.alien} src="arcade-alien.png" alt="" width="34" height="34" />
        <span className={css.word}>jabłko</span>
      </div>

      <img className={css.ship} src="arcade-player.png" alt="" width="56" height="56" aria-hidden="true" />
    </div>
    <figcaption className={css.caption}>
      Type Invaders, the app’s arcade mode — I built it to make vocab drilling something I actually want to open.
    </figcaption>
  </figure>
)
