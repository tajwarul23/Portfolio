// Personal details and links used across the site.
// Set `resume` to "/resume.pdf" once the file is in /public — the resume buttons appear automatically.

export const site = {
  name: "Tajwarul Chowdhury",
  initials: "TC",
  shortName: "Tajwarul",
  role: "Software Engineer",
  location: "Sylhet, BD",
  availability: "Open to SWE roles",
  description:
    "Software engineer building full-stack systems and AI-powered software — APIs, databases, background jobs and LLM pipelines.",
  photo: "/images/tajwarul.jpeg",
  resume: null,
  email: "tajwarulchowdhury@gmail.com",
  links: {
    github: "https://github.com/tajwarul23",
    linkedin: "https://www.linkedin.com/in/tajwarul-chowdhury-7288381a9/",
    codeforces: "https://codeforces.com/profile/tajwarul",
    leetcode: "https://leetcode.com/u/tajwarulchowdhury/",
  },
  handles: {
    github: "tajwarul23",
    codeforces: "tajwarul",
    leetcode: "tajwarulchowdhury",
  },
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#engineering", label: "Engineering" },
  { href: "/#stack", label: "Stack" },
  { href: "/#problem-solving", label: "Problem Solving" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];
