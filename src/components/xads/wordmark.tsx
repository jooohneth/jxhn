"use client";

import { useEffect, useRef, useState } from "react";

export function Wordmark() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href="#top"
      className={shown ? "wordmark revealed" : "wordmark"}
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 1392 318"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          x="0"
          y="260"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          fontSize="280"
          fontWeight="500"
          letterSpacing="-0.04em"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          JXHN
        </text>
      </svg>
    </a>
  );
}
