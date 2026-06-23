// Content variants for the Professional / Personal sidebar mode.
// Same layout in both modes; only the words change.

export const content = {
  professional: {
    // Sidebar "Currently" block
    currently: [
      { text: 'M.S., Ohio State (graduated)', dot: 'accent' },
      { text: 'Open to opportunities', dot: 'status' },
    ],
    hero: {
      status: '~ open to roles anywhere in US',
      greetingLead: "Hi, I'm",
      name: 'Gautam',
      photo: '/photo.JPG',
      intro:
        "a software engineer who's worked across the stack, from building an E-commerce platform from scratch to more recently exploring AI/ML and MLOps through research, including a published paper on agentic AI.",
    },
    // Professional "Selected work" items come from src/projects.js
    // (shared with the Projects page). Only the section heading lives here.
    work: {
      eyebrow: '// work',
      title: 'Selected work',
      imageLabel: 'Project image',
    },
    footerLine: 'Thanks for stopping by. Always happy to chat.',
  },

  personal: {
    currently: [
      { text: 'Next adventure, TBD', dot: 'accent' },
      { text: 'Probably thinking about my next meal', dot: 'status' },
    ],
    hero: {
      status: '~ finding my way, enjoying the ride',
      greetingLead: "Hey, I'm",
      name: 'Gautam',
      photo: '/personal.JPG',
      intro:
        "Engineer by profession and passion, adventurer by nature. I invest in myself and the people around me, professionally and personally, or so I've been told. I'd like to think it's a win-win. Here's a little more about the person behind the work.",
    },
    work: {
      eyebrow: '// life',
      title: "Things I'm into",
      imageLabel: 'Photo',
      items: [
        {
          title: 'Travel',
          description: '[A place you loved, or where you want to go next.]',
          tags: ['📍', 'wander'],
        },
        {
          title: 'Cooking',
          description: '[A cuisine you love, or the last thing you tried.]',
          tags: ['🍳', 'food'],
        },
        {
          title: 'Off the clock',
          description: '[A hobby, a sport, a side quest you enjoy.]',
          tags: ['🎮', 'fun'],
        },
      ],
    },
    footerLine: "Thanks for stopping by. Let's be friends 🙂",
  },
}
