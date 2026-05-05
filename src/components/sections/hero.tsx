import dynamic from "next/dynamic";
import { useId } from "react";

const PixelBlast = dynamic(() =>
  import("@/components/ui/pixel-blast").then((m) => m.PixelBlast),
);

const HEADLINE = "We build the future of finance";

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
        className="font-display text-center text-balance max-w-7xl mx-auto hero-heading relative"
        style={{
          fontSize: "var(--font-display-size)",
          fontWeight: 500,
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
