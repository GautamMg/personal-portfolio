import { createContext, useContext, useState } from 'react'

const ModeContext = createContext({ mode: 'professional', setMode: () => {} })

// Routes that only exist in personal mode. Landing on one of these directly
// (e.g. a refresh) should boot the app in personal mode so the toggle and the
// content don't disagree.
const personalOnlyPaths = ['/travel', '/sports', '/cooking', '/constants', '/happy']

function initialMode() {
  if (typeof window === 'undefined') return 'professional'
  return personalOnlyPaths.includes(window.location.pathname) ? 'personal' : 'professional'
}

// Tracks which "side" of Gautam is on display: the engineer or the person.
// Not persisted across sessions, but seeded from the current route so a refresh
// on a personal-only page stays in personal mode.
export function ModeProvider({ children }) {
  const [mode, setMode] = useState(initialMode)
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
