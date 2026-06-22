import { useMode } from '../context/ModeContext.jsx'

// Professional: `// label` mono eyebrow (IDE cue).
// Personal: the same label stripped of CLI syntax, set in a soft serif italic.
export default function SectionHeading({ eyebrow, title }) {
  const { mode } = useMode()
  const personal = mode === 'personal'

  const label = eyebrow ? eyebrow.replace(/^[/~\s]+/, '') : ''
  const editorial = label ? label.charAt(0).toUpperCase() + label.slice(1) : ''

  return (
    <div>
      {eyebrow &&
        (personal ? (
          <p className="mb-3 font-serif text-[15px] italic text-stone-500">{editorial}</p>
        ) : (
          <p className="eyebrow mb-3">{eyebrow}</p>
        ))}
      <h2 className="t-h2 text-primary">{title}</h2>
    </div>
  )
}
