import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once at module load so ScrollTrigger is ready before any effect runs.
gsap.registerPlugin(ScrollTrigger)

let lenis = null

export function getLenis() {
  return lenis
}

// Initializes Lenis and binds it to GSAP's single rAF ticker so smooth scroll
// and ScrollTrigger share one animation loop (no competing rAF calls).
// Singleton: safe under React StrictMode's double-invoke.
export function initSmoothScroll() {
  if (lenis) return lenis

  // Respect reduced-motion: skip smoothing entirely.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Keep ScrollTrigger in sync on every Lenis scroll tick.
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis from GSAP's rAF (one loop for both).
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return lenis
}
