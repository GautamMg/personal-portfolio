import { useMode } from '../context/ModeContext.jsx'
import { content } from '../content.js'

const EMAIL = 'gautammg1506@gmail.com'

const socials = [
  { label: 'GitHub', href: 'https://github.com/GautamMg', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mg-gautam/', icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: MailIcon },
]

export default function Footer() {
  const { mode } = useMode()
  const isPersonal = mode === 'personal'
  const footerLine = content[mode].footerLine

  // Personal: hide GitHub; Professional: show all three.
  const visibleSocials = isPersonal
    ? socials.filter(s => s.label !== 'GitHub')
    : socials

  return (
    <footer className="border-t border-line pt-16 text-center">
      <h2 className="t-h3 text-primary">Let's Connect</h2>
      <p className="t-body mt-3 text-secondary">
        {isPersonal
          ? 'Feel free to reach out for good conversations :)'
          : 'Feel free to reach out for collaborations or just a friendly hello 😀'}
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="link-underline mt-3 inline-block text-[15px] font-medium text-accent transition-colors hover:text-accent-hover"
      >
        {EMAIL}
      </a>

      <ul className="mt-8 flex items-center justify-center gap-6">
        {visibleSocials.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="flex h-7 w-7 items-center justify-center text-secondary transition-all duration-150 hover:-translate-y-0.5 hover:text-accent"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>

      {/* Footer stamp — professional only */}
      {!isPersonal && <p className="t-small mt-8 text-muted">{footerLine}</p>}
    </footer>
  )
}

function GithubIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5a8.5 8.5 0 0 0-2.69 16.57c.43.08.59-.18.59-.41v-1.5c-2.37.51-2.87-1.14-2.87-1.14-.39-.99-.95-1.25-.95-1.25-.77-.53.06-.52.06-.52.85.06 1.3.88 1.3.88.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.13-1.89-.21-3.88-.95-3.88-4.2 0-.93.33-1.69.88-2.29-.09-.21-.38-1.08.08-2.25 0 0 .72-.23 2.35.87a8.2 8.2 0 0 1 4.28 0c1.63-1.1 2.35-.87 2.35-.87.46 1.17.17 2.04.08 2.25.55.6.88 1.36.88 2.29 0 3.26-1.99 3.98-3.89 4.19.31.26.58.78.58 1.57v2.33c0 .23.15.5.59.41A8.5 8.5 0 0 0 10 1.5Z" />
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.4 7.2H2.9V17h2.5V7.2ZM4.15 6.1A1.45 1.45 0 1 0 4.13 3.2a1.45 1.45 0 0 0 .02 2.9ZM17.1 17v-5.38c0-2.88-1.54-4.22-3.59-4.22-1.65 0-2.39.91-2.8 1.55V7.2H8.2V17h2.5v-5.47c0-.29.02-.58.11-.79.23-.58.76-1.18 1.65-1.18 1.16 0 1.63.89 1.63 2.19V17h2.5Z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3 5.5 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
