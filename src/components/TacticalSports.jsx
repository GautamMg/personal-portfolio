import { motion, useAnimation } from 'framer-motion'

/* ─── Shared constants ──────────────────────────────────────────────────────── */
const CS  = 'rgba(255,255,255,0.1)'   // court stroke
const TS  = 'rgba(214,211,209,0.85)'  // trajectory / glow (stone-300)
const TW  = 1.4
const DSH = '5 4'

/* ─── Sports data ───────────────────────────────────────────────────────────── */
const SPORTS = [
  { id: 'cricket',      title: 'Cricket' },
  { id: 'football',     title: 'Football' },
  { id: 'tennis',       title: 'Tennis' },
  { id: 'chess',        title: 'Chess' },
  { id: 'squash',       title: 'Squash' },
  { id: 'pickleball',   title: 'Pickleball' },
  { id: 'kabaddi',      title: 'Kabaddi' },
  { id: 'volleyball',   title: 'Volleyball' },
  { id: 'table-tennis', title: 'Table Tennis' },
  { id: 'badminton',    title: 'Badminton' },
]

/* ─── Animation helpers ─────────────────────────────────────────────────────── */
function pv(delay = 0) {
  return {
    rest:  { pathLength: 0, opacity: 0 },
    hover: {
      pathLength: 1, opacity: 1,
      transition: {
        pathLength: { duration: 1.1, ease: 'easeInOut', delay },
        opacity:    { duration: 0.1, delay },
      },
    },
  }
}
function dv(delay = 0) {
  return {
    rest:  { opacity: 0, scale: 0 },
    hover: { opacity: 1, scale: 1, transition: { duration: 0.2, delay } },
  }
}

function Glow({ id }) {
  return (
    <defs>
      <filter id={id} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}

/* ─── 1. Cricket ─────────────────────────────────────────────────────────────── */
function CricketSVG() {
  const g = 'url(#g-cricket)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Pitch rectangle */}
      <rect x="95" y="14" width="50" height="172" stroke={CS} strokeWidth="1" />
      {/* Popping creases */}
      <line x1="83" y1="43" x2="157" y2="43" stroke={CS} strokeWidth="1.3" />
      <line x1="83" y1="157" x2="157" y2="157" stroke={CS} strokeWidth="1.3" />
      {/* 3 stumps — bowling end (top) */}
      <line x1="112" y1="20" x2="112" y2="43" stroke={CS} strokeWidth="1.6" />
      <line x1="120" y1="20" x2="120" y2="43" stroke={CS} strokeWidth="1.6" />
      <line x1="128" y1="20" x2="128" y2="43" stroke={CS} strokeWidth="1.6" />
      {/* 3 stumps — batting end (bottom) */}
      <line x1="112" y1="157" x2="112" y2="180" stroke={CS} strokeWidth="1.6" />
      <line x1="120" y1="157" x2="120" y2="180" stroke={CS} strokeWidth="1.6" />
      <line x1="128" y1="157" x2="128" y2="180" stroke={CS} strokeWidth="1.6" />

      {/* Ball: bowl from batting end, bounces, deviates into middle stump */}
      <motion.path d="M120 168 Q116 110 119 88 Q128 62 120 34"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      <motion.circle cx="119" cy="88" r="2.8" fill={TS} variants={dv(0.6)} />
      <Glow id="g-cricket" />
    </svg>
  )
}

/* ─── 2. Football ────────────────────────────────────────────────────────────── */
function FootballSVG() {
  const g = 'url(#g-football)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* 18-yard penalty box */}
      <rect x="28" y="26" width="184" height="132" stroke={CS} strokeWidth="1" />
      {/* Goal */}
      <rect x="86" y="14" width="68" height="20" stroke={CS} strokeWidth="0.9" />
      {/* 6-yard box */}
      <rect x="86" y="26" width="68" height="32" stroke={CS} strokeWidth="0.6" />
      {/* Penalty spot */}
      <circle cx="120" cy="77" r="2" fill={CS} />
      {/* D-arc outside box */}
      <path d="M 76 158 A 48 48 0 0 0 164 158" stroke={CS} strokeWidth="0.8" fill="none" />

      {/* 3 player nodes */}
      <circle cx="62"  cy="158" r="4" stroke={CS} strokeWidth="1" />
      <circle cx="178" cy="158" r="4" stroke={CS} strokeWidth="1" />
      <circle cx="120" cy="98"  r="4" stroke={CS} strokeWidth="1" />

      {/* Triangle passing */}
      <motion.path d="M62 158 L120 98"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      <motion.path d="M120 98 L178 158"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0.35)} />
      {/* Sharp finish into net */}
      <motion.path d="M178 158 L120 30"
        stroke={TS} strokeWidth={TW + 0.5} strokeLinecap="round"
        filter={g} variants={pv(0.7)} />
      <motion.circle cx="120" cy="30" r="3" fill={TS} variants={dv(1.4)} />
      <Glow id="g-football" />
    </svg>
  )
}

