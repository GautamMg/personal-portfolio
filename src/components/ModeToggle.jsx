import { useEffect, useRef, useState } from 'react'
import { useMode } from '../context/ModeContext.jsx'

const TOOLTIPS = {
  professional: 'Gautam the engineer',
  personal: 'Gautam the person',
}

export default function ModeToggle() {
  const { mode, setMode } = useMode()
  const [hovered, setHovered] = useState(null) // which half is hovered/focused
  const [confirmOpen, setConfirmOpen] = useState(false)
  const popoverRef = useRef(null)
  const confirmBtnRef = useRef(null)
  const personalBtnRef = useRef(null)

  // Clicking "Personal" from professional asks for confirmation first.
  const handlePersonalClick = () => {
    if (mode === 'personal') return
    setConfirmOpen(true)
  }

  // Switching back to professional is instant — no popover.
  const handleProfessionalClick = () => {
    setConfirmOpen(false)
    setMode('professional')
  }

  const confirmSwitch = () => {
    setMode('personal')
    setConfirmOpen(false)
    personalBtnRef.current?.focus()
  }

  const dismiss = () => {
    setConfirmOpen(false)
    personalBtnRef.current?.focus()
  }

  // Focus management + trap + Escape while the popover is open.
  useEffect(() => {
    if (!confirmOpen) return
    confirmBtnRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        dismiss()
        return
      }
      if (e.key === 'Tab') {
        const focusables = popoverRef.current?.querySelectorAll('button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    const onClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        // Don't treat the toggle itself as "outside" — let its handlers run.
        dismiss()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Defer outside-click listener so the opening click doesn't immediately close it.
    const t = setTimeout(() => document.addEventListener('mousedown', onClickOutside), 0)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
      clearTimeout(t)
    }
  }, [confirmOpen])

  const halfClasses = (active) =>
    [
      'relative z-10 flex-1 rounded-md px-2 py-1 text-[12px] font-medium transition-colors duration-150',
      active ? 'text-[#0F0F0F]' : 'text-secondary hover:text-primary',
    ].join(' ')

  return (
    <div className="relative px-2.5">
      {/* Tooltip */}
      <div
        className={
          'pointer-events-none absolute -top-6 left-2.5 right-2.5 text-center text-[12px] text-secondary transition-opacity duration-150 ' +
          (hovered && !confirmOpen ? 'opacity-100' : 'opacity-0')
        }
        aria-hidden="true"
      >
        {hovered ? TOOLTIPS[hovered] : ''}
      </div>

      {/* Segmented control */}
      <div
        role="group"
        aria-label="Display mode: professional or personal"
        className="relative flex h-7 items-center rounded-lg border border-line bg-elevated p-0.5"
      >
        {/* Sliding active background */}
        <span
          className={
            'absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-accent transition-transform duration-150 ease-out ' +
            (mode === 'personal' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0')
          }
          aria-hidden="true"
        />
        <button
          type="button"
          aria-pressed={mode === 'professional'}
          aria-label="Professional mode, Gautam the engineer"
          onClick={handleProfessionalClick}
          onMouseEnter={() => setHovered('professional')}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered('professional')}
          onBlur={() => setHovered(null)}
          className={halfClasses(mode === 'professional')}
        >
          Professional
        </button>
        <button
          type="button"
          ref={personalBtnRef}
          aria-pressed={mode === 'personal'}
          aria-haspopup="dialog"
          aria-expanded={confirmOpen}
          aria-label="Personal mode, Gautam the person"
          onClick={handlePersonalClick}
          onMouseEnter={() => setHovered('personal')}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered('personal')}
          onBlur={() => setHovered(null)}
          className={halfClasses(mode === 'personal')}
        >
          Personal
        </button>
      </div>

      {/* Confirmation popover */}
      {confirmOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          aria-label="Switch to personal mode"
          className="absolute bottom-full left-2.5 right-2.5 z-50 mb-2 rounded-xl border border-line bg-elevated p-3 shadow-lg"
        >
          <p className="text-[13px] font-medium text-primary">You sure about this? :)</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <button
              type="button"
              ref={confirmBtnRef}
              onClick={confirmSwitch}
              className="rounded-lg bg-accent px-2.5 py-1.5 text-[12px] font-medium text-[#0F0F0F] transition-colors hover:bg-accent-hover"
            >
              Sure, potential friend
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-secondary transition-colors hover:bg-surface hover:text-primary"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
