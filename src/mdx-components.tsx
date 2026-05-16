import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline-offset-[3px] hover:underline"
        {...props}
      >
        {children}
      </a>
    ),
    p: (props) => <p className="text-muted" {...props} />,
    ul: (props) => (
      <ul
        className="md-list flex flex-col gap-1 list-none p-0 text-muted"
        {...props}
      />
    ),
    li: (props) => <li className="md-li" {...props} />,
    ...components,
  };
}
