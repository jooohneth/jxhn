import Link from "next/link";
import { Hero } from "./_components/hero";
import { SceneMount } from "./_components/scene-mount";

const SPECS: Array<{ label: string; value: string }> = [
  { label: "height", value: "121 m" },
  { label: "diameter", value: "9 m" },
  { label: "thrust", value: "74.4 MN" },
  { label: "payload (leo)", value: "~150 t" },
  { label: "raptor engines", value: "33 + 6" },
];

export default function StarshipPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ambient color wash behind hero */}
      <div
        aria-hidden
        className="starship-wash pointer-events-none absolute -inset-x-40 -top-24 z-0 h-[560px]"
      />

      {/* nav */}
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="https://jxhn.xyz"
          className="text-sm font-medium tracking-tight text-white"
        >
          starship
          <span className="ml-2 text-[#7D8187]">/ jxhn</span>
        </Link>
        <nav className="flex items-center gap-5 text-xs text-[#AEB3BC]">
          <a
            href="https://x.com/SpaceX"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            spacex
          </a>
          <a
            href="https://jxhn.xyz"
            className="transition-colors hover:text-white"
          >
            jxhn.xyz ↗
          </a>
        </nav>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <Hero />

        <div className="relative h-[480px] w-full md:h-[620px] lg:h-[720px]">
          <SceneMount />
          {/* faint bottom glow under model */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,99,8,0.18),transparent_60%)]"
          />
        </div>
      </section>

      {/* spec strip */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-white/[0.06] px-6 py-8 md:px-10">
        <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-5 md:gap-x-6">
          {SPECS.map((s) => (
            <li key={s.label} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#7D8187]">
                {s.label}
              </span>
              <span className="text-xl font-medium text-white md:text-2xl">
                {s.value}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* footer */}
      <footer className="relative z-10 mx-auto mt-16 max-w-6xl border-t border-white/[0.06] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-3 text-xs text-[#7D8187] md:flex-row md:items-center md:justify-between">
          <p>
            a tribute build by{" "}
            <a
              href="https://jxhn.xyz"
              className="text-[#AEB3BC] underline-offset-4 hover:text-white hover:underline"
            >
              jxhn
            </a>
            . not affiliated with spacex.
          </p>
          <p>
            starship™ and spacex™ are trademarks of space exploration
            technologies corp.
          </p>
        </div>
      </footer>
    </div>
  );
}
