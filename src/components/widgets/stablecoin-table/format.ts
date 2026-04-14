const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const pct = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return `$${value.toFixed(4)}`;
}

export function formatCompactUsd(value: number): string {
  return `$${compact.format(value)}`;
}

export function formatSignedCompactUsd(value: number): string {
  if (value === 0) return "$0";
  const sign = value > 0 ? "+" : "−";
  return `${sign}$${compact.format(Math.abs(value))}`;
}

export function formatReserveRatio(value: number | null): string {
  if (value === null) return "—";
  return `${pct.format(value)}%`;
}

export function formatAttestationAge(days: number | null): string {
  if (days === null) return "—";
  return `${days}d`;
}

export type PegGlyph = "▲" | "▼" | "·";

export function formatPegBps(bps: number): { glyph: PegGlyph; text: string } {
  if (bps === 0) return { glyph: "·", text: "0" };
  if (bps > 0) return { glyph: "▲", text: `+${bps}` };
  return { glyph: "▼", text: `−${Math.abs(bps)}` };
}

export function formatLoopClock(idx: number, frameCount: number): string {
  const totalMs = (idx / frameCount) * 10_000;
  const s = Math.floor(totalMs / 1000);
  const ms = Math.floor((totalMs % 1000) / 100) * 100;
  return `14:32:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
}
