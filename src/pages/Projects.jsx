import ProjectIndex from '../components/ProjectIndex.jsx'
import Footer from '../components/Footer.jsx'

export default function Projects() {
  return (
    <div className="space-y-12">
      <header>
        <p className="eyebrow mb-3">// projects</p>
        <h1 className="t-h1 text-primary">Projects</h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-primary/80">
          What I've built — from autonomous ML pipelines to computer vision
          running on hardware in the middle of a forest. Scroll through to
          read the architecture.
        </p>
      </header>

      <ProjectIndex />
      <Footer />
    </div>
  )
}
