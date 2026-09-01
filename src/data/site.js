/* ============================================================
   Site-level data: identity, nav, socials, hero, experience,
   skills. Edit here. Components stay dumb.
   ============================================================ */

export const site = {
  name: "Mubarak Olanrewaju",
  shortName: "Mubarak",
  title: "Frontend Developer",
  location: "Lagos, Nigeria",
  email: "olanrewajumubarak3@gmail.com",
  resume: "/MUBARAK-RESUME.pdf",
  whatsapp: "https://wa.me/2349068460732",
  hero: {
    title: "I build clean frontends for complex products.",
    // prettier-ignore
    sub: 'Frontend developer with 3+ years of experience building production web applications with React, Angular, and TypeScript. My work covers a digital health platform, enterprise systems for financial institutions, and other live products.',
    ctas: {
      primary: { label: "View my work", href: "/#work" },
      secondary: { label: "Download resume", href: "/MUBARAK-RESUME.pdf" },
    },
  },
  socials: [
    { label: "GitHub", url: "https://github.com/Freedteck", icon: "github" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mubarak-olanrewaju/",
      icon: "linkedin",
    },
    { label: "X (Twitter)", url: "https://x.com/Mbfreeds", icon: "x" },
  ],
};

export const nav = [{ label: "Blogs", to: "/blogs" }];

/* Experience. Most recent first. */
export const experience = [
  {
    role: "Frontend Developer",
    company: "Doorkita Technologies",
    type: "Contract",
    period: "Oct 2025 - Present",
    current: true,
    points: [
      "Frontend developer on a multi-tenant digital health platform: EHR, telemedicine, lab & pharmacy networks, insurance suite.",
      "Build the main clinical application (Angular + Angular Material + Sass) and the public React site at doorkita.com.",
    ],
  },
  {
    role: "Founder & Mentor",
    company: "LevelUp (developer community)",
    type: "Part-time",
    period: "Apr 2025 - Present",
    current: true,
    points: [
      "Run a community of aspiring developers; mentor them from fundamentals to shipping real projects.",
      "Built and run the LevelUp LMS with adaptive assessments and progress tracking.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Encentral Solutions Limited",
    type: "Full-time",
    period: "Jan 2025 - Dec 2025",
    current: false,
    points: [
      "Shipped enterprise systems for financial institutions: NDIC BLMS, NSIA Procurement System and NAQS Aquatic.",
      "Delivered production-ready Angular features under strict documentation and architecture standards.",
    ],
  },
  {
    role: "Frontend Developer Mentor",
    company: "Kodespot",
    type: "Part-time",
    period: "May 2024 - Present",
    current: true,
    points: [
      "Mentor students from HTML/CSS fundamentals to advanced framework work and real-world projects.",
      "Keep the curriculum aligned with what the industry actually hires for.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Encentral Solutions Limited",
    type: "Internship",
    period: "Jun 2024 - Nov 2024",
    current: false,
    points: [
      "Built an employee management system with Angular + TypeScript on a five-developer team.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Softrays IT",
    type: "Internship",
    period: "Jun 2023 - Nov 2023",
    current: false,
    points: [
      "Frontend fundamentals, UI/UX practice, and the Meta Frontend Developer course.",
    ],
  },
];

/* Skills. Three cards. */
export const skillGroups = [
  {
    icon: "code",
    title: "Core Frontend",
    text: "The frameworks and fundamentals I build with daily: components, state, and interfaces that survive real users.",
    chips: [
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "CSS Modules",
      "Sass",
      "Angular Material",
      "Responsive UI",
    ],
  },
  {
    icon: "plug",
    title: "Integration Engineering",
    text: "Products live or die on integration. This is where I am strongest: wiring unfamiliar systems together until they behave.",
    chips: [
      "REST APIs",
      "WebSockets",
      "Auth & role-based access",
      "FHIR-aligned health data",
      "Web3 SDKs (Hedera · Solana · IOTA)",
    ],
  },
  {
    icon: "users",
    title: "Leadership & Product",
    text: "I do not just write code. I lead teams, mentor developers, and ship products people actually use.",
    chips: [
      "Team Lead",
      "Mentoring",
      "UI/UX Wireframing",
      "WordPress & SEO",
      "Shipping & maintaining live products",
    ],
  },
];
