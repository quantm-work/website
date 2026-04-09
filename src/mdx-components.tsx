import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="font-display text-4xl mb-8"
        style={{ color: "var(--color-ink)" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-display text-2xl mt-10 mb-4"
        style={{ color: "var(--color-ink)" }}
      >
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed" style={{ color: "var(--color-ink)" }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className="mb-4 ml-6 list-disc leading-relaxed"
        style={{ color: "var(--color-ink)" }}
      >
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="underline"
        style={{ color: "var(--color-ink)" }}
      >
        {children}
      </a>
    ),
    ...components,
  };
}
