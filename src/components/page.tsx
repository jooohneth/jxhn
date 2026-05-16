import type { ReactNode } from "react";

type Link = readonly [title: string, href: string];

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono font-medium lowercase">
      <div className="p-5 md:px-20 md:py-10 mx-auto min-h-screen w-full md:w-[80%] lg:w-[70%] xl:w-[50%] grid grid-rows-[auto_1fr] gap-8 items-start border-l border-r border-foreground/10 border-dotted">
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
        <h1 className="text-xl border-l-6 border-hyper pl-5">{name}</h1>
        <div className="flex items-center gap-4">
          {"["}
          {socials.map(([title, href], i) => (
            <span key={href}>
              <a
                className="text-foreground/60 hover:underline"
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
      | `t` to toggle theme | `r` to randomize my fav colors |
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
      <h1 className="font-bold uppercase">{"> me"}</h1>
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
  const meta = [role, period].filter(Boolean).join(", ");
  const title = meta ? `> ${company} - [ ${meta} ]` : `> ${company}`;
  return (
    <div className="flex flex-col gap-4 pb-8 border-b border-foreground/10 border-dotted">
      <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-4 gap-2 uppercase mb-4 md:mb-0">
        <h1 className="font-bold">{title}</h1>
        {links.length > 0 && (
          <div className="flex items-center gap-2">
            {"["}
            {links.map(([linkTitle, href], i) => (
              <span key={href}>
                <a
                  className="text-foreground/60 hover:underline"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkTitle}
                </a>
                {i < links.length - 1 && ", "}
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
