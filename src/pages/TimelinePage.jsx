import Timeline from '../components/Timeline.jsx'
import Footer from '../components/Footer.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function TimelinePage() {
  useScrollReveal()
  return (
    <>
      <Timeline />
      <Footer />
    </>
  )
}
