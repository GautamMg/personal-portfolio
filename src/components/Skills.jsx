import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'

// Groups with `list: true` hold descriptive phrases (rendered as a bulleted
// list); the rest are short tech names (rendered as chips).
const tracks = [
  {
    id: 'swe',
    label: 'Software Engineer',
    subtitle: 'Backend engineering · Distributed systems · Full product lifecycle',
    groups: [
      { name: 'Languages & Frameworks', items: ['Java', 'Reactive Java', 'Python', 'JavaScript', 'Bash/Shell', 'Spring Boot', 'ReactJS'] },
      { name: 'Architecture & Design', items: ['Microservices', 'RESTful API Design', 'Event-Driven Architecture'] },
      { name: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'] },
      { name: 'Messaging', items: ['Apache Kafka'] },
      { name: 'Testing & Quality', items: ['JUnit', 'Mockito', 'SonarQube', 'Postman'] },
      { name: 'DevOps & Tooling', items: ['Docker', 'Kubernetes', 'Jenkins (CI/CD)', 'Git', 'Linux'] },
      { name: 'Cloud', items: ['AWS (Certified Cloud Practitioner)', 'GCP'] },
      { name: 'Domain Experience', list: true, items: ['B2B e-commerce platforms', 'Full SDLC from pilot to global production launch'] },
    ],
  },
  {
    id: 'data',
    label: 'Data Engineer',
    subtitle: 'Real-time pipelines · Event-driven data flow · Scalable storage',
    groups: [
      { name: 'Languages', items: ['Java', 'Reactive Java', 'Python'] },
      { name: 'Streaming & Messaging', items: ['Apache Kafka', 'Event-Driven Architecture', 'Pub/Sub Architecture'] },
      { name: 'Storage & Search', items: ['MongoDB', 'Elasticsearch', 'Redis', 'PostgreSQL', 'MySQL'] },
      { name: 'Pipelines & Patterns', list: true, items: ['Real-time data ingestion', 'ETL processes', 'Edge-to-Cloud pipelines', 'Consumer bridge services', 'Event-driven workflow orchestration'] },
      { name: 'Cloud & Infra', items: ['AWS (Certified Cloud Practitioner)', 'Docker', 'Kubernetes', 'Jenkins (CI/CD)', 'GCP'] },
      { name: 'Domain Experience', list: true, items: ['High-throughput catalog ingestion pipelines', 'Real-time product data sync across multiple stores', 'ML workflow orchestration at research scale'] },
    ],
  },
  {
    id: 'mlops',
    label: 'AI/ML Engineer · MLOps',
    subtitle: 'Edge inference · Model fine-tuning · Automated ML pipelines',
    groups: [
      { name: 'Languages', items: ['Python', 'Java', 'Bash/Shell'] },
      { name: 'ML & Computer Vision', items: ['YOLO', 'OpenCV', 'PyTorch', 'scikit-learn', 'Pandas'] },
      { name: 'MLOps', list: true, items: ['Automated retraining pipelines', 'Event-driven retraining triggers', 'Continuous model delivery to edge devices', 'Model serving and inference pipelines'] },
      { name: 'Edge Computing', list: true, items: ['On-device inference (Raspberry Pi)', 'Motion-based frame filtering', 'Model optimization for constrained hardware', 'MQTT-based event publishing'] },
      { name: 'Pipeline & Orchestration', list: true, items: ['Kafka-based ML workflow orchestration', 'End-to-end pipeline automation from ingestion to deployment'] },
      { name: 'Cloud & Infra', items: ['AWS (Certified Cloud Practitioner)', 'Docker', 'Kubernetes', 'GCP'] },
      {
        name: 'Research & Publications',
        list: true,
        items: [
          'Published paper: “Beyond Automation: Integrating Agentic Capabilities into MLOps” (PEARC ’25)',
          'Lightning talk: “Reimagining the ICICLE Intelligence Plane” (ICICLE All-Hands Meeting)',
          'Poster: “Operational Considerations for Real-Time ML Pipelines on Edge Devices” (Gateways ’25)',
        ],
      },
      { name: 'Domain Experience', list: true, items: ['Animal ecology edge inference pipelines', 'NSF-funded AI research infrastructure', 'Automated AI/ML lifecycle orchestration'] },
    ],
  },
]

const alsoExperienced = [
  {
    name: 'Solution Engineering',
    text: 'Technical customer engagement and B2B onboarding, translating customer pain points into product and engineering solutions. Hands-on from post-launch support at Quinbay working directly with enterprise customers: root-cause analysis on reported issues, hotfixes under time pressure, and direct collaboration between business and engineering teams.',
  },
  {
    name: 'Cloud & DevOps',
    text: 'Application-level cloud deployment on AWS and GCP, containerization with Docker and Kubernetes, CI/CD pipelines with Jenkins, and edge-to-cloud infrastructure design. AWS Certified Cloud Practitioner.',
  },
]

function Group({ group }) {
  return (
    <div className="mb-4 break-inside-avoid rounded-xl border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-hover">
      <p className="t-mono text-accent">{group.name}</p>
      {group.list ? (
        <ul className="mt-3 space-y-2">
          {group.items.map((it) => (
            <li key={it} className="flex gap-2 text-[13px] leading-snug text-secondary">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {it}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {group.items.map((it) => (
            <li
              key={it}
              className="rounded border border-line bg-elevated px-2 py-1 text-[12px] text-secondary transition-colors duration-150 hover:border-accent/50 hover:text-accent"
            >
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(tracks[0].id)
  const track = tracks.find((t) => t.id === active) ?? tracks[0]

  const onTabKeyDown = (e) => {
    const i = tracks.findIndex((t) => t.id === active)
    let ni = null
    if (e.key === 'ArrowRight') ni = (i + 1) % tracks.length
    else if (e.key === 'ArrowLeft') ni = (i - 1 + tracks.length) % tracks.length
    if (ni !== null) {
      e.preventDefault()
      const id = tracks[ni].id
      setActive(id)
      requestAnimationFrame(() => document.getElementById(`tab-${id}`)?.focus())
    }
  }

  return (
    <section>
      <SectionHeading eyebrow="// skills" title="Skills" />
      <p className="t-body mt-4 max-w-[58ch] text-secondary">
        I work across three tracks. Here's the toolkit behind each.
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Skill tracks"
        className="mt-6 flex gap-1 border-b border-line"
      >
        {tracks.map((t) => {
          const sel = t.id === active
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls={`panel-${t.id}`}
              tabIndex={sel ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={onTabKeyDown}
              className={
                '-mb-px shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-[14px] font-medium transition-colors duration-150 ' +
                (sel
                  ? 'border-accent text-primary'
                  : 'border-transparent text-secondary hover:text-primary')
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Active track */}
      <div
        key={track.id}
        id={`panel-${track.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${track.id}`}
        className="tab-panel mt-5"
      >
        <p className="mb-5 text-[13px] font-medium uppercase tracking-[0.06em] text-accent">
          {track.subtitle}
        </p>
        <div className="gap-4 md:columns-2">
          {track.groups.map((g) => (
            <Group key={g.name} group={g} />
          ))}
        </div>
      </div>

      {/* Also experienced in — always visible */}
      <div className="mt-12 rounded-2xl border border-line bg-surface p-6">
        <h3 className="font-display text-[20px] font-semibold text-primary">
          Also experienced in
        </h3>
        <p className="t-small mt-1 text-secondary">
          Not my primary tracks, but areas I've worked across through projects
          and roles.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {alsoExperienced.map((a) => (
            <div key={a.name}>
              <p className="t-mono text-accent">{a.name}</p>
              <p className="t-small mt-2 leading-relaxed text-secondary">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
