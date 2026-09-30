"use client";

import { useEffect, useRef } from "react";

// Counts a stat like "1,300+" (or "31 / 15 / 2") up from 0 the first time it scrolls into view.
// Every number in the text animates together; the characters around them stay put.
// The server renders the final value, so it's correct without JS; text with no number ("—") is left as-is.

const DURATION = 1400;
const NUMBER = /\d[\d,]*/g;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value }) {
  const ref = useRef(null);
  const text = String(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !/\d/.test(text)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (progress) => {
      el.textContent = text.replace(NUMBER, (digits) =>
        Math.round(Number(digits.replace(/,/g, "")) * progress).toLocaleString("en-US")
      );
    };

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION, 1);
          render(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
