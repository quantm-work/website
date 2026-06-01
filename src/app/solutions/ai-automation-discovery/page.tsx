import type { Metadata } from "next";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CALENDAR_LINK } from "@/lib/config";

export const metadata: Metadata = {
  title: "AI & Automation Discovery | QuantM",
  description:
    "QuantM helps companies identify repetitive workflows, manual processes, and operational bottlenecks that can be automated with AI, agents, and practical internal systems.",
  alternates: {
    canonical: "https://quantm.work/solutions/ai-automation-discovery",
  },
  openGraph: {
    title: "AI & Automation Discovery | QuantM",
    description:
      "QuantM helps companies identify repetitive workflows, manual processes, and operational bottlenecks that can be automated with AI, agents, and practical internal systems.",
    url: "https://quantm.work/solutions/ai-automation-discovery",
    siteName: "QuantM",
    type: "website",
  },
};

const discoveryExamples = [
  "Emails",
  "Spreadsheets",
  "Invoices",
  "CRM",
  "Reports",
  "Calendar",
  "WhatsApp / Slack",
  "Approvals",
  "Documents",
];

const workflowSignals = [
  {
    title: "Repeated admin work",
    copy: "Tasks copied, pasted, checked, or repeated every week.",
  },
  {
    title: "Missed follow-ups",
    copy: "Sales, invoices, customer requests, approvals, or internal tasks that depend on someone remembering.",
  },
  {
    title: "Spreadsheet operations",
    copy: "Processes managed through Google Sheets or Excel that should behave more like a system.",
  },
  {
    title: "Email-heavy workflows",
    copy: "Inbox-based work where messages trigger manual updates, reminders, reports, or decisions.",
  },
  {
    title: "Reporting bottlenecks",
    copy: "Weekly or monthly reports that take hours to prepare from scattered sources.",
  },
  {
    title: "Document review",
    copy: "PDFs, contracts, forms, invoices, applications, or internal docs that need extraction, summarization, or routing.",
  },
  {
    title: "Sales and pipeline tracking",
    copy: "Lead follow-up, account research, CRM hygiene, proposal tracking, and qualification workflows.",
  },
  {
    title: "Finance and operations",
    copy: "Invoice chasing, reconciliation, vendor checks, approvals, payment status, and operational dashboards.",
  },
];

const clientGets = [
  "A map of the workflow or process we reviewed",
  "A list of automation opportunities",
  "A priority recommendation: what to automate first",
  "A rough estimate of time or cost savings",
  "A clear view of what can be done with existing tools versus custom build",
  "A fixed-scope proposal if there is a strong fit",
];

const outcomes = [
  {
    title: "Invoice follow-up agent",
    copy: "Tracks unpaid invoices, drafts reminders, updates a log, and flags overdue accounts.",
  },
  {
    title: "Sales follow-up system",
    copy: "Researches accounts, drafts outreach, tracks replies, and reminds the team when a lead needs attention.",
  },
  {
    title: "Weekly reporting workflow",
    copy: "Pulls updates from tools and documents, summarizes progress, and prepares a manager-ready report.",
  },
  {
    title: "Document intake assistant",
    copy: "Reads forms, PDFs, or email attachments, extracts key data, and routes the next action.",
  },
  {
    title: "Operations dashboard",
    copy: "Turns scattered spreadsheet work into a simple internal system with status, alerts, and ownership.",
  },
  {
    title: "Executive assistant workflow",
    copy: "Prepares meeting notes, follow-ups, calendar context, and weekly priorities from existing tools.",
  },
];

const processSteps = [
  {
    title: "We listen",
    copy: "You walk us through the workflow, tools, people, and pain points.",
  },
  {
    title: "We map",
    copy: "We identify repeated steps, handoffs, delays, and manual decisions.",
  },
  {
    title: "We prioritize",
    copy: "We separate useful automation opportunities from things that are not worth building.",
  },
  {
    title: "We propose",
    copy: "You receive a practical recommendation and, if relevant, a fixed-scope build proposal.",
  },
];

const relatedServices = [
  {
    title: "Agentic Workflow Systems",
    copy: "Production workflows that draft, route, update, and escalate work across existing tools.",
  },
  {
    title: "Forward-Deployed Engineering",
    copy: "Embedded QuantM builders shipping production systems with your team.",
  },
  {
    title: "USDC & Stablecoin Systems",
    copy: "Programmable money movement, treasury operations, and payment infrastructure.",
  },
  {
    title: "Financial Platform Modernization",
    copy: "Internal tools, data systems, and modern finance platforms built for daily use.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-mid)]">
      {children}
    </p>
  );
}

