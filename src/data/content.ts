export type Project = {
  title: string;
  category: string;
  industry: string;
  year: string;
  blurb: string;
  accent: string;
  ink: string;
  pattern: "blocks" | "rings" | "stripes" | "grid" | "mesh" | "wave";
  shape: string;
  images?: string[];
};

export const projects: Project[] = [
  {
    title: "Product Design & UX",
    category: "Discovery",
    industry: "Enterprise",
    year: "Ongoing",
    blurb:
      "End-to-end product thinking, from research and IA to flows and accessible UX for complex enterprise software.",
    accent: "#1D7279",
    ink: "#082023",
    pattern: "rings",
    shape: "◍",
    images: [
      "/work/product-design-ux/salesforce-home.png",
      "/work/product-design-ux/salesforce-deal-structure.png",
    ],
  },
  {
    title: "UI & Visual Design",
    category: "Communication",
    industry: "Internal",
    year: "2024",
    blurb:
      "Posters, emailers and event identities crafted for internal campaigns. Click to flip through the collection.",
    accent: "#CA1C68",
    ink: "#3D0820",
    pattern: "blocks",
    shape: "◐",
    images: [
      "/work/ui-visual-design/gala-night-emailer.png",
      "/work/ui-visual-design/fitness-nutrition.png",
      "/work/ui-visual-design/posh-poster-1.png",
      "/work/ui-visual-design/posh-poster-3.png",
      "/work/ui-visual-design/posh-poster-2.png",
    ],
  },
  {
    title: "Dashboard & Data Visualization",
    category: "Analytics",
    industry: "Enterprise",
    year: "Ongoing",
    blurb:
      "Dashboards that turn dense data into clear, actionable stories for product, ops and analytics teams.",
    accent: "#1C4C87",
    ink: "#081628",
    pattern: "grid",
    shape: "◫",
    images: [
      "/work/dashboard-data-viz/magotteaux-kpi-dashboard.png",
      "/work/dashboard-data-viz/user-progress-tracking.png",
    ],
  },
  {
    title: "Design Systems",
    category: "Foundations",
    industry: "Cross-product",
    year: "Ongoing",
    blurb:
      "Scalable component libraries with tokens, patterns and documentation that engineering and design actually adopt.",
    accent: "#4C3480",
    ink: "#160e25",
    pattern: "wave",
    shape: "◓",
    images: [
      "/work/design-systems/isomer-mini-components.png",
      "/work/design-systems/figma-inventory-foundations.png",
      "/work/design-systems/figma-inventory-components.png",
      "/work/design-systems/ba2-calculator-pattern.png",
    ],
  },
  {
    title: "Front-End Experience Development",
    category: "Build",
    industry: "Web",
    year: "Ongoing",
    blurb:
      "Pixel-precise interfaces hand-coded by designers who care about accessibility, performance and motion.",
    accent: "#E63F50",
    ink: "#4d0a11",
    pattern: "stripes",
    shape: "◉",
    images: [
      "/work/front-end-experience/bts-genie-upload.png",
    ],
  },
  {
    title: "Accessibility & UX Reviews",
    category: "A11y",
    industry: "Audit + Build",
    year: "Ongoing",
    blurb:
      "WCAG-aware reviews, audits and implementations that bring inclusivity to existing and new product surfaces.",
    accent: "#1E853B",
    ink: "#082c14",
    pattern: "mesh",
    shape: "❋",
    images: [
      "/work/accessibility-ux/salesforce-login.png",
      "/work/accessibility-ux/salesforce-leader-actions.png",
      "/work/accessibility-ux/salesforce-opportunity-actions.png",
    ],
  },
  {
    title: "Prototyping & Concept Design",
    category: "Concepts",
    industry: "Validation",
    year: "Ongoing",
    blurb:
      "Clickable prototypes and concept frames built fast, so we can test ideas before they hit code.",
    accent: "#CA1C68",
    ink: "#3D0820",
    pattern: "rings",
    shape: "◓",
    images: [
      "/work/prototyping-concept/mondelez-login.png",
      "/work/prototyping-concept/ey-login.png",
      "/work/prototyping-concept/mondelez-summary.png",
      "/work/prototyping-concept/mondelez-strategic-planning.png",
      "/work/prototyping-concept/mondelez-research-development.png",
      "/work/prototyping-concept/mondelez-distribution-dilemma.png",
      "/work/prototyping-concept/ey-welcome.png",
      "/work/prototyping-concept/ey-better-conversations.png",
      "/work/prototyping-concept/ey-stakeholder-engagements.png",
      "/work/prototyping-concept/ey-events-email.png",
      "/work/prototyping-concept/am-worldwide-funnel.png",
    ],
  },
  {
    title: "AI-Assisted Design",
    category: "Tooling",
    industry: "Workflow",
    year: "2025",
    blurb:
      "Bringing AI into our design pipelines, from idea generation to design ops, without losing the craft.",
    accent: "#4C3480",
    ink: "#160e25",
    pattern: "blocks",
    shape: "◐",
    images: [
      "/work/ai-assisted-design/anthropic-home.png",
      "/work/ai-assisted-design/anthropic-five-signals.png",
      "/work/ai-assisted-design/anthropic-six-states.png",
    ],
  },
  {
    title: "Video & Motion Design",
    category: "Motion",
    industry: "Brand + Product",
    year: "Ongoing",
    blurb:
      "Product walkthroughs, brand reels and UI motion that turn static screens into living experiences.",
    accent: "#1D7279",
    ink: "#082023",
    pattern: "wave",
    shape: "◉",
    images: [
      "/work/video-motion/bank-1.mp4",
      "/work/video-motion/embark-1.mp4",
    ],
  },
  {
    title: "Presentations & Storytelling",
    category: "Decks",
    industry: "Internal",
    year: "Ongoing",
    blurb:
      "Keynote-grade decks for product launches, leadership reviews and investor narratives.",
    accent: "#1C4C87",
    ink: "#081628",
    pattern: "stripes",
    shape: "◍",
    images: [
      "/work/presentations/lemonade-01.jpg",
      "/work/presentations/lemonade-02.jpg",
      "/work/presentations/lemonade-03.jpg",
      "/work/presentations/lemonade-04.jpg",
      "/work/presentations/lemonade-05.jpg",
      "/work/presentations/lemonade-06.jpg",
      "/work/presentations/lemonade-07.jpg",
      "/work/presentations/susagad-goa-logo-01.jpg",
      "/work/presentations/susagad-goa-logo-02.jpg",
      "/work/presentations/susagad-goa-logo-03.jpg",
      "/work/presentations/susagad-goa-logo-04.jpg",
      "/work/presentations/susagad-goa-logo-05.jpg",
      "/work/presentations/susagad-goa-logo-06.jpg",
      "/work/presentations/susagad-goa-logo-07.jpg",
      "/work/presentations/susagad-goa-logo-08.jpg",
    ],
  },
  {
    title: "Enterprise Platform Experiences",
    category: "Flagship",
    industry: "Momenta · Pulse · Isomer",
    year: "Ongoing",
    blurb:
      "Our flagship enterprise platforms shipped end-to-end: discovery, design systems and live UI.",
    accent: "#E63F50",
    ink: "#4d0a11",
    pattern: "grid",
    shape: "◫",
    images: [
      "/work/enterprise-platforms/hartford-scenario.png",
      "/work/enterprise-platforms/hartford-results.png",
      "/work/enterprise-platforms/postman-overview.png",
      "/work/enterprise-platforms/postman-code-advance.png",
    ],
  },
];

