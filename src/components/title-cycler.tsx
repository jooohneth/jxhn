"use client";

import { useEffect, useState } from "react";

const THINGS = [
  "devrel",
  "smart contract integrations",
  "forward deployed engineering",
  "product engineering",
  "frontend engineering",
  "community building",
  "supporting builders",
  "shipping in public",
];

export function TitleCycler() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIdx((i) => (i + 1) % THINGS.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(swap);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-sm text-muted">
      {"i do "}
      <span
        className="text-accent transition-opacity duration-[250ms]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {THINGS[idx]}
      </span>
    </p>
  );
}