function SectionShell({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-6 py-16 text-[var(--color-ink)] sm:px-8 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

function DiscoveryPipeline() {
  const steps = ["Listen", "Map", "Prioritize", "Automate"];

  return (
    <div className="border border-[var(--color-ink)] bg-white p-5 shadow-[12px_12px_0_var(--color-ink)] md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[var(--color-subtle)] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-mid)]">
            Workflow discovery
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-mid)]">
            From messy operational work to a ranked automation backlog.
          </p>
        </div>
        <span className="border border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)]">
          First step
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {steps.map((step, index) => (
          <div key={step} className="contents">
            <div className="min-h-36 border border-[var(--color-subtle)] bg-[var(--color-paper)] p-4">
              <span className="inline-flex h-7 w-7 items-center justify-center border border-[var(--color-ink)] bg-white text-xs font-semibold">
                {index + 1}
              </span>
              <h2 className="mt-5 text-lg font-semibold leading-tight">
                {step}
              </h2>
              <div className="mt-4 space-y-2">
                <span className="block h-2 w-11/12 bg-[var(--color-ink)]" />
                <span className="block h-2 w-3/4 bg-[var(--color-subtle)]" />
                <span className="block h-2 w-5/6 bg-[var(--color-subtle)]" />
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center">
                <span className="h-px w-full bg-[var(--color-ink)] sm:w-8" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {discoveryExamples.map((example) => (
          <span
            key={example}
            className="border border-[var(--color-subtle)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-ink)]"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border border-[var(--color-subtle)] bg-white p-5 transition-colors duration-[var(--transition-base)] hover:border-[var(--color-ink)]">
      <h3 className="text-base font-semibold leading-tight text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-mid)]">
        {children}
      </p>
    </article>
  );
}

export default function AiAutomationDiscoveryPage() {
  return (
    <>
      <GrainOverlay />
      <Header />
      <main id="main">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-20 text-[var(--color-ink)] sm:px-8 md:pb-24 md:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>AI Automation</SectionLabel>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] md:text-7xl">
              AI & Automation Discovery
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-ink)] md:text-xl md:leading-9">
              A practical discovery call to uncover where your company is losing
              time, repeating manual work, or missing follow-ups - and what
              should be automated first.
            </p>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-[var(--color-mid)]">
              <p>
                Most companies do not need "more AI." They need to know where
                work is being repeated, delayed, copied between tools,
                forgotten, or handled manually when it should not be.
              </p>
              <p>
                QuantM listens to how your team works today, maps the messy
                workflows, and proposes practical automations that can save
                time, reduce errors, and improve operations.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center border border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
              >
                Book a Discovery Call
              </a>
              <a
                href="#what-we-look-for"
                className="inline-flex min-h-[44px] items-center justify-center border border-[var(--color-ink)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
              >
                See what we look for
              </a>
            </div>
          </div>

          <DiscoveryPipeline />
        </section>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <SectionLabel>What this is</SectionLabel>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                Not a generic AI consultation.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-[var(--color-mid)]">
              <p>
                AI & Automation Discovery is a structured conversation where we
                learn how your business actually runs: the tools, handoffs,
                bottlenecks, repeated tasks, follow-ups, spreadsheets, emails,
                documents, and approvals that keep the company moving.
              </p>
              <p>Then we identify which parts are worth automating first.</p>
              <p>
                This is useful when a company knows work is too manual, but does
                not yet know what to automate, how hard it would be, or whether
                AI is even the right tool.
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="what-we-look-for"
          className="border-t border-[var(--color-subtle)]"
        >
          <SectionLabel>What we look for</SectionLabel>
          <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            We look for the workflows everyone complains about.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSignals.map((item) => (
              <Card key={item.title} title={item.title}>
                {item.copy}
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionLabel>What the client gets</SectionLabel>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                What you get from the discovery call
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {clientGets.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--color-subtle)] bg-white p-4 text-sm font-semibold leading-6 text-[var(--color-ink)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionShell>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <div className="max-w-4xl">
            <SectionLabel>Who it is for</SectionLabel>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Best for teams that run on too much manual coordination.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-mid)]">
              This service is designed for founders, small businesses,
              operations teams, sales teams, finance/admin teams, distributors,
              real estate companies, agencies, and growing companies that rely
              on email, spreadsheets, documents, calendars, CRMs, Slack,
              WhatsApp, or manual reporting.
            </p>
            <p className="mt-6 border border-[var(--color-ink)] bg-white p-5 text-sm font-semibold leading-6 text-[var(--color-ink)]">
              You do not need to know what AI agent, automation platform, or
              technical architecture you need. The point of the call is to
              discover that.
            </p>
          </div>
        </SectionShell>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <SectionLabel>Example outcomes</SectionLabel>
          <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            Examples of what we might recommend
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item) => (
              <Card key={item.title} title={item.title}>
                {item.copy}
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            How the discovery works
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {processSteps.map((item, index) => (
              <article
                key={item.title}
                className="border border-[var(--color-ink)] bg-white p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-mid)]">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-mid)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="border-t border-[var(--color-subtle)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>Where this fits</SectionLabel>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                AI & Automation Discovery is the first step.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[var(--color-mid)]">
                <p>
                  If the opportunity is simple, we can build an agentic workflow
                  or automation sprint.
                </p>
                <p>
                  If the problem is deeper, it may become a Forward-Deployed
                  Engineering engagement.
                </p>
                <p>
                  If the company operates in finance, payments, stablecoins, or
                  data-heavy systems, we can also help design the infrastructure
                  behind it.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedServices.map((item) => (
                <article
                  key={item.title}
                  className="border border-[var(--color-subtle)] bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-mid)]">
                    Related service
                  </p>
                  <h3 className="mt-4 text-base font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-mid)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>

        <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 md:py-24">
          <div className="border border-[var(--color-ink)] bg-white p-8 text-center shadow-[12px_12px_0_var(--color-ink)] md:p-12">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight text-[var(--color-ink)] md:text-5xl">
              Bring us the workflow everyone complains about.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-mid)]">
              We will help you understand whether it can be automated, what it
              would save, and what should be built first.
            </p>
            <a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[44px] items-center justify-center border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-[var(--color-paper)] transition-colors duration-[var(--transition-base)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
            >
              Book an AI & Automation Discovery Call
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
