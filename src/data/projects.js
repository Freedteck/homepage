/* ============================================================
   Projects data. Every card + detail page renders from here.
   To publish a new project: fill its object and set
   published: true. Nothing else to touch.
   Order here = order on the home grid.
   ============================================================ */

export const projects = [
  /* ---------------------------------------------------------- */
  /* 1. DOORKITA. Live, flagship.                               */
  /* ---------------------------------------------------------- */
  {
    slug: 'doorkita',
    published: true,
    featured: true,
    name: 'Doorkita',
    tagline: 'Digital health infrastructure for Africa',
    category: 'Health-Tech',
    type: 'Frontend developer (contract)',
    status: 'Live, in production',
    timeline: 'Oct 2025 - Present',
    cover: '/images/projects/doorkita/dashboard.webp',
    coverAlt: 'Doorkita provider dashboard with appointments and reports',
    blurb:
      'A multi-tenant hospital management platform connecting hospitals, clinics, labs, pharmacies, insurers and patients.',
    stack: ['Angular', 'Angular Material', 'Sass', 'RxJS', 'WebSockets', 'Agora Video SDK', 'React (public site)'],
    links: [{ label: 'doorkita.com', url: 'https://doorkita.com/' }],
    intro: [
      'Doorkita is a multi-tenant digital health platform built for African healthcare realities: one FHIR-aligned system connecting hospitals, clinics, laboratories, pharmacies, insurers and patients. A facility registers once and gets a full role-based workspace: facility admins, doctors, nurses, internal labs and pharmacies, while patients get their own mobile app.',
      'I joined in October 2025 as the frontend developer on the team, working alongside a product designer, a backend developer and a mobile developer. I build and maintain the web frontend: the main clinical application (Angular + Angular Material + Sass) and the public React site at doorkita.com, covering dozens of API integrations, realtime features, and role-based access across facility types.',
    ],
    problem: [
      'Healthcare providers across Africa run on fragmented systems: paper records, manual billing, disconnected labs and pharmacies, and insurers coordinating over email and phone. Clinical data does not follow the patient, claims move slowly, and telemedicine is an afterthought.',
      'Doorkita\u2019s answer is one ecosystem. Hospitals manage patients end to end (outpatient consultations, inpatient admissions, clinical notes, medical history) and place lab, imaging and medication orders into internal or partner labs and pharmacies. Providers chat with patients in realtime, run video consultations, and file insurance claims, with a super-admin console handling facility onboarding on top.',
    ],
    features: [
      {
        title: 'Role-based platform routing',
        desc: 'Seven-plus user types (facility admins, doctors, nurses, pharmacists, lab scientists, super admins, patients), each resolving to the right portal, facility context and permissions on every session. A pharmacy admin in one facility can be non-admin staff in another; the app keeps those worlds separate.',
      },
      {
        title: 'Patient management, end to end',
        desc: 'Registration, unified patient records (clinical notes, medical history, vitals), outpatient consultation scheduling and inpatient admissions, built as complex clinical forms with Angular Material.',
      },
      {
        title: 'Clinical orders across the network',
        desc: 'Lab, imaging and medication orders flowing from hospitals into internal departments and external partner labs and pharmacies, with status tracking from requisition to result delivery.',
      },
      {
        title: 'Realtime provider-patient chat',
        desc: 'WebSocket-based messaging between clinicians and patients with live state and reconnection handling. A dropped socket mid-care is not an option.',
      },
      {
        title: 'Telemedicine sessions',
        desc: 'Video consultations powered by the Agora SDK: device permissions, call states, participant management and cleanup across the full consultation lifecycle.',
      },
      {
        title: 'The public platform site',
        desc: 'doorkita.com in React: marketing, product tour and onboarding entry points for providers, partners and health systems.',
      },
    ],
    warStory: [
      {
        title: 'Identity → roles → routing',
        desc: 'The hardest problem on the platform is access. One human can hold different roles across different facilities, so every session has to resolve who you are, which facility you are operating in, and what role you hold there, then route you to exactly the right portal without ever leaking a screen from another context. I built a role-aware routing layer with guarded route trees per facility type instead of scattering if-checks across the app.',
      },
      {
        title: 'Realtime that does not lie',
        desc: 'Chat and session state run over WebSockets, and networks in our market drop. A lot. I handled reconnection, state reconciliation and optimistic UI so the interface never shows stale conversations or ghost sessions, even on poor connections.',
      },
      {
        title: 'Video from an SDK I had never touched',
        desc: 'Telemedicine meant learning Agora\u2019s SDK cold and wiring it into Angular\u2019s lifecycle: permissions, joining and leaving, device switching, teardown on every exit path. My rule held: show me the docs and I will ship the feature.',
      },
    ],
    gallery: [
      {
        src: '/images/projects/doorkita/lab-orders.webp',
        caption: 'Lab order workflow, provider view (data blurred)',
      },
      {
        src: '/images/projects/doorkita/telemedicine.webp',
        caption: 'Telemedicine consultations, session view (data blurred)',
      },
      {
        src: '/images/projects/doorkita/mobile.webp',
        caption: 'Public platform site, mobile view',
      },
    ],
  },

  /* ---------------------------------------------------------- */
  /* 2. KOSTODY. Live.                                          */
  /* ---------------------------------------------------------- */
  {
    slug: 'kostody',
    published: true,
    featured: false,
    name: 'Kostody',
    tagline: 'Proof at every step, for every phone repair in Nigeria',
    category: 'SaaS',
    type: 'Design, frontend & backend',
    status: 'Live',
    timeline: 'Launched 2026',
    cover: '/images/projects/kostody/hero-both-apps.webp',
    coverAlt: 'Two apps, one record: the Kostody engineer and customer apps side by side',
    blurb:
      'A phone repair platform that turns every repair into a locked, tamper-proof record both sides can trust.',
    stack: ['React', 'CSS Modules', 'Material Design theming', 'Prisma', 'Supabase (PostgreSQL)', 'Vercel'],
    links: [{ label: 'kostody.vercel.app', url: 'https://kostody.vercel.app/' }],
    intro: [
      'Kostody turns every phone repair into a locked, tamper-proof record. Condition photos, the fault, the quote and each payment are signed with the customer\u2019s Universal PIN and time-stamped, so neither side can rewrite what happened.',
      'I built Kostody for a problem I have lived. You hand a device that holds your messages, your photos and your bank app to someone you met ten minutes ago, on a price they said out loud, and you hope. Weeks later the battery swells or the screen lifts, and it becomes your word against theirs. Nobody is lying. They just remember it differently, and with nothing written down, the louder memory wins.',
      'I designed the product and built the React apps and the backend on Prisma and Supabase. Kostody is live today, with its first engineer running repairs on it and more on the way.',
    ],
    problem: [
      'Before Kostody, every repair is a leap of faith, on both sides of the counter. The customer hands over their whole digital life with no proof of what they dropped off, and quietly wonders if the price will creep up or a new crack will appear. The engineer carries blame for damage that arrived with the device, customers insisting they were quoted less, and one furious review with no way to answer it.',
      'Both sides are exposed, so both sides quietly worry. There is no shared proof, and that gap is the whole reason Kostody exists.',
    ],
    features: [
      {
        title: 'Check in with photos',
        desc: 'The device is logged with time-stamped condition photos at intake. A dispute weeks later is settled by scrolling back to the minute it hit the counter.',
      },
      {
        title: 'Quote once, locked with a PIN',
        desc: 'The price is set a single time and locked the moment the customer signs with their PIN. It cannot creep up by pickup.',
      },
      {
        title: 'Two apps, one record',
        desc: 'The engineer runs the bench on an Active Jobs board; the customer follows the same record live. Same events, same timestamps, nothing either side can quietly edit.',
      },
      {
        title: 'A bench that runs like a clinic',
        desc: 'Every job moves from checked in, to charted, to discharged, with the full history handed back at pickup and signed with the customer\u2019s PIN.',
      },
      {
        title: 'Values you can point to',
        desc: 'No editable history. No hidden prices. No shop-owned accounts. No just-trust-me. A trust product is defined by its refusals as much as its features.',
      },
    ],
    warStory: [
      {
        title: 'Designing the product',
        desc: 'Getting the UI/UX right was the hardest part of the build. The bar: an app that feels native on a phone, works beautifully on tablets, and never makes you think about which side of the counter you are on. Dark and light modes everywhere, 100% responsive.',
      },
      {
        title: 'An app that only looks native',
        desc: 'Both apps are React with CSS Modules and Material Design theming: PIN pads, bottom-sheet flows, live status updates. It was never designed as a desktop website; it is a mobile and tablet product through and through.',
      },
      {
        title: 'Building the backend',
        desc: 'I built the backend on Prisma and Supabase: data modeling, auth, and scrambling the PIN so that nobody, not even me, can read it back.',
      },
    ],
    gallery: [
      { src: '/images/projects/kostody/jobs.webp', caption: 'The engineer\u2019s Active Jobs board: checked in, charted, discharged' },
      { src: '/images/projects/kostody/record.webp', caption: 'The customer\u2019s live repair record' },
      { src: '/images/projects/kostody/pin.webp', caption: 'One number, every shop: nothing moves without the customer\u2019s PIN' },
      { src: '/images/projects/kostody/values-light.webp', caption: 'What we stand for: four convictions, each one a line in the product' },
      { src: '/images/projects/kostody/mobile.webp', caption: 'The marketing site on a phone' },
    ],
  },

  /* ---------------------------------------------------------- */
  /* 3. LEVELUP. Community + AI-powered LMS. Live.              */
  /* ---------------------------------------------------------- */
  {
    slug: 'levelup',
    published: true,
    featured: false,
    name: 'LevelUp',
    tagline: 'The community I founded, and its AI-powered LMS',
    category: 'Community & EdTech',
    type: 'Founder, team lead & developer',
    status: 'Live, in use by students',
    timeline: 'Apr 2025 - Present',
    cover: '/images/projects/levelup/dashboard.webp',
    coverAlt: 'LevelUp student dashboard with XP progress, level and enrolled courses',
    blurb:
      'An AI-powered learning platform for the LevelUp community: personalized courses, XP, levels and token rewards.',
    stack: ['React 19', 'Vite', 'React Router', 'Express', 'Supabase (PostgreSQL + RLS)', 'Google Gemini', 'Groq'],
    links: [{ label: 'levelup-curriculum.vercel.app', url: 'https://levelup-curriculum.vercel.app/' }],
    intro: [
      'LevelUp is the learning platform for the developer community I founded. It is an AI-powered LMS built around one idea, learn to earn: every student answers four questions about their goal, skill level, time commitment and learning style, and the platform generates a personal course catalog for them. Lessons and assessments pay out XP and platform tokens, and ten levels of rewards unlock as students climb.',
      'I led the build with two students from the community: I designed the product and wrote the React frontend, the Express backend on Supabase, and the whole AI layer on Gemini and Groq. The two students who helped build it run the platform day to day now; I guide them and step in when something gets complex. Students in the community learn on it today.',
    ],
    problem: [
      'I was mentoring aspiring developers in the community, and every free resource we pointed them to had the same shape: one fixed curriculum for everyone. A complete beginner and someone who already understands variables get the same path, nothing adapts when a student is stuck or moving fast, and nothing rewards showing up. Most students drift away within weeks, and one mentor cannot hand-hold an entire community.',
      'The answer was a platform that treats every student differently: let each one describe their goal, level, schedule and learning style, generate courses that fit those answers, check real understanding with assessments, and make progress visible with XP, tokens and levels. And it had to run on a free tier budget, because a community platform with no revenue cannot carry infrastructure bills.',
    ],
    features: [
      {
        title: 'Courses generated per student',
        desc: 'Onboarding captures four answers: learning goal, skill level, time commitment and learning style. Gemini turns them into a personal catalog of courses, each with modules, lessons, assessments and projects, structured like a real curriculum rather than a chat reply.',
      },
      {
        title: 'A lesson viewer that teaches',
        desc: 'Generated lessons render as rich content: explanations, code examples, practical exercises and curated external resources. Progress is tracked per lesson, so a student always knows exactly where they stopped.',
      },
      {
        title: 'Assessments with AI feedback',
        desc: 'Quizzes and coding challenges are generated per lesson, and project submissions get an AI review back instead of a silent grade. Feedback is instant, so students iterate the same day instead of waiting on a mentor.',
      },
      {
        title: 'XP, levels and token rewards',
        desc: 'Lessons, assessments and perfect scores pay out XP across ten levels with rising thresholds. Platform tokens (5 per lesson, up to 100 for a full course) fund rewards unlocked at each level, and tier multipliers scale the payout as students advance.',
      },
      {
        title: 'An AI budget that survives the free tier',
        desc: 'Every generation has a token price: 50 for a catalog, 100 for a course structure, 150 for a lesson, 80 for an assessment, 60 for a review, with 500 free per student per day. Usage is logged per operation, so the platform teaches within its means.',
      },
    ],
    warStory: [
      {
        title: 'The UI I built twice',
        desc: 'No designer worked on this, and the UI and UX were the hardest part of the whole build. I designed the first version from experience, lived with it, was not satisfied, and rebuilt the entire interface. Then I did it a second time before it felt right. The version students use today is the third take.',
      },
      {
        title: 'A curriculum, not a chatbot',
        desc: 'The AI generates in a pipeline, not one prompt: catalog, then course structure, then lessons, then assessments, each a separate metered call with its own shape, stored as JSONB in Postgres so a course is data the app can render and grade rather than text in a blob. Gemini and Groq power the generation, and Opik watches every AI call in production.',
      },
      {
        title: 'Built to be handed over',
        desc: 'I knew I would not operate this platform forever, so the guardrails live in the database instead of in my head: Row Level Security on all seven tables, Supabase auth with JWT-protected Express endpoints, and CORS locked to the app. The two students who helped me build it manage it day to day now.',
      },
    ],
    gallery: [
      {
        src: '/images/projects/levelup/catalog.webp',
        caption: 'The personalized catalog: AI-generated courses, searchable and filtered',
      },
      {
        src: '/images/projects/levelup/course-detail.webp',
        caption: 'Inside a generated course: modules, lessons and completion at a glance',
      },
      {
        src: '/images/projects/levelup/lesson.webp',
        caption: 'The lesson viewer: rich content, code examples and curated resources',
      },
      {
        src: '/images/projects/levelup/profile.webp',
        caption: 'The learning profile: the four answers that drive every generation',
      },
      {
        src: '/images/projects/levelup/landing.webp',
        caption: 'The landing page: learn, build, earn',
      },
      {
        src: '/images/projects/levelup/mobile.webp',
        caption: 'The dashboard on a phone: fully responsive',
      },
    ],
  },

  /* ---------------------------------------------------------- */
  /* 4. NDIC BLMS. Enterprise, NDA. Text only, no screenshots.  */
  /* ---------------------------------------------------------- */
  {
    slug: 'ndic-blms',
    published: true,
    featured: false,
    name: 'NDIC BLMS',
    tagline: 'Bank Liquidation Management System',
    category: 'Enterprise',
    type: 'Frontend developer, Encentral Solutions',
    status: 'In production (NDA)',
    timeline: '2025',
    cover: '/images/projects/enterprise.webp',
    coverAlt: 'Abstract illustration standing in for the NDIC BLMS product, which is not public (NDA)',
    blurb: 'A bank liquidation management system for Nigeria\u2019s deposit insurer, built on an enterprise Angular team.',
    stack: ['Angular', 'Angular Material', 'Sass'],
    links: [],
    intro: [
      'The Bank Liquidation Management System is an enterprise platform built for the Nigeria Deposit Insurance Corporation, the federal agency that insures bank deposits and manages the liquidation of failed banks. It handles critical financial liquidation data, the kind of records that have to survive audits and outlive the team that wrote them. I built the frontend at Encentral Solutions alongside other frontend developers, with backend engineers, a designer and QA on the same team.',
      'My part was the Angular application: complex, responsive interfaces for managing liquidation data and API integrations with the backend, under the enterprise discipline that comes with it: documentation, coding standards, a branch per feature, and the full cycle from planning to deployment in live environments. The system\u2019s specifics stay behind an NDA, so this page describes how we worked rather than what the screens show.',
    ],
    problem: [
      'Bank liquidation is years of sensitive financial process: depositors, assets, payouts. A frontend for that domain cannot leave a failure path undefined, because in a system like this an unhandled error is not a bug report, it is work that stops until someone fixes it. The interface has to present dense data accurately, absorb human error gracefully, and stay stable while the system keeps evolving underneath it.',
    ],
    features: [],
    warStory: [
      {
        title: 'Warning messages for an entire system',
        desc: 'One of the jobs that defined my time on this project: implementing warning messages and states across the whole system, for human errors. Wherever a user could go wrong, the interface had to say so clearly and consistently, on every screen. Not the hardest code I have written, but some of the most patient: each message had to match the one before it, and every pass had to be checked against the rest of the system so nothing broke. It took time, and it shipped in careful passes rather than one big change.',
      },
      {
        title: 'One frontend developer among several',
        desc: 'I was a team member, not a lead. Frontend developers worked in parallel, each on a branch per feature, fitting their piece against backend contracts, designs and QA gates before anything reached production. Enterprise work is less about heroics and more about being reliable inside a machine other people depend on.',
      },
    ],
    gallery: [],
  },

  /* ---------------------------------------------------------- */
  /* 5. NSIA Procurement. Enterprise, NDA. Text only.           */
  /* ---------------------------------------------------------- */
  {
    slug: 'nsia-procurement',
    published: true,
    featured: false,
    name: 'NSIA Procurement System',
    tagline: 'Procurement management in production',
    category: 'Enterprise',
    type: 'Frontend developer, Encentral Solutions',
    status: 'In production (NDA)',
    timeline: '2025',
    cover: '/images/projects/enterprise.webp',
    coverAlt: 'Abstract illustration standing in for the NSIA procurement product, which is not public (NDA)',
    blurb: 'The procurement management system of the Nigeria Sovereign Investment Authority, maintained and evolved in production.',
    stack: ['Angular', 'Angular Material', 'Sass'],
    links: [],
    intro: [
      'The NSIA Procurement System is a production procurement platform for the Nigeria Sovereign Investment Authority, the institution that manages Nigeria\u2019s sovereign wealth. Procurement is process-heavy territory: vendors, evaluations, approvals, records that auditors read years later. I worked on the frontend at Encentral Solutions with the enterprise team, and my work there was maintenance and evolution on a live system.',
      'Applying updates, implementing new features, resolving issues with the team, keeping the system reliable for the people who use it daily. The specifics are behind an NDA, so this page is about the discipline of changing a live system rather than the screens themselves.',
    ],
    problem: [
      'A live procurement system in an institution like NSIA does not get a rewrite window. Changes land where real users are working, so the job is evolution without disruption: updates small enough to verify, every warning state in place, and nothing broken for whoever is using the system that day.',
    ],
    features: [],
    warStory: [
      {
        title: 'Warning messages for an entire system',
        desc: 'Together with the NDIC work, this is the task I remember most from the enterprise systems: rolling out warning messages and states across the whole system to catch human errors before they land. Individually simple, collectively huge: every screen, every state, every message consistent with the one before it. The real work was making sure the updates did not break anything along the way.',
      },
      {
        title: 'Updates without breaking',
        desc: 'On a production system the regression is the risk, not the feature. Every change went out on its own branch, through review and QA, sized so it could be verified before it merged. Boring on purpose: in enterprise software the excitement is downtime, and the goal is to never have any.',
      },
    ],
    gallery: [],
  },

  /* ---------------------------------------------------------- */
  /* 6. NAQS Aquatic. Enterprise, NDA. Text only.               */
  /* ---------------------------------------------------------- */
  {
    slug: 'naqs-aquatic',
    published: true,
    featured: false,
    name: 'NAQS Aquatic System',
    tagline: 'Aquatic resource management platform',
    category: 'Enterprise',
    type: 'Frontend developer, Encentral Solutions',
    status: 'In production (NDA)',
    timeline: '2025',
    cover: '/images/projects/enterprise.webp',
    coverAlt: 'Abstract illustration standing in for the NAQS aquatic product, which is not public (NDA)',
    blurb: 'An aquatic resource management system for a federal quarantine service, evolved feature by feature in production.',
    stack: ['Angular', 'Angular Material', 'Sass'],
    links: [],
    intro: [
      'The Nigerian Agricultural Quarantine Service is the federal agency responsible for protecting Nigeria\u2019s agricultural resources, and the Aquatic System is one of the platforms serving that mission: a production Angular application for aquatic resource management, with data-heavy views and workflows for the officers who use it.',
      'I implemented frontend logic on the system at Encentral Solutions: updates, feature improvements based on user requirements, and integration with backend services, working with backend developers and QA. It is the least glamorous kind of frontend work and the most representative of the job: keeping a live government system useful, performant and coherent as it grows.',
    ],
    problem: [
      'Government systems live for years and collect requirements the whole time: new reports, new workflows, more data. The frontend challenge is keeping an evolving Angular codebase coherent while it grows, so performance holds under real data and the next developer can still find their way around.',
    ],
    features: [],
    warStory: [
      {
        title: 'Performance as a maintenance habit',
        desc: 'Performance work on this system was not a heroic rewrite; it was regular maintenance: code reviews, trimming what the views did not need, keeping the data-heavy screens fast as the system accumulated features. On a system like this, speed is not a launch metric, it is a habit.',
      },
      {
        title: 'Working across teams',
        desc: 'The frontend team worked with backend, design and QA on every feature, each one on its own branch. What made it function was not process for its own sake but the agreement that production is sacred: nothing merges unreviewed, nothing deploys unverified.',
      },
    ],
    gallery: [],
  },
]

/* Helpers */
export const publishedProjects = projects.filter((p) => p.published)

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

/* Two other published projects for the "related" footer of a detail page */
export function getRelated(slug) {
  const others = publishedProjects.filter((p) => p.slug !== slug)
  if (others.length <= 2) return others
  const i = others.findIndex((p) => p.slug === slug)
  return [others[(i + 1) % others.length], others[(i + 2) % others.length]]
}
