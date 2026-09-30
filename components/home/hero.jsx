import Image from "next/image";
import { MailIcon } from "lucide-react";
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";

export function Hero() {
  return (
    <>
      <section className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20 lg:pt-[120px] lg:pb-24">
        <div className="flex flex-col gap-7">
          <div className="eyebrow flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-violet" />
            {site.role}
          </div>
          <h1 className="text-[40px] leading-[1.06] font-semibold tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
            Hi, I&apos;m {site.shortName}.
            <br />
            {/* Screen readers and search engines get the full sentence; the typed version is visual only. */}
            <span className="sr-only">I build full-stack systems and AI-powered software.</span>
            <span className="text-muted-2" aria-hidden>
              I build <Typewriter phrases={site.heroPhrases} />
            </span>
          </h1>
        
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className={buttonVariants()}>View Projects</a>
            {site.resume ? (
              <a href={site.resume} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline" })}>
                View Resume
              </a>
            ) : (
              <a href="#contact" className={buttonVariants({ variant: "outline" })}>Get in Touch</a>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 pt-1">
            <a className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg" href={site.links.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="size-[17px]" />GitHub
            </a>
            <a className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg" href={site.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon className="size-[17px]" />LinkedIn
            </a>
            <a className="inline-flex h-11 items-center gap-2 text-sm text-muted-1 hover:text-fg" href={site.links.codeforces} target="_blank" rel="noreferrer">
              <CodeforcesIcon className="size-[17px]" />Codeforces
            </a>
         
          </div>
        </div>

        {/* Photo: offset dotted card behind a violet-bordered frame */}
        <div className="relative mx-auto w-full max-w-[380px] pr-6 pb-6 lg:mr-0">
          <div
            aria-hidden
            className="absolute top-6 right-0 bottom-0 left-6 rounded-[22px] border border-line"
            style={{
              backgroundImage: "radial-gradient(#2a2a33 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative aspect-[356/436] overflow-hidden rounded-[22px] border border-violet/45 bg-surface-2">
            <Image
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 356px, 90vw"
              className="object-cover object-[50%_28%]"
            />
          </div>
          <div className="absolute bottom-10 -left-2 flex h-[30px] items-center gap-2 rounded-lg border border-line-2 bg-ink px-3 font-mono text-[11px] text-fg-3 sm:left-4">
            <span className="size-1.5 rounded-full bg-ok" />
            {site.availability} 
          </div>
        </div>
      </section>

      {/* Quick proof strip */}
      <div className="flex flex-col gap-3 border-y border-line py-[18px] text-sm text-muted-2 sm:flex-row sm:items-center sm:gap-7">
        <span className="mono-label">Recent builds</span>
        {projects.map((p, i) => (
          <div key={p.slug} className="flex items-center gap-7">
            {i > 0 && <span className="hidden text-sep sm:inline">/</span>}
            <a href="#projects" className="flex items-center gap-2 text-muted-2 hover:text-violet-soft">
              <span className="font-semibold text-fg">{p.name}</span>
              <span>{p.tagline}</span>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
