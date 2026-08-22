"use client";

import { useEffect } from "react";
import { applyMode, cycleTheme } from "./xads/theme-toggle";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (localStorage.getItem("theme") === "system") applyMode("system");
    };
    mq.addEventListener("change", onSystem);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "t" || e.key === "T") {
        cycleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      mq.removeEventListener("change", onSystem);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
