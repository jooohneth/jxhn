"use client";

import Tldr from "@/components/tldr";
import Work from "@/components/work";

const Home = () => {
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
        </header>

        <main className="mt-10 w-full overflow-hidden text-sm space-y-16">
          <Tldr />
          <Work />
        </main>
      </div>
    </div>
  );
};

export default Home;
