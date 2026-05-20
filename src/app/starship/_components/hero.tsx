"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function Hero() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative z-10 flex flex-col items-start gap-7"
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#AEB3BC] backdrop-blur"
      >
        <span className="starship-dot inline-block h-1.5 w-1.5 rounded-full bg-[#FF6308]" />
        flight test campaign
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-balance text-5xl font-normal leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]"
      >
        <span className="bg-gradient-to-r from-[#7D8187] to-white bg-clip-text text-transparent">
          starship.
        </span>
        <br />
        <span className="bg-gradient-to-l from-[#7D8187] to-white bg-clip-text text-transparent">
          super heavy.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-md text-balance text-base leading-relaxed text-[#AEB3BC] md:text-lg"
      >
        the most powerful launch vehicle ever flown. fully reusable, fully
        stacked, 121 meters of stainless steel — built to make life
        multiplanetary.
      </motion.p>

      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <a
          href="https://www.spacex.com/vehicles/starship/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center"
        >
          <span className="starship-beam absolute inset-0 rounded-full p-px" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm text-white ring-1 ring-white/15 transition-colors hover:bg-[#141416]">
            learn more
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <a
          href="https://www.spacex.com/launches/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2.5 text-sm text-[#AEB3BC] transition-colors hover:text-white"
        >
          watch launches →
        </a>
      </motion.div>
    </motion.div>
  );
}
