import { education } from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";

export function Education() {
  return (
    <section id="education" className="grid gap-8 border-b border-line py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20 lg:py-28">
      <SectionHeading eyebrow="Education" title="Education" titleClassName="text-[32px] sm:text-[32px]" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-xl font-semibold">{education.degree}</span>
            <span className="text-base text-muted-1">{education.school}</span>
          </div>
          <span className="shrink-0 font-mono text-[13px] text-dim">{education.period ?? `Class of ${education.year}`}</span>
        </div>
        {education.cgpa && (
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-dim">CGPA</span>
            <span className="text-lg font-semibold">
              {education.cgpa}
              <span className="text-sm font-normal text-muted-2"> / {education.cgpaScale}</span>
            </span>
          </div>
        )}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm leading-relaxed text-muted-1">
          <span className="font-mono text-xs text-dim">COURSEWORK</span>
          {education.coursework.join(" · ")}
        </div>
      </div>
    </section>
  );
}
