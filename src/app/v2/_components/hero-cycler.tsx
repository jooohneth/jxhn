"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEFAULT_WORDS = ["developer relations"];

export function HeroCycler({ words = DEFAULT_WORDS }: { words?: readonly string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 3500);
    return () => clearInterval(id);
  }, [words]);

  const word = words[idx];

  return (
    <span className="relative inline-block align-bottom pb-1.5 text-accent">
      <span
        className="inline-flex whitespace-nowrap"
        style={{ clipPath: "inset(-6px 0 -2px 0)" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {word.split("").map((char, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      <span
        aria-hidden
        className="hero-cycler-underline absolute inset-x-0 bottom-0 h-[3px] rounded-pill"
      />
    </span>
  );
}
