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
      [
        "AI pipeline",
        "Multimodal extraction with a fallback model,contradiction detection,customized verifying steps",
      ],
      [
        "Background jobs",
        "Evidence is processed in queued workers, not in the request",
      ],
      ["Security", "Rate limiting, file validation, prompt-injection defense"],
      [
        "Signal engine",
        "Deterministic rules flag scam patterns, and every link gets a domain reputation check",
      ],
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "Gemini",
      "Groq",
      "ZOD",
      "RHF",
      "Redis",
      "BullMQ",
    ],
    demo: "https://scam-scanner-one.vercel.app",
    repo: "https://github.com/tajwarul23/ScamScanner",

    caseStudy: "scam-scanner",
    // Screenshot on the card (width/height = the file's pixel size). Remove to show the mockup instead.
    image: { src: "/images/scam-scanner.png", width: 1882, height: 892 },
    preview: "scam-scanner",
  },
  {
    slug: "hireflow",
    name: "HireFlow",
    tagline: "AI-Assisted Hiring Platform",
    category: "Full-stack · AI · Workflows",
    summary:
      "A recruitment and interview-prep platform connecting candidates and recruiters, with AI-generated resume and candidate reports.",
    highlights: [
      [
        "Two-sided roles",
        "Candidate and recruiter workflows behind role-based access",
      ],
      [
        "AI reports",
        "Resumes analyzed against a job; recruiters get a generated report",
      ],
      [
        "Resume builder",
        "Fill in a form and AI writes the resume, rendered to PDF with Puppeteer",
      ],
      [
        "Async work",
        "Resume processing and email notifications run in the background",
      ],
      [
        "Job pipeline",
        "Postings, applications and statuses as database-driven workflows",
      ],
    ],
    tags: ["React", "Node.js", "Express", "MongoDB","Mongoose", "Groq", "ZOD", "Cloudinary", "RHF"],
    demo: "https://hireflow-dev.vercel.app",
    repo: "https://github.com/tajwarul23/HireFlow",
    caseStudy: "hireflow",
    image: { src: "/images/hireflow.png", width: 1870, height: 817 },
    preview: "hireflow",
  },
  {
    slug: "sec-library",
    name: "SEC Library",
    tagline: "Campus library system",
    category: "Full-stack · AI · Payments",
    summary:
      "A library system for Sylhet Engineering College: one API behind separate student and admin portals, with an AI book assistant, reservations, waitlists and online fine payments.",
    highlights: [
      [
        "RAG assistant",
        "Finds books by topic using Gemini embeddings in Qdrant and Groq, answering in schema-checked JSON",
      ],
      [
        "Async work",
        "Waitlist alerts run in a background queue with retries and exponential backoff",
      ],
      [
        "Payments",
        "Fines are paid via SSLCommerz and re-verified server-side before they're cleared",
      ],
      [
        "Scheduled jobs",
        "Cron jobs expire reservations and charge late fines without double-charging",
      ],
    ],
    tags: [
      "React",
      "TanStack Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Qdrant",
      "Gemini",
      "Groq",
      "SSLCommerz",
    ],
    demo: "https://sec-library-student-portal.vercel.app",
    // A list renders one button per repo; a plain `repo` string renders a single "GitHub" button.
    repos: [
      ["Backend", "https://github.com/tajwarul23/SEC_LIBRARAY_BACKEND"],
      [
        "Student Portal",
        "https://github.com/tajwarul23/SEC_Library_Student_Portal",
      ],
      [
        "Admin Portal",
        "https://github.com/tajwarul23/SEC_Library_Admin_Portal",
      ],
    ],
    caseStudy: "sec-library",
    image: { src: "/images/sec-library.png", width: 1902, height: 866 },
    preview: "sec-library",
  },
];

export const engineeringAreas = [
  {
    title: "Backend",
    items: [
      "REST APIs · API design",
      "Authentication · Authorization",
      "Validation · Error handling",
    ],
    usedIn: ["Scam Scanner", "HireFlow", "SEC Library"],
  },
  {
    title: "Databases",
    items: [
      "PostgreSQL · MongoDB",
      "Schema design · Indexing",
      "ORM / ODM (Drizzle, Mongoose)",
    ],
    usedIn: ["Scam Scanner","HireFlow", "SEC Library"],
  },
  {
    title: "Async & Infrastructure",
    items: ["Redis · Queues · Background jobs", "Caching · Cron jobs"],
    usedIn: ["Scam Scanner", "HireFlow", "SEC Library"],
  },
  {
    title: "AI Systems",
    items: [
      "LLM APIs · Structured outputs",
      "AI pipelines · RAG",
      "Prompt engineering",
    ],
    usedIn: ["Scam Scanner", "HireFlow", "SEC Library"],
  },
  {
    title: "Security",
    items: [
      "Authentication · Rate limiting",
      "Input validation · File security",
      "Prompt-injection defense",
    ],
    usedIn: ["Scam Scanner","HireFlow", "SEC Library"],
  },
  {
    title: "Deployment",
    items: ["Vercel · Render", "Cloud services"],
    usedIn: ["Scam Scanner","HireFlow","SEC Library"],
  },
];

export const techStack = [
  [
    "Frontend",
    ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", ],
  ],
  ["Backend", ["Node.js", "Express", "REST APIs"]],
  ["Databases", ["PostgreSQL", "MongoDB", "Drizzle", "Mongoose"]],
  ["AI", ["Gemini", "Groq", "LLM APIs", "RAG"]],
  ["Tools", ["Git", "GitHub", "Vercel", "Render", "Cloudinary", "ZOD"]],
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
  ["Backend Systems", "API design, authentication, validation"],
  ["System Design", "Scalability, caching, queues, trade-offs"],
  ["AI Engineering", "LLM integration, structured output, fallbacks"],
  ["Databases", "Schema design, queries, indexing"],
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
  period: "Feb 2022 – Aug 2026",
  cgpa: "3.69",
  cgpaScale: "4.00",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
};
