import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Kinetic Index — Portal Edition ─────────────────────────────────────
   A bounded "Portal" section that sits in the normal document flow.
   The rounded-3xl + overflow-hidden container clips all crossfades strictly
   to its own box; nothing bleeds onto the surrounding page.

   Architecture:
   · Outer <section> places the card in the page flow (max-w-7xl, padded).
   · Inner "Window" div is the actual cinematic portal: fixed height, rounded,
     dark bg, overflow-hidden.
   · AnimatePresence (sync mode) crossfades one hero image at a time inside.
   · A heavy radial vignette pulls the edges to #0A0A0A so the typography
     is always legible against any image.
   · Text uses mix-blend-difference so it reacts dynamically to the imagery.
──────────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1]

const personalIndex = [
  { id: '01', title: 'Travel',  src: '/happy/mock-travel.jpg',  path: '/travel'  },
  { id: '02', title: 'Sports',  src: '/happy/mock-sports.jpg',  path: '/sports'  },
  { id: '03', title: 'Cooking', src: '/happy/mock-cooking.jpg', path: '/cooking' },
  { id: '04', title: 'Constants', src: '/happy/mock-family.jpg', path: '/constants' },
]

export default function KineticIndex() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    /* ── 1. Portal Wrapper — sits in document flow ── */
    <section className="w-full max-w-7xl mx-auto px-4 py-24">

      {/* ── 2. The Window — clips everything inside ── */}
      <div className="relative w-full h-[80vh] md:h-[700px] rounded-3xl overflow-hidden
                      bg-[#0A0A0A] flex flex-col items-center justify-center
                      border border-stone-800/50 shadow-2xl isolate">

        {/* ── 3. Contained background crossfade ── */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={personalIndex[hoveredIndex].src}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {/* Ken-Burns settle */}
              <motion.img
                src={personalIndex[hoveredIndex].src}
                alt=""
                draggable={false}
                className="h-full w-full select-none object-cover"
                initial={{ scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: EASE }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Radial vignette — pulls edges to #0A0A0A ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none opacity-90
                     bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)]"
        />

        {/* ── 4. Typographic menu — centered in the portal ── */}
        <nav
          aria-label="Explore"
          className="relative z-10 flex flex-col items-center w-full"
        >
          {personalIndex.map((item, index) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={false}
              animate={{
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.2 : 1,
              }}
              transition={{ duration: 0.35, ease: EASE }}
              className="group cursor-pointer flex items-center justify-center gap-6 w-full py-2"
            >
              {/* Monospace index number */}
              <span className="hidden font-mono text-[11px] tracking-widest text-stone-700 sm:block">
                {item.id}
              </span>

              {/* Massive serif title */}
              <Link
                to={item.path}
                tabIndex={-1}
                className="outline-none"
              >
                <h2 className="font-serif text-[10vw] md:text-[6vw] leading-none uppercase
                               text-stone-600 group-hover:text-stone-100
                               transition-colors duration-500 mix-blend-difference
                               tracking-tight">
                  {item.title}
                </h2>
              </Link>
            </motion.div>
          ))}
        </nav>

      </div>
    </section>
  )
}
