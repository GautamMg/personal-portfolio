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
      { text: 'Hanging out in Columbus, OH', dot: 'accent' },
      { text: 'Always up for a coffee chat', dot: 'status' },
    ],
    hero: {
      status: '~ probably overthinking a playlist',
      greetingLead: "Hey, I'm",
      name: 'Gautam',
      photo: '/personal.JPG',
      intro:
        "[Your personal intro here]. When I'm not shipping code I'm usually cooking, traveling, or somewhere slightly unfamiliar. Here's a little more about the person behind the resume.",
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
