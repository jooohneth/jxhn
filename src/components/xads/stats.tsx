"use client";

import { useEffect, useRef } from "react";

const STATS = [
  {
    value: "$2B",
    label: "Mantle network TVL, testnet to mainnet.",
    col: "1 / span 2",
    row: "2",
    h: "15.5rem",
  },
  {
    value: "652k",
    label: "Mints on Just a Boy — the largest mint on Mantle.",
    col: "3 / span 2",
    row: "1 / span 2",
    h: "25.5rem",
  },
  {
    value: "200+",
    label: "Builders hosted and supported through Sozu Haus.",
    col: "5 / span 2",
    row: "1",
    h: "15.5rem",
  },
  {
    value: "4",
    label: "Languages. Ukraine, Vietnam, Canada.",
    col: "7 / span 2",
    row: "1",
    h: "20.5rem",
  },
] as const;

const outQuint = (t: number) => {
  const x = t - 1;
  return 1 + x * x * x * x * x;
};

function countUp(el: HTMLElement, delay = 0) {
  const raw = el.dataset.value ?? el.textContent ?? "";
  const match = raw.match(/-?\d+(?:\.\d+)?/);
  if (!match || match.index === undefined) return;
  const dec = (match[0].split(".")[1] || "").length;
  const pre = raw.slice(0, match.index);
  const suf = raw.slice(match.index + match[0].length);
  const target = parseFloat(match[0]);
  const duration = 600;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = raw;
    return;
  }
  el.textContent = pre + (0).toFixed(dec) + suf;
  let start: number | undefined;
  const tick = (now: number) => {
    if (start === undefined) start = now + delay * 1000;
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    el.textContent = pre + (target * outQuint(t)).toFixed(dec) + suf;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function StatsGrid({
  quote,
  by,
}: {
  quote: string;
  by: string;
}) {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          el.querySelectorAll<HTMLElement>(".stat-value").forEach((node, i) => {
            countUp(node, i * 0.08);
          });
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="stats-grid">
      {STATS.map((stat) => (
        <li
          key={stat.label}
          className="stat-card"
          style={{
            ["--h" as string]: stat.h,
            gridColumn: stat.col,
            gridRow: stat.row,
          }}
        >
          <span className="stat-card__bg" aria-hidden="true" />
          <div className="stat-card__content">
            <p className="text-h3 stat-value" data-value={stat.value}>
              {stat.value}
            </p>
            <p className="text-body" style={{ color: "var(--x-fg-secondary)" }}>
              {stat.label}
            </p>
          </div>
        </li>
      ))}
      <li
        className="stat-card stat-card--quote"
        style={{
          ["--h" as string]: "15.5rem",
          gridColumn: "5 / span 4",
          gridRow: "2",
        }}
      >
        <span className="stat-card__bg" aria-hidden="true" />
        <div className="stat-card__content">
          <blockquote className="text-nav">&ldquo;{quote}&rdquo;</blockquote>
          <footer className="text-nav">{by}</footer>
        </div>
      </li>
    </ul>
  );
}
