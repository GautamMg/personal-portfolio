import Reveal from '../components/Reveal.jsx'

const EMAIL = 'gautammg1506@gmail.com'

const channels = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: MailIcon,
    note: 'Best way to reach me',
  },
  {
    label: 'LinkedIn',
    value: '/in/gautam',
    href: 'https://www.linkedin.com/in/mg-gautam/',
    icon: LinkedinIcon,
    note: 'Let’s connect',
  },
  {
    label: 'GitHub',
    value: '@gautam',
    href: 'https://github.com/GautamMg',
    icon: GithubIcon,
    note: 'See what I build',
  },
  {
    label: 'Resume',
    value: 'PDF',
    href: '/Gautam_Gururaj_Molakalmuru_Resume.pdf',
    icon: DocIcon,
    note: 'The one-pager',
  },
]

export default function Contact() {
  return (
    <div className="space-y-12">
      <header>
        <p className="eyebrow mb-3">// contact</p>
        <h1 className="t-h1 text-primary">Get in touch</h1>
        <p className="t-body mt-6 max-w-[58ch] text-lg text-primary/90">
          I'm open to opportunities and always happy to connect and swap ideas.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-[#0F0F0F] shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md"
        >
          Email me
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </header>

      <Reveal as="section" className="grid gap-4 sm:grid-cols-2">
        {channels.map(({ label, value, href, icon: Icon, note }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-5 transition-all duration-150 hover:scale-[1.01] hover:border-line-hover hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-secondary transition-colors group-hover:text-accent">
              <Icon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="t-label block text-muted">{note}</span>
              <span className="block text-[15px] font-medium text-primary group-hover:text-accent">
                {label}
              </span>
              <span className="t-small block truncate text-secondary">{value}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </Reveal>
    </div>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3 5.5 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.4 7.2H2.9V17h2.5V7.2ZM4.15 6.1A1.45 1.45 0 1 0 4.13 3.2a1.45 1.45 0 0 0 .02 2.9ZM17.1 17v-5.38c0-2.88-1.54-4.22-3.59-4.22-1.65 0-2.39.91-2.8 1.55V7.2H8.2V17h2.5v-5.47c0-.29.02-.58.11-.79.23-.58.76-1.18 1.65-1.18 1.16 0 1.63.89 1.63 2.19V17h2.5Z" />
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5a8.5 8.5 0 0 0-2.69 16.57c.43.08.59-.18.59-.41v-1.5c-2.37.51-2.87-1.14-2.87-1.14-.39-.99-.95-1.25-.95-1.25-.77-.53.06-.52.06-.52.85.06 1.3.88 1.3.88.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.13-1.89-.21-3.88-.95-3.88-4.2 0-.93.33-1.69.88-2.29-.09-.21-.38-1.08.08-2.25 0 0 .72-.23 2.35.87a8.2 8.2 0 0 1 4.28 0c1.63-1.1 2.35-.87 2.35-.87.46 1.17.17 2.04.08 2.25.55.6.88 1.36.88 2.29 0 3.26-1.99 3.98-3.89 4.19.31.26.58.78.58 1.57v2.33c0 .23.15.5.59.41A8.5 8.5 0 0 0 10 1.5Z" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 2.5h6L15.5 7v9.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 2.5V7h4.5M7 11h6M7 13.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
