// Agent swarm frames — synthetic AML/KYC review snapshots.
// 16 frames at 500ms tick = 8s loop. Flag event branches the trace mid-loop.

export type AgentNodeId = "intake" | "doc" | "sanctions" | "risk" | "reviewer";

export type EdgeId =
  | "intake-doc"
  | "doc-sanctions"
  | "sanctions-risk"
  | "risk-reviewer"
  | "risk-reviewer-flag";

export type CaseStatus = "active" | "pending" | "cleared" | "flagged";

export type RiskBand = "low" | "med" | "high";

export type CaseRow = {
  id: string;
  label: string;
  volume: string;
  jurisdiction: string;
  status: CaseStatus;
};

export type TraceLine = {
  // stable id so React keys never collide across frames
  id: string;
  agent: AgentNodeId;
  agentLabel: string;
  tool: string;
  latencyMs: number;
  flag?: boolean;
};

export type Verdict = {
  caseId: string;
  state: "pending" | "review" | "cleared" | "flagged";
  riskBand: RiskBand;
  riskScore: number;
};

export type Frame = {
  cases: readonly CaseRow[];
  activeNode: AgentNodeId;
  activeEdge: EdgeId | null;
  trace: readonly TraceLine[];
  verdict: Verdict;
};

const baseCases: readonly CaseRow[] = [
  {
    id: "acme",
    label: "Onboarding · Acme Robotics LLC",
    volume: "$2.4M / mo",
    jurisdiction: "DE",
    status: "active",
  },
  {
    id: "halon",
    label: "Onboarding · Halon Logistics GmbH",
    volume: "$840K / mo",
    jurisdiction: "DE",
    status: "pending",
  },
  {
    id: "boreal",
    label: "Onboarding · Boreal Capital SA",
    volume: "$11.2M / mo",
    jurisdiction: "LU",
    status: "pending",
  },
  {
    id: "kestrel",
    label: "Onboarding · Kestrel Trading Pte",
    volume: "$3.6M / mo",
    jurisdiction: "SG",
    status: "cleared",
  },
];

function withStatus(
  active: string,
  flagged: string | null = null,
  cleared: readonly string[] = [],
): readonly CaseRow[] {
  return baseCases.map((c) => {
    if (c.id === active) return { ...c, status: "active" };
    if (c.id === flagged) return { ...c, status: "flagged" };
    if (cleared.includes(c.id)) return { ...c, status: "cleared" };
    return { ...c, status: "pending" };
  });
}

// trace lines accumulate over the loop; each frame shows a slice (latest 7).
const T = (
  id: string,
  agent: AgentNodeId,
  agentLabel: string,
  tool: string,
  latencyMs: number,
  flag = false,
): TraceLine => ({ id, agent, agentLabel, tool, latencyMs, flag });

const traceTimeline: readonly TraceLine[] = [
  // case 1 — Acme (clean clear)
  T("a1", "intake", "Intake", "ingest_application", 80),
  T("a2", "doc", "Doc Verifier", "ocr_id_doc", 2100),
  T("a3", "doc", "Doc Verifier", "verify_address", 410),
  T("a4", "sanctions", "Sanctions", "check_ofac", 140),
  T("a5", "sanctions", "Sanctions", "pep_lookup", 220),
  T("a6", "risk", "Risk Scorer", "compute_score", 890),
  T("a7", "reviewer", "Reviewer", "auto_clear_low_risk", 60),
  // case 2 — Boreal (flag → human handoff)
  T("b1", "intake", "Intake", "ingest_application", 90),
  T("b2", "doc", "Doc Verifier", "ocr_id_doc", 1860),
  T("b3", "sanctions", "Sanctions", "check_ofac", 130),
  T("b4", "sanctions", "Sanctions", "pep_lookup", 240, true),
  T("b5", "risk", "Risk Scorer", "compute_score", 940),
  T("b6", "reviewer", "Reviewer", "request_human_review", 380),
  T("b7", "reviewer", "Reviewer", "slack.notify_compliance", 210),
];

function trace(end: number): readonly TraceLine[] {
  // newest at index 0
  const start = Math.max(0, end - 7);
  return traceTimeline.slice(start, end).slice().reverse();
}

const acmeCleared = withStatus("acme", null, []);
const boreal = "boreal";

