import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectIndex from '../components/ProjectIndex.jsx'
import Skills from '../components/Skills.jsx'
import Timeline from '../components/Timeline.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import KineticIndex from '../components/KineticIndex.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useMode } from '../context/ModeContext.jsx'
import { content } from '../content.js'

export default function Home() {
  const { mode } = useMode()
  const work = content[mode].work
  const isPro = mode === 'professional'

  // GSAP ScrollTrigger handles the personal-mode [data-reveal] cards.
  useScrollReveal()

  if (!isPro) {
    // Personal mode: Hero + Kinetic Index portal + Footer.
    return (
      <div className="space-y-0">
        <Hero />
        <KineticIndex />
        <Reveal>
          <Footer />
        </Reveal>
      </div>
    )
  }

  return (
    <div className="space-y-20 md:space-y-24">
      <Hero />
      <Timeline />

      <section>
        <SectionHeading eyebrow={work.eyebrow} title={work.title} />
        <ProjectIndex className="mt-8" />
      </section>

      <Reveal>
        <Skills />
      </Reveal>

      <Reveal>
        <Footer />
      </Reveal>
    </div>
  )
}