export type Designer = {
  name: string;
  role: string;
  experience: string;
  bio: string;
  superpower: string;
  loves: string[];
  accent: string;
  initials: string;
  image?: string;
};

export const designers: Designer[] = [
  {
    name: "Lokesh Pimple",
    role: "UI Designer",
    experience: "3 years of UI craft",
    bio: "Visual problem solver who lives in the details. Pairs sharp interfaces with playful little moments of delight.",
    superpower: "Turns Figma into a love letter for the dev team.",
    loves: ["UI craft", "Micro-interactions", "Type"],
    accent: "#CA1C68",
    initials: "LP",
    image: "/team/lokesh.png",
  },
  {
    name: "Madhura Acharya",
    role: "Sr. UI Designer",
    experience: "8 years of visual systems",
    bio: "Structured, precise, and unflappable under deadlines. Specialises in turning complex flows into calm screens.",
    superpower: "Reduces 50 tabs into one elegant dashboard.",
    loves: ["IA", "Visual systems", "Books"],
    accent: "#1D7279",
    initials: "MA",
    image: "/team/madhura-acharya.png",
  },
  {
    name: "Madhura Kulkarni",
    role: "Sr. UI Designer",
    experience: "7 years of pixel craft",
    bio: "Senior Product Designer crafting enterprise experiences with equal attention to systems and details. Designing products that help people focus on what matters most.",
    superpower: "Builds interfaces that scale gracefully.",
    loves: ["AI", "Design Systems", "Frontend", "Innovation"],
    accent: "#4C3480",
    initials: "MK",
    image: "/team/madhura-kulkarni.png",
  },
  {
    name: "Manish Harne",
    role: "Sr. UI Designer",
    experience: "9 years of design systems",
    bio: "Bridges product and platform. Loves the boring stuff like tokens, components and conventions, the kind that makes everything else easy.",
    superpower: "Builds systems teams actually adopt.",
    loves: ["Design systems", "Tokens", "Open source"],
    accent: "#1C4C87",
    initials: "MH",
    image: "/team/manish.png",
  },
  {
    name: "Prajakta Sagade",
    role: "Associate Director · UX",
    experience: "12 years of product design",
    bio: "Leads with empathy and a research-first lens. Connects strategy, business goals and user signal into a single clear narrative.",
    superpower: "Turns ambiguity into alignment.",
    loves: ["Strategy", "Workshops", "Mentoring"],
    accent: "#E63F50",
    initials: "PS",
    image: "/team/prajakta.jpg",
  },
  {
    name: "Siddhi Patil",
    role: "Sr. UI Designer",
    experience: "7 years of data storytelling",
    bio: "Brings a calm, storyteller's eye to product UI. Equally comfortable with editorial layouts and dense enterprise screens.",
    superpower: "Makes data feel human.",
    loves: ["Editorial", "Data viz", "Photography"],
    accent: "#0071EB",
    initials: "SP",
    image: "/team/siddhi.png",
  },
  {
    name: "Vaishnavi Pednekar",
    role: "Sr. UI Designer",
    experience: "6 years of prototyping",
    bio: "Curious, fast and collaborative. Prototypes ideas quickly so the team can see, feel and react before committing.",
    superpower: "Ships a clickable prototype before lunch.",
    loves: ["Prototyping", "AI tools", "Sketchbooks"],
    accent: "#1E853B",
    initials: "VP",
    image: "/team/vaishnavi.png",
  },
];

