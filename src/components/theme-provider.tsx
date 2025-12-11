"use client";

import { useEffect } from "react";

// Add your favorite colors here
const FAVORITE_COLORS = [
  "#9896FF", // aave purple
  "#FFB400", // aave yellow
  "#008AFF", // aave blue
  "#FF3200", // aave red
  "#39D1F9", // aave teal
  "#95FCE4", // hyperliquid green
  "#00E414", // cashapp green
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme and color initialization is handled by inline script in layout.tsx
  // This component only handles keyboard shortcuts

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't toggle if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "t" || e.key === "T") {
        const isDark = document.documentElement.classList.contains("dark");

        if (isDark) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }
      }

      if (e.key === "r" || e.key === "R") {
        // Get current color to avoid picking the same one
        const currentColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--hyper")
          .trim();

        // Filter out current color and pick a random one
        const availableColors = FAVORITE_COLORS.filter(
          (color) => color.toLowerCase() !== currentColor.toLowerCase()
        );
        const randomColor =
          availableColors[Math.floor(Math.random() * availableColors.length)];

        document.documentElement.style.setProperty("--hyper", randomColor);
        localStorage.setItem("hyperColor", randomColor);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <>{children}</>;
}

