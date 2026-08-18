import type { ReactNode } from "react";
import { BenefitMini } from "./xads/minis";
import { HeroCanvas } from "./xads/hero-canvas";
import { MobileNav } from "./xads/mobile-nav";
import { Reveal } from "./xads/reveal";
import { StatsGrid } from "./xads/stats";
import { ThemeToggle } from "./xads/theme-toggle";
import { Wordmark } from "./xads/wordmark";

type Link = readonly [title: string, href: string];

const NAV = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Numbers", "#numbers"],
  ["Contact", "#contact"],
] as const;

export function PageShell({
  name,
  socials,
  children,
}: {
  name: string;
  socials: readonly Link[];
  children: ReactNode;
}) {
  return (
    <div className="xads" id="top">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <MobileNav name={name} socials={socials} />
      <div className="shell">
        <aside className="sidebar">
          <div className="sidebar__brand">
            <a href="#top" className="sidebar__logo text-nav">
              {name}
            </a>
            <nav className="sidebar__nav" aria-label="Sections">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} className="nav-link">
                  <span className="nav-wght text-nav">{label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="sidebar__foot">
            <ThemeToggle />
            <p className="text-caption" style={{ color: "var(--x-fg-secondary)" }}>
              press `t` to toggle
            </p>
          </div>
        </aside>
        <div className="main">
          <div className="scrim-top" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function Hero({
  title,
  subtitle,
  lede,
  primary,
  secondary,
}: {
  title: string;
  subtitle: string;
  lede: string;
  primary: Link;
  secondary: Link;
}) {
  return (
    <Reveal as="section" className="section" instant>
      <div className="grid-8">
        <h1
          className="text-display hero-heading"
          data-reveal-item=""
          style={{ whiteSpace: "pre-line" }}
        >
          {`${title}\n${subtitle}`}
        </h1>
        <div className="hero-copy" data-reveal-item="" style={{ ["--i" as string]: 1 }}>
          <p className="text-body" style={{ color: "var(--x-fg-secondary)" }}>
            {lede}
          </p>
          <div className="hero-ctas">
            <a className="x-btn x-btn--primary" href={primary[1]}>
              {primary[0]}
            </a>
            <a className="x-btn x-btn--secondary" href={secondary[1]}>
              {secondary[0]}
            </a>
          </div>
        </div>
      </div>
      <div data-reveal-item="" style={{ ["--i" as string]: 2 }}>
        <HeroCanvas />
      </div>
    </Reveal>
  );
}

export function AboutGrid({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  const placement = [
    { start: 3, row: 2 },
    { start: 5, row: 2 },
    { start: 7, row: 2 },
    { start: 1, row: 3 },
    { start: 3, row: 3 },
    { start: 5, row: 3 },
  ] as const;

  return (
    <Reveal as="section" className="section section-anchor" id="about">
      <div className="card-grid">
        <header className="card-grid__heading section-heading" data-reveal-item="">
          <h2 className="text-h3">About</h2>
          <p className="text-h3">Where I come from</p>
        </header>
        {items.map((item, i) => {
          const pos = placement[i] ?? placement[0];
          return (
            <article
              key={item.title}
              className="benefit-card card-grid__item"
              data-reveal-item=""
              style={{
                ["--i" as string]: i + 1,
                ["--card-col-start" as string]: pos.start,
                ["--card-row" as string]: pos.row,
              }}
            >
              <div>
                <h3 className="text-nav" style={{ color: "var(--x-fg-primary)" }}>
                  {item.title}
                </h3>
                <p
                  className="text-body"
                  style={{
                    color: "var(--x-fg-secondary)",
                    textWrap: "balance",
                    marginTop: "0.25rem",
                  }}
                >
                  {item.body}
                </p>
              </div>
              <BenefitMini index={i} />
            </article>
          );
        })}
      </div>
    </Reveal>
  );
}

export function Stats({ quote, by }: { quote: string; by: string }) {
  return (
    <Reveal as="section" className="section section-anchor" id="numbers">
      <div className="section__inner">
        <header className="section-heading" data-reveal-item="">
          <h2 className="text-h3">Numbers</h2>
          <p className="text-h3">A few that stuck</p>
        </header>
        <div data-reveal-item="" style={{ ["--i" as string]: 1 }}>
          <StatsGrid quote={quote} by={by} />
        </div>
      </div>
    </Reveal>
  );
}

export function Work({ children }: { children: ReactNode }) {
  return (
    <Reveal as="section" className="section section--ruled section-anchor" id="work">
      <div className="section__inner">
        <header className="section-heading" data-reveal-item="">
          <h2 className="text-h3">Work</h2>
          <p className="text-h3">What I have been building</p>
        </header>
        <div className="work-list" data-reveal-item="" style={{ ["--i" as string]: 1 }}>
          {children}
        </div>
      </div>
    </Reveal>
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
    <article className="work-row">
      <div className="work-row__head">
        <div className="work-row__meta">
          <header className="section-heading">
            <h3 className="text-h3">{company}</h3>
            {role ? <p className="text-h3">{role}</p> : null}
          </header>
          {period && (
            <span className="work-row__period text-caption">{period}</span>
          )}
        </div>
        {links.length > 0 && (
          <div className="work-row__links">
            {links.map(([title, href], i) => (
              <a
                key={href}
                className={i === 0 ? "x-btn x-btn--primary" : "x-btn x-btn--secondary"}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="work-row__body">{children}</div>
    </article>
  );
}

export function Footer({
  socials,
}: {
  socials: readonly Link[];
}) {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__row">
        <div className="site-footer__brand">
          <p className="text-nav">jxhn</p>
          <ThemeToggle />
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <div className="site-footer__col">
            <p className="text-nav" style={{ color: "var(--x-fg-primary)" }}>
              Sections
            </p>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="text-nav">
                {label}
              </a>
            ))}
          </div>
          <div className="site-footer__col">
            <p className="text-nav" style={{ color: "var(--x-fg-primary)" }}>
              Elsewhere
            </p>
            {socials.map(([title, href]) => (
              <a
                key={href}
                href={href}
                className="text-nav"
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {title}
              </a>
            ))}
          </div>
          <div className="site-footer__col">
            <p className="text-nav" style={{ color: "var(--x-fg-primary)" }}>
              Now
            </p>
            <span className="text-nav" style={{ color: "var(--x-fg-secondary)" }}>
              LayerZero
            </span>
            <span className="text-nav" style={{ color: "var(--x-fg-secondary)" }}>
              Sozu Haus
            </span>
            <span className="text-nav" style={{ color: "var(--x-fg-secondary)" }}>
              Canada
            </span>
          </div>
        </nav>
      </div>
      <p className="site-footer__legal text-caption">
        press `t` to toggle theme
      </p>
      <Wordmark />
    </footer>
  );
}

export function Main({ children }: { children: ReactNode }) {
  return (
    <article className="article" id="content">
      <div className="sections">{children}</div>
    </article>
  );
}
