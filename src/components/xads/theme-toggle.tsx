"use client";

import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

function readMode(): Mode {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "dark";
}

export function applyMode(mode: Mode) {
  const useDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", useDark);
  document.documentElement.dataset.theme = useDark ? "dark" : "light";
  localStorage.setItem("theme", mode);
  window.dispatchEvent(new Event("jxhn-theme"));
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2.5A1.5 1.5 0 0 1 3.5 1h9A1.5 1.5 0 0 1 14 2.5v7A1.5 1.5 0 0 1 12.5 11h-9A1.5 1.5 0 0 1 2 9.5v-7ZM3.5 2a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-9ZM1 13.25A.75.75 0 0 1 1.75 12.5h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 13.25Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 11.25A3.25 3.25 0 1 0 8 4.75a3.25 3.25 0 0 0 0 6.5ZM8 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 1.25Zm0 11a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 12.25ZM14.75 8a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM3 8a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1A.75.75 0 0 1 3 8Zm9.42-4.42a.75.75 0 0 1 0 1.06l-.71.71a.75.75 0 1 1-1.06-1.06l.71-.71a.75.75 0 0 1 1.06 0ZM4.29 11.65a.75.75 0 0 1 0 1.06l-.71.71a.75.75 0 1 1-1.06-1.06l.71-.71a.75.75 0 0 1 1.06 0Zm8.42 1.77a.75.75 0 0 1-1.06 0l-.71-.71a.75.75 0 0 1 1.06-1.06l.71.71a.75.75 0 0 1 0 1.06ZM5.35 4.29a.75.75 0 0 1-1.06 0l-.71-.71A.75.75 0 0 1 4.64 2.52l.71.71a.75.75 0 0 1 0 1.06Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M7.07 2.03a.75.75 0 0 1 .2 1.04 5.25 5.25 0 1 0 5.66 5.66.75.75 0 0 1 1.37.6 6.75 6.75 0 1 1-7.27-7.27.75.75 0 0 1 .04-.03Z" />
    </svg>
  );
}

const OPTIONS: { mode: Mode; label: string; icon: typeof SunIcon }[] = [
  { mode: "system", label: "System theme", icon: MonitorIcon },
  { mode: "light", label: "Light theme", icon: SunIcon },
  { mode: "dark", label: "Dark theme", icon: MoonIcon },
];

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const sync = () => setMode(readMode());
    sync();
    window.addEventListener("jxhn-theme", sync);
    return () => window.removeEventListener("jxhn-theme", sync);
  }, []);

  return (
    <fieldset className="theme-toggle" aria-label="Color theme">
      {OPTIONS.map(({ mode: value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          className="theme-toggle__btn"
          aria-label={label}
          aria-pressed={mode === value}
          onClick={() => {
            applyMode(value);
            setMode(value);
          }}
        >
          <Icon />
        </button>
      ))}
    </fieldset>
  );
}

export function cycleTheme() {
  applyMode(readMode() === "dark" ? "light" : "dark");
}
