import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

// Unified, strictly chronological (newest first). Each entry carries a type.
const milestones = [
  {
    type: 'education',
    title: 'M.S. Computer Science',
    org: 'The Ohio State University',
    location: 'Columbus, OH',
    period: 'Aug 2024 — May 2026',
    detail: 'Graduated on a full merit scholarship, focused on AI/ML infrastructure and MLOps.',
    to: '/about',
  },
  {
    type: 'work',
    title: 'Graduate Research Associate',
    org: 'ICICLE, NSF AI Institute',
    location: 'Columbus, OH',
    period: 'Aug 2025 — Dec 2025',
    detail: "Built middleware that orchestrates AI/ML workflows end to end, which led to a published paper at PEARC '25.",
    to: '/projects#intelligence-plane',
  },
  {
    type: 'work',
    title: 'Software Development Intern',
    org: 'Texas Advanced Computing Center (UT Austin)',
    location: 'Austin, TX',
    period: 'Jun 2025 — Aug 2025',
    detail: 'Brought edge AI to animal ecology, running real-time detection on Raspberry Pis out in the field.',
    to: '/experience#tacc',
  },
  {
    type: 'work',
    title: 'Software Engineer',
    org: 'Quinbay (Blibli.com)',
    location: 'Bangalore, India',
    period: 'Jul 2022 — Jul 2024',
    detail: 'Core engineer on a B2B e-commerce platform built from scratch and launched globally in ten months.',
    to: '/experience#quinbay',
  },
  {
    type: 'education',
    title: 'B.E. Computer Science',
    org: 'New Horizon College of Engineering',
    location: 'Bangalore, India',
    period: '2018 — Aug 2022',
    detail: "Bachelor's in Computer Science, where I led the technology club for two years.",
    sub: {
      title: 'Study Abroad — ESIGELEC',
      location: 'Rouen, France',
      period: '2021',
      detail: 'A merit-selected semester abroad, which is probably where the travel bug started.',
    },
  },
]

// Card lights up + shifts right as it passes the viewport center (scroll-driven).
const cardVariants = (type) => ({
  inactive: { backgroundColor: 'rgba(0,0,0,0)', x: 0 },
  active: {
    backgroundColor: type === 'work' ? 'rgba(59,130,246,0.05)' : 'rgba(16,185,129,0.05)',
    x: 8,
  },
})

const nodeVariants = {
  inactive: { scale: 1, backgroundColor: '#0F0F0F', borderColor: 'rgba(255,255,255,0.15)' },
  active: { scale: 1.3, backgroundColor: 'rgba(255,255,255,0.15)', borderColor: '#ffffff' },
}

function Entry({ m }) {
  const isWork = m.type === 'work'
  const Body = m.to ? Link : 'div'
  const bodyProps = m.to ? { to: m.to, className: 'block cursor-pointer' } : {}

  return (
    <motion.div
      initial="inactive"
      whileInView="active"
      viewport={{ margin: '-45% 0px -45% 0px', amount: 'some' }}
      variants={cardVariants(m.type)}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative rounded-xl p-5"
    >
      {/* Scroll-spy node on the thread */}
      <motion.span
        variants={nodeVariants}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        aria-hidden="true"
        className="absolute left-0 top-7 h-3 w-3 rounded-full border"
      />

      <Body {...bodyProps}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{m.period}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
            {isWork ? 'Work' : 'Education'}
          </span>
          {m.to && (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-auto shrink-0 text-muted">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <h3 className="mt-1.5 text-[17px] font-semibold leading-snug text-primary">{m.title}</h3>
        <p className="text-[13px] text-secondary">
          {m.org}
          {m.location && <span className="text-muted"> · {m.location}</span>}
        </p>

        <p className="font-serif mt-2 max-w-[60ch] text-lg leading-relaxed text-neutral-400">
          {m.detail}
        </p>

        {m.sub && (
          <div className="mt-4 border-l border-white/5 pl-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{m.sub.period}</span>
            <h4 className="mt-1 text-[14px] font-semibold text-primary">{m.sub.title}</h4>
            <p className="text-[12px] text-muted">{m.sub.location}</p>
            <p className="font-serif mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-neutral-400">
              {m.sub.detail}
            </p>
          </div>
        )}
      </Body>
    </motion.div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <section className="py-4">
      <SectionHeading eyebrow="// journey" title="My timeline" />

      <div ref={containerRef} className="relative mt-12">
        {/* Static thread */}
        <div className="absolute left-[6px] top-0 h-full w-[1px] bg-white/5" />
        {/* Radiant scroll-driven line */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          aria-hidden="true"
          className="absolute left-[5px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-transparent to-white shadow-[0_0_12px_2px_rgba(255,255,255,0.6)]"
        />

        <ol className="space-y-2">
          {milestones.map((m) => (
            <li key={m.period + m.title}>
              <Entry m={m} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
