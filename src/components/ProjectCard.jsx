import { Link } from 'react-router-dom'

export default function ProjectCard({
  title,
  description,
  tags = [],
  imageLabel = 'Project image',
  featured = false,
  to,
}) {
  const Root = to ? Link : 'article'
  const rootProps = to ? { to } : {}

  return (
    <Root
      {...rootProps}
      className={
        'group relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface transition-all duration-150 hover:scale-[1.01] hover:shadow-md ' +
        (featured ? 'border-accent/40 hover:border-accent' : 'border-line hover:border-line-hover')
      }
    >
      {featured && (
        <span className="t-label absolute left-4 top-4 z-10 rounded bg-accent px-2 py-1 text-[#0F0F0F]">
          Featured
        </span>
      )}

      {/* Image placeholder */}
      <div className={'w-full overflow-hidden bg-elevated ' + (featured ? 'aspect-[16/10] sm:aspect-[16/8]' : 'aspect-video')}>
        <div
          className="t-label flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_60%_40%,var(--color-accent-subtle)_0%,transparent_60%)] text-muted transition-transform duration-500 group-hover:scale-105"
          role="img"
          aria-label={`Placeholder image for ${title}`}
        >
          {imageLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className={
            'font-sans font-semibold tracking-tight text-primary transition-colors group-hover:text-accent ' +
            (featured ? 'text-[22px]' : 'text-[15px]')
          }
        >
          {title}
        </h3>
        <p className="t-small mt-2 text-secondary">{description}</p>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-line bg-elevated px-2 py-1 font-mono text-xs uppercase tracking-widest text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-medium text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          View project
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Root>
  )
}
