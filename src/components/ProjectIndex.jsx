/**
 * ProjectIndex — Vertically stacked project cards.
 * All cards default to expanded. Reader can collapse any card individually.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../projects.js'

const EASE = [0.25, 1, 0.5, 1]

function ProjectCard({ project, isOpen, onToggle }) {
  const stackLine = project.tags.slice(0, 4).join(' · ').toUpperCase()

  return (
    <div
      id={project.slug}
      className="scroll-mt-28 w-full bg-[#161616] border border-white/10 rounded-3xl overflow-hidden"
    >
      {/* ── Card header — always visible, click to toggle ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-8 py-7 lg:px-12 text-left group"
      >
        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
            {project.year}
            {project.org && <span className="text-neutral-700"> · {project.org}</span>}
          </span>
          <span className="text-2xl lg:text-3xl font-medium text-neutral-100 leading-tight">
            {project.title}
          </span>
          <span className="font-mono text-[10px] text-blue-400/70 tracking-widest uppercase">
            // {stackLine}
          </span>
        </div>

        {/* Toggle chevron */}
        <span
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-neutral-500 transition-all duration-200 group-hover:border-white/20 group-hover:text-neutral-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            {/* Full-bleed landscape image — card's overflow-hidden clips the corners */}
            {project.cover && (
              <img
                src={project.cover}
                alt={`${project.title} cover`}
                loading="lazy"
                className="w-full aspect-video object-cover"
              />
            )}

            {/* Body text + optional paper link */}
            <div className="px-8 py-8 lg:px-12 lg:py-10 flex flex-col gap-5">
              <div className="space-y-4 font-serif text-lg text-neutral-400 leading-relaxed">
                {project.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {project.paper && (
                <a
                  href={project.paper.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors hover:text-white w-fit"
                >
                  PEARC ʼ25 Paper ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProjectIndex({ className = '' }) {
  // All cards open by default
  const [openSlugs, setOpenSlugs] = useState(() => new Set(projects.map(p => p.slug)))

  const toggle = (slug) =>
    setOpenSlugs(prev => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })

  return (
    <div className={'flex flex-col gap-4 ' + className}>
      {projects.map(project => (
        <ProjectCard
          key={project.slug}
          project={project}
          isOpen={openSlugs.has(project.slug)}
          onToggle={() => toggle(project.slug)}
        />
      ))}
    </div>
  )
}
