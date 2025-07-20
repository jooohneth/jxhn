"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import Tldr from "@/components/tldr";
import Work from "@/components/work";

const Home = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { id: 1, label: "tl;dr" },
    { id: 2, label: "work" },
  ];

  const handleSectionChange = (newSection: number) => {
    setActiveSection(newSection);
  };

  useEffect(() => {
    if (navRef.current) {
      const activeElement = navRef.current.children[
        activeSection
      ] as HTMLElement;
      if (activeElement) {
        const navRect = navRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setUnderlineStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="font-mono font-medium lowercase">
      <div className="p-5 md:px-20 md:py-10 mx-auto min-h-screen w-full md:w-[80%] lg:w-[70%] xl:w-[50%] grid grid-rows-[auto_1fr] gap-8 items-start border-l border-r border-white/10 border-dotted">
        <header className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-0 gap-3 border-b border-white/10 border-dotted pb-5">
            <h1 className="text-xl border-l-6 border-hyper pl-5">
              jxhn / john / thai{" "}
            </h1>
            <div className="flex items-center gap-4">
              {"["}
              <a
                className="text-white/50 hover:text-white"
                href="https://x.com/0xjooohn"
              >
                x
              </a>
              {", "}
              <a
                className="text-white/50 hover:text-white"
                href="https://github.com/jooohneth"
              >
                gh
              </a>
              {", "}
              <a
                className="text-white/50 hover:text-white"
                href="https://www.linkedin.com/in/jooohneth/"
              >
                li
              </a>
              {"]"}
            </div>
          </div>

          <nav className="relative flex gap-8 justify-center" ref={navRef}>
            <motion.div
              className="absolute bottom-0 h-[1px] bg-current"
              animate={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}
            />

            {navItems.map((item) => (
              <div
                key={item.id}
                className={`text-sm cursor-pointer transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
                onClick={() => handleSectionChange(item.id)}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </header>

        <main className="mt-10 w-full overflow-hidden text-sm">
          {activeSection === 1 && <Tldr />}
          {activeSection === 2 && <Work />}
        </main>
      </div>
    </div>
  );
};

export default Home;
