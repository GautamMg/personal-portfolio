import CookingSpotlight from '../components/CookingSpotlight.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'

export default function CookingPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      {/* Page header */}
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-600 mb-3">
          // culinary
        </p>
        <h1 className="t-h2 text-primary">Kitchen Archive</h1>
        <p className="mt-4 max-w-lg font-serif italic leading-relaxed text-stone-400">
          Move your cursor through the image to develop the film.
        </p>
      </header>

      {/* Darkroom spotlight */}
      <CookingSpotlight />

      <Reveal>
        <Footer />
      </Reveal>
    </div>
  )
}
