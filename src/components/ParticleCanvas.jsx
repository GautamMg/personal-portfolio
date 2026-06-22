import { useEffect, useRef } from 'react'

// Event-driven architecture mesh: static core nodes, horizontal Kafka-style
// event streams, and small/slow ambient packets (which create parallax depth
// purely through size + speed, no blur passes). Single rAF loop, DPR-capped,
// paused while the tab is hidden.
export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const TOTAL = 150
    const N_CORE = Math.round(TOTAL * 0.15) // 22 static anchors
    const N_STREAM = Math.round(TOTAL * 0.35) // 53 horizontal queues
    const LINK_DIST = 110
    const MOUSE_RADIUS = 150
    const rand = (a, b) => a + Math.random() * (b - a)

    let width = 0
    let height = 0
    let particles = []
    let raf = null
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const make = (i) => {
      const x = Math.random() * width
      const y = Math.random() * height
      if (i < N_CORE) {
        // Core node — anchored, brightest, largest.
        return { type: 'core', x, y, vx: 0, vy: 0, vx0: 0, vy0: 0, r: rand(1.5, 2), color: 'rgba(255,255,255,0.85)' }
      }
      if (i < N_CORE + N_STREAM) {
        // Event stream — steady horizontal flow.
        const vx0 = rand(0.2, 0.4)
        return { type: 'stream', x, y, vx: vx0, vy: 0, vx0, vy0: 0, r: 1, color: 'rgba(255,255,255,0.55)' }
      }
      // Ambient packet — tiny, slow drift (far depth plane).
      const vx0 = rand(-0.12, 0.12)
      const vy0 = rand(-0.12, 0.12)
      return { type: 'ambient', x, y, vx: vx0, vy: vy0, vx0, vy0, r: 0.5, color: 'rgba(255,255,255,0.28)' }
    }

    const init = () => {
      particles = Array.from({ length: TOTAL }, (_, i) => make(i))
    }

    const wrap = (p) => {
      if (p.x < 0) p.x = width
      else if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      else if (p.y > height) p.y = 0
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // --- Mesh lines ---
      ctx.shadowBlur = 0
      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          }
        }
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 0.5
      ctx.stroke()

      // --- Particles ---
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(255,255,255,0.65)'
      for (const p of particles) {
        if (p.type !== 'core') {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS && dist > 0.5) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.06
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
          // ease back to base velocity
          p.vx += (p.vx0 - p.vx) * 0.03
          p.vy += (p.vy0 - p.vy) * 0.03
          p.x += p.vx
          p.y += p.vy
          wrap(p)
        }
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => { if (raf == null) raf = requestAnimationFrame(draw) }
    const stop  = () => { if (raf != null) { cancelAnimationFrame(raf); raf = null } }

    const onVisibility = () => (document.hidden ? stop() : start())
    const onMouseMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = ()  => { mouse.x = -9999; mouse.y = -9999 }

    resize()
    init()
    start()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15]"
    />
  )
}
