import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Constants — the immutable variables in a life ───────────────────────────
   Cinematic crossfade lookbook with an alternating zig-zag rhythm. Each
   category claims exactly one viewport: massive fluid serif on one side, a
   fixed-height frame on the other where the photos slowly dissolve into one
   another every 3.5s — rendered uncropped (object-contain) at their native
   aspect ratio.

   Photo paths point at the existing /happy mock set so the galleries render;
   swap these for real shots when available. "Craft" carries the raw,
   behind-the-scenes engineering photos.
──────────────────────────────────────────────────────────────────────────── */
const constantsData = [
  { id: '01', title: 'Family',  photos: ['/happy/mock-family.jpg'] },
  { id: '02', title: 'Pinku',   photos: ['/happy/mock-dog.jpeg', '/happy/mock-dog(1).jpg'] },
  { id: '03', title: 'Friends', photos: ['/happy/mock-friends.jpg', '/happy/mock-friends(1).jpg', '/happy/mock-friends(2).jpg'] },
  { id: '04', title: 'Craft',   photos: ['/happy/mock-engineering.jpg', '/happy/mock-engineering(1).jpg'] },
  { id: '05', title: 'Travel',  photos: ['/happy/mock-travel.jpg', '/happy/mock-travel(1).jpg'] },
  { id: '06', title: 'Music',   photos: ['/happy/mock-music.png'] },
  { id: '07', title: 'Sports',  photos: ['/happy/mock-sports.jpg', '/happy/mock-sports(1).JPG'] },
  { id: '08', title: 'Cooking', photos: ['/happy/mock-cooking.jpg'] },
]

function CrossfadeGallery({ photos, index, title }) {
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return
    const timer = setInterval(
      () => setPhotoIndex((prev) => (prev + 1) % photos.length),
      3500, // 3.5s cinematic pacing
    )
    return () => clearInterval(timer)
  }, [photos.length])

  return (
    <div
      className={`w-full md:w-1/2 flex items-center h-[60vh] md:h-[75vh] mt-8 md:mt-0 ${
        index % 2 === 0 ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Uncropped frame: full half-screen width, locked height */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={photoIndex}
            src={encodeURI(photos[photoIndex])}
            alt={`${title} ${photoIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className={`absolute inset-0 w-full h-full object-contain ${
              index % 2 === 0 ? 'md:object-right' : 'md:object-left'
            }`}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Constants() {
  return (
    <div className="w-full bg-[#0A0A0A] text-stone-200 overflow-hidden">
      {constantsData.map((category, index) => (
        <section
          key={category.id}
          className={`relative w-full h-screen flex flex-col ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-center justify-between px-8 md:px-16 border-t border-stone-800/50`}
        >
          {/* Fluid brutalist typography — hugs its outer edge so the
              massive serif never bleeds into the photo on reversed rows */}
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center h-full z-10 ${
              index % 2 === 0
                ? 'md:items-start md:text-left md:pr-12'
                : 'md:items-end md:text-right md:pl-12'
            }`}
          >
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-stone-500 mb-4">
              // {category.id}
            </span>
            <h2
              className="font-serif leading-none text-stone-200 lowercase"
              style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}
            >
              {category.title}
            </h2>
          </div>

          {/* Uncropped crossfade gallery */}
          <CrossfadeGallery photos={category.photos} index={index} title={category.title} />
        </section>
      ))}
    </div>
  )
}