/* ─── 3. Tennis ──────────────────────────────────────────────────────────────── */
function TennisSVG() {
  const g = 'url(#g-tennis)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Court outline */}
      <rect x="20" y="18" width="200" height="164" stroke={CS} strokeWidth="1" />
      {/* Net */}
      <line x1="20" y1="100" x2="220" y2="100" stroke={CS} strokeWidth="1.4" strokeDasharray="3 2" />
      {/* Center service line — T vertical (both halves) */}
      <line x1="120" y1="18"  x2="120" y2="100" stroke={CS} strokeWidth="0.9" />
      <line x1="120" y1="100" x2="120" y2="182" stroke={CS} strokeWidth="0.9" />
      {/* Service lines — T crossbar (both halves) */}
      <line x1="20"  y1="63"  x2="220" y2="63"  stroke={CS} strokeWidth="0.8" />
      <line x1="20"  y1="137" x2="220" y2="137" stroke={CS} strokeWidth="0.8" />

      {/* Cross-court serve: bottom-right baseline → top-left service box */}
      <motion.path d="M202 175 L42 30"
        stroke={TS} strokeWidth={TW + 0.3} strokeDasharray="6 3" strokeLinecap="round"
        filter={g} variants={pv(0)} />
      {/* Bounce in service box */}
      <motion.circle cx="42" cy="63" r="3" fill={TS} variants={dv(0.9)} />
      <Glow id="g-tennis" />
    </svg>
  )
}

/* ─── 4. Chess ───────────────────────────────────────────────────────────────── */
function ChessSVG() {
  const sq = 22
  const ox = 16
  const oy = 12
  const g  = 'url(#g-chess)'

  // Dark squares (filled)
  const darks = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) {
        darks.push(
          <rect key={`ds${r}${c}`}
            x={ox + c * sq} y={oy + r * sq} width={sq} height={sq}
            fill="rgba(255,255,255,0.05)" />
        )
      }
    }
  }

  // Knight start: col=1, row=6 (b2); L-move: 2 up + 1 right → col=2, row=4 (c4)
  const cx = (col) => ox + (col + 0.5) * sq
  const cy = (row) => oy + (row + 0.5) * sq
  const s  = { x: cx(1), y: cy(6) }
  const m  = { x: cx(1), y: cy(4) }   // elbow
  const e  = { x: cx(2), y: cy(4) }   // landing

  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {darks}
      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={ox + i*sq} y1={oy} x2={ox + i*sq} y2={oy + 8*sq}
          stroke={CS} strokeWidth="0.7" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1={ox} y1={oy + i*sq} x2={ox + 8*sq} y2={oy + i*sq}
          stroke={CS} strokeWidth="0.7" />
      ))}

      {/* Knight origin */}
      <motion.circle cx={s.x} cy={s.y} r="5" fill="none" stroke={TS} strokeWidth="1.5"
        variants={dv(0)} />
      {/* Knight L-path */}
      <motion.path d={`M${s.x} ${s.y} L${m.x} ${m.y} L${e.x} ${e.y}`}
        stroke={TS} strokeWidth={TW + 0.4} strokeLinecap="round" strokeLinejoin="round"
        filter={g} variants={pv(0.1)} />
      {/* Landing */}
      <motion.circle cx={e.x} cy={e.y} r="5" fill={TS} variants={dv(0.9)} />
      <Glow id="g-chess" />
    </svg>
  )
}

