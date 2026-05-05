import dynamic from "next/dynamic";
import { useId } from "react";

const PixelBlast = dynamic(() =>
  import("@/components/ui/pixel-blast").then((m) => m.PixelBlast),
);

const HEADLINE =
  "AI workflow automation, internal tools, and real-time data systems for growing companies";

export function Hero() {
  const id = useId();
  const words = HEADLINE.split(" ");

  return (
    <section
      aria-label="Hero"
      className="min-h-[80svh] md:min-h-screen -mt-16 flex items-center justify-center relative px-4 sm:px-8 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.18,
          filter: "grayscale(1) contrast(1.1)",
        }}
      >
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#0a0a0a"
          patternScale={3}
          patternDensity={1.1}
          pixelSizeJitter={0.4}
          enableRipples={false}
          liquid={false}
          speed={0.35}
          edgeFade={0.4}
          transparent
        />
      </div>
      <h1
        className="font-display text-center text-balance max-w-5xl mx-auto hero-heading relative tracking-tight"
        style={{
          fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)",
          fontWeight: 500,
          lineHeight: 1.1,
          color: "var(--color-ink)",
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${id}-${word}-${i}`}
            className="hero-word inline-block mr-[0.2em] last:mr-0"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {word}
          </span>
        ))}
      </h1>
    </section>
  );
}
