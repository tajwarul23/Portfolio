"use client";

import { useEffect, useState } from "react";

// Types each phrase, pauses, erases it, then moves to the next — looping forever.
// Starts with the first phrase fully shown (that's what the server renders), and stays static
// for visitors who prefer reduced motion. Every phrase is also stacked invisibly in the same
// grid cell, so the box is always sized for the longest one and the layout never jumps.

const TYPE_MS = 65;
const ERASE_MS = 35;
const HOLD_MS = 1800;

export function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (phrases.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const phrase = phrases[index];
    let delay = erasing ? ERASE_MS : TYPE_MS;
    let next;

    if (!erasing && length === phrase.length) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (erasing && length === 0) {
      next = () => {
        setErasing(false);
        setIndex((i) => (i + 1) % phrases.length);
      };
    } else {
      next = () => setLength((l) => l + (erasing ? -1 : 1));
    }

    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [erasing, index, length, phrases]);

  return (
    <span className="inline-grid align-top">
      {phrases.map((p) => (
        <span key={p} className="invisible [grid-area:1/1]" aria-hidden>
          {p}
        </span>
      ))}
      <span className="[grid-area:1/1]">
        {phrases[index].slice(0, length)}
        <span className="typing-caret" aria-hidden />
      </span>
    </span>
  );
}
