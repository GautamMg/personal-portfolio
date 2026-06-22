import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const EASE = [0.25, 1, 0.5, 1]

/* ---------- action definitions ---------- */

function buildActions(navigate, onClose) {
  const go = (path) => () => { navigate(path); onClose() }
  return [
    {
      id: 'edge-ai',
      label: 'Jump to Edge AI Project',
      hint: 'Smart Fields · TACC',
      category: 'Projects',
      icon: GridIcon,
      action: go('/projects#smart-fields'),
    },
    {
      id: 'intelligence-plane',
      label: 'Jump to Intelligence Plane',
      hint: 'ICICLE · NSF',
      category: 'Projects',
      icon: GridIcon,
      action: go('/projects#intelligence-plane'),
    },
    {
      id: 'hexbandit',
      label: 'View HexBandit Status',
      hint: 'Active since Jun 8, 2026',
      category: 'Timeline',
      icon: ClockIcon,
      action: go('/timeline'),
    },
    {
      id: 'resume',
      label: 'Download Resume',
      hint: 'PDF',
      category: 'Links',
      icon: DocIcon,
      action: () => { window.open('/Gautam_Gururaj_Molakalmuru_Resume.pdf', '_blank'); onClose() },
    },
    {
      id: 'email',
      label: 'Copy Email Address',
      hint: 'gautammg1506@gmail.com',
      category: 'Contact',
      icon: MailIcon,
      action: () => { navigator.clipboard.writeText('gautammg1506@gmail.com'); onClose() },
    },
    {
      id: 'nav-home',
      label: 'Go to Home',
      category: 'Navigate',
      icon: HomeIcon,
      action: go('/'),
    },
    {
      id: 'nav-about',
      label: 'Go to About',
      category: 'Navigate',
      icon: UserIcon,
      action: go('/about'),
    },
    {
      id: 'nav-experience',
      label: 'Go to Experience',
      category: 'Navigate',
      icon: BriefcaseIcon,
      action: go('/experience'),
    },
    {
      id: 'nav-skills',
      label: 'Go to Skills',
      category: 'Navigate',
      icon: SparkIcon,
      action: go('/skills'),
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact',
      category: 'Navigate',
      icon: MailIcon,
      action: go('/contact'),
    },
  ]
}

/* ---------- component ---------- */

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const activeItemRef = useRef(null)

  const actions = useMemo(() => buildActions(navigate, onClose), [navigate, onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.hint?.toLowerCase().includes(q),
    )
  }, [query, actions])

  // Reset state when palette opens; focus input.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      // Tiny delay so AnimatePresence has mounted the input.
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  // Clamp activeIndex when the filtered list shrinks.
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Scroll active item into view on arrow-key nav.
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // Keyboard: arrow nav + enter + escape.
  const handleKey = useCallback(
    (e) => {
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[activeIndex]?.action()
      } else if (e.key === 'Escape') {
        onClose()
      }
    },
    [open, filtered, activeIndex, onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#0F0F0F]/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Palette modal */}
          <motion.div
            key="cmd-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed left-1/2 top-[18%] z-50 w-full max-w-[560px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_32px_96px_rgba(0,0,0,0.85)]"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or jump to…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[14px] text-primary outline-none placeholder:text-muted"
                aria-autocomplete="list"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-item-${filtered[activeIndex].id}` : undefined}
              />
              <kbd className="rounded border border-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted">
                Esc
              </kbd>
            </div>

            {/* Results list */}
            <LayoutGroup id="cmd-palette">
              <ul
                id="cmd-list"
                ref={listRef}
                role="listbox"
                className="max-h-[340px] overflow-y-auto py-1.5"
              >
                {filtered.length === 0 && (
                  <li className="px-4 py-8 text-center font-mono text-[12px] text-muted">
                    No results for "{query}"
                  </li>
                )}

                {filtered.map((action, i) => {
                  const isActive = i === activeIndex
                  return (
                    <li
                      key={action.id}
                      id={`cmd-item-${action.id}`}
                      ref={isActive ? activeItemRef : null}
                      role="option"
                      aria-selected={isActive}
                      className="relative mx-1.5"
                    >
                      {/* Sliding highlight — layoutId morphs between items */}
                      {isActive && (
                        <motion.div
                          layoutId="cmd-highlight"
                          className="absolute inset-0 rounded-lg bg-white/[0.05]"
                          transition={{ duration: 0.12, ease: EASE }}
                        />
                      )}

                      <button
                        type="button"
                        onClick={action.action}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="relative z-10 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
                      >
                        <action.icon className="h-[15px] w-[15px] shrink-0 text-muted" />

                        <span className="flex-1 text-[13px] text-primary leading-tight">
                          {action.label}
                        </span>

                        {action.hint && (
                          <span className="hidden text-[11px] text-muted sm:block">
                            {action.hint}
                          </span>
                        )}

                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-muted/50">
                          {action.category}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </LayoutGroup>

            {/* Footer hint row */}
            <div className="flex items-center gap-5 border-t border-white/[0.06] px-4 py-2.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <Kbd>↑↓</Kbd> navigate
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <Kbd>↵</Kbd> select
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted/50">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ---------- small helpers ---------- */

function Kbd({ children }) {
  return (
    <kbd className="rounded border border-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono">
      {children}
    </kbd>
  )
}

/* ---------- icons ---------- */

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function GridIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
function ClockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.5V10l2.5 1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function DocIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 2.5h6L15.5 7v9.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 2.5V7h4.5M7 11h6M7 13.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3.5 6 6.5 4.5L16.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function HomeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 8.5 10 3l6.5 5.5M5 7.7V16h10V7.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function UserIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 16c.8-2.8 2.9-4 5.5-4s4.7 1.2 5.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function BriefcaseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="6.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 6.5V5.2c0-.7.5-1.2 1.2-1.2h2.6c.7 0 1.2.5 1.2 1.2v1.3M3 10.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function SparkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
