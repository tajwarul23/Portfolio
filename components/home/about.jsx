import { site } from "@/content/site";
import { focusAreas, projects } from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";
import { StatCard, StatGrid, fmt } from "@/components/stat-card";
import {
  CodeforcesIcon,
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/brand-icons";

// Rounds down to a "1,300+" style figure so the headline number doesn't jump around daily.
const roundedPlus = (n) =>
  n >= 100 ? `${fmt(Math.floor(n / 100) * 100)}+` : fmt(n);

export function About({ stats }) {
  const { codeforces: cf, leetcode: lc, github: gh } = stats;
  const solved = (cf.solved ?? 0) + (lc.solved ?? 0);

  const tiles = [
    {
      label: "PROJECTS",
      href: "#projects",
      primary: {
        value: fmt(projects.length),
        label: "Full-stack & AI applications",
      },
    },
    {
      label: "PROBLEMS SOLVED",
      href: "#problem-solving",
      primary: {
        value: solved ? roundedPlus(solved) : "—",
        label: "Across Codeforces & LeetCode",
      },
    },
    {
      label: "CODEFORCES",
      href: site.links.codeforces,
      primary: { value: fmt(cf.maxRating), label: "Max rating" },
    },
    {
      label: "CONTESTS",
      href: site.links.codeforces,
      // Includes contests outside Codeforces, so it's set by hand rather than fetched.
      primary: { value: "40+", label: "Online programming contests" },
    },

    {
      label: "CORE CS",
      href: "#education",
      tags: ["DSA", "OOP", "DBMS", "OS", "Networks"],
    },
    {
      label: "GITHUB",
      href: site.links.github,
      primary:
        gh.contributions != null
          ? { value: fmt(gh.contributions), label: "Contributions this year" }
          : { value: fmt(gh.repos), label: "Public repositories" },
    },
  ];

  return (
    <section
      id="about"
      className="grid gap-10 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-20 lg:py-32"
    >
      <SectionHeading eyebrow="About" title="About Me" className="gap-5">
        <p className="text-base leading-[1.65] text-muted-1">
          I enjoy solving problems as much as I enjoy building software.
          Competitive programming and DSA taught me to break down problems and
          think systematically, while building end-to-end applications taught me
          how to turn those ideas into working products. I’ve also built a
          strong foundation in core computer science and enjoy understanding
          what happens under the hood.
        </p>
        <div className="flex flex-wrap gap-x-6 pt-1">
          <a
            className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="size-[17px]" />
            GitHub
          </a>

          <a
            className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg"
            href={site.links.codeforces}
            target="_blank"
            rel="noreferrer"
          >
            <CodeforcesIcon className="size-[17px]" />
            Codeforces
          </a>
          <a
            className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg"
            href={site.links.leetcode}
            target="_blank"
            rel="noreferrer"
          >
            <LeetCodeIcon className="size-[17px]" />
            LeetCode
          </a>
        </div>
      </SectionHeading>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3.5">
          <span className="mono-label">At a glance</span>
          <StatGrid className="grid-cols-2 sm:grid-cols-3">
            {tiles.map((t) => (
              <StatCard key={t.label} {...t} animate />
            ))}
          </StatGrid>
        </div>
        <div className="flex flex-col gap-3.5 border-t border-line pt-7">
          <span className="mono-label">Currently focused on</span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4">
            {focusAreas.map(([title, note]) => (
              <div key={title} className="flex flex-col gap-1.5">
                <span className="text-base font-semibold">{title}</span>
                <span className="text-[13px] text-muted-2">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
