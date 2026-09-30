// Featured projects on the home page. `demo` / `repo` buttons only render when a URL is set.
// `caseStudy` is the slug of a file in content/case-studies (see content/case-studies/index.js).

export const projects = [
  {
    slug: "scam-scanner",
    name: "Scam Scanner",
    tagline: "AI evidence analysis",
    category: "AI · Security · Backend",
    summary:
      "An evidence-analysis platform that reads screenshots, chats and documents together to surface scam indicators.",
    highlights: [
      ["AI pipeline", "Multimodal extraction with a fallback model, then contradiction detection"],
      ["Background jobs", "Evidence is processed in queued workers, not in the request"],
      ["Security", "Rate limiting, file validation, prompt-injection defense"],
      ["External checks", "URL and domain reputation lookups via third-party APIs"],
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Gemini", "Redis", "BullMQ"],
    demo: null, // TODO: live demo URL
    repo: null, // TODO: GitHub repo URL
    caseStudy: "scam-scanner",
    preview: "scam-scanner",
  },
  {
    slug: "preplab",
    name: "PrepLab",
    tagline: "Recruitment platform",
    category: "Full-stack · AI · Workflows",
    summary:
      "A recruitment and interview-prep platform connecting candidates and recruiters, with AI-generated resume and candidate reports.",
    highlights: [
      ["Two-sided roles", "Candidate and recruiter workflows behind role-based access"],
      ["AI reports", "Resumes analyzed against a job; recruiters get a generated report"],
      ["Async work", "Resume processing and email notifications run in the background"],
      ["Job pipeline", "Postings, applications and statuses as database-driven workflows"],
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini"],
    demo: null, // TODO: live demo URL
    repo: null, // TODO: GitHub repo URL
    caseStudy: null, // TODO: add content/case-studies/preplab.js
    preview: "preplab",
  },
];

export const engineeringAreas = [
  {
    title: "Backend",
    items: ["REST APIs · API design", "Authentication · Authorization", "Validation · Error handling"],
    usedIn: ["Scam Scanner", "PrepLab"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL · MongoDB", "Schema design · Indexing", "ORM / ODM (Drizzle, Mongoose)"],
    usedIn: ["Scam Scanner", "SEC Library"],
  },
  {
    title: "Async & Infrastructure",
    items: ["Redis · Queues · Background jobs", "Caching · Cron jobs"],
    usedIn: ["Scam Scanner", "PrepLab"],
  },
  {
    title: "AI Systems",
    items: ["LLM APIs · Structured outputs", "AI pipelines · RAG", "Prompt engineering"],
    usedIn: ["Scam Scanner", "PrepLab", "SEC Library"],
  },
  {
    title: "Security",
    items: ["Authentication · Rate limiting", "Input validation · File security", "Prompt-injection defense"],
    usedIn: ["Scam Scanner"],
  },
  {
    title: "Deployment",
    items: ["Docker · CI/CD", "Vercel · Render", "Cloud services"],
    usedIn: ["Scam Scanner", "SEC Library"],
  },
];

export const techStack = [
  ["Frontend", ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express", "REST APIs"]],
  ["Databases", ["PostgreSQL", "MongoDB", "Drizzle", "Mongoose"]],
  ["AI", ["Gemini", "Groq", "LLM APIs", "RAG"]],
  ["Tools", ["Git", "GitHub", "Docker", "Vercel", "Render", "Cloudinary"]],
  [
    "Core CS",
    [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  ],
];

export const focusAreas = [
  ["Backend Systems", "API design, auth, validation"],
  ["AI Applications", "Structured output, fallbacks"],
  ["Databases", "Schema design, indexing"],
  ["Async Processing", "Queues, workers, retries"],
];

export const practiceAreas = [
  "Arrays",
  "Strings",
  "Binary Search",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Data Structures",
];

export const education = {
  degree: "BSc (Engg) in Computer Science & Engineering",
  school: "Sylhet Engineering College",
  year: "2026",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
};
