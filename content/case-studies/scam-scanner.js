// Scam Scanner case study. Fields left as null are hidden on the live page —
// fill them in and they appear automatically.

export const scamScanner = {
  slug: "scam-scanner",
  number: "01",
  name: "Scam Scanner",
  intro:
    "An AI-powered platform that reads scam evidence — screenshots, chats and documents — as one case, and explains what's suspicious and what to verify next.",
  
  
  
  demo: "https://scam-scanner-one.vercel.app/", 
  repo: "https://github.com/tajwarul23/ScamScanner", 
  heroImage: {
    src: "/images/scam-scanner.png",
    alt: "Scam Scanner landing page with a sample high-risk case summary and what to verify next",
    width: 1882,
    height: 892,
  },
  problem: {
    title: "Scam evidence is scattered and hard to read as a whole.",
    body: "A suspicious job offer arrives as a screenshot, a few chat messages and a payment link. Each piece looks harmless alone; the problem shows up in the contradictions between them. Most people don't know what to check, and pasting one screenshot into a chatbot misses the rest of the story.",
  },
  solution: {
    title: "Treat every upload as evidence in one case.",
    body: "Users open a case and add screenshots, documents and pasted messages. The system extracts names, companies, amounts, dates, URLs, and claims from all of them together, checks links, flags contradictions, and produces a plain-language summary with a risk level, the evidence behind it, and the next things to verify.",
  },
  architecture: {
    title: "Uploads return fast; analysis happens in workers.",
    // Row 1 flows left → right, row 2 flows right → left (a U-shape).
    rows: [
      [
        { kind: "Client", name: "Next.js app", note: "Case UI, uploads" },
        { kind: "API", name: "Route handlers", note: "Auth · validation · rate limit", strong: true },
        { kind: "Queue", name: "BullMQ on Redis", note: "One job per evidence item" },
      ],
      [
        { kind: "Worker", name: "AI extraction", note: "Gemini → Groq fallback", strong: true },
        { kind: "Signals", name: "Rule engine + URL checks", note: "External reputation APIs" },
        { kind: "Synthesis", name: "finalizeCase()", note: "Runs when all evidence is done" },
      ],
    ],
    infra: [
      ["DB", "PostgreSQL (Neon) via Drizzle"],
      ["Files", "Cloudinary for screenshots, PDFs, DOCX"],
      ["Auth", "Better Auth, Drizzle adapter"],
    ],
    caption:
      "Requests only validate and enqueue. Extraction, signal checks and synthesis run in workers, so a slow model call never blocks the UI.",
  },
  features: [
    ["Multimodal evidence upload", "Screenshots, documents and pasted text in one case."],
    ["Evidence timeline", "Extracted events ordered so the story reads clearly."],
    ["Contradiction detection", "Mismatched amounts, names and domains across items."],
    ["Risk level with evidence", "Every signal links back to the item it came from."],
    ["Next verification steps", "Concrete things to check before paying or replying."],
    ["Shareable report", "Export the full analysis as a report to keep or send to someone."],
  ],
  challenges: [
    {
      title: "Reading images and text as one source",
      problem: "Messy screenshots had to produce the same structured fields as clean text.",
      solution: null, // TODO: how you solved it — schema, prompting, retries
    },
    {
      title: "Untrusted input going into a model",
      problem: "Evidence can contain instructions aimed at the model.",
      solution: null, // TODO: your prompt-injection defenses
    },
    {
      title: 'Knowing when a case is "done"',
      problem: "Synthesis must run once, only after every evidence job finishes.",
      solution: null, // TODO: your coordination approach
    },
  ],
  decisions: [
    [
      "Extraction first",
      "Built and proved the riskiest part — multimodal extraction — before the signal engine or RAG layer.",
    ],
    [
      "One synthesis function",
      "finalizeCase() grows in place as new inputs arrive (signals, RAG matches) instead of being replaced each phase.",
    ],
    [
      "Rules alongside the model",
      "A deterministic signal engine and URL reputation checks run next to the LLM, so the risk level never rests on the model's judgement alone.",
    ],
    [
      "Free-tier model budget",
      "Gemini as primary with a Groq fallback keeps it running within free API limits.",
    ],
  ],
  // TODO: real metrics, e.g. { value: "~40s", label: "Avg. analysis time" }
  metrics: [],
  // TODO: two or three honest learnings
  learnings: [],
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Drizzle",
    "Better Auth",
    "Redis",
    "BullMQ",
    "ZOD",
    "React-Hook-Form",
    "Gemini",
    "Groq",
    "Cloudinary",
    "Tailwind CSS",
    "Vercel",
  ],
};
