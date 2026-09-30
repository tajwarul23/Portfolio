# Tajwarul Chowdhury — Portfolio

Next.js (App Router, JavaScript) · Tailwind CSS v4 · shadcn/ui (Base UI).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Almost everything lives in `content/`:

| File | What it holds |
| --- | --- |
| `content/site.js` | Name, email, social links, photo, resume path |
| `content/projects.js` | Project cards, engineering areas, tech stack, education |
| `content/case-studies/*.js` | Case study pages (`/projects/<slug>`) |
| `lib/stats.js` | Fallback numbers for the Problem Solving section |

- **Resume:** put the PDF at `public/resume.pdf` and set `resume: "/resume.pdf"` in `content/site.js`. The "View Resume" buttons appear automatically.
- **Project links:** set `demo` / `repo` in `content/projects.js`. Buttons appear when a URL is set.
- **New case study:** copy `content/case-studies/scam-scanner.js`, register it in `content/case-studies/index.js`, and set `caseStudy: "<slug>"` on the project.
- Case study fields left as `null` or `[]` (timeline, status, challenge solutions, metrics, learnings) are hidden on the page until you fill them in.

## Live stats

The Problem Solving section fetches Codeforces (max rating, contests), LeetCode (solved by difficulty) and GitHub (public repos) at build time and re-fetches at most once a day. If a source is down, it falls back to the values in `lib/stats.js`. The Codeforces solved count is set by hand.

## Environment variables

See `.env.example`. All are optional.

## Deploying

Push to GitHub, import the repo on [vercel.com/new](https://vercel.com/new), add the env vars, and deploy. Add a custom domain under Project → Settings → Domains.

The original design mockups are in `design/`.
"# Portfolio" 
