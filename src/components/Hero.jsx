import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../context/ModeContext.jsx'
import { content } from '../content.js'

export default function Hero() {
  const { mode } = useMode()
  const hero = content[mode].hero
  const personal = mode === 'personal'

  // Glass (professional) vs film-print (personal) photo frame.
  const frame = personal
    ? 'group relative h-64 w-64 -rotate-2 overflow-hidden border-4 border-stone-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out hover:rotate-0'
    : 'group relative h-64 w-64 rotate-3 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out hover:rotate-0'

  return (
    <section className="hero-gradient relative">
      <div className="flex flex-col-reverse items-start gap-12 sm:flex-row sm:items-center sm:justify-between">
        {/* Text column — content swaps with a gentle fade + Y shift on mode toggle */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="t-mono inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1.5 text-secondary">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-status" />
                {hero.status}
              </span>

              <h1 className="t-h1 mt-6 text-primary">
                {hero.greetingLead} <span className="italic text-accent">{hero.name}</span>
              </h1>

              <p className="t-body mt-6 max-w-[46ch] text-secondary">{hero.intro}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {personal ? (
              // Personal: "About me" navigates to /about; no "Get in touch".
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-[#0F0F0F] shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
              >
                About me
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              // Professional: PDF resume + contact.
              <>
                <a
                  href="/Gautam_Gururaj_Molakalmuru_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-[#0F0F0F] shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
                >
                  View resume
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
                    <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-[14px] font-medium text-primary transition-all duration-150 hover:-translate-y-0.5 hover:border-line-hover hover:bg-surface"
                >
                  Get in touch
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Photo */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={frame}>
            <img
              src={hero.photo}
              alt="Gautam Gururaj"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <span className="t-small absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-elevated px-3 py-1 font-medium text-primary shadow-sm">
            📍 Columbus, OH
          </span>
        </motion.div>
      </div>
    </section>
  )
}
