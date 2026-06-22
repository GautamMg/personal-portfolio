// The Engineering Ledger — a grounded, minimalist record of trajectory.
// No bouncing or layout shift: a single Focus State illuminates the row's
// typography from muted to bright on hover. Subtle and professional.

const highlights = [
  { id: '01', title: 'Exchange program in France', desc: 'Selected on merit to spend a semester at ESIGELEC University in France during my final year of undergrad, where I studied graduate level coursework. It was my first experience being somewhere completely unfamiliar, and it shaped a lot of how I approach new environments.', tag: '// ACADEMIA' },
  { id: '02', title: 'Global launch at Quinbay', desc: 'Joined as one of the early engineers on a small team building a B2B platform from scratch. Ten months later we had a successful global launch. It is one of my dearest experience in my professional career', tag: '// PROFESSIONAL' },
  { id: '03', title: 'Post-launch support', desc: 'After launch, I stayed on as part of the engineering team working directly with business users, helping them get comfortable with the product, understanding where things were breaking down, and translating that back into fixes.', tag: '// PROFESSIONAL' },
  { id: '04', title: 'Performance award', desc: 'Recognised with a performance award for my contributions across both phases, pre-launch engineering and post-launch stabilisation. It meant a lot coming from a team I respected.', tag: '// PROFESSIONAL' },
  { id: '05', title: 'Full scholarship at Ohio State', desc: 'The research lab I was contributing to at Ohio State offered me a full merit scholarship and a Graduate Research Associate position.', tag: '// ACADEMIA' },
  { id: '06', title: 'Internship at TACC', desc: 'Spent a summer interning at the Texas Advanced Computing Center, a research computing institution stemming from UT Austin. Got to work on advance usecases that helped me shape my career', tag: '// PROFESSIONAL' },
  { id: '07', title: 'Conference presentations', desc: "Presented my research work at multiple conferences through talks and posters, including PEARC '25, the ICICLE All-Hands Meeting, and Gateways '25.", tag: '// ACADEMIA' },
  { id: '08', title: 'AWS Certification', desc: 'Completed the AWS Certified Cloud Practitioner certification, a step toward formalising the cloud experience I had been picking up across projects', tag: '// PROFESSIONAL' },
]

function LedgerRow({ item }) {
  return (
    <div className="group relative w-full flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-stone-800 cursor-pointer transition-colors duration-500 hover:bg-white/[0.03] px-4 md:px-8 -mx-4 md:-mx-8">
      {/* Left block — index & title */}
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 w-full md:w-2/3">
        <span className="font-mono text-sm text-stone-600 group-hover:text-stone-400 transition-colors duration-300">
          {item.id}
        </span>
        <div className="flex flex-col">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-300 group-hover:text-stone-100 transition-colors duration-300">
            {item.title}
          </h2>
          <p className="font-sans text-sm md:text-base text-stone-500 group-hover:text-stone-300 transition-colors duration-300 mt-2 max-w-xl">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Right block — tag */}
      <div className="mt-6 md:mt-0 flex items-center md:justify-end w-full md:w-1/3">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-stone-600 group-hover:text-stone-400 transition-colors duration-300">
          {item.tag}
        </span>
      </div>
    </div>
  )
}

export default function Highlights() {
  return (
    <div className="w-full min-h-screen text-stone-400 pt-32 pb-24 px-4 md:px-12">
      <h1 className="font-serif text-5xl md:text-8xl mb-24 text-stone-200">
        Highlights.
      </h1>

      <div className="w-full flex flex-col border-t border-stone-800">
        {highlights.map((item) => (
          <LedgerRow key={item.id} item={item} />
        ))}
      </div>

      <footer className="mt-24 border-t border-stone-800 pt-16 text-center">
        <h2 className="font-serif text-3xl text-stone-200">Let's Connect</h2>
        <p className="mt-3 text-sm text-stone-500">
          Feel free to reach out for collaborations or just a friendly hello 😀
        </p>
        <a
          href="mailto:gautammg1506@gmail.com"
          className="mt-3 inline-block text-[15px] font-medium text-stone-300 hover:text-stone-100 transition-colors duration-150"
        >
          gautammg1506@gmail.com
        </a>
        <p className="mt-8 text-xs text-stone-700">Built with care · Columbus, OH</p>
      </footer>
    </div>
  )
}
