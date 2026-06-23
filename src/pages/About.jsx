import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Footer from '../components/Footer.jsx'
import { useMode } from '../context/ModeContext.jsx'

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

/* ── Professional About ─────────────────────────────────────────────────── */
function ProfessionalAbout() {
  return (
    <div className="space-y-20">
      <header>
        <p className="eyebrow mb-3">// about</p>
        <h1 className="t-h1 text-primary">About me</h1>
        <p className="t-body mt-6 max-w-[60ch] text-lg text-primary/90">
          I'm Gautam. I build software, I recently finished my Master's at Ohio
          State, and I am most comfortable when I am slightly out of my depth.
        </p>

      </header>

      <Reveal as="section">
        <SectionHeading eyebrow="// building" title="Learning by building" />
        <Para>
          Right out of undergrad I joined as one of the early engineers on a
          small team building a B2B platform from scratch. Ten months to a
          global launch. That combination of new technology, real deadlines, and
          high stakes pushed me to grow fast, probably faster than I would have
          chosen to on my own.
        </Para>
        <Para>
          After launch, I moved into working directly with business users,
          sitting with their frustrations, and translating what they could not
          always articulate into things we could actually fix. That phase taught
          me something the pre-launch work did not. Good engineering is not just
          about what you build. It is about what happens when real people try to
          use it. I was recognised with a performance award for contributions
          across both phases.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// research" title="Research at Ohio State" />
        <Para>
          I came to Ohio State for my Master's and ended up joining ICICLE, an
          NSF-funded AI institute, where I work on middleware that orchestrates
          AI and ML workflows with minimal human intervention. A user sets a
          rule once and the system handles everything from there, data
          ingestion, model retraining, redeployment, on its own.
        </Para>
        <Para>
          That work led to a published paper on agentic AI in MLOps and a
          couple of conference presentations, both of which were new territory
          for me and things I am glad I pushed myself into.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// breadth" title="Spreading out" />
        <Para>
          The work I have done has naturally pulled me into more than one
          domain, not by design but because each project demanded something a
          little different.
        </Para>
        <Para>
          On the data side, I have built high throughput Kafka pipelines
          handling millions of data points, managed MongoDB and Elasticsearch
          clusters, and designed systems where data moves reliably across
          services in real time. That foundation shaped how I think about any
          system where data is the core of what is actually happening.
        </Para>
        <Para>
          On the AI and ML side, I have gone from building the orchestration
          infrastructure that automates the ML lifecycle to getting hands on
          with computer vision models, fine tuning them for specific real world
          conditions and deploying them to edge devices with hard compute
          constraints. The gap between a model that works in a notebook and one
          that works reliably in the field is where I have spent a lot of time.
        </Para>
        <Para>
          Cloud and DevOps came in through the work itself. Containerising
          services with Docker, orchestrating with Kubernetes, shipping through
          CI/CD pipelines on AWS, and then doing the same on the opposite end
          of the spectrum on constrained edge hardware. Through my research I
          also worked extensively in high performance computing environments at
          OSC and TACC, which is a different kind of scale and infrastructure
          challenge altogether. I am AWS certified and have worked across GCP
          as well.
        </Para>
        <Para>
          During my time at the e-commerce company, I worked directly with
          business users after launch, helping them get comfortable with the
          product, understanding where things were not working the way they
          expected, and translating that back into something engineering could
          act on. Customers rarely describe the exact technical problem. They
          describe how something feels. Learning to read between the lines and
          turn that into real fixes is something I picked up along the way, and
          it turned out to be one of the more quietly valuable things I picked
          up.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// off the clock" title="Outside of work" />
        <Para>
          I love my time with nature, people and animals, so I travel when I
          can. I cook a lot, usually something from a cuisine I have not tried
          before, and I watch and play sports whenever I get the chance. Feel
          free to toggle to my personal section to see the off the clock me.
        </Para>
      </Reveal>
      <Footer />
    </div>
  )
}

/* ── Personal About ─────────────────────────────────────────────────────── */
function PersonalAbout() {
  return (
    <div className="space-y-20">
      <header>
        <p className="eyebrow mb-3">// about</p>
        <h1 className="t-h1 text-primary">About me</h1>
      </header>

      <Reveal as="section">
        <SectionHeading eyebrow="// origins" title="Where I come from" />
        <Para>
          I am from India. I have always been excited and curious about
          everything, an open canvas, subconsciously looking to fill it with
          experiences and events. I feel it has always been the case, except now
          I do it intentionally. I consciously embrace the journey and enjoy the
          moments along the way.
        </Para>
        <Para>
          Growing up, I moved from a sheltered upbringing to a big city for my
          undergraduate degree, on merit and on my own. That was the first real
          decision I made entirely for myself, and it set the tone for everything
          after. I went from being someone who was happy being independent to
          someone who genuinely valued the people around them. That shift happened
          through shared experiences, leading events, representing my peers, and
          slowly realising that the best version of anything is usually built with
          other people, not despite them.
        </Para>
        <Para>
          In my final year of undergrad, I was one of ten students selected from
          my batch for a semester abroad at ESIGELEC University in Rouen, France.
          New country, new language in the streets, new people from all over the
          world in the same classroom. I found, paradoxically, that I was most
          comfortable in the unfamiliar. Something about being dropped into a
          place where nothing is on autopilot forces you to actually pay
          attention, to everything. That experience changed something in me that
          I have not been able to fully articulate since, but it shows up in how
          I approach most things now.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// off the clock" title="What I do when I'm not working" />
        <Para>
          Sports have been a constant thread throughout my life. Cricket,
          badminton, chess. I have represented my city, been part of clubs, and
          never really stopped. Playing and watching, it does not matter much
          which one. There is something about sport that keeps me grounded in a
          way most other things do not. It is part of my identity and my journey
          all along.
        </Para>
        <Para>
          I cook a lot. During the COVID-19 pandemic, I developed over 150
          recipes inspired by cuisines from around the world, which sounds like
          an exaggeration but genuinely was a pandemic project that got slightly
          out of hand. Cooking new cuisines is less about the outcome and more
          about figuring something out from scratch with what you have in front
          of you. That part never gets old.
        </Para>
        <Para>
          I travel whenever I can, not just to see places, but to understand how
          different people live, what they value, how they eat and talk and move
          through their days. More than a hundred trips in, I still find that the
          most interesting thing about any new place is not the landmark but the
          ordinary rhythm of it. Something about travelling fills me up and brings
          contentment to my life. It helps to look at life in a zoomed-out way
          and brings profound joy.
        </Para>
      </Reveal>

      <Reveal as="section">
        <SectionHeading eyebrow="// how I live" title="How I live" />
        <Para>
          I value my time and genuineness, so I invest in myself and the people
          around me, personally and professionally. I care about showing up
          fully, for whatever is in front of me and for whoever is around me. I
          would like to think it is a win-win.
        </Para>
        <Para>
          I am far from a finished product. But I am pointed in the right
          direction, and I show up every day to make sure of that.
        </Para>
      </Reveal>

      <Footer />
    </div>
  )
}

/* ── Shell ──────────────────────────────────────────────────────────────── */
export default function About() {
  const { mode } = useMode()
  return mode === 'personal' ? <PersonalAbout /> : <ProfessionalAbout />
}
