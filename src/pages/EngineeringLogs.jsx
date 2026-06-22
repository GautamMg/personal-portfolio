import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const slide = { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }

export default function EngineeringLogs() {
  const [sequence, setSequence] = useState(0)

  useEffect(() => {
    setSequence(1)
    const t2 = setTimeout(() => setSequence(2), 800)
    const t3 = setTimeout(() => setSequence(3), 1600)
    const t4 = setTimeout(() => setSequence(4), 2400)
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Terminal console */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col font-mono text-xs md:text-sm uppercase tracking-widest text-stone-500 gap-4">
        <AnimatePresence>
          {sequence >= 1 && (
            <motion.p key="l1" {...slide}>
              &gt; MOUNTING VOLUME: /DEV/ENGINEERING_LOGS...
            </motion.p>
          )}
          {sequence >= 2 && (
            <motion.p key="l2" {...slide}>
              &gt; SCANNING FOR ENTRIES...
            </motion.p>
          )}
          {sequence >= 3 && (
            <motion.p key="l3" {...slide} className="text-stone-300">
              &gt; [STATUS] 0 ENTRIES DETECTED. WORK IN PROGRESS.
            </motion.p>
          )}
          {sequence >= 4 && (
            <motion.div
              key="cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-4 bg-stone-400 mt-2"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Escape hatch */}
      <AnimatePresence>
        {sequence >= 4 && (
          <motion.div
            key="back"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="relative z-10 mt-16"
          >
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-stone-100 transition-colors border-b border-stone-800 hover:border-stone-400 pb-1"
            >
              ← Return to root
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
