import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-hyper hover:underline"
        {...props}
      >
        {children}
      </a>
    ),
    p: (props) => <p className="text-foreground/60" {...props} />,
    ul: (props) => (
      <ul
        className="md-list flex flex-col gap-1 list-none p-0 text-foreground/60"
        {...props}
      />
    ),
    li: (props) => <li className="md-li" {...props} />,
    ...components,
  };
}
