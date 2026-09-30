"use client";

import { useEffect, useState } from "react";
import { cn } from "cn";

// Sticky "On this page" nav that highlights the section currently in view.
export function Toc({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[104px] hidden flex-col border-l border-line pl-5 lg:flex"
    >
      <span className="pb-2.5 font-mono text-[11px] text-dim">ON THIS PAGE</span>
      {items.map((item, i) => {
        const on = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={on ? "location" : undefined}
            className={cn(
              "flex items-center gap-3 py-2 text-sm hover:text-fg",
              on ? "text-fg" : "text-muted-2"
            )}
          >
            <span className={cn("font-mono text-[11px]", on && "text-violet")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
