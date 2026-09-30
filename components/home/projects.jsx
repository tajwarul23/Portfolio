import Link from "next/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { previews } from "@/components/home/project-previews";

function ProjectCard({ project, index }) {
  const Preview = previews[project.preview];
  return (
    <article className="group grid overflow-hidden rounded-[22px] border border-line bg-surface transition-colors duration-200 hover:border-line-strong lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
      <div className="flex items-end overflow-hidden border-b border-line bg-surface-3 pt-8 pl-6 sm:pt-10 sm:pl-10 lg:border-r lg:border-b-0" aria-hidden>
        {Preview && <Preview />}
      </div>
      <div className="flex flex-col gap-[22px] p-6 sm:p-10">
        <div className="flex gap-3.5 font-mono text-xs text-dim">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[32px]">{project.name}</h3>
          <p className="text-[17px] leading-[1.55] text-fg-3">{project.summary}</p>
        </div>
        <dl className="flex flex-col gap-3.5 border-y border-line py-[18px]">
          {project.highlights.map(([term, desc]) => (
            <div key={term} className="grid gap-1 text-sm sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-3">
              <dt className="font-semibold">{term}</dt>
              <dd className="text-muted-1">{desc}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech used">
          {project.tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
        {(project.demo || project.repo || project.caseStudy) && (
          <div className="mt-auto flex flex-wrap gap-2.5">
            {project.demo && (
              <a className={buttonVariants({ variant: "outline", size: "sm" })} href={project.demo} target="_blank" rel="noreferrer">
                Live Demo ↗
              </a>
            )}
            {project.repo && (
              <a className={buttonVariants({ variant: "outline", size: "sm" })} href={project.repo} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {project.caseStudy && (
              <Link className={buttonVariants({ size: "sm" })} href={`/projects/${project.caseStudy}`}>
                Case Study →
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-12 pb-24 lg:pb-32">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-3.5">
          <div className="eyebrow">Projects</div>
          <h2 className="text-[36px] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">Featured Projects</h2>
          <p className="text-lg text-muted-1">Selected projects I&apos;ve designed and built.</p>
        </div>
        <a href={site.links.github} target="_blank" rel="noreferrer" className="py-2.5 text-sm text-muted-1 hover:text-fg">
          All repositories on GitHub ↗
        </a>
      </div>

      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}

      <div className="flex flex-col justify-between gap-4 rounded-[22px] border-[1.5px] border-dashed border-line-3 px-6 py-7 sm:flex-row sm:items-center sm:px-10">
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-dim">{String(projects.length + 1).padStart(2, "0")}</span>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold">Next project</span>
            <span className="text-sm text-muted-2">Currently in planning — it&apos;ll show up here once it ships.</span>
          </div>
        </div>
        <span className="font-mono text-xs text-dim">In planning</span>
      </div>
    </section>
  );
}
