// SEC Library case study. Fields left as null are hidden on the live page —
// fill them in and they appear automatically.

export const secLibrary = {
  slug: "sec-library",
  number: "03",
  name: "SEC Library",
  intro:
    "A library management system built for Sylhet Engineering College: one API behind a student portal and an admin portal, with an AI assistant that finds books by topic, reservations, waitlists and online fine payments.",
 
  // Lists render one button each; see app/projects/[slug]/page.js.
  demos: [
    ["Student Portal", "https://sec-library-student-portal.vercel.app"],
    ["Admin Portal", "https://sec-library-admin-portal.vercel.app"],
  ],
  repos: [
    ["Backend", "https://github.com/tajwarul23/SEC_LIBRARAY_BACKEND"],
    ["Student Portal", "https://github.com/tajwarul23/SEC_Library_Student_Portal"],
    ["Admin Portal", "https://github.com/tajwarul23/SEC_Library_Admin_Portal"],
  ],
  heroImage: {
    src: "/images/sec-library.png",
    alt: "SEC Library admin portal overview in guest mode: totals for titles, users, issued, overdue and reserved books, with book holds and recent circulation",
    width: 1902,
    height: 866,
  },
  problem: {
    title: "A library run on registers can't answer simple questions.",
    body: "Which copies are out, who is overdue, and does the library even have a book on the topic a student needs? With paper registers and spreadsheets, every one of those means a walk to the desk. Students can't hold a copy before they arrive, nobody tells them when a waited-for book comes back, and fines are tracked by hand.",
  },
  solution: {
    title: "One set of library rules, two portals, and an assistant that knows the catalog.",
    body: "Students search the catalog or simply ask the assistant which books cover a topic, then reserve a copy or join a waitlist. They see their loans and fines and can pay online. Librarians use a separate admin portal to issue and return books, manage inventory and students, and track overdue loans. The rules — loan periods, borrowing limits, reservation holds and late fines — live in the API, so both portals enforce them the same way.",
  },
  architecture: {
    title: "One API enforces the rules; slow work runs off the request.",
    // Row 1 flows left → right, row 2 flows right → left (a U-shape).
    rows: [
      [
        { kind: "Client", name: "Two React portals", note: "Student + admin · TanStack Query" },
        { kind: "API", name: "Express REST API", note: "JWT cookies · Zod · per-route limits", strong: true },
        { kind: "Rules", name: "Library services", note: "Borrow limits, holds, fines" },
      ],
      [
        { kind: "Queue", name: "Waitlist notifier", note: "In-process, retries with backoff" },
        { kind: "Cron", name: "Scheduled jobs", note: "Expire holds · charge late fines" },
        { kind: "AI", name: "RAG assistant", note: "Gemini embeddings → Qdrant → Groq", strong: true },
      ],
    ],
    infra: [
      ["DB", "MongoDB Atlas via Mongoose"],
      ["Search", "Qdrant Cloud vector index"],
      ["Payments", "SSLCommerz (sandbox)"],
    ],
    caption:
      "The API runs on Render and both portals on Vercel. Requests return as soon as the data is saved; waitlist notifications go to a background queue, and holds and fines are settled by cron jobs.",
  },
  features: [
    ["Ask for a book by topic", "The assistant suggests catalog books for a topic, in English or Bangla."],
    ["Reserve or join a waitlist", "Hold a copy for pickup, or get notified when one is returned."],
    ["Pay fines online", "Late and missed-pickup fines paid through SSLCommerz."],
    ["Admin circulation desk", "Issue and return books, inventory, students and overdue tracking."],
    ["Research papers", "A repository of papers alongside the book catalog."],
    ["Guest mode", "One-click, read-only access to either portal — no sign-up."],
  ],
  challenges: [
    {
      title: "Charging a late fine exactly once",
      problem: "The hourly cron and a book being returned can settle the same overdue loan at the same moment.",
      solution:
        "Each loan records how many days it has been charged for, and that counter is advanced with a compare-and-set update. Only the caller that wins the update adds to the fine, so running both at once can never double-charge.",
    },
    {
      title: "Keeping the assistant grounded in the catalog",
      problem: "Similarity search returns loosely related chunks, and a model will happily describe books the library doesn't have.",
      solution:
        "The model may only use the retrieved context, which is treated as data rather than instructions, and must answer in a fixed JSON shape that Zod validates before anything reaches the UI. Chat memory is scoped per student so follow-ups like \"does it cover X?\" resolve to the right book.",
    },
    {
      title: "Trusting a payment callback",
      problem: "The gateway's redirect and IPN requests are unauthenticated, so anyone who guesses a transaction ID could fake a success.",
      solution:
        "A fine is only cleared after the backend re-validates the payment with SSLCommerz's own validation API; the callback body alone never changes a balance.",
    },
  ],
  decisions: [
    [
      "No embedding fallback",
      "Vectors from different embedding models aren't comparable, so a fallback model would silently return the wrong books. It fails with a clear error instead.",
    ],
    [
      "Reservations count toward the limit",
      "A student can hold three books at once, counting pending reservations — otherwise one person could reserve every copy.",
    ],
    [
      "Guest mode without accounts",
      "A guest is just a short-lived JWT with read-only permissions and its own chat memory and rate limit, so visitors can try both portals without creating database records.",
    ],
    [
      "In-process queue",
      "Waitlist notifications use a small in-memory queue with concurrency limits and retries, which keeps the backend a single service with no Redis to run.",
    ],
  ],
  metrics: [
   
    
  ],
  // TODO: two or three honest learnings
  learnings: [],
  stack: [
    "React",
    "Vite",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "JWT",
    "Firebase Auth",
    "Qdrant",
    "Gemini",
    "Groq",
    "SSLCommerz",
    "node-cron",
    "Render",
    "Vercel",
  ],
};
