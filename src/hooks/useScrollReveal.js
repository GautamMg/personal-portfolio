import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Staggered fade-in + subtle Y slide-up for every [data-reveal] element on the
// current page, triggered as they enter the viewport.
//   - threshold ~0.15  -> ScrollTrigger start: "top 85%"
//   - ease             -> power3.out
//   - stagger          -> 0.08s for items entering together
// useLayoutEffect sets the initial hidden state before paint (no flash).
export function useScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = gsap.utils.toArray('[data-reveal]')
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0, y: 24 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 85%', // ScrollTrigger equivalent of a 0.15 intersection threshold
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })
    })

    // Recalculate positions once the page has laid out.
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])
}
