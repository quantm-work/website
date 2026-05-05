/**
 * Channel data for the multi-channel chief-of-staff console.
 *
 * Each channel describes a workstream the manager has delegated to their
 * AI chief of staff. The rail shows all channels; the active channel
 * pane renders an interleaved thread of messages and artifact cards.
 *
 * Keep this file deterministic and pure — the frame loop derives all
 * motion from a tick counter against this static dataset.
 */

export type Speaker = "COS" | "Manager" | "Tool";

export type ToolName =
  | "calendar"
  | "linear"
  | "notion"
  | "gmail"
  | "slack"
  | "drive"
  | "github";

export type MessageItem = {
  kind: "message";
  speaker: Speaker;
  /** Tool sub-label when speaker === "Tool". */
  tool?: ToolName;
  text: string;
};

export type DocArtifact = {
  kind: "doc";
  title: string;
  excerpt: string;
  status: string;
};

export type TaskArtifact = {
  kind: "task";
  label: string;
  due: string;
  /** running tasks animate with a pulsing dot. */
  state: "scheduled" | "running" | "done";
};

export type TableArtifact = {
  kind: "table";
  title: string;
  columns: readonly string[];
  rows: ReadonlyArray<readonly string[]>;
};

export type DecisionArtifact = {
  kind: "decision";
  summary: string;
};

export type Artifact =
  | DocArtifact
  | TaskArtifact
  | TableArtifact
  | DecisionArtifact;

export type ThreadItem = MessageItem | Artifact;

export type Channel = {
  id: string;
  name: string;
  /** Static last-activity seed — frame loop offsets it to feel alive. */
  lastActivitySec: number;
  hasRunningTask: boolean;
  /**
   * Static thread of messages + artifacts. The pane renders the latest
   * window of N items; as the frame loop ticks, the window slides forward,
   * which gives the "tool calls keep landing" feel.
   */
  thread: readonly ThreadItem[];
  /**
   * Tool calls appended to the thread on micro-ticks while this channel
   * is active. Cycled through deterministically.
   */
  appendCalls: readonly MessageItem[];
};

