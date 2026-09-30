import { focusAreas } from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="grid gap-10 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-20 lg:py-32">
      <SectionHeading eyebrow="About" title="About Me" />
      <div className="flex flex-col gap-9">
        <p className="text-lg leading-[1.65] text-fg-2 sm:text-xl">
          I studied Computer Science &amp; Engineering and spent most of that time building things end to
          end. I&apos;m drawn to the backend side — how data is modelled, how requests are validated, what
          runs in the background — and to AI features that have to hold up in production, not just in a
          demo. Competitive programming taught me to reason about problems before writing code; building
          projects taught me to ship them.
        </p>
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
