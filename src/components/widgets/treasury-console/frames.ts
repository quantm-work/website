// Synthetic but realistic stablecoin treasury console frames.
// Tick is 500ms; 20 frames = 10s loop.
// CCTP / Base / Solana attestation latencies sit in the 8-25s range
// for V1 and ~8-15s for V2 fast transfer; we mirror that texture.

export type RuleStatus = "active" | "queued" | "executing" | "completed";

export type Rule = {
  id: string;
  label: string;
  status: RuleStatus;
  // when "executing", which step is highlighted (0..steps.length-1)
  step?: number;
};

export type Stats = {
  totalSupplyUsd: number;
  circulatingUsd: number;
  attestedReservesUsd: number;
  pendingFlowsUsd: number;
  pendingFlowCount: number;
};

export type ExecuteStepKey =
  | "kyc"
  | "sanctions"
  | "limit"
  | "approve"
  | "broadcast"
  | "final";

export type ExecuteState = {
  ruleLabel: string;
  hash: string;
  chain: "Base" | "Solana" | "Ethereum";
  amountUsd: number;
  // index into the step list 0..5; -1 == idle
  activeStep: number;
};

export type Frame = {
  stats: Stats;
  rules: readonly Rule[];
  execute: ExecuteState;
};

export const EXECUTE_STEPS: readonly { key: ExecuteStepKey; label: string }[] =
  [
    { key: "kyc", label: "KYC" },
    { key: "sanctions", label: "Sanctions" },
    { key: "limit", label: "Limit" },
    { key: "approve", label: "Approve" },
    { key: "broadcast", label: "Broadcast" },
    { key: "final", label: "Final" },
  ];

const baseRules: readonly Omit<Rule, "status" | "step">[] = [
  { id: "r1", label: "If invoice paid → release vendor escrow" },
  { id: "r2", label: "Payroll: stream USDC to 41 wallets every Friday" },
  { id: "r3", label: "If treasury > $10M idle → sweep to yield" },
  { id: "r4", label: "Vendor payout: net-30 → auto-release on attestation" },
  { id: "r5", label: "Reserve check: hourly Circle attestation diff" },
];

// Stat baselines — supply 24.6M USDC across the org's program
const baseStats: Stats = {
  totalSupplyUsd: 24_620_000,
  circulatingUsd: 18_240_000,
  attestedReservesUsd: 24_620_000,
  pendingFlowsUsd: 412_000,
  pendingFlowCount: 7,
};

// Tiny deterministic jitter that "ticks" without floating around
function jitterStats(seed: number): Stats {
  const wave = Math.sin(seed * 0.7) * 0.5 + 0.5; // 0..1
  const flow = Math.sin(seed * 1.3) * 0.5 + 0.5;
  return {
    totalSupplyUsd: baseStats.totalSupplyUsd + Math.round(wave * 28_000),
    circulatingUsd: baseStats.circulatingUsd + Math.round(flow * 64_000),
    attestedReservesUsd:
      baseStats.attestedReservesUsd + Math.round(wave * 12_000),
    pendingFlowsUsd:
      baseStats.pendingFlowsUsd + Math.round((flow - 0.5) * 180_000),
    pendingFlowCount: baseStats.pendingFlowCount + (seed % 3),
  };
}

// Three execution scenarios cycle through. ~16 frames per scenario at 500ms ≈ 8s.
const scenarios: readonly {
  ruleLabel: string;
  hash: string;
  chain: ExecuteState["chain"];
  amountUsd: number;
}[] = [
  {
    ruleLabel: "Vendor escrow → Acme Logistics",
    hash: "0x4f29…a91",
    chain: "Base",
    amountUsd: 184_200,
  },
  {
    ruleLabel: "Payroll stream · 41 wallets",
    hash: "9kQv…c2B7",
    chain: "Solana",
    amountUsd: 612_900,
  },
  {
    ruleLabel: "Idle sweep → yield vault",
    hash: "0xbe1c…f04d",
    chain: "Ethereum",
    amountUsd: 2_400_000,
  },
];

const FRAME_COUNT = 24;
const STEPS_PER_SCENARIO = 8; // 8 frames * 500ms ≈ 4s per execution arc; 3 scenarios ≈ 12s
// We deliberately don't divide cleanly into FRAME_COUNT so the scenarios
// drift past the stat jitter loop and feel less mechanical.

export const frames: readonly Frame[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => {
    const scenarioIdx = Math.floor(i / STEPS_PER_SCENARIO) % scenarios.length;
    const stepIdx = i % STEPS_PER_SCENARIO;
    // Map 8-frame slice to 6 steps: dwell on a couple of the gates
    // 0,1 → KYC ; 2 → Sanctions ; 3 → Limit ; 4 → Approve ; 5 → Broadcast ; 6,7 → Final
    let activeStep = 0;
    if (stepIdx <= 1) activeStep = 0;
    else if (stepIdx === 2) activeStep = 1;
    else if (stepIdx === 3) activeStep = 2;
    else if (stepIdx === 4) activeStep = 3;
    else if (stepIdx === 5) activeStep = 4;
    else activeStep = 5;

    const scenario = scenarios[scenarioIdx];

    // Rule statuses depend on which scenario is executing
    const rules: Rule[] = baseRules.map((r, idx) => {
      const isExecutingRule =
        (scenarioIdx === 0 && idx === 0) ||
        (scenarioIdx === 1 && idx === 1) ||
        (scenarioIdx === 2 && idx === 2);
      if (isExecutingRule) {
        return { ...r, status: "executing", step: activeStep };
      }
      // Cycle a queued rule based on frame index
      const queuedIdx = (i + 1) % baseRules.length;
      if (idx === queuedIdx) return { ...r, status: "queued" };
      return { ...r, status: "active" };
    });

    return {
      stats: jitterStats(i),
      rules,
      execute: {
        ruleLabel: scenario.ruleLabel,
        hash: scenario.hash,
        chain: scenario.chain,
        amountUsd: scenario.amountUsd,
        activeStep,
      },
    };
  },
);
