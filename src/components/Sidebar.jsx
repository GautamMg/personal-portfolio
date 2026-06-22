import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import ModeToggle from './ModeToggle.jsx'
import { useMode } from '../context/ModeContext.jsx'
import { content } from '../content.js'

/* ─── Navigation data ──────────────────────────────────────────────────── */

const professionalNav = [
  { to: '/', label: 'Home', end: true, icon: HomeIcon },
  { to: '/about', label: 'About me', icon: UserIcon },
  { to: '/projects', label: 'Projects', icon: GridIcon },
  { to: '/experience', label: 'Experience', icon: BriefcaseIcon },
  { to: '/skills', label: 'Skills', icon: SparkIcon },
  { to: '/highlights', label: 'Highlights', icon: StarIcon },
  { to: '/timeline', label: 'Timeline', icon: ClockIcon },
  { to: '/logs', label: 'Engineering Logs', icon: TerminalIcon },
  { to: '/contact', label: 'Contact', icon: MailIcon },
]

const personalNav = [
  {
    category: 'Core',
    items: [
      { to: '/', label: 'Home', end: true },
      { to: '/about', label: 'About me' },
    ],
  },
  {
    category: 'Exploration',
    items: [
      { to: '/travel', label: 'Travel' },
      { to: '/sports', label: 'Sports' },
      { to: '/cooking', label: 'Cooking' },
    ],
  },
  {
    category: 'Fragments',
    items: [
      { to: '/constants', label: 'Constants' },
    ],
  },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/GautamMg', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mg-gautam/', icon: LinkedinIcon },
  { label: 'Resume', href: '/Gautam_Gururaj_Molakalmuru_Resume.pdf', icon: DocIcon },
]

/* ─── Shell ─────────────────────────────────────────────────────────────── */

export default function Sidebar({ collapsed = false, setCollapsed = () => {} }) {
  const [open, setOpen] = useState(false)

  const SidebarContent = (
    <SidebarBody onNavigate={() => setOpen(false)} onCollapse={() => setCollapsed(true)} />
  )

  return (
    <>
      {/* Mobile top bar (< 768px) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-sidebar px-4 py-3 md:hidden">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold text-[#0F0F0F]">
            G
          </span>
          <span className="text-[14px] font-medium text-primary">Gautam Gururaj</span>
        </NavLink>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-40 w-[264px] overflow-y-auto border-r border-line bg-sidebar px-3 py-4 md:hidden">
            {SidebarContent}
          </div>
        </>
      )}

      {/* Desktop fixed rail (>= 768px) */}
      {!collapsed && (
        <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 overflow-y-auto border-r border-line bg-sidebar px-3 py-4 md:block">
          {SidebarContent}
        </aside>
      )}

      {/* Floating reopen button when collapsed */}
      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Open sidebar"
          title="Open sidebar"
          className="fixed left-4 top-4 z-40 hidden h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-secondary shadow-md transition-colors hover:border-line-hover hover:text-primary md:flex"
        >
          <PanelIcon />
        </button>
      )}
    </>
  )
}

/* ─── SidebarBody ───────────────────────────────────────────────────────── */

