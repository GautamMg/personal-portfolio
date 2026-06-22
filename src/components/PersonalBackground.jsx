import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Nine organic contour lines for a 400×400 tile.
// Each path starts at M0,Y and ends at 400,Y so it tiles seamlessly on the X axis.
const TOPO_PATHS = [
  'M0,35 C55,20 95,52 152,34 C208,16 258,50 316,35 C355,26 380,40 400,35',
  'M0,78 C46,64 90,93 148,78 C204,63 256,91 316,76 C356,67 382,82 400,78',
  'M0,122 C60,108 104,133 162,120 C218,107 268,131 328,118 C364,111 386,124 400,122',
  'M0,165 C50,153 94,174 153,163 C208,152 258,172 318,161 C358,154 383,166 400,165',
  'M0,208 C54,195 100,218 160,206 C215,194 265,216 325,204 C362,198 385,210 400,208',
  'M0,252 C48,240 92,260 151,249 C206,238 256,258 316,247 C357,241 383,252 400,252',
  'M0,295 C53,284 98,304 156,293 C211,282 261,300 320,290 C358,284 384,295 400,295',
  'M0,338 C57,328 102,347 162,336 C218,325 266,343 325,332 C362,326 386,338 400,338',
  'M0,382 C51,373 95,390 155,380 C210,370 260,388 320,378 C360,372 384,382 400,382',
]

export default function PersonalBackground() {
  // Spring-dampened cursor position for the flashlight.
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18 })

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const onLeave = () => {
      // Park it off-screen so the glow fades out gracefully via spring.
      mouseX.set(-9999)
      mouseY.set(-9999)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  return (
    // Root IS the fixed layer — AnimatePresence opacity fades this div itself,
    // not a parent of a fixed child, so no containing-block breakage.
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[18] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* ── Terrain layer ────────────────────────────────────────────── */}
      {/* SVG is oversized so the topo-pan CSS animation never shows seams. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="topo-pan absolute"
        style={{
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          // ultra-faint white contour lines (cool stealth map, no warm tones).
          color: 'rgba(255, 255, 255, 0.03)',
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="topo-lines"
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round">
              {TOPO_PATHS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-lines)" />
      </svg>

      {/* ── Tactical flashlight ──────────────────────────────────────── */}
      {/* Cool white/silver illumination that follows the cursor, revealing the map. */}
      <motion.div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
    </motion.div>
  )
}
