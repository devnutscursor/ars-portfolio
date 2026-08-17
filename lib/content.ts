/**
 * Every word on the site lives here. No CMS, no database — edit this file,
 * rebuild, redeploy.
 */

export const person = {
  name: "Abdul Rehman",
  first: "Abdul",
  last: "Rehman",
  role: "Software Engineer",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  utc: "UTC+5",
  email: "abrehmansaleem@gmail.com",
  phone: "+92 332 0146616",
  github: "https://github.com/AbdurRehman09",
  githubHandle: "AbdurRehman09",
  linkedin: "https://linkedin.com/in/abdur-rehman-a84b70282",
  linkedinHandle: "abdur-rehman",
  cv: "/abdul-rehman-cv.pdf",
  years: "2+",
  available: "Open to remote roles",
} as const;

export const hero = {
  lede: "I build backend systems and AI products that survive contact with production — voice agents, multi-LLM workflows, and the unglamorous performance work that makes them fast.",
  meta: [
    { k: "Based", v: "Lahore, PK" },
    { k: "Experience", v: "2+ years" },
    { k: "Focus", v: "Backend · AI · Web" },
    { k: "Status", v: "Open to work" },
  ],
} as const;

export const about = {
  paragraphs: [
    "I'm a software engineer with two years of shipping web applications and AI-powered systems across automotive, e-commerce, real estate, fintech and edtech. Most of that time has been spent somewhere between the database and the API — modelling data, tuning queries, and finding out why a page takes four seconds to paint.",
    "Lately my work has been AI voice: inbound and outbound agents that hold a real phone conversation, book an appointment, and hand structured data back to the business. Twilio for telephony, Deepgram for real-time speech, and multi-LLM workflows behind the decision-making.",
    "I like problems with a number attached to them. Load time, query time, failure rate — profile first, then fix the thing that actually matters.",
  ],
  facts: [
    { k: "Degree", v: "BS Software Engineering" },
    { k: "University", v: "FAST-NUCES Lahore" },
    { k: "Taught", v: "TA — Database Systems" },
    { k: "Languages", v: "English, Urdu" },
  ],
} as const;

export type WorkItem = {
  id: string;
  index: string;
  role: string;
  company: string;
  place?: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const work: WorkItem[] = [
  {
    id: "hashlogics",
    index: "01",
    role: "Software Engineer",
    company: "Hashlogics",
    period: "May 2026 — Aug 2026",
    summary:
      "AI voice agents for the automotive industry — real phone calls, in and out, handled end to end.",
    bullets: [
      "Built inbound and outbound AI voice agents integrating Twilio telephony with Deepgram real-time speech-to-text.",
      "Implemented multi-LLM workflows (GPT, Claude, Gemini, Grok) and agentic flows for conversation, appointment booking and business process automation.",
      "Built an FFmpeg media pipeline that extracts audio from uploaded video for transcription and turns it into structured automotive service reports.",
      "Designed the asynchronous workflows, background jobs and API integrations underneath it all.",
    ],
    stack: ["Node.js", "TypeScript", "Twilio", "Deepgram", "FFmpeg", "REST"],
  },
  {
    id: "devnuts",
    index: "02",
    role: "Software Engineer",
    company: "Devnuts",
    period: "Aug 2025 — May 2026",
    summary:
      "Performance and data work across an e-commerce storefront, a US real estate platform, and a French mobile bank.",
    bullets: [
      "Profiled frontend load behaviour on the Ostrom e-commerce build and cut initial page load by 35% with lazy loading, code-splitting and render tuning.",
      "Improved query performance 25% on a multi-tenant US real estate platform through indexing and Row Level Security optimisation.",
      "Built event-driven GoHighLevel CRM sync with Inngest cron jobs and retry logic, dropping sync failures by 40%.",
      "Triaged production issues on a France mobile banking application inside an Agile release workflow.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AWS Lambda", "Three.js"],
  },
  {
    id: "sudostudy",
    index: "03",
    role: "Junior Software Engineer",
    company: "SudoStudy",
    place: "Hong Kong",
    period: "Jun 2024 — Aug 2025",
    summary:
      "Edtech platform work — GraphQL services, document pipelines and real-time delivery.",
    bullets: [
      "Developed the SudoStudy platform on Next.js and Hasura GraphQL with a maintainable service-oriented API layer.",
      "Built Python PDF processing pipelines (PDF2Pic, PDFCrop) and real-time WebSocket services that stayed reliable under load.",
      "Worked in a Scrum team with unit testing, code review and CI — and documented the APIs and deploys everyone else relied on.",
    ],
    stack: ["Next.js", "GraphQL", "Hasura", "Python", "WebSockets", "Jest"],
  },
];

export const metrics = [
  {
    value: "35",
    unit: "%",
    label: "faster initial page load",
    note: "E-commerce storefront, after profiling and code-splitting",
  },
  {
    value: "25",
    unit: "%",
    label: "faster queries",
    note: "Multi-tenant Postgres — indexing and RLS optimisation",
  },
  {
    value: "40",
    unit: "%",
    label: "fewer sync failures",
    note: "Event-driven CRM sync with retries and scheduled reconciliation",
  },
] as const;

export const capabilities = [
  {
    title: "Languages",
    items: ["Java / JVM", "Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    title: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Firebase",
      "Prisma",
      "Indexing & query plans",
      "Row Level Security",
      "Multi-tenant modelling",
    ],
  },
  {
    title: "Architecture",
    items: [
      "REST APIs",
      "GraphQL",
      "Event-driven systems",
      "Microservices",
      "WebSockets",
      "Webhooks",
      "AWS Lambda",
      "API Gateway",
    ],
  },
  {
    title: "AI & Voice",
    items: [
      "Multi-LLM workflows",
      "Agentic pipelines",
      "Twilio telephony",
      "Deepgram STT",
      "FFmpeg media",
    ],
  },
  {
    title: "Performance",
    items: [
      "Bottleneck analysis",
      "Query tuning",
      "Lazy loading",
      "Code-splitting",
      "Bundle budgets",
      "Production triage",
    ],
  },
  {
    title: "Craft",
    items: [
      "Jest / RTL",
      "Code review",
      "Agile & Scrum",
      "GitHub Actions",
      "CI/CD",
      "Docker",
    ],
  },
] as const;

export type EducationItem = { title: string; org: string; note?: string };

export const education: EducationItem[] = [
  {
    title: "BS Software Engineering",
    org: "FAST-NUCES, Lahore",
    note: "Teaching Assistant — Database Management Systems",
  },
  {
    title: "FSc Pre-Engineering",
    org: "Punjab Group of Colleges",
  },
  {
    title: "Certificates",
    org: "MERN Bootcamp (DevInc)",
    note: "Meta — Programming with JavaScript · Meta — Intro to Web Development",
  },
];

/** Ticker strip under the hero. */
export const marquee = [
  "Node.js",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "GraphQL",
  "Python",
  "Java",
  "AWS Lambda",
  "Twilio",
  "Deepgram",
  "Docker",
  "Prisma",
] as const;
