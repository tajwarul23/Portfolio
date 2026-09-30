import { site } from "@/content/site";
import { practiceAreas } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { StatCard, StatGrid, fmt } from "@/components/stat-card";

export function ProblemSolving({ stats }) {
  const { codeforces: cf, leetcode: lc, github: gh } = stats;

  const lcSplit =
    lc.easy != null ? `${lc.easy} / ${lc.medium} / ${lc.hard}` : "—";

  const cards = [
    {
      label: "CODEFORCES",
      href: site.links.codeforces,
      primary: { value: fmt(cf.maxRating), label: "Max rating" },
      rows: [
        { value: fmt(cf.solved), label: "Problems solved" },
        ...(cf.contests != null ? [{ value: fmt(cf.contests), label: "Rated contests" }] : []),
      ],
    },
    {
      label: "LEETCODE",
      href: site.links.leetcode,
      primary: { value: fmt(lc.solved), label: "Problems solved" },
      rows: [{ value: lcSplit, label: "Easy / Medium / Hard" }],
    },
    {
      label: "GITHUB",
      href: site.links.github,
      primary: { value: fmt(gh.repos), label: "Public repositories" },
      rows:
        gh.contributions != null
          ? [{ value: fmt(gh.contributions), label: "Contributions in the last year" }]
          : [],
    },
  ];

  return (
    <section id="problem-solving" className="border-y border-line bg-band">
      <div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-24 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20 lg:py-28">
        <SectionHeading eyebrow="Problem Solving" title="Problem Solving" className="gap-5">
          <p className="text-base leading-[1.65] text-muted-1">
            Alongside building applications, I practice algorithmic problem solving on competitive
            programming judges.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1.5">
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={site.links.codeforces} target="_blank" rel="noreferrer">Codeforces ↗</a>
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={site.links.leetcode} target="_blank" rel="noreferrer">LeetCode ↗</a>
            <a className={buttonVariants({ variant: "outline", size: "sm" })} href={site.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </SectionHeading>
        <div className="flex flex-col gap-7">
          <StatGrid className="sm:grid-cols-3">
            {cards.map((c) => (
              <StatCard key={c.label} {...c} animate />
            ))}
          </StatGrid>
          {/* <div className="flex flex-col gap-3">
            <span className="mono-label">Areas I practice</span>
            <ul className="flex flex-wrap gap-2">
              {practiceAreas.map((a) => (
                <li key={a} className="tag">{a}</li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
}
