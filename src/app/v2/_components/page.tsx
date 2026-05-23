import type { ReactNode } from "react";
import { HeroCycler } from "./hero-cycler";
import { FrostedNav } from "./frosted-nav";

type Link = readonly [title: string, href: string];

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="font-medium lowercase">
      <FrostedNav />
      <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-24 lg:px-6">
        {children}
      </div>
    </div>
  );
}

export function Header({
  name,
  socials,
}: {
  name: string;
  socials: readonly Link[];
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="https://jxhn.xyz"
          className="font-display text-sm font-medium tracking-tight text-foreground transition-colors duration-150 hover:text-foreground/80"
        >
          {name}
        </a>
        <nav className="flex items-center gap-1">
          {socials.map(([title, href]) => (
            <a
              key={href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/50 transition-colors duration-150 hover:text-foreground"
              href={href}
              {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const HERO_ROLES = [
  "forward deployed engineering",
  "agents, harnesses and training",
  "product engineering",
  "developer relations",
  "design engineering",
  "community building",
  "supporting founders",
] as const;

export function Hero({
  prefix = "i specialize in",
  words = HERO_ROLES,
}: {
  prefix?: string;
  words?: readonly string[];
}) {
  return (
    <section className="overflow-x-hidden pt-32 sm:pt-40 lg:pt-48">
      <h1 className="font-display text-2xl font-medium leading-[1.05] tracking-[-0.025em] sm:text-4xl lg:text-6xl lg:leading-none">
        {prefix}
        <br />
        <HeroCycler words={words} />
      </h1>
    </section>
  );
}

export function ThemeHint() {
  return (
    <p className="hidden pt-8 text-center font-mono text-[11px] text-foreground/30 md:block">
      press `t` to toggle theme · <a href="https://jxhn.xyz" className="hover:text-foreground">jxhn.xyz ↗</a>
    </p>
  );
}

export function Quote({
  text,
  by,
}: {
  text: string;
  by: string;
}) {
  return (
    <blockquote className="py-8 text-center">
      <p className="font-display text-sm italic leading-relaxed text-foreground/50">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-3 font-mono text-[11px] text-foreground/35 not-italic">
        — {by}
      </footer>
    </blockquote>
  );
}

export function Main({ children }: { children: ReactNode }) {
  return (
    <main className="mt-16 w-full space-y-8 overflow-hidden sm:mt-24">
      {children}
    </main>
  );
}

function ContentCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-foreground/6 bg-card p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function About({ children }: { children: ReactNode }) {
  return (
    <ContentCard>
      <h2 className="mb-6 font-display text-2xl font-medium leading-8 tracking-[-0.025em]">
        about
      </h2>
      {children}
    </ContentCard>
  );
}

export function Section({
  company,
  role,
  period,
  links = [],
  children,
}: {
  company: string;
  role?: string;
  period?: string;
  links?: readonly Link[];
  children: ReactNode;
}) {
  return (
    <ContentCard>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-medium leading-8 tracking-[-0.025em]">
            {company}
            {role && (
              <span className="text-foreground/60">{` · ${role}`}</span>
            )}
          </h2>
          {period && (
            <span className="font-mono text-xs text-foreground/40">{period}</span>
          )}
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {links.map(([linkTitle, href]) => (
              <a
                key={href}
                className="inline-flex h-8 items-center rounded-pill px-4 text-sm font-medium text-foreground shadow-[0_0_0_1px_rgba(10,10,10,0.15)] transition-colors duration-150 hover:bg-foreground/[0.03] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] dark:hover:bg-foreground/[0.06]"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkTitle}
              </a>
            ))}
          </div>
        )}
      </div>
      {children}
    </ContentCard>
  );
}