export const services = [
  {
    title: "Product Design & UX",
    description:
      "End-to-end product thinking across research, IA, flows and accessible UX for complex enterprise software.",
    bullets: [
      "Product UX",
      "Prototyping",
      "Concept design",
      "Accessibility & UX reviews",
    ],
    accent: "#CA1C68",
  },
  {
    title: "UI & Visual Design",
    description:
      "Pixel-precise interfaces and visual storytelling, from product screens to keynote-grade presentations.",
    bullets: ["UI design", "Visual systems", "Presentations", "Storytelling"],
    accent: "#1D7279",
  },
  {
    title: "Design Systems & Front-End",
    description:
      "Scalable systems shipped with engineering. Tokens, components and AI-assisted workflows that keep teams fast.",
    bullets: [
      "Design systems",
      "Front-end experience",
      "AI-assisted design",
      "Tokens & components",
    ],
    accent: "#4C3480",
  },
  {
    title: "Data, Motion & Enterprise",
    description:
      "Dashboard, data-viz and motion craft for our enterprise platforms like Momenta, Pulse and Isomer.",
    bullets: [
      "Dashboards",
      "Data visualization",
      "Video & motion",
      "Momenta · Pulse · Isomer",
    ],
    accent: "#1C4C87",
  },
];

export const expertise = [
  "Product Design & UX",
  "UI & Visual Design",
  "Dashboard & Data Viz",
  "Design Systems",
  "Front-End Experience",
  "Accessibility & UX Reviews",
  "Prototyping & Concept Design",
  "AI-Assisted Design",
  "Video & Motion Design",
  "Presentations & Storytelling",
  "Enterprise Platforms · Momenta · Pulse · Isomer",
];

export const stats = [
  { value: "7", label: "designers" },
  { value: "100+", label: "projects shipped" },
  { value: "1", label: "team, one canvas" },
];
