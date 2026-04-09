import dynamic from "next/dynamic";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { GrainOverlay } from "@/components/ui/grain-overlay";

const LogoRow = dynamic(() =>
  import("@/components/sections/logo-row").then((m) => m.LogoRow),
);

const ParallaxStack = dynamic(() =>
  import("@/components/sections/parallax-stack").then((m) => m.ParallaxStack),
);

const CTASection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CTASection),
);

const CustomCursor = dynamic(() =>
  import("@/components/ui/custom-cursor").then((m) => m.CustomCursor),
);

const ScrollProgress = dynamic(() =>
  import("@/components/ui/scroll-progress").then((m) => m.ScrollProgress),
);

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <GrainOverlay />
      <Header />
      <main id="main">
        <Hero />
        <LogoRow />
        <ParallaxStack />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
