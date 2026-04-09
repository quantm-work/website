import { useId } from "react";

const HEADLINE = "We build the future of finance";

export function Hero() {
  const id = useId();
  const words = HEADLINE.split(" ");

  return (
    <section
      aria-label="Hero"
      className="min-h-screen flex items-center justify-center relative px-8"
    >
      <h1
        className="font-display text-center max-w-7xl mx-auto hero-heading"
        style={{
          fontSize: "var(--font-display-size)",
          letterSpacing: "0.02em",
          lineHeight: 0.95,
          color: "var(--color-ink)",
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${id}-${word}-${i}`}
            className="hero-word inline-block mr-[0.3em] last:mr-0"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {word}
          </span>
        ))}
      </h1>
    </section>
  );
}
