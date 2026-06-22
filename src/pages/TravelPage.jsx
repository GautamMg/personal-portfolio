import TravelGlobeDive from '../components/TravelGlobeDive.jsx'

export default function TravelPage() {
  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A]">

      {/* Globe fills the entire screen — no scrolling possible at this level */}
      <section className="relative w-full h-full">
        <TravelGlobeDive />

        {/* Floating header — pointer-events-none passes clicks through to the globe */}
        <div className="absolute top-0 left-0 right-0 z-10 max-w-5xl mx-auto pt-16 px-6 sm:px-12 pointer-events-none">
          <header>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-stone-600 mb-3">
              // explore
            </p>
            <h1 className="t-h2 text-primary">Where I've been</h1>
            <p className="mt-4 max-w-lg font-serif italic leading-relaxed text-stone-400">
              Nine countries and counting. Click a highlighted country to zoom in.
            </p>
          </header>
        </div>
      </section>

    </div>
  )
}