export const frames: readonly Frame[] = [
  // --- Case 1: Acme — happy path clear ---
  {
    cases: withStatus("acme"),
    activeNode: "intake",
    activeEdge: "intake-doc",
    trace: trace(1),
    verdict: {
      caseId: "acme",
      state: "pending",
      riskBand: "low",
      riskScore: 14,
    },
  },
  {
    cases: withStatus("acme"),
    activeNode: "doc",
    activeEdge: "doc-sanctions",
    trace: trace(3),
    verdict: {
      caseId: "acme",
      state: "review",
      riskBand: "low",
      riskScore: 16,
    },
  },
  {
    cases: withStatus("acme"),
    activeNode: "sanctions",
    activeEdge: "sanctions-risk",
    trace: trace(5),
    verdict: {
      caseId: "acme",
      state: "review",
      riskBand: "low",
      riskScore: 18,
    },
  },
  {
    cases: withStatus("acme"),
    activeNode: "risk",
    activeEdge: "risk-reviewer",
    trace: trace(6),
    verdict: {
      caseId: "acme",
      state: "review",
      riskBand: "low",
      riskScore: 21,
    },
  },
  {
    cases: withStatus("acme"),
    activeNode: "reviewer",
    activeEdge: null,
    trace: trace(7),
    verdict: {
      caseId: "acme",
      state: "cleared",
      riskBand: "low",
      riskScore: 21,
    },
  },
  {
    cases: withStatus("acme"),
    activeNode: "reviewer",
    activeEdge: null,
    trace: trace(7),
    verdict: {
      caseId: "acme",
      state: "cleared",
      riskBand: "low",
      riskScore: 21,
    },
  },
  // brief handoff to next case
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "intake",
    activeEdge: "intake-doc",
    trace: trace(8),
    verdict: {
      caseId: "boreal",
      state: "pending",
      riskBand: "low",
      riskScore: 22,
    },
  },
  // --- Case 2: Boreal — PEP hit → flag → human review ---
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "doc",
    activeEdge: "doc-sanctions",
    trace: trace(9),
    verdict: {
      caseId: "boreal",
      state: "review",
      riskBand: "low",
      riskScore: 28,
    },
  },
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "sanctions",
    activeEdge: "sanctions-risk",
    trace: trace(10),
    verdict: {
      caseId: "boreal",
      state: "review",
      riskBand: "med",
      riskScore: 44,
    },
  },
  // PEP flag
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "sanctions",
    activeEdge: "sanctions-risk",
    trace: trace(11),
    verdict: {
      caseId: "boreal",
      state: "review",
      riskBand: "high",
      riskScore: 71,
    },
  },
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "risk",
    activeEdge: "risk-reviewer-flag",
    trace: trace(12),
    verdict: {
      caseId: "boreal",
      state: "review",
      riskBand: "high",
      riskScore: 78,
    },
  },
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "reviewer",
    activeEdge: null,
    trace: trace(13),
    verdict: {
      caseId: "boreal",
      state: "flagged",
      riskBand: "high",
      riskScore: 78,
    },
  },
  {
    cases: withStatus(boreal, null, ["acme"]),
    activeNode: "reviewer",
    activeEdge: null,
    trace: trace(14),
    verdict: {
      caseId: "boreal",
      state: "flagged",
      riskBand: "high",
      riskScore: 78,
    },
  },
  // hold on flagged state
  {
    cases: withStatus("halon", "boreal", ["acme"]),
    activeNode: "intake",
    activeEdge: "intake-doc",
    trace: trace(14),
    verdict: {
      caseId: "halon",
      state: "pending",
      riskBand: "low",
      riskScore: 19,
    },
  },
  {
    cases: withStatus("halon", "boreal", ["acme"]),
    activeNode: "doc",
    activeEdge: "doc-sanctions",
    trace: trace(14),
    verdict: {
      caseId: "halon",
      state: "review",
      riskBand: "low",
      riskScore: 24,
    },
  },
  {
    cases: acmeCleared.map((c) =>
      c.id === "acme" ? { ...c, status: "active" } : c,
    ),
    activeNode: "intake",
    activeEdge: "intake-doc",
    trace: trace(0),
    verdict: {
      caseId: "acme",
      state: "pending",
      riskBand: "low",
      riskScore: 12,
    },
  },
];
