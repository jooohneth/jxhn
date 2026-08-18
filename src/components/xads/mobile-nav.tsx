"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

type Link = readonly [title: string, href: string];

const NAV = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Numbers", "#numbers"],
  ["Contact", "#contact"],
] as const;

export function MobileNav({
  name,
  socials,
}: {
  name: string;
  socials: readonly Link[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="mobile-header">
        <a href="#top" className="mobile-header__logo text-nav">
          {name}
        </a>
        <button
          type="button"
          className="mobile-header__menu"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="3.5" width="14" height="1.2" />
            <rect x="1" y="7.4" width="14" height="1.2" />
            <rect x="1" y="11.3" width="14" height="1.2" />
          </svg>
        </button>
      </header>
      <div
        className="nav-sheet"
        data-open={open ? "" : undefined}
        inert={!open}
        role="dialog"
        aria-label="Menu"
      >
        <div className="nav-sheet__bar">
          <a href="#top" className="text-nav" onClick={() => setOpen(false)}>
            {name}
          </a>
          <button
            type="button"
            className="mobile-header__menu"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect
                x="2"
                y="7.4"
                width="12"
                height="1.2"
                transform="rotate(45 8 8)"
              />
              <rect
                x="2"
                y="7.4"
                width="12"
                height="1.2"
                transform="rotate(-45 8 8)"
              />
            </svg>
          </button>
        </div>
        <nav className="nav-sheet__list">
          {NAV.map(([label, href], i) => (
            <div
              key={href}
              className="nav-sheet__item"
              style={{ ["--i" as string]: i }}
            >
              <a
                href={href}
                className="text-h3"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </div>
          ))}
        </nav>
        <div
          className="nav-sheet__ctas"
          style={{ ["--i" as string]: NAV.length }}
        >
          {socials.map(([title, href]) => (
            <a key={href} className="x-btn x-btn--secondary" href={href}>
              {title}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
