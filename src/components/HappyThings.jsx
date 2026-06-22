/* ─── When I'm happy — the Editorial Lookbook ─────────────────────────────────
   A native vertical-scroll lookbook. Each category is a 12-col grid: a sticky
   typographic left column that locks into the viewport while a free-flowing
   right column of uncropped, full-colour photos scrolls past it. Present-tense
   happiness — full colour, zero-trim (object-contain), no grayscale, no archive.

   Native CSS `position: sticky` does the pinning (App.jsx omits overflow-x-hidden
   on /happy, which would otherwise create a scroll container that breaks it).
──────────────────────────────────────────────────────────────────────────── */
const happyThings = [
  { id: '01', title: 'Family',      photos: ['/happy/mock-family.jpg'] },
  { id: '02', title: 'Dogs',        photos: ['/happy/mock-dog.jpeg', '/happy/mock-dog(1).jpg'] },
  { id: '03', title: 'Friends',     photos: ['/happy/mock-friends.jpg', '/happy/mock-friends(1).jpg', '/happy/mock-friends(2).jpg'] },
  { id: '04', title: 'Engineering', photos: ['/happy/mock-engineering.jpg', '/happy/mock-engineering(1).JPG'] },
  { id: '05', title: 'Travel',      photos: ['/happy/mock-travel.jpg', '/happy/mock-travel(1).jpg'] },
  { id: '06', title: 'Music',       photos: ['/happy/mock-music.png'] },
  { id: '07', title: 'Playing',     photos: ['/happy/mock-sports.jpg', '/happy/mock-sports(1).JPG'] },
  { id: '08', title: 'Cooking',     photos: ['/happy/mock-cooking.jpg'] },
]

export default function HappyThings() {
  return (
    <div className="w-full bg-[#0A0A0A] text-stone-200 pb-32">

      {/* Page intro */}
      <header className="max-w-[1400px] mx-auto px-8 md:px-16 pt-24 md:pt-32 pb-8 md:pb-16">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">
          // when I&apos;m happy
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight text-stone-200 max-w-2xl">
          The things that make a good day — in full colour.
        </h1>
      </header>

      {happyThings.map((category) => (
        <section
          key={category.id}
          className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 border-t border-stone-800/50"
        >
          {/* ── Left column: sticky typography ── */}
          <div className="col-span-1 md:col-span-5 relative">
            <div className="md:sticky md:top-0 h-[30vh] md:h-screen flex flex-col justify-center px-8 md:pl-16">
              <span className="font-mono text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">
                // {category.id}
              </span>
              <h2 className="font-serif text-[15vw] md:text-[8vw] leading-none text-stone-200 lowercase">
                {category.title}
              </h2>
            </div>
          </div>

          {/* ── Right column: the zero-trim, full-colour river ── */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-16 md:gap-32 py-16 md:py-48 px-8 md:pr-16">
            {category.photos.map((photoSrc, idx) => (
              <div key={idx} className="w-full h-auto">
                <img
                  src={encodeURI(photoSrc)}
                  alt={`${category.title} ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.02] shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-sm"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