function SidebarBody({ onNavigate, onCollapse = () => {} }) {
  const { mode } = useMode()
  const isPersonalMode = mode === 'personal'
  const currently = content[mode].currently

  // Cross-fade: fade out → swap content → fade in. Prevents jarring flicker
  // when switching modes while keeping sidebar height stable (it's h-screen).
  const [shownIsPersonal, setShownIsPersonal] = useState(isPersonalMode)
  const [navVisible, setNavVisible] = useState(true)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setNavVisible(false)
    const t = setTimeout(() => {
      setShownIsPersonal(isPersonalMode)
      setNavVisible(true)
    }, 180)
    return () => clearTimeout(t)
  }, [isPersonalMode])

  const proNavLinkClasses = ({ isActive }) =>
    [
      'group flex items-center gap-2 rounded-lg border-l-[3px] py-2 pl-3 pr-2 text-[13px] leading-tight transition-all duration-300 ease-smooth',
      isActive
        ? 'border-accent bg-elevated font-medium text-primary'
        : 'border-transparent text-secondary hover:translate-x-1 hover:text-neutral-100',
    ].join(' ')

  return (
    <div className="flex h-full flex-col">
      {/* Workspace header */}
      <div className="group flex items-center gap-2 rounded-lg pl-2 pr-1 transition-colors hover:bg-surface">
        <NavLink to="/" onClick={onNavigate} className="flex flex-1 items-center gap-2 py-2">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-accent text-[12px] font-semibold text-[#0F0F0F]">
            G
          </span>
          <span className="text-[14px] font-medium leading-tight text-primary">
            Gautam Gururaj
          </span>
        </NavLink>
        <button
          type="button"
          onClick={onCollapse}
          aria-label="Close sidebar"
          title="Close sidebar"
          className="hidden h-6 w-6 shrink-0 items-center justify-center rounded text-muted opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 md:flex"
        >
          <PanelIcon />
        </button>
      </div>

      {/* Primary nav — cross-fades between modes */}
      <nav
        aria-label="Primary"
        className="mt-4"
        style={{ opacity: navVisible ? 1 : 0, transition: 'opacity 180ms ease' }}
      >
        {shownIsPersonal ? (
          <EditorialIndex onNavigate={onNavigate} />
        ) : (
          <div className="space-y-1">
            {professionalNav.map(({ to, label, end, icon: Icon }) => (
              <NavLink key={to} to={to} end={end} onClick={onNavigate} className={proNavLinkClasses}>
                {({ isActive }) => (
                  <>
                    <Icon
                      className={
                        'h-[17px] w-[17px] shrink-0 transition-colors ' +
                        (isActive ? 'text-accent' : 'text-muted group-hover:text-secondary')
                      }
                    />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Currently */}
      <CollapsibleSection title="Currently" className="mt-6">
        <ul
          className={
            'space-y-2 px-3 py-1 text-[13px] transition-colors duration-500 ' +
            (isPersonalMode ? 'text-stone-400' : 'text-secondary')
          }
        >
          {currently.map((item) => (
            <li key={item.text} className="flex items-start gap-2">
              {isPersonalMode ? (
                <span
                  className={
                    'mt-2 h-1.5 w-1.5 shrink-0 rounded-full ' +
                    (item.dot === 'status' ? 'personal-status-dot bg-stone-400' : 'bg-stone-500')
                  }
                />
              ) : (
                <span
                  className={
                    'mt-2 h-1.5 w-1.5 shrink-0 rounded-full ' +
                    (item.dot === 'status' ? 'status-dot bg-status' : 'bg-accent')
                  }
                />
              )}
              {item.text}
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Links — professional mode only */}
      {!isPersonalMode && <CollapsibleSection title="Links" className="mt-4">
        <ul className="space-y-1">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={
                  'group flex items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-[13px] leading-tight transition-all duration-300 ease-smooth hover:translate-x-1 ' +
                  (isPersonalMode
                    ? 'text-stone-500 hover:text-stone-100'
                    : 'text-secondary hover:text-neutral-100')
                }
              >
                <Icon
                  className={
                    'h-[17px] w-[17px] shrink-0 transition-colors ' +
                    (isPersonalMode
                      ? 'text-stone-600 group-hover:text-stone-400'
                      : 'text-muted group-hover:text-secondary')
                  }
                />
                {label}
                <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleSection>}

      {/* Mode toggle pinned to bottom */}
      <div className="mt-auto border-t border-line pt-4">
        <ModeToggle />
      </div>
    </div>
  )
}

/* ─── Editorial Index (personal mode nav) ───────────────────────────────── */

function EditorialIndex({ onNavigate }) {
  let num = 0

  return (
    <div>
      {personalNav.map((group, gi) => (
        <div key={group.category}>
          {/* Category header */}
          <div
            className={
              'text-[9px] font-mono uppercase tracking-[0.2em] text-stone-600 mb-2 pl-1 ' +
              (gi === 0 ? 'mt-0' : 'mt-6')
            }
          >
            {group.category}
          </div>

          {/* Items with sequential serif numerals */}
          {group.items.map((item) => {
            num++
            const numStr = String(num).padStart(2, '0')
            const isHashLink = item.to.startsWith('/#')

            const itemClass = (isActive) =>
              [
                'group flex items-center py-1.5 pl-2 pr-2 text-[13px] leading-tight transition-all duration-300 ease-smooth',
                isActive
                  ? 'translate-x-1 text-stone-100'
                  : 'text-stone-500 hover:translate-x-1 hover:text-stone-100',
              ].join(' ')

            const inner = (isActive) => (
              <>
                <span
                  className={
                    'font-serif italic mr-3 text-xs w-5 shrink-0 transition-colors duration-300 ' +
                    (isActive
                      ? 'text-stone-400'
                      : 'text-stone-600 group-hover:text-stone-400')
                  }
                >
                  {numStr}.
                </span>
                <span className="tracking-wide">{item.label}</span>
              </>
            )

            if (isHashLink) {
              return (
                <a
                  key={item.to + numStr}
                  href={item.to}
                  onClick={onNavigate}
                  className={itemClass(false)}
                >
                  {inner(false)}
                </a>
              )
            }

            return (
              <NavLink
                key={item.to + numStr}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => itemClass(isActive)}
              >
                {({ isActive }) => inner(isActive)}
              </NavLink>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ─── CollapsibleSection ────────────────────────────────────────────────── */

function CollapsibleSection({ title, children, className = '' }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="t-label group flex w-full items-center gap-1 rounded-lg px-2 py-1 text-muted transition-colors hover:bg-surface"
      >
        <Triangle
          className={'h-2.5 w-2.5 shrink-0 transition-transform duration-150 ' + (open ? 'rotate-90' : '')}
        />
        {title}
      </button>
      {open && <div className="mt-1.5">{children}</div>}
    </div>
  )
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

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
function BriefcaseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="6.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 6.5V5.2c0-.7.5-1.2 1.2-1.2h2.6c.7 0 1.2.5 1.2 1.2v1.3M3 10.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
function SparkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
function TerminalIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 8l3 2.5L6 13M11 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3l1.9 4.1 4.5.5-3.4 3 1 4.4L10 12.8 6 15l1-4.4-3.4-3 4.5-.5L10 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
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
function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5a8.5 8.5 0 0 0-2.69 16.57c.43.08.59-.18.59-.41v-1.5c-2.37.51-2.87-1.14-2.87-1.14-.39-.99-.95-1.25-.95-1.25-.77-.53.06-.52.06-.52.85.06 1.3.88 1.3.88.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.13-1.89-.21-3.88-.95-3.88-4.2 0-.93.33-1.69.88-2.29-.09-.21-.38-1.08.08-2.25 0 0 .72-.23 2.35.87a8.2 8.2 0 0 1 4.28 0c1.63-1.1 2.35-.87 2.35-.87.46 1.17.17 2.04.08 2.25.55.6.88 1.36.88 2.29 0 3.26-1.99 3.98-3.89 4.19.31.26.58.78.58 1.57v2.33c0 .23.15.5.59.41A8.5 8.5 0 0 0 10 1.5Z" />
    </svg>
  )
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.4 7.2H2.9V17h2.5V7.2ZM4.15 6.1A1.45 1.45 0 1 0 4.13 3.2a1.45 1.45 0 0 0 .02 2.9ZM17.1 17v-5.38c0-2.88-1.54-4.22-3.59-4.22-1.65 0-2.39.91-2.8 1.55V7.2H8.2V17h2.5v-5.47c0-.29.02-.58.11-.79.23-.58.76-1.18 1.65-1.18 1.16 0 1.63.89 1.63 2.19V17h2.5Z" />
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
function PanelIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4v12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
function Triangle({ className }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <path d="M3 1.5 7.5 5 3 8.5z" />
    </svg>
  )
}
function ArrowUpRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
