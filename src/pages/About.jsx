import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Footer from '../components/Footer.jsx'

const highlights = [
  '🎓 M.S., Ohio State',
  '📄 Published research',
  '🏆 Performance award',
  '🌍 Studied in France',
]

const interests = ['🍳 Cooking new cuisines', '✈️ Travel', '🏀 Watching & playing sports', '🧭 Unfamiliar places']

function Para({ children }) {
  return (
    <p className="font-serif mt-5 max-w-[66ch] text-lg leading-relaxed text-neutral-400">
      {children}
    </p>
  )
}

export default function About() {
  return (
    <div className="space-y-20">
      <header>
        <p className="eyebrow mb-3">// about</p>
        <h1 className="t-h1 text-primary">About me</h1>
        <p className="t-body mt-6 max-w-[60ch] text-lg text-primary/90">
          I'm Gautam, a software engineer who recently finished my Master's in
          Computer Science at The Ohio State University. I like building things
          that real people actually use, and I'm happiest a little outside my
          comfort zone.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="t-small rounded-full border border-line bg-surface px-3 py-1.5 font-medium text-primary"
            >
              {h}
            </li>
          ))}
        </ul>
      </header>

      <Reveal as="section">
        <SectionHeading eyebrow="// building" title="Learning by building" />
        <Para>
          I joined an e-commerce company right out of undergrad as one of the
          early engineers on a small team, building a B2B e-commerce platform
          completely from scratch. We had about ten months to a global launch,
          a mix of new technology, real deadlines, and high stakes that pushed
          me to grow fast.
        </Para>
        <Para>
          After launch, I worked directly with business users: onboarding them,
          understanding their pain points, and translating what they couldn't
          quite articulate into things we could actually fix. That taught me
          that good engineering isn't just about what you build, but about how
          real people end up using it. I was recognised with a performance award
          for my contributions across both phases.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// research" title="Research at Ohio State" />
        <Para>
          After two years, I came to Ohio State for my Master's. I joined
          ICICLE, an NSF-funded AI institute, where I work on middleware that
          orchestrates AI/ML workflows with minimal human intervention. The
          kind of infrastructure where a user sets a rule once and the system
          handles everything from data ingestion to model retraining to
          redeployment on its own.
        </Para>
        <Para>
          That work led to a published paper on agentic AI in MLOps and a couple
          of conference presentations.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// edge" title="Edge AI in the wild" />
        <Para>
          Last summer I interned at the Texas Advanced Computing Center in
          Austin, working on camera traps built on Raspberry Pis and deployed in
          the wild, running computer vision models on-device to detect animals
          in real time and signaling nearby drones to fly in for a closer look.
        </Para>
        <Para>
          Writing software that runs in the middle of a forest on constrained
          hardware, with no room for inefficiency, was a genuinely different
          kind of challenge.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// off the clock" title="Outside of work" />
        <Para>
          I cook a lot, usually something from a cuisine I haven't tried before.
          I travel when I can, watch and play sports, and I'm most comfortable
          somewhere slightly unfamiliar. I spent a semester studying in France
          during undergrad, which probably started that.
        </Para>
        <ul className="mt-6 flex flex-wrap gap-2">
          {interests.map((i) => (
            <li
              key={i}
              className="t-small rounded border border-accent/40 bg-accent-subtle px-3 py-1.5 text-primary"
            >
              {i}
            </li>
          ))}
        </ul>
      </Reveal>
      <Footer />
    </div>
  )
}
