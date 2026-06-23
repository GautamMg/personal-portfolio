import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'

// Natural Earth 110m topojson — small, fast, appropriate resolution for a full-world view.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WAYPOINTS = [
  {
    id: 'blr',
    coordinates: [77.59, 12.97],
    name: 'Bangalore, India',
    image: '/personal.JPG',
    year: '2022',
    rotate: -2,
  },
  {
    id: 'cmh',
    coordinates: [-82.99, 39.96],
    name: 'Columbus, OH',
    image: '/photo.JPG',
    year: '2023',
    rotate: 1.5,
  },
  {
    id: 'bom',
    coordinates: [72.87, 19.07],
    name: 'Mumbai, India',
    image: '/Smartfields.jpg',
    year: '2021',
    rotate: -1,
  },
  {
    id: 'nyc',
    coordinates: [-74.0, 40.71],
    name: 'New York, NY',
    image: '/E-commerce.jpg',
    year: '2024',
    rotate: 2,
  },
  {
    id: 'dxb',
    coordinates: [55.29, 25.2],
    name: 'Dubai, UAE',
    image: '/IntelligencePlane.jpg',
    year: '2023',
    rotate: -1.5,
  },
]

export default function TravelMap() {
  const [activeLocation, setActiveLocation] = useState(null)
  // Direct pixel coords — no spring needed; Framer Motion handles entry animation.
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleMarkerEnter = (waypoint, e) => {
    setTooltipPos({ x: e.clientX + 20, y: e.clientY - 20 })
    setActiveLocation(waypoint)
  }

  const handleMarkerMove = (e) => {
    setTooltipPos({ x: e.clientX + 20, y: e.clientY - 20 })
  }

  const handleMarkerLeave = () => {
    setActiveLocation(null)
  }

  return (
    <>
      {/* ── Map layer — fixed, full viewport, non-blocking ──────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[16]"
        style={{ opacity: 0.75 }}
      >
        <ComposableMap
          projectionConfig={{ scale: 155, center: [10, 10] }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: '#232323',
                      stroke: 'rgba(255, 255, 255, 0.08)',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#232323',
                      stroke: 'rgba(255, 255, 255, 0.08)',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#232323',
                      stroke: 'rgba(255, 255, 255, 0.08)',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Markers — inner <g> re-enables pointer-events to pierce the none container */}
          {WAYPOINTS.map((wp) => (
            <Marker key={wp.id} coordinates={wp.coordinates}>
              <g
                style={{ pointerEvents: 'auto', cursor: 'crosshair' }}
                onMouseEnter={(e) => handleMarkerEnter(wp, e)}
                onMouseMove={handleMarkerMove}
                onMouseLeave={handleMarkerLeave}
              >
                {/* Transparent hit-area only — dots removed */}
                <circle r={8} fill="transparent" stroke="none" />
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* ── Editorial polaroid tooltip — fixed, above all content ── */}
      <AnimatePresence>
        {activeLocation && (
          <motion.div
            key={activeLocation.id}
            role="tooltip"
            aria-label={`${activeLocation.name}, ${activeLocation.year}`}
            className="pointer-events-none fixed z-50"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              translateY: '-100%',
            }}
            initial={{ opacity: 0, y: 12, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Polaroid wrapper */}
            <div
              className="bg-[#E8E6E0] p-3 pb-8 rounded-sm"
              style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3)',
                transform: `rotate(${activeLocation.rotate}deg)`,
              }}
            >
              <div className="overflow-hidden w-48 h-48">
                <img
                  src={activeLocation.image}
                  alt={activeLocation.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              <div className="mt-2 px-0.5">
                <p
                  className="text-stone-700 text-sm leading-snug"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  {activeLocation.name}
                </p>
                <p
                  className="text-stone-500 mt-0.5"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                >
                  {activeLocation.year}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
