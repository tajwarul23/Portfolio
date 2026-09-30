import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/content/case-studies";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toc } from "@/components/case-study/toc";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — Case Study`,
    description: cs.intro,
    alternates: { canonical: `/projects/${cs.slug}` },
    openGraph: { title: `${cs.name} — Case Study`, description: cs.intro, url: `/projects/${cs.slug}` },
  };
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-[22px]">
      <span className="eyebrow">{label}</span>
      {title && <h2 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[30px]">{title}</h2>}
      {children}
    </section>
  );
}

const prose = "text-[17px] leading-[1.75] text-fg-3";

function Box({ node }) {
  return (
    <div className={`flex flex-col gap-1 rounded-xl border bg-surface-2 px-4 py-3.5 ${node.strong ? "border-line-strong" : "border-[#2a2a33]"}`}>
      <span className="font-mono text-[10px] text-dim uppercase">{node.kind}</span>
      <span className="text-sm font-semibold">{node.name}</span>
      <span className="text-xs text-muted-2">{node.note}</span>
    </div>
  );
}

function ArchitectureDiagram({ architecture }) {
  const [top, bottom] = architecture.rows;
  const row = "grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)] md:gap-0";
  const arrow = (dir) => (
    <span aria-hidden className="block text-center text-blue">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">{dir}</span>
    </span>
  );
  return (
    <figure className="flex flex-col gap-4">
      <div className="flex flex-col gap-[18px] rounded-[18px] border border-line bg-surface p-5 sm:p-7">
        <div className={row}>
          <Box node={top[0]} />{arrow("→")}<Box node={top[1]} />{arrow("→")}<Box node={top[2]} />
        </div>
        <div aria-hidden className="text-center text-blue md:pr-[14%] md:text-right">↓</div>
        {/* Row 2 flows right-to-left on desktop; on mobile it reads top-down in flow order. */}
        <div className={row}>
          <div className="md:order-5"><Box node={bottom[0]} /></div>
          <div className="md:order-4">{arrow("←")}</div>
          <div className="md:order-3"><Box node={bottom[1]} /></div>
          <div className="md:order-2">{arrow("←")}</div>
          <div className="md:order-1"><Box node={bottom[2]} /></div>
        </div>
        <div className="grid gap-3 border-t border-dashed border-line-2 pt-3.5 sm:grid-cols-3">
          {architecture.infra.map(([k, v]) => (
            <div key={k} className="text-[13px] text-muted-1">
              <span className="font-mono text-[11px] text-dim uppercase">{k}</span>
              <br />
              {v}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="text-[15px] leading-relaxed text-muted-1">{architecture.caption}</figcaption>
    </figure>
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const next = getNextCaseStudy(slug);

  const hasResults = cs.metrics.length > 0 || cs.learnings.length > 0;
  const sections = [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    { id: "features", label: "Key Features" },
    { id: "challenges", label: "Challenges" },
    { id: "decisions", label: "Technical Decisions" },
    ...(hasResults ? [{ id: "learnings", label: "Results & Learnings" }] : []),
    { id: "stack", label: "Tech Stack" },
  ];
  const n = (id) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const meta = [
    ["Role", cs.role],
    ["Timeline", cs.timeline],
    ["Status", cs.status],
  ].filter(([, v]) => v);

  return (
    <>
      <SiteHeader variant="subpage" />
      <main id="main" className="mx-auto max-w-[1160px] px-4 sm:px-10">
        <section className="flex flex-col gap-[26px] pt-16 pb-14 sm:pt-[88px]">
          <nav aria-label="Breadcrumb" className="font-mono text-[13px] text-dim">
            <Link href="/#projects" className="text-dim">Projects</Link> / <span className="text-fg-3">{cs.name}</span>
          </nav>
          <div className="eyebrow">Case Study · {cs.number}</div>
          <h1 className="max-w-[900px] text-[44px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[60px]">{cs.name}</h1>
          <p className="max-w-[720px] text-lg leading-[1.55] text-fg-3 sm:text-[21px]">{cs.intro}</p>
          <div className="mt-3 flex flex-wrap gap-px overflow-hidden rounded-[14px] border border-line bg-line">
            {meta.map(([k, v]) => (
              <div key={k} className="flex min-w-[200px] flex-1 flex-col gap-1.5 bg-ink px-5 py-[18px]">
                <span className="font-mono text-[11px] text-dim uppercase">{k}</span>
                <span className="text-[15px]">{v}</span>
              </div>
            ))}
            {(cs.demo || cs.repo) && (
              <div className="flex min-w-[200px] flex-1 items-center gap-2 bg-ink px-5 py-[18px]">
                {cs.demo && <a className={buttonVariants({ size: "sm" })} href={cs.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
                {cs.repo && <a className={buttonVariants({ variant: "outline", size: "sm" })} href={cs.repo} target="_blank" rel="noreferrer">GitHub</a>}
              </div>
            )}
          </div>
        </section>

        <div className="overflow-hidden rounded-[20px] border border-line bg-surface-3">
          <Image
            src={cs.heroImage.src}
            alt={cs.heroImage.alt}
            width={cs.heroImage.width}
            height={cs.heroImage.height}
            priority
            sizes="(min-width: 1160px) 1080px, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="grid items-start gap-20 pt-20 pb-28 lg:grid-cols-[220px_minmax(0,1fr)] lg:pt-24 lg:pb-32">
          <Toc items={sections} />

          <div className="flex max-w-[780px] flex-col gap-20 lg:gap-24">
            <Section id="problem" label={`${n("problem")} · Problem`} title={cs.problem.title}>
              <p className={prose}>{cs.problem.body}</p>
            </Section>

            <Section id="solution" label={`${n("solution")} · Solution`} title={cs.solution.title}>
              <p className={prose}>{cs.solution.body}</p>
            </Section>

            <Section id="architecture" label={`${n("architecture")} · Architecture`} title={cs.architecture.title}>
              <ArchitectureDiagram architecture={cs.architecture} />
            </Section>

            <Section id="features" label={`${n("features")} · Key Features`} title="What a user can do">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {cs.features.map(([title, body]) => (
                  <div key={title} className="flex flex-col gap-1.5 bg-ink p-[22px]">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-1">{body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="challenges" label={`${n("challenges")} · Engineering Challenges`} title="The hard parts">
              <ol className="flex flex-col border-t border-line">
                {cs.challenges.map((c, i) => (
                  <li key={c.title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4 border-b border-line py-[22px] sm:grid-cols-[40px_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-dim">{String.fromCharCode(65 + i)}</span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[17px] font-semibold">{c.title}</h3>
                      <p className="text-[15px] leading-[1.65] text-muted-1">
                        {c.problem}
                        {c.solution && <> {c.solution}</>}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="decisions" label={`${n("decisions")} · Technical Decisions`} title="Choices and why">
              <div className="flex flex-col gap-3">
                {cs.decisions.map(([title, body]) => (
                  <div key={title} className="grid gap-2 rounded-[14px] border border-line bg-surface px-[22px] py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                    <h3 className="text-[15px] font-semibold">{title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted-1">{body}</p>
                  </div>
                ))}
              </div>
            </Section>

            {hasResults && (
              <Section id="learnings" label={`${n("learnings")} · Results & Learnings`} title="What came out of it">
                {cs.metrics.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-1.5 rounded-[14px] border border-line bg-surface p-[22px]">
                        <span className="text-[28px] font-semibold">{m.value}</span>
                        <span className="text-[13px] text-muted-2">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {cs.learnings.map((l) => (
                  <p key={l} className={prose}>{l}</p>
                ))}
              </Section>
            )}

            <Section id="stack" label={`${n("stack")} · Tech Stack`}>
              <ul className="flex flex-wrap gap-1.5">
                {cs.stack.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </Section>

            <Link
              href={next ? `/projects/${next.slug}` : "/#projects"}
              className="flex items-center justify-between rounded-[18px] border border-line bg-surface px-[30px] py-7 text-fg hover:border-line-strong hover:text-fg"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-dim">{next ? "NEXT CASE STUDY" : "BACK TO"}</span>
                <span className="text-2xl font-semibold">{next ? next.name : "All projects"}</span>
              </div>
              <span className="text-2xl text-violet-soft">→</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter showLinks={false} />
    </>
  );
}
