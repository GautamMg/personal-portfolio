import { useState, useRef, useEffect, useCallback } from 'react'
import Globe from 'react-globe.gl'
import { motion, AnimatePresence } from 'framer-motion'
import * as topojson from 'topojson-client'
import Footer from './Footer.jsx'
import Reveal from './Reveal.jsx'

/* ─── Photo builder ───────────────────────────────────────────────────────────
   Files are named with a shape prefix on disk (landscape- / portrait- / square-),
   so the grid derives each photo's shape from its filename at render time. The
   builder just stamps an id + the public path; shape is parsed by `getShape`.
──────────────────────────────────────────────────────────────────────────── */
const TRAVEL_BASE = '/Travel'
function buildPhotos(prefix, dir, files) {
  return files.map((file, i) => ({
    id: `${prefix}-${i + 1}`,
    src: `${TRAVEL_BASE}/${dir}/${file}`,
    caption: `№ ${String(i + 1).padStart(2, '0')}`,
  }))
}

/* ─── Visited countries — ISO 3166-1 numeric + lat/lng centroid ─────────── */
const VISITED = [
  {
    isoN: 356, name: 'India', lat: 20.5937, lng: 78.9629,
    bgImageSrc: '/Travel/India/IMG_3496.jpg',
    bgGlow: 'rgba(90,24,0,1)',
    photos: buildPhotos('in', 'India', [
      'IMG_20210311_114738 (1).jpg',
      'IMG_20210315_171235.jpg',
      'IMG_20210425_180220.jpg',
      'IMG_20210426_170847_788 (1).jpg',
      'IMG_20210614_074806.jpg',
      'IMG_20210919_094445.jpg',
      'IMG_20210920_183823.jpg',
      'IMG_20211129_170136.jpg',
      'IMG_20211129_170255.jpg',
      'IMG_20221106_035128.jpg',
      'IMG_20221119_083136 (1).jpg',
      'IMG_20221119_083847.jpg',
      'IMG_20221119_085832.jpg',
      'IMG_20221126_062157.jpg',
      'IMG_2058 (1).jpg',
      'IMG_2116.jpg',
      'IMG_2141.jpg',
      'IMG_2305.jpg',
      'IMG_2344.jpg',
      'IMG_2482.jpg',
      'IMG_3496.jpg',
      'IMG_4520.jpg',
      'IMG_5297.jpg',
      'IMG_6862.jpg',
      'IMG_7905.jpg',
      'IMG_8689.JPG',
      'IMG_8779.jpg',
      'IMG_8813.jpg',
      'IMG_8903.jpg',
      'IMG_8962.jpg',
      'Snapchat-1451042124__01.jpg',
    ]),
  },
  {
    isoN: 784, name: 'UAE', lat: 23.4241, lng: 53.8478,
    bgImageSrc: '/Travel/UAE/landscape-IMG_9799.JPG',
    bgGlow: 'rgba(90,52,0,1)',
    photos: buildPhotos('ae', 'UAE', [
      'landscape-IMG_0538.JPG',
      'landscape-IMG_9799.JPG',
      'portrait-IMG_9362.JPG',
      'square-IMG_0063.JPG',
    ]),
  },
  {
    isoN: 250, name: 'France', lat: 46.2276, lng: 2.2137,
    bgImageSrc: '/Travel/France/square-IMG_20220403_205028.jpg',
    bgGlow: 'rgba(90,60,0,1)',
    photos: buildPhotos('fr', 'France', [
      'portrait-.JPG',
      'portrait-IMG_20220220_083636.jpg',
      'portrait-IMG_20220704_134022_700.webp',
      'portrait-IMG_5965.JPG',
      'portrait-IMG_5977.JPG',
      'square-IMG_20220205_171446.jpg',
      'square-IMG_20220403_205028.jpg',
      'square-IMG_5968.JPG',
      'square-IMG_5972.JPG',
    ]),
  },
  {
    isoN: 528, name: 'Netherlands', lat: 52.1326, lng: 5.2913,
    bgImageSrc: '/Travel/Netherlands/landscape-IMG_20220523_102445.jpg',
    bgGlow: 'rgba(0,70,58,1)',
    photos: buildPhotos('nl', 'Netherlands', [
      'landscape-IMG_20220523_102445.jpg',
      'landscape-IMG_20220523_104618.jpg',
      'landscape-IMG_20220524_143317.jpg',
      'landscape-IMG_20220526_153109.jpg',
      'landscapeIMG_20220526_143206.jpg',
      'square-IMG_20220522_153738.jpg',
      'square-IMG_20220522_214305.jpg',
      'square-IMG_20220524_143615.jpg',
      'square-IMG_20220526_143604.jpg',
      'square-IMG_20220526_155312.jpg',
    ]),
  },
  {
    isoN: 616, name: 'Poland', lat: 51.9194, lng: 19.1451,
    bgImageSrc: '/Travel/Poland/landscape-IMG_20220423_142147.jpg',
    bgGlow: 'rgba(60,14,24,1)',
    photos: buildPhotos('pl', 'Poland', [
      'landscape-IMG_20220408_140853.jpg',
      'landscape-IMG_20220422_170348.jpg',
      'landscape-IMG_20220423_142147.jpg',
      'portrait-IMG_20220408_140823.jpg',
      'square-IMG_20220408_134820.jpg',
      'square-IMG_20220420_120400.jpg',
      'square-IMG_20220421_201547.jpg',
      'square-IMG_20220423_204029.jpg',
    ]),
  },
  {
    isoN: 40, name: 'Austria', lat: 47.5162, lng: 14.5501,
    bgImageSrc: '/Travel/Austria/landscape-IMG_20220413_213344.jpg',
    bgGlow: 'rgba(20,50,14,1)',
    photos: buildPhotos('at', 'Austria', [
      'landscape-IMG_20220413_213344.jpg',
      'landscape-IMG_20220414_095234.jpg',
      'landscape-IMG_20220414_141125.jpg',
      'landscape-IMG_20220414_141250.jpg',
      'portrait-IMG_20220413_163546.jpg',
      'portrait-IMG_20220414_172729-1.jpg',
      'square-GOPR0244_ALTA3079978218897635583.jpg',
      'square-IMG_20220413_182513.jpg',
      'square.jpg',
    ]),
  },
  {
    isoN: 348, name: 'Hungary', lat: 47.1625, lng: 19.5033,
    bgImageSrc: '/Travel/Hungary/landscape-IMG_5994.JPG',
    bgGlow: 'rgba(60,42,0,1)',
    photos: buildPhotos('hu', 'Hungary', [
      'landscape-IMG_20220411_103351.jpg',
      'landscape-IMG_20220412_193014.jpg',
      'landscape-IMG_5994.JPG',
      'portrait-IMG_20220412_105350.jpg',
      'square-IMG_20220411_144300.jpg',
      'square-IMG_20220411_150550.jpg',
      'square-IMG_20220411_231322.jpg',
    ]),
  },
  {
    isoN: 203, name: 'Czechia', lat: 49.8175, lng: 15.4730,
    bgImageSrc: '/Travel/Czechia/landscape-GOPR0083_1649744900135.jpg',
    bgGlow: 'rgba(40,28,60,1)',
    photos: buildPhotos('cz', 'Czechia', [
      'landscape-GOPR0083_1649744900135.jpg',
      'landscape-GOPR0115_1649744900135.jpg',
      'landscape-GOPR0139_1649745137686_2.jpg',
      'landscape-GOPR0172_1649745137686_2 (2).jpg',
      'landscape-IMG_20220409_134340.jpg',
      'portrait-IMG_20220409_141526.jpg',
      'portrait-IMG_5989.JPG',
    ]),
  },
  {
    isoN: 840, name: 'USA', lat: 37.0902, lng: -95.7129,
    bgImageSrc: '/Travel/USA/IMG_1839.jpg',
    bgGlow: 'rgba(14,14,80,1)',
    photos: buildPhotos('us', 'USA', [
      'IMG_0702.jpg',
      'IMG_0757.jpg',
      'IMG_1002.jpg',
      'IMG_1028.jpg',
      'IMG_1090.jpg',
      'IMG_1119.JPG',
      'IMG_1307.jpg',
      'IMG_1559.jpg',
      'IMG_1829.jpg',
      'IMG_1839.jpg',
      'IMG_2905.jpg',
      'IMG_3115.jpg',
      'IMG_3418.JPG',
      'IMG_3424.JPG',
      'IMG_4176.jpg',
      'IMG_6511.jpg',
      'IMG_7669.jpg',
      'IMG_7731.jpg',
    ]),
  },
]