/* ─── 5. Squash (isometric cabinet projection) ──────────────────────────────── */
function SquashSVG() {
  const g = 'url(#g-squash)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* ── Front wall ── */}
      <polygon points="52,14 208,14 208,108 52,108"
        stroke={CS} strokeWidth="1" />
      {/* Out-of-court line (top) */}
      <line x1="52" y1="28" x2="208" y2="28" stroke={CS} strokeWidth="0.7" strokeDasharray="3 2" />
      {/* Service line */}
      <line x1="52" y1="62" x2="208" y2="62" stroke={CS} strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Tin (below = out) */}
      <line x1="52" y1="96" x2="208" y2="96" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

      {/* ── Left side wall ── */}
      <polygon points="10,38 52,14 52,108 10,132"
        stroke={CS} strokeWidth="1" />
      <line x1="10" y1="90" x2="52" y2="76" stroke={CS} strokeWidth="0.6" strokeDasharray="3 2" />

      {/* ── Floor with T-line ── */}
      <line x1="10" y1="132" x2="208" y2="132" stroke={CS} strokeWidth="0.8" />
      {/* Short service line */}
      <line x1="10" y1="155" x2="208" y2="155" stroke={CS} strokeWidth="0.7" strokeDasharray="4 3" />
      {/* Half-court T vertical */}
      <line x1="130" y1="132" x2="130" y2="192" stroke={CS} strokeWidth="0.7" strokeDasharray="4 3" />

      {/* Ball: back-right → side wall bounce → front wall → drops to floor */}
      <motion.path d="M196 126 L13 80"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      <motion.circle cx="13" cy="80" r="2.5" fill={TS} variants={dv(0.65)} />
      <motion.path d="M13 80 L118 34"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0.65)} />
      <motion.circle cx="118" cy="34" r="2.5" fill={TS} variants={dv(1.2)} />
      <motion.path d="M118 34 L78 152"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(1.2)} />
      <Glow id="g-squash" />
    </svg>
  )
}

/* ─── 6. Pickleball ──────────────────────────────────────────────────────────── */
function PickleballSVG() {
  const g = 'url(#g-pickle)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Court */}
      <rect x="20" y="18" width="200" height="164" stroke={CS} strokeWidth="1" />
      {/* Net */}
      <line x1="20" y1="100" x2="220" y2="100" stroke={CS} strokeWidth="1.5" />
      {/* Kitchen (NVZ) lines — emphasized */}
      <line x1="20"  y1="78"  x2="220" y2="78"  stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
      <line x1="20"  y1="122" x2="220" y2="122" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
      {/* Kitchen fill */}
      <rect x="20" y="78" width="200" height="22" fill="rgba(255,255,255,0.025)" />
      <rect x="20" y="100" width="200" height="22" fill="rgba(255,255,255,0.025)" />
      {/* Center service lines */}
      <line x1="120" y1="18"  x2="120" y2="78"  stroke={CS} strokeWidth="0.6" strokeDasharray="2 3" />
      <line x1="120" y1="122" x2="120" y2="182" stroke={CS} strokeWidth="0.6" strokeDasharray="2 3" />

      {/* Dink: short parabolic arc, barely clears net, lands in kitchen */}
      <motion.path d="M75 155 Q95 72 145 88"
        stroke={TS} strokeWidth={TW} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      <motion.circle cx="145" cy="88" r="2.5" fill={TS} variants={dv(0.9)} />
      <Glow id="g-pickle" />
    </svg>
  )
}

/* ─── 7. Kabaddi ─────────────────────────────────────────────────────────────── */
function KabaddiSVG() {
  const g = 'url(#g-kabaddi)'
  // 7 defenders in semicircle, center (120,52), radius 44, opening downward
  const defenders = [0, 30, 60, 90, 120, 150, 180].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return {
      cx: Math.round(120 + 44 * Math.cos(rad)),
      cy: Math.round(52  + 44 * Math.sin(rad)),
    }
  })

  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Court */}
      <rect x="20" y="18" width="200" height="164" stroke={CS} strokeWidth="1" />
      {/* Thick midline */}
      <line x1="20" y1="100" x2="220" y2="100" stroke={CS} strokeWidth="2.2" />
      {/* Baulk lines */}
      <line x1="20" y1="66"  x2="220" y2="66"  stroke={CS} strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="20" y1="134" x2="220" y2="134" stroke={CS} strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Bonus lines */}
      <line x1="20" y1="48"  x2="220" y2="48"  stroke={CS} strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="20" y1="152" x2="220" y2="152" stroke={CS} strokeWidth="0.5" strokeDasharray="2 4" />

      {/* 7 defending nodes */}
      {defenders.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="4" stroke={CS} strokeWidth="1" />
      ))}

      {/* Raider at bottom */}
      <motion.circle cx="120" cy="152" r="5.5" fill="none" stroke={TS} strokeWidth="1.5"
        variants={dv(0)} />
      {/* Cross midline, touch defender at top */}
      <motion.path d="M120 152 Q88 118 120 97"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0.1)} />
      <motion.circle cx="120" cy="97" r="3" fill={TS} variants={dv(0.9)} />
      {/* Escape back */}
      <motion.path d="M120 97 Q150 122 120 142"
        stroke={TS} strokeWidth={TW - 0.2} strokeLinecap="round"
        filter={g} variants={pv(1.0)} />
      <Glow id="g-kabaddi" />
    </svg>
  )
}

