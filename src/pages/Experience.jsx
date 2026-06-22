import Reveal from '../components/Reveal.jsx'
import Footer from '../components/Footer.jsx'

// Kept in the order Gautam presented (leading with the substantial Quinbay
// role). Each entry: role meta on the left, narrative on the right.
const experiences = [
  {
    id: 'quinbay',
    eyebrow: '// engineer',
    role: 'Software Engineer',
    company: 'Quinbay (Blibli.com)',
    location: 'Bangalore, India',
    period: 'Jul 2022 to Jul 2024',
    monogram: 'Q',
    body: [
      'I joined Quinbay right out of undergrad as part of a small core team tasked with building a B2B e-commerce platform completely from scratch. The honest challenge was that I was a fresh graduate, the team was small, and the scope was enormous. Technologies like Elasticsearch and MongoDB were new to me, and I had to get productive on them quickly while delivering features under a real deadline. That combination of new tech and high stakes pushed me to grow fast.',
      'The platform was built on a microservice architecture using Java and Spring Boot. My contributions spanned three areas. The search and discovery layer using Elasticsearch, where filters and relevance ranking had to work reliably across a complex product catalog. The catalog service, the gateway for all product data on the platform, consuming real-time updates via Kafka and keeping MongoDB and Elasticsearch in sync. And eventually the Quotation Service, which I took complete ownership of in the months before launch.',
      'That service was the crux of the entire application. It handled the full Request for Quotation workflow, from a customer submitting a quote, through internal review and negotiation, all the way to converting an approved quote into a sales order. More than the tech stack, it demanded good design. Once the design was right, the implementation followed.',
      "We delivered a global launch within 10 months. Post-launch, I moved into a different kind of role, working directly with business users, onboarding them, understanding their frustrations, and translating what they couldn't always articulate into things we could actually fix. One thing I learned: customers often can't describe the exact technical problem, they just know something feels hard. Reading that signal and finding the real friction became as important as the engineering itself.",
      "I was recognised with a performance award for my contributions across both phases, pre-launch engineering and post-launch support. Looking back, it's a journey close to my heart.",
    ],
    tags: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'Elasticsearch', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'JUnit'],
  },
  {
    id: 'tacc',
    eyebrow: '// intern',
    role: 'Software Development Intern',
    company: 'Texas Advanced Computing Center (UT Austin)',
    location: 'Austin, TX',
    period: 'Jun 2025 to Aug 2025',
    monogram: 'T',
    body: [
      "TACC is UT Austin's research computing arm. I spent the summer there working on the Smart Fields project, building automated AI/ML pipelines designed to run on edge devices for animal ecology research.",
      "The real challenge was the environment itself. Edge devices like the Raspberry Pi come with hard constraints: limited compute, limited storage, unreliable network. Every decision had a tradeoff. I also had to get comfortable quickly across domains I hadn't worked in before, like low-level systems, network protocols, and hardware limitations. I got into the documentation, asked the right questions, and within a couple of weeks I was contributing.",
      'When I joined, a basic version of the pipeline existed but it was slow, taking several minutes to capture, infer, and publish data. I made it significantly faster through two changes: making the model more lightweight so it could run efficiently on constrained hardware, and introducing motion-based filtering at the capture level so only frames with meaningful movement even reached the model. Together those changes brought end-to-end processing from several minutes down to under 5 seconds.',
      'On the accuracy side, the base model was trained on generic datasets and wasn’t built for the conditions we were dealing with, like low light, dense vegetation, and partial visibility. I fine-tuned it on images collected from the actual camera traps in those field conditions, which is where the real gap was. Accuracy went from 50% to 95%.',
      'I also wrote the consumer service that connected the Raspberry Pi pipeline to the drone service, bridging two separate projects into one cohesive workflow. That was the part that made it feel real.',
    ],
    tags: ['Python', 'YOLO', 'Docker', 'MQTT', 'Raspberry Pi', 'Edge AI', 'Computer Vision'],
  },
]

function ExperienceEntry({ exp }) {
  return (
    <article id={exp.id} className="grid scroll-mt-24 gap-x-10 gap-y-5 md:grid-cols-[260px_1fr]">
      {/* Meta column (sticks alongside the narrative on desktop) */}
      <div className="md:sticky md:top-24 md:self-start">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated font-display text-[18px] font-semibold text-accent">
            {exp.monogram}
          </span>
          <p className="eyebrow">{exp.eyebrow}</p>
        </div>
        <h2 className="mt-4 font-display text-[22px] font-semibold leading-tight text-primary">
          {exp.role}
        </h2>
        <p className="mt-1 text-[14px] font-medium text-primary/90">{exp.company}</p>
        <p className="t-small text-secondary">
          {exp.location} · {exp.period}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-line bg-elevated px-2 py-1 font-mono text-xs uppercase tracking-widest text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Narrative column */}
      <div className="space-y-4">
        {exp.body.map((para, i) => (
          <p key={i} className="font-serif max-w-[66ch] text-lg leading-relaxed text-neutral-400">
            {para}
          </p>
        ))}
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <div className="space-y-16">
      <header>
        <p className="eyebrow mb-3">// experience</p>
        <h1 className="t-h1 text-primary">Experience</h1>
        <p className="t-body mt-6 max-w-[60ch] text-lg text-primary/90">
          Where I've worked, and what each role actually taught me beyond the
          tech stack.
        </p>
      </header>

      <div className="divide-y divide-line">
        {experiences.map((exp) => (
          <Reveal key={exp.company} className="py-10 first:pt-2">
            <ExperienceEntry exp={exp} />
          </Reveal>
        ))}
      </div>
      <Footer />
    </div>
  )
}
