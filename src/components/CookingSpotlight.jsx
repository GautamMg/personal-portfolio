import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion'

const RADIUS = 220
const SCALE  = 1.15
const SPRING = { stiffness: 100, damping: 18, mass: 0.8 }

// ─── Panel ──────────────────────────────────────────────────────────────────
// Each panel owns its own independent spring state.
// The zoom uses a fixed-centre scale(1.15) + a derived x/y translate that
// re-aligns the scaled content back under the cursor — no dynamic
// transformOrigin, so Framer Motion never battles itself each frame.
function DarkroomPanel({ src, alt }) {
  const containerRef = useRef(null)
  const cW = useRef(0) // cached width  (updated on every mousemove)
  const cH = useRef(0) // cached height

  const rawX      = useMotionValue(0)
  const rawY      = useMotionValue(0)
  const rawRadius = useMotionValue(0)

  const springX = useSpring(rawX,      SPRING)
  const springY = useSpring(rawY,      SPRING)
  const springR = useSpring(rawRadius, SPRING)

  // Mask: solid core at 50% radius → only the outer ring feathers out.
  // This keeps the centre of the spotlight perfectly crisp.
  const mask = useMotionTemplate`radial-gradient(${springR}px circle at ${springX}px ${springY}px, black 50%, transparent 100%)`

  // Translate: compensates for the fixed-centre scale so the content at
  // the cursor position always sits at the centre of the revealed circle.
  //   content drift = (cx − W/2) × (scale − 1)
  //   cancel it     → translate by negative drift
  const tx = useTransform(springX, cx => -(cx - cW.current / 2) * (SCALE - 1))
  const ty = useTransform(springY, cy => -(cy - cH.current / 2) * (SCALE - 1))

  function onMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect()
    cW.current = rect.width
    cH.current = rect.height
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
    rawRadius.set(RADIUS)
  }

  function onMouseLeave() {
    rawRadius.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full aspect-square cursor-crosshair overflow-hidden"
      style={{
        // Promotes the container to its own GPU compositor layer so both
        // the base and spotlight images are rasterized together — prevents
        // the sub-pixel blurring that appears when only the child is composited.
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Base layer — black & white resting state */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'grayscale(100%)' }}
        draggable={false}
      />

      {/* Spotlight layer — full colour, revealed by mask, zoomed 1.15× */}
      <motion.img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          scale: SCALE,
          x: tx,
          y: ty,
          // will-change lives on the container, not here — avoids the
          // browser creating a separate raster layer for just this img
          // which is what causes the compositing blur artefact.
        }}
        draggable={false}
      />
    </div>
  )
}

// ─── CookingSpotlight ────────────────────────────────────────────────────────
export default function CookingSpotlight() {
  return (
    <div>
      {/* Two panels stacked flush — no gap, shared rounding + border */}
      <div className="flex flex-col w-full overflow-hidden rounded-xl border border-white/5">
        <DarkroomPanel src="/food_collage1.jpg"           alt="Food collage" />
        <DarkroomPanel src="/IMG_20210101_105441_916.jpg" alt="Cooking archive" />
      </div>

      <p className="mt-6 font-serif italic text-stone-400">
        "Notes from the kitchen: An archive of experiments, traditions, and the occasional mess."
      </p>
      <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-stone-600">
        // ARCHIVE_TOTAL: 100+ ENTRIES
      </span>
    </div>
  )
}
