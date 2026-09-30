import { engineeringAreas, techStack } from "@/content/projects";
import { SectionHeading } from "@/components/section-heading";

export function Engineering() {
  return (
    <section id="engineering" className="flex flex-col gap-11 border-t border-line py-24 lg:py-32">
      <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
        <SectionHeading eyebrow="Engineering" title="Engineering Focus" />
        <p className="text-base leading-relaxed text-muted-1">
          The areas I work in, and where each one shows up in my projects.
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {engineeringAreas.map((area, i) => (
          <div key={area.title} className="flex flex-col gap-4 bg-ink p-7 sm:p-[30px]">
            <div className="flex justify-between gap-4">
              <h3 className="text-[19px] font-semibold">{area.title}</h3>
              <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <ul className="text-sm leading-[1.9] text-fg-3">
              {area.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-auto font-mono text-[11px] text-dim">Used in → {area.usedIn.join(", ")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section id="stack" className="grid gap-10 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20 lg:pb-32">
      <SectionHeading eyebrow="Stack" title="Tech Stack">
        <p className="text-[15px] leading-relaxed text-muted-1">What I reach for, grouped by layer.</p>
      </SectionHeading>
      <dl className="flex flex-col border-b border-line">
        {techStack.map(([layer, items]) => (
          <div key={layer} className="grid items-baseline gap-2 border-t border-line py-[18px] sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-5">
            <dt className="mono-label">{layer}</dt>
            <dd className="text-base leading-[1.7]">
              {items.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="text-sep"> · </span>}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
