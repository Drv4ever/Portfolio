export const profile = {
  name: "Dhruv Jain",
  nickname: "Drv4ever",
  location: "New York, NY",
  printEdition: "Print Edition 014",
  role: "Aspiring Developer",
  intro:
    "A Developer building intelligent web products with React, Node.js, and MongoDB. I enjoy designing secure APIs, interactive UIs, and scalable systems that turn ideas into polished digital tools.",
  techStack: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "C/C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" }
  ],
  heroHeading: "MEET YOUR NEW FAVOURITE FRONTEND DEVELOPER",
  image:
    "https://avatars.githubusercontent.com/u/192817774?v=4",
  imageCaption: "Portrait, desk edition.",
  socials: [
    { label: "Email", href: "mailto:dhruvjain632@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-jain-4284a8263/" },
    { label: "Twitter", href: "https://x.com/Drv4ever632" },
    { label: "GitHub", href: "https://github.com/Drv4ever" }
  ]
};

export const nowBuilding = {
  title: "Latest Project",
  status: "Active",
  project: "SlideOS - AI-Powered Presentation Builder",
  description:
    "Full-stack web app that generates slide outlines from prompts using AI, supports visual drag-and-drop editing, JWT authentication, MongoDB persistence, and PPTX export.",
  progress: 72
};

export const featuredWorks = [
  {
    title: "SlideOS - AI-Powered Presentation Builder",
    description:
      "Full-stack web app that generates slide outlines from prompts using AI, supports visual drag-and-drop editing, JWT authentication, MongoDB persistence, and PPTX export.",
    techStack: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
    ],
    live: "",
    github: "https://github.com/Drv4ever/SlideOS"
  },
  {
    title: "Atlas UI",
    description:
      "Design system and component library focused on editorial interfaces and readability.",
    techStack: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Storybook", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg" },
      { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }
    ],
    live: "https://example.com/live/atlas-ui",
    github: "https://github.com/averybennett/atlas-ui"
  },
  {
    title: "Signal Notes",
    description:
      "Minimal writing app with markdown support, autosave, and offline-first behavior.",
    techStack: [
      { name: "PWA", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
      { name: "Framer", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" },
      { name: "IndexedDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ],
    live: "https://example.com/live/signal-notes",
    github: "https://github.com/averybennett/signal-notes"
  }
];

export const experiences = [
  {
    company: "Northline Studio",
    role: "Senior Frontend Engineer",
    duration: "2023 - Present",
    points: [
      "Led migration to App Router architecture, improving delivery speed and maintainability.",
      "Built reusable motion primitives and form systems used across 10+ products.",
      "Partnered with design to raise accessibility standards and visual consistency."
    ]
  },
  {
    company: "Papergrid Labs",
    role: "Frontend Developer",
    duration: "2021 - 2023",
    points: [
      "Implemented SEO-focused marketing pages with measurable performance gains.",
      "Created analytics-informed UI experiments that increased engagement by 18%.",
      "Maintained test coverage and CI workflows for critical user flows."
    ]
  }
];

export const education = [
  {
    school: "Vellore Institute of Technology",
    detail: "B.Tech in Information Technology"
  }
];

export const componentsShowcase = [
  "Editorial cards with adaptive typographic scale",
  "Theme-aware button system with invert hover states",
  "Accessible section shells and semantic content grouping",
  "Subtle motion library for staged content reveals"
];