export const CHANNELS: readonly Channel[] = [
  {
    id: "prep-1on1s",
    name: "prep-1on1s",
    lastActivitySec: 14,
    hasRunningTask: false,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Pulled prep packets for tomorrow's three 1:1s. Each one front-loads the unfinished thread from last week.",
      },
      {
        kind: "doc",
        title: "1:1 prep · Priya — eng manager",
        excerpt:
          "Open thread: scope cut on payments v2. She raised burnout risk on Marco. Coaching ask: how to push back on Q3 commit.",
        status: "draft · ready for review",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "calendar",
        text: "Pulled last-meeting notes from 3 prior 1:1s.",
      },
      {
        kind: "task",
        label: "Send Priya the scope-cut proposal before 1:1",
        due: "in 2h",
        state: "scheduled",
      },
      {
        kind: "message",
        speaker: "Manager",
        text: "Add a line to ask Marco directly about workload — don't proxy through Priya.",
      },
      {
        kind: "message",
        speaker: "COS",
        text: "Logged. I'll surface it as the second question in Marco's prep packet.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "notion",
        text: "Updated prep doc · Marco — eng IC4.",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "calendar",
        text: "Synced 1:1 agenda to invite description.",
      },
    ],
  },
  {
    id: "hiring-loop",
    name: "hiring-loop",
    lastActivitySec: 42,
    hasRunningTask: false,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Funnel for the staff PM req tightened this week. Two candidates moved to onsite, one withdrew.",
      },
      {
        kind: "table",
        title: "Funnel · staff PM req",
        columns: ["Stage", "Active", "Δ wk"],
        rows: [
          ["Sourced", "48", "+6"],
          ["Phone screen", "11", "+2"],
          ["Hiring manager", "5", "+1"],
          ["Onsite", "2", "+1"],
          ["Offer", "0", "—"],
        ],
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "gmail",
        text: "Drafted onsite-confirmation emails to 2 candidates.",
      },
      {
        kind: "decision",
        summary:
          "Onsite panel for J. Reyes is short an exec interviewer. Pull in Dana (VP Eng) or push by a week?",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "gmail",
        text: "Sent debrief reminder to onsite panel for K. Owens.",
      },
    ],
  },
  {
    id: "perf-reviews",
    name: "perf-reviews",
    lastActivitySec: 88,
    hasRunningTask: true,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Pulling artifacts for cycle reviews — Linear deltas, doc authorship, peer feedback. I'll assemble packets, you decide ratings.",
      },
      {
        kind: "task",
        label: "Compile perf packet for Alex",
        due: "—",
        state: "running",
      },
      {
        kind: "task",
        label: "Compile perf packet for Marco",
        due: "—",
        state: "scheduled",
      },
      {
        kind: "doc",
        title: "Perf packet · Alex — staff IC",
        excerpt:
          "Shipped 4 of 5 committed projects. Two cross-team initiatives. Peer feedback skews on direction-setting depth.",
        status: "draft v2 · 87% complete",
      },
      {
        kind: "message",
        speaker: "Manager",
        text: "Make sure the peer feedback synthesis names the pattern, not just the quotes.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "linear",
        text: "Pulled 38 issues authored by Alex this cycle.",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "drive",
        text: "Indexed 14 docs Alex authored or led.",
      },
    ],
  },
  {
    id: "exec-update",
    name: "exec-update",
    lastActivitySec: 6,
    hasRunningTask: true,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Q3 board update is at draft v2. I synthesized the team's Linear deltas, GTM call notes, and the latest financial model.",
      },
      {
        kind: "doc",
        title: "Q3 board update — draft v2",
        excerpt:
          "Headline: payments v2 ships in-quarter; hiring backlog cleared; one open risk on enterprise pipeline coverage.",
        status: "draft · ready for review",
      },
      {
        kind: "task",
        label: "Render board-deck charts from latest model",
        due: "—",
        state: "running",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "drive",
        text: "Cross-linked source data in appendix.",
      },
      {
        kind: "message",
        speaker: "Manager",
        text: "Pull forward the enterprise pipeline risk into the headline section. Don't bury it.",
      },
      {
        kind: "message",
        speaker: "COS",
        text: "Restructuring. Risk lands in slide 2, with the mitigation plan adjacent.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "drive",
        text: "Generated chart · ARR by segment.",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "notion",
        text: "Linked board prep page to draft.",
      },
    ],
  },
  {
    id: "team-okrs",
    name: "team-okrs",
    lastActivitySec: 121,
    hasRunningTask: false,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Mid-quarter OKR pulse — three KRs trending green, one yellow, one red. Red is owner-less since J. Reyes left.",
      },
      {
        kind: "table",
        title: "OKR pulse · Q3",
        columns: ["KR", "Target", "Status"],
        rows: [
          ["Activation lift", "+18%", "+14% · green"],
          ["Enterprise logos", "12", "8 · yellow"],
          ["Infra cost / req", "−22%", "−9% · red"],
          ["Hiring backlog", "0 open", "1 · green"],
        ],
      },
      {
        kind: "decision",
        summary:
          "Reassign infra-cost KR to Marco or fold into platform-team OKR? Marco has bandwidth; platform has context.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "linear",
        text: "Refreshed KR dashboard from this week's issues.",
      },
    ],
  },
  {
    id: "stakeholder-comms",
    name: "stakeholder-comms",
    lastActivitySec: 33,
    hasRunningTask: false,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "Drafted the cross-functional update for finance and design. Same facts, different framing for each.",
      },
      {
        kind: "doc",
        title: "Update · finance partners",
        excerpt:
          "Lead with cost-of-revenue trajectory. Pull forward the infra-cost KR red status with mitigation timeline.",
        status: "draft · ready for review",
      },
      {
        kind: "doc",
        title: "Update · design partners",
        excerpt:
          "Lead with shipped UX wins on payments v2. Surface the enterprise dashboard ask as a Q4 collaboration.",
        status: "draft · ready for review",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "slack",
        text: "Scheduled both updates to post Monday 9:00.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "gmail",
        text: "Drafted follow-up to finance lead on cost ownership.",
      },
    ],
  },
  {
    id: "weekly-digest",
    name: "weekly-digest",
    lastActivitySec: 240,
    hasRunningTask: false,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "This week's leverage report — what moved, what stalled, what to escalate.",
      },
      {
        kind: "doc",
        title: "Weekly digest · wk 18",
        excerpt:
          "3 shipped, 2 unblocked, 1 escalation. Time spent on synchronous meetings down 14% from last week.",
        status: "ready · sent Sunday 18:00",
      },
      {
        kind: "table",
        title: "Time allocation · wk 18",
        columns: ["Bucket", "Hours", "Δ wk"],
        rows: [
          ["1:1s & coaching", "9.5", "+1.0"],
          ["Strategy & writing", "11.0", "+2.5"],
          ["Sync meetings", "14.0", "−2.5"],
          ["Reactive comms", "6.0", "−1.0"],
        ],
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "notion",
        text: "Archived wk 17 digest.",
      },
    ],
  },
  {
    id: "followups",
    name: "followups",
    lastActivitySec: 19,
    hasRunningTask: true,
    thread: [
      {
        kind: "message",
        speaker: "COS",
        text: "11 commitments in flight from this week's meetings. Closing the loop on each automatically.",
      },
      {
        kind: "task",
        label: "Confirm scope cut with Priya — payments v2",
        due: "today",
        state: "running",
      },
      {
        kind: "task",
        label: "Schedule 1:1 with skip-level",
        due: "—",
        state: "done",
      },
      {
        kind: "task",
        label: "Send post-mortem invite to platform team",
        due: "tomorrow",
        state: "scheduled",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "github",
        text: "Filed issue · post-mortem template for platform team.",
      },
      {
        kind: "message",
        speaker: "Manager",
        text: "If Priya doesn't respond by EOD, escalate to me. Don't wait.",
      },
    ],
    appendCalls: [
      {
        kind: "message",
        speaker: "Tool",
        tool: "slack",
        text: "Nudged Priya on scope-cut thread.",
      },
      {
        kind: "message",
        speaker: "Tool",
        tool: "calendar",
        text: "Held tentative slot for skip-level 1:1 Thursday 10:00.",
      },
    ],
  },
] as const;
