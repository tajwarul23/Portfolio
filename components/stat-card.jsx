import { cn } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

// Bordered stat tiles shared by About ("At a glance") and Problem Solving.
// `href` is optional: external links open in a new tab, in-page anchors ("#…") don't.

export const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : "—");

export function StatGrid({ className, children }) {
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-2xl border border-line-2 bg-line-2", className)}>
      {children}
    </div>
  );
}

// Pass `tags` instead of `primary` for a tile that lists items rather than showing a number.
// `animate` counts every number on the card up when it scrolls into view.
export function StatCard({ label, primary, tags, rows = [], href, animate = false }) {
  const Tag = href ? "a" : "div";
  const linkProps = href
    ? { href, ...(href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" }) }
    : {};

  return (
    <Tag
      {...linkProps}
      className={cn(
        "flex flex-col gap-3.5 bg-ink p-5 text-fg sm:p-[26px]",
        href && "hover:bg-surface hover:text-fg"
      )}
    >
      <span className="font-mono text-xs text-dim">{label}</span>
      {tags ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t} className="tag h-[26px] text-xs">{t}</li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-0.5">
          <span className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">
            {animate ? <CountUp value={primary.value} /> : primary.value}
          </span>
          <span className="text-[13px] text-muted-2">{primary.label}</span>
        </div>
      )}
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col gap-0.5">
          <span className="text-xl font-semibold">
            {animate ? <CountUp value={r.value} /> : r.value}
          </span>
          <span className="text-[13px] text-muted-2">{r.label}</span>
        </div>
      ))}
    </Tag>
  );
}