/* ─── 8. Volleyball ──────────────────────────────────────────────────────────── */
function VolleyballSVG() {
  const g = 'url(#g-vball)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Court */}
      <rect x="20" y="18" width="200" height="164" stroke={CS} strokeWidth="1" />
      {/* Net (thick) */}
      <line x1="20" y1="100" x2="220" y2="100" stroke={CS} strokeWidth="2" />
      {/* 10-foot attack lines */}
      <line x1="20" y1="73"  x2="220" y2="73"  stroke={CS} strokeWidth="0.8" strokeDasharray="5 3" />
      <line x1="20" y1="127" x2="220" y2="127" stroke={CS} strokeWidth="0.8" strokeDasharray="5 3" />
      {/* Center line */}
      <line x1="120" y1="18" x2="120" y2="182" stroke={CS} strokeWidth="0.5" />

      {/* Receiver at back of our side */}
      <motion.circle cx="82" cy="164" r="4" fill="none" stroke={TS} strokeWidth="1.2"
        variants={dv(0)} />
      {/* Angled receive → setter */}
      <motion.path d="M82 164 Q62 132 72 112"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0.1)} />
      {/* Setter near net */}
      <motion.circle cx="72" cy="112" r="3" fill={TS} variants={dv(0.75)} />
      {/* Vertical set upward to spiker */}
      <motion.path d="M72 112 L98 90"
        stroke={TS} strokeWidth={TW} strokeLinecap="round"
        filter={g} variants={pv(0.8)} />
      {/* Sharp downward spike into opponent's court */}
      <motion.path d="M98 103 L172 32"
        stroke={TS} strokeWidth={TW + 0.6} strokeLinecap="round"
        filter={g} variants={pv(1.05)} />
      {/* Arrowhead */}
      <motion.path d="M166 38 L172 30 L178 38"
        stroke={TS} strokeWidth={TW} strokeLinecap="round" strokeLinejoin="round"
        filter={g} variants={pv(1.4)} />
      <Glow id="g-vball" />
    </svg>
  )
}

/* ─── 9. Table Tennis (isometric table) ─────────────────────────────────────── */
function TableTennisSVG() {
  const g = 'url(#g-tt)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Table top surface — parallelogram */}
      <polygon points="42,52 198,52 218,138 22,138"
        stroke={CS} strokeWidth="1" fill="rgba(255,255,255,0.018)" />
      {/* Center line on table */}
      <line x1="120" y1="52" x2="120" y2="138" stroke={CS} strokeWidth="0.6" strokeDasharray="3 2" />
      {/* End lines */}
      <line x1="42"  y1="52"  x2="198" y2="52"  stroke={CS} strokeWidth="0.8" />
      <line x1="22"  y1="138" x2="218" y2="138" stroke={CS} strokeWidth="0.8" />
      {/* Net across center — in perspective, slightly above mid-y */}
      <line x1="32"  y1="95"  x2="208" y2="95"  stroke={CS} strokeWidth="1.6" />
      {/* Net posts */}
      <line x1="32"  y1="84"  x2="32"  y2="98"  stroke={CS} strokeWidth="1.2" />
      <line x1="208" y1="84"  x2="208" y2="98"  stroke={CS} strokeWidth="1.2" />
      {/* Table front edge */}
      <polygon points="22,138 218,138 218,148 22,148"
        stroke={CS} strokeWidth="0.6" fill="rgba(255,255,255,0.015)" />

      {/* Fast loop shot: far end bounce, arcs low over net, near end bounce */}
      <motion.path d="M168 62 Q148 54 100 76"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      <motion.circle cx="100" cy="76" r="2.5" fill={TS} variants={dv(0.65)} />
      {/* Over net, low arc */}
      <motion.path d="M100 76 Q122 70 142 112"
        stroke={TS} strokeWidth={TW} strokeDasharray={DSH} strokeLinecap="round"
        filter={g} variants={pv(0.65)} />
      <motion.circle cx="142" cy="112" r="2.5" fill={TS} variants={dv(1.2)} />
      <Glow id="g-tt" />
    </svg>
  )
}

