import dynamic from "next/dynamic";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { GrainOverlay } from "@/components/ui/grain-overlay";

const LogoRow = dynamic(() =>
  import("@/components/sections/logo-row").then((m) => m.LogoRow),
);

const WhyNow = dynamic(() =>
  import("@/components/sections/why-now").then((m) => m.WhyNow),
);

const ParallaxStack = dynamic(() =>
  import("@/components/sections/parallax-stack").then((m) => m.ParallaxStack),
);

const MoneyThatRunsItself = dynamic(() =>
  import("@/components/sections/money-that-runs-itself").then(
    (m) => m.MoneyThatRunsItself,
  ),
);

const ComplianceAtMachineSpeed = dynamic(() =>
  import("@/components/sections/compliance-at-machine-speed").then(
    (m) => m.ComplianceAtMachineSpeed,
  ),
);

const EveryManagerChiefOfStaff = dynamic(() =>
  import("@/components/sections/every-manager-chief-of-staff").then(
    (m) => m.EveryManagerChiefOfStaff,
  ),
);

const CTASection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CTASection),
);

const TeamBios = dynamic(() =>
  import("@/components/sections/team-bios").then((m) => m.TeamBios),
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
        <WhyNow />
        <MoneyThatRunsItself />
        <ComplianceAtMachineSpeed />
        <EveryManagerChiefOfStaff />
        <TeamBios />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
