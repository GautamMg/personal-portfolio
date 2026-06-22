# Personal Portfolio Website — Build Brief

## Overview
Build a personal portfolio website for **Gautam Gururaj Molakalmuru**, a software engineer and grad student (M.S. at Ohio State University). Target audience: recruiters/companies and technical professionals — needs to feel professional and credible, with subtle personal/relatable touches (not gimmicky).

## Overall style
- Clean, editorial, classy — not developer-terminal-heavy
- Card-based layout throughout
- Simple, limited color palette (one accent color, neutral base, lots of whitespace)
- Serif headings (classy/editorial feel), sans-serif body (readability)
- Visual-heavy: real project screenshots/images in cards rather than just icons/text
- Subtle personality touches: a "currently" section and a warm, casual footer line
- Avoid terminal/code-snippet UI elements (`whoami`, `$` prompts, etc.) — too developer-centric for this audience

## Tech preferences
- React (functional components, hooks)
- Tailwind CSS
- Responsive (mobile-friendly, sidebar collapses to top nav/hamburger on small screens)
- Modular components: `Sidebar`, `Hero`, `QuickFacts`, `ProjectCard`, `Footer`, etc.

---

## Layout structure

### 1. Left sidebar navigation (Notion-inspired)
- Top: avatar/initial + name
- **Menu**: Home, About me, Projects, Experience, Contact
- **Currently**: "Masters @ OSU", "Open to opportunities"
- **Links**: GitHub, LinkedIn, Resume (PDF link)
- Fixed/persistent on desktop; collapses to top bar with hamburger below 768px

### 2. Home page (main content)
- **Hero**: circular avatar/photo placeholder + "Hi, I'm Gautam" + 2-3 line intro (software engineering, AI4SE focus, Columbus OH) — left-aligned next to avatar on desktop, stacked on mobile
- **Quick facts row**: 4 cards — "Based in: Columbus, OH", "Studying: M.S. @ Ohio State", "Focus area: AI for Software Eng.", "Status: Open to roles"
- **Selected work**: serif heading "Selected work" + grid of 3 project cards (image thumbnail on top, title + short description below)
- **Footer**: small centered text, casual/warm tone (e.g., "Thanks for stopping by — always happy to chat")

### 3. Additional pages (linked from sidebar)
- **About me** — longer bio, background, skills
- **Projects** — full project grid/list with case study links
- **Experience** — work history / timeline
- **Contact** — contact form or email/social links

---

## UI/UX specifications (action items)

### Typography
- Headings: Fraunces or Playfair Display, weight 500-600
- Body: Inter, weight 400, line-height 1.6-1.7
- Base size 16px, scale ratio 1.25 (16 → 20 → 25 → 31px for h3/h2/h1)
- Sidebar nav text: 13-14px, Inter

### Color palette
- Page background: #FAFAF8 (warm off-white) or #FFFFFF
- Sidebar background: #F5F4F0 (slightly darker than page bg)
- Text primary: #1A1A1A
- Text secondary: #6B6B6B
- Accent color (pick one): muted blue (#3B5BA5), forest green (#2D5640), or terracotta (#C1633A) — sparingly, for links/active nav/hover only
- Borders: #E5E3DD, 1px

### Spacing & layout
- Sidebar width: 240px fixed (desktop); collapses below 768px
- Main content max-width: 960px, centered, padded
- Section vertical spacing: 48-64px
- Card padding: 16-20px
- Card border-radius: 12px
- Grid gaps: 16px

### Component specs
- **Sidebar**: full height, sections separated by 24px margin; active nav item = 3px accent left border + light background highlight
- **Hero**: 80px circular avatar with 1px light gray border
- **Quick facts cards**: 4-column grid (desktop), 2x2 (tablet), stacked (mobile); label 11px uppercase, letter-spacing 0.05em; value 14px medium
- **Project cards**: image aspect ratio 16:9, object-fit cover; hover = scale(1.02) + shadow; title 15px medium, description 13px secondary color
- **Footer**: centered, 12px, secondary color, 32px top margin

### Interactions
- Hover transitions: 150ms ease
- Links: accent color, no underline default, underline on hover
- Buttons: accent background, white text, 8px border-radius, hover darken 10%

### Accessibility
- Minimum contrast ratio 4.5:1 for body text
- Descriptive alt text on all images (placeholders until real images added)
- Visible focus states (2px accent outline)
- Semantic HTML: `nav`, `main`, `header`, `footer`, `section`

### Responsive breakpoints
- Mobile: < 768px — sidebar becomes top bar, single column
- Tablet: 768-1024px — sidebar visible, 2-column grids
- Desktop: > 1024px — full layout as designed

---

## Content placeholders (to fill in later)
- Real headshot/photo
- Project screenshots (3+ projects)
- Bio/about text
- Work experience details
- GitHub/LinkedIn URLs, resume PDF
- Contact details

---