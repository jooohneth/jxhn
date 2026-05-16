import type { ReactNode } from "react";

type Link = readonly [title: string, href: string];

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono font-medium lowercase">
      <div className="p-5 md:px-20 md:py-10 mx-auto min-h-screen w-full md:w-[85%] lg:w-[75%] xl:w-[60%] grid grid-rows-[auto_1fr] gap-8 items-start">
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
    <header className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-0 gap-3 border-b border-foreground/10 border-dotted pb-5">
        <h1 className="text-xl border-l-[6px] border-accent pl-5 tracking-tight">{name}</h1>
        <div className="flex items-center gap-4">
          {"["}
          {socials.map(([title, href], i) => (
            <span key={href}>
              <a
                className="text-muted hover:underline"
                href={href}
              >
                {title}
              </a>
              {i < socials.length - 1 && ", "}
            </span>
          ))}
          {"]"}
        </div>
      </div>
    </header>
  );
}

export function ThemeHint() {
  return (
    <span className="hidden md:block text-center text-foreground/30 text-xs">
      | `t` to toggle theme |
    </span>
  );
}

export function Main({ children }: { children: ReactNode }) {
  return (
    <main className="w-full overflow-hidden text-sm space-y-16">
      {children}
    </main>
  );
}

export function About({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 py-8 border-b border-foreground/10 border-dotted">
      <h1 className="text-[17px] font-semibold uppercase tracking-tight">{"> me"}</h1>
      {children}
    </div>
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
    <div className="flex flex-col gap-4 pb-8 border-b border-foreground/10 border-dotted">
      <div className="flex flex-col md:flex-row md:items-start md:flex-wrap justify-between md:gap-4 gap-2 uppercase mb-4 md:mb-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-[17px] font-semibold tracking-tight">
            {`> ${company}`}
            {role && (
              <span className="whitespace-nowrap">{` - ${role}`}</span>
            )}
          </h1>
          {period && (
            <span className="text-foreground/40 text-xs tracking-tight">
              {period}
            </span>
          )}
        </div>
        {links.length > 0 && (
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            {"["}
            {links.map(([linkTitle, href], i) => (
              <span key={href} className="whitespace-nowrap">
                <a
                  className="text-muted hover:underline"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkTitle}
                </a>
                {i < links.length - 1 && ","}
              </span>
            ))}
            {"]"}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
