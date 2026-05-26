import { CALENDAR_LINK } from "@/lib/config";
import { BusinessCase } from "./components/BusinessCase";
import { FiveDaySprint } from "./components/FiveDaySprint";
import { Hero } from "./components/Hero";
import { HiddenCost } from "./components/HiddenCost";
import { HumanApproval } from "./components/HumanApproval";
import { LiveDemo } from "./components/LiveDemo";
import { OperatingModel } from "./components/OperatingModel";
import { Reframe } from "./components/Reframe";
import { TechnicalAppendix } from "./components/TechnicalAppendix";
import { VideoProof } from "./components/VideoProof";

export const metadata = {
  title: "AR Workflow Agent | QuantM",
  description:
    "QuantM installs a human-approved finance workflow that turns overdue invoices into approval-ready reminders, escalation records, and weekly cash-risk visibility.",
};

export default function Page() {
  return (
    <main
      id="main"
      className="min-h-screen bg-[var(--ar-paper)] [--ar-accent:#F4C430] [--ar-accent-strong:#DCA800] [--ar-border:#E4DFCF] [--ar-ink:#11100C] [--ar-muted:#716D63] [--ar-paper:#FBFAF4] [--ar-soft:#FFF6CC]"
    >
      <Hero />
      <HiddenCost />
      <Reframe />
      <VideoProof />
      <LiveDemo />
      <OperatingModel />
      <FiveDaySprint />
      <BusinessCase />
      <HumanApproval />
      <TechnicalAppendix />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 text-[var(--color-ink)]">
        <div className="border border-[var(--ar-ink)] bg-white p-8 shadow-[0_24px_70px_rgba(17,16,12,0.08)] md:p-10">
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Bring us your current invoice process.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-mid)]">
            We’ll turn it into a working, human-approved finance workflow in 5
            days.
          </p>
          <a
            href={CALENDAR_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center border border-[var(--ar-ink)] bg-[var(--ar-accent)] px-5 py-3 text-sm font-semibold text-[var(--ar-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--ar-ink)] hover:text-white"
          >
            Book a workflow audit
          </a>
          <a
            href="#video-proof"
            className="ml-4 mt-6 inline-flex min-h-[44px] items-center justify-center text-sm font-semibold text-[var(--color-mid)] transition-colors duration-[var(--transition-base)] hover:text-[var(--color-ink)]"
          >
            Or watch the 90-second demo
          </a>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ar-muted)]">
            No new dashboard. No forced platform migration. No automatic client
            emails without approval.
          </p>
        </div>
      </section>
    </main>
  );
}
