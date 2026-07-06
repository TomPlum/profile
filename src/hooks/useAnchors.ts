import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'

export interface AnchorState {
  /** Vertical centre of each commit row's header, relative to the log container. */
  ys: Record<string, number>
  /** Current height of the log container. */
  height: number
}

const same = (a: AnchorState, b: AnchorState): boolean => {
  if (a.height !== b.height) return false
  const aKeys = Object.keys(a.ys)
  if (aKeys.length !== Object.keys(b.ys).length) return false
  return aKeys.every((k) => a.ys[k] === b.ys[k])
}

/**
 * The graph rail is drawn from *measured* DOM positions, so the SVG can never
 * drift from the text at any viewport, font-load state or expansion state.
 * A ResizeObserver on the container re-measures whenever anything reflows —
 * including every frame of a row's expand animation, so the rail tracks it.
 */
export const useAnchors = (containerRef: RefObject<HTMLElement | null>, remeasureKey: string) => {
  const nodes = useRef(new Map<string, HTMLElement>())
  const [anchors, setAnchors] = useState<AnchorState>({ ys: {}, height: 0 })

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerTop = container.getBoundingClientRect().top
    const ys: Record<string, number> = {}
    nodes.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect()
      ys[id] = Math.round(rect.top - containerTop + rect.height / 2)
    })
    const next = { ys, height: container.offsetHeight }
    setAnchors((prev) => (same(prev, next) ? prev : next))
  }, [containerRef])

  const registerAnchor = useCallback((id: string) => {
    return (el: HTMLElement | null) => {
      if (el) {
        nodes.current.set(id, el)
      } else {
        nodes.current.delete(id)
      }
    }
  }, [])

  useLayoutEffect(() => {
    measure()
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [measure, containerRef, remeasureKey])

  return { anchors, registerAnchor }
}