/* ─── 10. Badminton ──────────────────────────────────────────────────────────── */
function BadmintonSVG() {
  const g = 'url(#g-badminton)'
  return (
    <svg viewBox="0 0 240 200" fill="none" className="w-full h-full">
      {/* Court boundary */}
      <rect x="20" y="14" width="200" height="172" stroke={CS} strokeWidth="1" />
      {/* Singles sidelines */}
      <line x1="38"  y1="14"  x2="38"  y2="186" stroke={CS} strokeWidth="0.7" />
      <line x1="202" y1="14"  x2="202" y2="186" stroke={CS} strokeWidth="0.7" />
      {/* Net at center */}
      <line x1="20"  y1="100" x2="220" y2="100" stroke={CS} strokeWidth="1.8" />
      {/* Short service lines */}
      <line x1="20"  y1="128" x2="220" y2="128" stroke={CS} strokeWidth="0.9" />
      <line x1="20"  y1="72"  x2="220" y2="72"  stroke={CS} strokeWidth="0.9" />
      {/* Back boundary / long service doubles lines */}
      <line x1="20"  y1="162" x2="220" y2="162" stroke={CS} strokeWidth="0.8" />
      <line x1="20"  y1="38"  x2="220" y2="38"  stroke={CS} strokeWidth="0.8" />
      {/* Center line between short service lines */}
      <line x1="120" y1="72"  x2="120" y2="128" stroke={CS} strokeWidth="0.6" />

      {/* Massive high clear: near back-court → huge arc → far back-court */}
      <motion.path d="M76 158 Q120 -22 164 42"
        stroke={TS} strokeWidth={TW + 0.3} strokeLinecap="round"
        filter={g} variants={pv(0)} />
      {/* Landing in deep far back court */}
      <motion.circle cx="164" cy="42" r="3" fill={TS} variants={dv(0.9)} />
      <Glow id="g-badminton" />
    </svg>
  )
}

/* ─── SVG map ───────────────────────────────────────────────────────────────── */
const SVG_MAP = {
  cricket:      <CricketSVG />,
  football:     <FootballSVG />,
  tennis:       <TennisSVG />,
  chess:        <ChessSVG />,
  squash:       <SquashSVG />,
  pickleball:   <PickleballSVG />,
  kabaddi:      <KabaddiSVG />,
  volleyball:   <VolleyballSVG />,
  'table-tennis': <TableTennisSVG />,
  badminton:    <BadmintonSVG />,
}

/* ─── Card ──────────────────────────────────────────────────────────────────── */
function TacticalCard({ sport }) {
  const controls = useAnimation()

  return (
    <motion.div
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={()   => controls.start('rest')}
      animate={controls}
      initial="rest"
      className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#0F0F0F] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      style={{ aspectRatio: '4/3' }}
    >
      <div className="absolute inset-0 p-4">
        {SVG_MAP[sport.id]}
      </div>

      <h3 className="absolute bottom-6 left-6 font-serif text-2xl text-stone-400 pointer-events-none">
        {sport.title}
      </h3>

      {/* Hover vignette */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}

/* ─── Photo grid ─────────────────────────────────────────────────────────────── */
function SpectatorArchive() {
  const photos = [
    { src: '/Cricket.JPG',  alt: 'Cricket match'  },
    { src: '/Football.jpg', alt: 'Football match' },
    { src: '/Kabaddi.jpg',  alt: 'Kabaddi match'  },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500 mt-32 mb-8">
        // THE SPECTATOR ARCHIVE
      </h3>
      {/* Landscape stack — one photo per row, 16:9 aspect ratio */}
      <div className="flex flex-col gap-4">
        {photos.map(({ src, alt }) => (
          <div
            key={src}
            className="relative w-full aspect-video overflow-hidden rounded-xl group cursor-pointer"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-all duration-500 ease-out grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Export ─────────────────────────────────────────────────────────────────── */
export default function TacticalSports() {
  return (
    <div>
      {/* ── Intro header ── */}
      <div className="w-full max-w-4xl mx-auto py-16">
        <h2 className="font-serif text-3xl md:text-5xl text-stone-200 italic">
          Sports I've loved playing and watching over the years.
        </h2>
        <hr className="mt-8 border-white/10" />
      </div>

      {/* ── Sport diagrams ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {SPORTS.map((sport) => (
          <TacticalCard key={sport.id} sport={sport} />
        ))}
      </div>

      {/* ── Spectator photo grid ── */}
      <SpectatorArchive />
    </div>
  )
}