const VISITED_SET = new Set(VISITED.map(c => c.isoN))
const VISITED_MAP = new Map(VISITED.map(c => [c.isoN, c]))

const INITIAL_POV = { lat: 20, lng: 10, altitude: 2.2 }

/* ─── DestinationEnvironment — Editorial Parallax Waterfall ─────────────────── */
function DestinationEnvironment({ country, onBack }) {
  /* Scroll-bound parallax — the two columns drift at different speeds for depth.
     We write each column's transform synchronously in an onScroll handler. No rAF
     and no framer MotionValue: rAF is throttled when the WebGL globe is unmounted,
     and the MotionValue→DOM binding doesn't apply inside this nested AnimatePresence.
     A direct scroll-event write is bulletproof and immune to both. */
  const leftColRef  = useRef(null)
  const rightColRef = useRef(null)

  const handleScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    const p = max > 0 ? el.scrollTop / max : 0
    if (leftColRef.current)  leftColRef.current.style.transform  = `translate3d(0, ${p * -100}px, 0)` // drifts up
    if (rightColRef.current) rightColRef.current.style.transform = `translate3d(0, ${p * 150}px, 0)`  // drifts down
  }

  const hasPhotos = country.photos.length > 0
  const leftColumnPhotos  = country.photos.filter((_, i) => i % 2 === 0)
  const rightColumnPhotos = country.photos.filter((_, i) => i % 2 !== 0)

  /* A single floating print — color, with a hover that lifts it out of the spotlight dim. */
  const Photo = (photo) => (
    <div
      key={photo.id}
      className="group relative w-full flex flex-col transition-all duration-700 hover:!opacity-100 group-hover/gallery:opacity-30"
    >
      <img
        src={encodeURI(photo.src)}
        alt={photo.caption || ''}
        loading="lazy"
        className="w-full h-auto object-cover rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.02] peer"
      />
      {photo.caption && (
        <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {photo.caption}
        </span>
      )}
    </div>
  )

  return (
    <motion.div
      key={country.isoN}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 w-full h-full z-40 isolate bg-[#0A0A0A] overflow-y-auto"
      data-lenis-prevent
      onScroll={handleScroll}
    >
      {/* Hero image — full colour, fades to black on scroll */}
      <img
        src={encodeURI(country.bgImageSrc)}
        alt={country.name}
        className="absolute inset-0 w-full h-[100vh] object-cover opacity-40 pointer-events-none"
      />
      <div className="absolute inset-0 h-[100vh] bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/90 to-[#0A0A0A] pointer-events-none" />

      {/* Return control — stays pinned to the viewport while scrolling */}
      <button
        onClick={onBack}
        className="fixed top-12 left-12 z-50 font-mono text-xs uppercase tracking-widest text-stone-400 hover:text-white transition-colors duration-150 flex items-center gap-2 group"
      >
        <span className="transition-transform duration-150 group-hover:-translate-x-1">←</span>
        Return to Orbit
      </button>

      {/* Massive cinematic title — blends into the hero */}
      <h1 className="relative z-10 font-serif text-[12vw] leading-none text-stone-200 opacity-90 mt-[20vh] mb-[15vh] text-center mix-blend-overlay select-none">
        {country.name}
      </h1>

      {hasPhotos ? (
        /* ── Editorial Parallax Waterfall — two fluid columns, zero bounding boxes ── */
        <div className="group/gallery relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 pb-48 px-4 md:px-12">
          {/* Left column — drifts up */}
          <div ref={leftColRef} className="flex flex-col gap-8 md:gap-16 w-full md:w-1/2 will-change-transform">
            {leftColumnPhotos.map(Photo)}
          </div>
          {/* Right column — staggered start, drifts down */}
          <div ref={rightColRef} className="flex flex-col gap-8 md:gap-16 w-full md:w-1/2 mt-0 md:mt-32 will-change-transform">
            {rightColumnPhotos.map(Photo)}
          </div>
        </div>
      ) : (
        /* ── Graceful empty state for countries without photos yet ── */
        <div className="relative z-10 mb-24 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-px bg-stone-700" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500">
            Photographs coming soon
          </p>
        </div>
      )}

      {/* Footer — naturally reachable by scrolling past the photo grid */}
      <div className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-[1040px] px-6 sm:px-12 py-16 md:py-24">
          <Reveal>
            <Footer />
          </Reveal>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function TravelGlobeDive() {
  const [features, setFeatures]           = useState([])
  const [activeCountry, setActiveCountry] = useState(null)
  const [isGlobeVisible, setIsGlobeVisible] = useState(true)
  const [dims, setDims]                   = useState({ width: 800, height: 600 })
  const globeRef   = useRef()
  const wrapperRef = useRef()
  const divingRef  = useRef(false) // lock out clicks during the 1 s camera dive

  /* ── TopoJSON → GeoJSON features ── */
  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then(r => r.json())
      .then(world => setFeatures(topojson.feature(world, world.objects.countries).features))
  }, [])

  /* ── Exact canvas sizing via ResizeObserver ── */
  useEffect(() => {
    if (!wrapperRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setDims({ width, height })
    })
    ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  /* ── Globe ready: init controls & camera ── */
  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return
    const ctrl = globeRef.current.controls()
    ctrl.autoRotate      = true
    ctrl.autoRotateSpeed = 0.5
    ctrl.enableZoom      = false
    ctrl.enablePan       = false
    globeRef.current.pointOfView(INITIAL_POV)
  }, [])

  /* ── Cleanup cursor on unmount ── */
  useEffect(() => () => { document.body.style.cursor = 'default' }, [])

  /* ── Country click: camera dive → unmount globe → show environment ── */
  function handlePolygonClick(feat) {
    if (divingRef.current) return
    const isoN = +feat.id
    if (!VISITED_SET.has(isoN)) return

    const country = VISITED_MAP.get(isoN)
    divingRef.current = true

    // Stop auto-rotation and dive the camera into the country
    globeRef.current.controls().autoRotate = false
    globeRef.current.pointOfView({ lat: country.lat, lng: country.lng, altitude: 0.05 }, 1000)

    // After the 1 000 ms camera animation completes, hand off to the environment
    setTimeout(() => {
      setActiveCountry(country)
      setIsGlobeVisible(false)
      divingRef.current = false
    }, 1000)
  }

  function handlePolygonHover(feat) {
    if (!wrapperRef.current) return
    wrapperRef.current.style.cursor =
      feat && VISITED_SET.has(+feat.id) ? 'pointer' : 'default'
  }

  function polygonLabel(feat) {
    const c = VISITED_MAP.get(+feat.id)
    if (!c) return ''
    return `<div style="background:rgba(10,10,10,0.8);padding:4px 10px;border-radius:4px;
      font-family:monospace;font-size:11px;letter-spacing:0.12em;color:#a8a29e">
      ${c.name.toUpperCase()}
    </div>`
  }

  /* ── Return from environment back to globe ── */
  function handleBack() {
    setIsGlobeVisible(true)
    setActiveCountry(null)
    // Camera + autoRotate are reset by handleGlobeReady when the Globe remounts
  }

  /* ── Render ── */
  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full bg-[#0A0A0A] overflow-hidden">

      {/* Globe — unmounted once the camera dive completes */}
      {isGlobeVisible && (
        <>
          <div className="absolute inset-0">
            <Globe
              ref={globeRef}
              width={dims.width}
              height={dims.height}
              backgroundColor="rgba(0,0,0,0)"
              showAtmosphere
              atmosphereColor="#292524"
              atmosphereAltitude={0.18}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
              polygonsData={features}
              polygonCapColor={feat =>
                VISITED_SET.has(+feat.id) ? 'rgba(120,113,108,0.88)' : 'rgba(23,23,23,0.92)'
              }
              polygonSideColor={() => 'rgba(255,255,255,0.02)'}
              polygonStrokeColor={feat =>
                VISITED_SET.has(+feat.id)
                  ? 'rgba(255,255,255,0.09)'
                  : 'rgba(255,255,255,0.015)'
              }
              polygonAltitude={feat => (VISITED_SET.has(+feat.id) ? 0.02 : 0.01)}
              polygonLabel={polygonLabel}
              onPolygonClick={handlePolygonClick}
              onPolygonHover={handlePolygonHover}
              onGlobeReady={handleGlobeReady}
            />
          </div>

          {/* Orbit hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
              {VISITED.length} countries visited · click to explore
            </p>
          </div>
        </>
      )}

      {/* Environment takeover — mounts only after the camera dive finishes */}
      <AnimatePresence>
        {!isGlobeVisible && activeCountry && (
          <DestinationEnvironment country={activeCountry} onBack={handleBack} />
        )}
      </AnimatePresence>

    </div>
  )
}
