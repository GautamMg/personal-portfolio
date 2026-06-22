import { useState, useRef, useEffect, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { motion, AnimatePresence, animate } from 'framer-motion'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/* ─── Visited countries — ISO 3166-1 numeric codes match geo.id in world-atlas ── */
const VISITED = [
  { isoN: '356', name: 'India',        coordinates: [78.9629,  20.5937], zoomLevel: 3 },
  { isoN: '784', name: 'UAE',          coordinates: [53.8478,  23.4241], zoomLevel: 5 },
  { isoN: '250', name: 'France',       coordinates: [2.2137,   46.2276], zoomLevel: 4 },
  { isoN: '528', name: 'Netherlands',  coordinates: [5.2913,   52.1326], zoomLevel: 6 },
  { isoN: '616', name: 'Poland',       coordinates: [19.1451,  51.9194], zoomLevel: 5 },
  { isoN: '40',  name: 'Austria',      coordinates: [14.5501,  47.5162], zoomLevel: 6 },
  { isoN: '348', name: 'Hungary',      coordinates: [19.5033,  47.1625], zoomLevel: 6 },
  { isoN: '203', name: 'Czechia',      coordinates: [15.4730,  49.8175], zoomLevel: 6 },
  { isoN: '840', name: 'USA',          coordinates: [-95.7129, 37.0902], zoomLevel: 2 },
]

const VISITED_SET = new Set(VISITED.map(c => c.isoN))
const VISITED_MAP = new Map(VISITED.map(c => [c.isoN, c]))

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function TravelMapDive() {
  const [activeCountry, setActiveCountry] = useState(null)
  const [mapView, setMapView]             = useState({ center: [10, 20], zoom: 1 })

  // Refs to track live animation state without stale closure issues
  const mapViewRef  = useRef({ center: [10, 20], zoom: 1 })
  const animRef     = useRef(null)

  /* ── Smooth pan/zoom via framer-motion's low-level animate() ── */
  const panTo = useCallback((targetCenter, targetZoom, ms = 1200) => {
    if (animRef.current) animRef.current.stop()

    const from = { ...mapViewRef.current }

    animRef.current = animate(0, 1, {
      duration: ms / 1000,
      ease: 'easeInOut',
      onUpdate(v) {
        const newCenter = [
          from.center[0] + (targetCenter[0] - from.center[0]) * v,
          from.center[1] + (targetCenter[1] - from.center[1]) * v,
        ]
        const newZoom = from.zoom + (targetZoom - from.zoom) * v
        mapViewRef.current = { center: newCenter, zoom: newZoom }
        setMapView({ center: newCenter, zoom: newZoom })
      },
    })
  }, [])

  useEffect(() => {
    if (activeCountry) {
      panTo(activeCountry.coordinates, activeCountry.zoomLevel, 1200)
    } else {
      panTo([10, 20], 1, 900)
    }
  }, [activeCountry, panTo])

  /* ── Sync user drag/scroll back into our ref ── */
  function onMoveEnd({ coordinates, zoom }) {
    mapViewRef.current = { center: coordinates, zoom }
    setMapView({ center: coordinates, zoom })
  }

  function handleCountryClick(country) {
    setActiveCountry(prev => (prev?.isoN === country.isoN ? null : country))
  }

  /* ── Render ── */
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0A0A]">

      {/* ── Map layer: fades and blurs back on country select ── */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: activeCountry ? 0.15 : 1,
          filter:  activeCountry ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <ComposableMap
          width={800}
          height={400}
          projectionConfig={{ scale: 147, center: [10, 20] }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            center={mapView.center}
            zoom={mapView.zoom}
            onMoveEnd={onMoveEnd}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId    = String(geo.id)
                  const isVisited = VISITED_SET.has(geoId)
                  const isActive  = activeCountry?.isoN === geoId
                  const country   = VISITED_MAP.get(geoId)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => isVisited && handleCountryClick(country)}
                      style={{
                        default: {
                          fill:        isActive   ? '#E7E5E4'   // stone-200 — selected
                                     : isVisited  ? '#78716C'   // stone-500 — visited
                                     :              '#171717',  // near-black — unvisited
                          stroke:      isVisited  ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                          strokeWidth: 0.5,
                          outline:     'none',
                          cursor:      isVisited  ? 'pointer' : 'default',
                          transition:  'fill 150ms ease',
                        },
                        hover: {
                          fill:        isVisited  ? '#A8A29E'   // stone-400
                                     :              '#1C1C1C',
                          stroke:      isVisited  ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.02)',
                          strokeWidth: 0.5,
                          outline:     'none',
                          cursor:      isVisited  ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill:        isVisited  ? '#D6D3D1' : '#171717',
                          outline:     'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Hint — only visible on the global view */}
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: activeCountry ? 0 : 1, pointerEvents: 'none' }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
            {VISITED.length} countries visited · click to explore
          </p>
        </div>
      </motion.div>

      {/* ── Foreground collage — slides in after map pushes back ── */}
      <AnimatePresence>
        {activeCountry && (
          <motion.div
            key={activeCountry.isoN}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 md:p-10"
          >
            {/* Return control */}
            <button
              onClick={() => setActiveCountry(null)}
              className="text-stone-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150 mb-6 flex items-center gap-2 group"
            >
              <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
              Return to Global View
            </button>

            {/* Country name */}
            <h2 className="font-serif text-4xl md:text-5xl text-stone-200 italic mb-8">
              {activeCountry.name}
            </h2>

            {/* Collage mount point */}
            <div className="w-full max-w-6xl aspect-[21/9] bg-[#121212] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden gap-3">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-white/10 rounded-tl" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/10 rounded-tr" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-white/10 rounded-bl" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-white/10 rounded-br" />

              <span className="font-mono text-stone-700 text-xs tracking-[0.25em] uppercase">
                collage_mount_point
              </span>
              <span className="font-mono text-stone-500 text-sm tracking-widest">
                {activeCountry.isoN} · {activeCountry.name.toUpperCase()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
