import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useMode } from './context/ModeContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import ParticleCanvas from './components/ParticleCanvas.jsx'
import PersonalBackground from './components/PersonalBackground.jsx'
import TravelMap from './components/TravelMap.jsx'
import FlightPathCanvas from './components/FlightPathCanvas.jsx'
import { MotionPage } from './components/Motion.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import { initSmoothScroll, getLenis } from './lib/smoothScroll.js'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import Highlights from './pages/Highlights.jsx'
import EngineeringLogs from './pages/EngineeringLogs.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import Contact from './pages/Contact.jsx'
import CookingPage from './pages/CookingPage.jsx'
import SportsPage from './pages/SportsPage.jsx'
import TravelPage from './pages/TravelPage.jsx'
import HappyThings from './components/HappyThings.jsx'
import ConstantsPage from './pages/ConstantsPage.jsx'

// Wraps non-immersive pages in the standard max-width / padded layout.
// Travel omits this so the globe can fill all of <main>.
function PaddedPage({ children }) {
  return (
    <div className="mx-auto w-full max-w-[1040px] px-6 py-16 sm:px-12 md:py-24">
      <MotionPage>{children}</MotionPage>
    </div>
  )
}

// Per-route document titles. Keeps the browser tab + SEO/search snippets
// distinct per page (the SPA otherwise keeps the index.html title everywhere).
const NAME = 'Gautam Gururaj Molakalmuru'
const ROUTE_TITLES = {
  '/': NAME,
  '/about': `About · ${NAME}`,
  '/projects': `Projects · ${NAME}`,
  '/experience': `Experience · ${NAME}`,
  '/skills': `Skills · ${NAME}`,
  '/highlights': `Highlights · ${NAME}`,
  '/logs': `Engineering Logs · ${NAME}`,
  '/timeline': `Timeline · ${NAME}`,
  '/contact': `Contact · ${NAME}`,
  '/cooking': `Cooking · ${NAME}`,
  '/sports': `Sports · ${NAME}`,
  '/travel': `Travel · ${NAME}`,
  '/happy': `Happy Things · ${NAME}`,
  '/constants': `Constants · ${NAME}`,
}

// Scrolls to #anchor (timeline "Learn more" deep links) once the new page
// has mounted, otherwise scrolls to top on route change.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = ROUTE_TITLES[pathname] || NAME
  }, [pathname])
  useEffect(() => {
    const lenis = getLenis()
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -24 })
        else el.scrollIntoView({ block: 'start' })
      }, 300)
      return () => clearTimeout(t)
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const location = useLocation()
  const { mode } = useMode()
  const isPersonalMode = mode === 'personal'

  // One-time smooth-scroll setup (Lenis + GSAP ticker).
  useEffect(() => {
    initSmoothScroll()
  }, [])

  // Global ⌘K / Ctrl+K listener.
  const closeCmd = useCallback(() => setCmdOpen(false), [])
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      className={
        'min-h-screen md:flex ' +
        (isPersonalMode ? 'mode-personal selection:bg-slate-400/20' : 'selection:bg-blue-500/20')
      }
    >
      {/* ───────── Professional: "Active Data Network" ───────── */}
      {!isPersonalMode && (
        <>
          {/* Deep indigo ambient glow */}
          <div className="pointer-events-none fixed left-1/2 top-1/2 -z-20 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-[120px]" />
          {/* Mouse-reactive particle mesh */}
          <ParticleCanvas />
          {/* Vercel-style architectural grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"
          />
        </>
      )}

      {/* ───────── Personal: "Midnight Cartography" ───────── */}
      {/* Topo flashlight layer fades in/out via AnimatePresence. */}
      <AnimatePresence>
        {isPersonalMode && <PersonalBackground key="personal-bg" />}
      </AnimatePresence>
      {/* Interactive world map with editorial polaroid waypoints.
          Hidden on /travel — the 3D globe owns that canvas. */}
      {isPersonalMode && location.pathname !== '/travel' && <TravelMap />}
      {isPersonalMode && location.pathname !== '/travel' && <FlightPathCanvas />}


      <ScrollManager />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* /travel gets the raw MotionPage (no max-width cage) so the globe
          fills all of <main>. Every other route uses PaddedPage. */}
      {/* overflow-x-hidden creates a scroll container that breaks position:sticky —
          omit it on /happy so the Lookbook's sticky left column pins correctly. */}
      <main className={`relative flex-1${location.pathname === '/happy' ? '' : ' overflow-x-hidden'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"          element={<PaddedPage><Home /></PaddedPage>} />
            <Route path="/about"     element={<PaddedPage><About /></PaddedPage>} />
            <Route path="/projects"  element={<PaddedPage><Projects /></PaddedPage>} />
            <Route path="/experience" element={<PaddedPage><Experience /></PaddedPage>} />
            <Route path="/skills"    element={<PaddedPage><SkillsPage /></PaddedPage>} />
            <Route path="/highlights" element={<MotionPage><Highlights /></MotionPage>} />
            <Route path="/logs"       element={<MotionPage><EngineeringLogs /></MotionPage>} />
            <Route path="/timeline"  element={<PaddedPage><TimelinePage /></PaddedPage>} />
            <Route path="/contact"   element={<PaddedPage><Contact /></PaddedPage>} />
            <Route path="/cooking"   element={<PaddedPage><CookingPage /></PaddedPage>} />
            <Route path="/sports"    element={<PaddedPage><SportsPage /></PaddedPage>} />
            <Route path="/travel"    element={<MotionPage><TravelPage /></MotionPage>} />
            <Route path="/happy"     element={<MotionPage><HappyThings /></MotionPage>} />
            <Route path="/constants" element={<MotionPage><ConstantsPage /></MotionPage>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Command palette */}
      <CommandPalette open={cmdOpen} onClose={closeCmd} />

      {/* Fixed ⌘K trigger badge — bottom-right of viewport */}
      <button
        type="button"
        onClick={() => setCmdOpen(true)}
        aria-label="Open command palette"
        title="Open command palette (⌘K)"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#111] px-2.5 py-1.5 font-mono text-[11px] text-muted shadow-md transition-all duration-150 hover:border-white/[0.14] hover:text-secondary"
      >
        <span className="text-[12px] leading-none">⌘</span>
        <span>K</span>
      </button>
    </div>
  )
}
