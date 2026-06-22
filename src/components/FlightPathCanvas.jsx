import { useEffect, useRef } from 'react'

// Lightweight cursor "contrail": a smooth fading polyline trailing the mouse,
// keeping the last ~40 frames of movement. Collapses to nothing when idle.
export default function FlightPathCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const MAX = 40
    let width = 0
    let height = 0
    let raf = null
    const points = []
    const mouse = { x: null, y: null }

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

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      if (mouse.x != null) {
        points.push({ x: mouse.x, y: mouse.y })
        while (points.length > MAX) points.shift()
      }

      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (let i = 1; i < points.length; i++) {
        // Tail fades toward the oldest point.
        const alpha = (i / points.length) * 0.2
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.beginPath()
        ctx.moveTo(points[i - 1].x, points[i - 1].y)
        ctx.lineTo(points[i].x, points[i].y)
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (raf == null) raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = null
      mouse.y = null
      points.length = 0
    }

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[15]" />
  )
}
