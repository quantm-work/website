"use client";

import { type ReactNode, useEffect, useRef } from "react";
import {
  formatAttestationAge,
  formatCompactUsd,
  formatPegBps,
  formatPrice,
  formatReserveRatio,
  formatSignedCompactUsd,
} from "./format";
import { frames } from "./mock-frames";
import { useStablecoinFrames } from "./use-stablecoin-frames";

export type BackingType = "fiat" | "crypto" | "yield" | "cdp";

export type StablecoinSnapshot = {
  symbol: string;
  issuer: string;
  backingType: BackingType;
  priceUsd: number;
  pegDeviationBps: number;
  volume24hUsd: number;
  marketCapUsd: number;
  netFlow1hUsd: number;
  reserveRatioPct: number | null;
  attestationAgeDays: number | null;
  depth2pctUsd: number;
};

export type Frame = {
  rows: readonly StablecoinSnapshot[];
};

type ColumnKey =
  | "asset"
  | "priceUsd"
  | "pegDeviationBps"
  | "volume24hUsd"
  | "marketCapUsd"
  | "netFlow1hUsd"
  | "reserveRatioPct"
  | "attestationAgeDays"
  | "depth2pctUsd";

type ColumnDef = {
  key: ColumnKey;
  header: string;
  align: "left" | "right";
  flashable: boolean;
  widthClass: string;
  /** When true the column is hidden below md (768px) */
  mobileHidden?: boolean;
  render: (row: StablecoinSnapshot) => ReactNode;
  compare: (row: StablecoinSnapshot) => number | string | null;
};

const columns: readonly ColumnDef[] = [
  {
    key: "asset",
    header: "Asset",
    align: "left",
    flashable: false,
    widthClass: "w-[150px]",
    render: (r) => (
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold tracking-[0.02em] text-ink">
          {r.symbol}
        </span>
        <span className="text-[10px] font-normal text-mid">{r.issuer}</span>
      </span>
    ),
    compare: (r) => r.symbol,
  },
  {
    key: "priceUsd",
    header: "Price",
    align: "right",
    flashable: true,
    widthClass: "w-[92px]",
    render: (r) => formatPrice(r.priceUsd),
    compare: (r) => r.priceUsd,
  },
  {
    key: "pegDeviationBps",
    header: "Peg Δ (bps)",
    align: "right",
    flashable: true,
    widthClass: "w-[108px]",
    render: (r) => {
      const { glyph, text } = formatPegBps(r.pegDeviationBps);
      return (
        <span>
          <span className="mr-1 text-mid">{glyph}</span>
          {text}
        </span>
      );
    },
    compare: (r) => r.pegDeviationBps,
  },
  {
    key: "volume24hUsd",
    header: "24h Vol",
    align: "right",
    flashable: true,
    widthClass: "w-[88px]",
    render: (r) => formatCompactUsd(r.volume24hUsd),
    compare: (r) => r.volume24hUsd,
  },
  {
    key: "marketCapUsd",
    header: "Mkt Cap",
    align: "right",
    flashable: true,
    widthClass: "w-[92px]",
    mobileHidden: true,
    render: (r) => formatCompactUsd(r.marketCapUsd),
    compare: (r) => r.marketCapUsd,
  },
  {
    key: "netFlow1hUsd",
    header: "1h Flow",
    align: "right",
    flashable: true,
    widthClass: "w-[96px]",
    mobileHidden: true,
    render: (r) => formatSignedCompactUsd(r.netFlow1hUsd),
    compare: (r) => r.netFlow1hUsd,
  },
  {
    key: "reserveRatioPct",
    header: "Reserve",
    align: "right",
    flashable: true,
    widthClass: "w-[92px]",
    mobileHidden: true,
    render: (r) => formatReserveRatio(r.reserveRatioPct),
    compare: (r) => r.reserveRatioPct,
  },
  {
    key: "attestationAgeDays",
    header: "Attest",
    align: "right",
    flashable: true,
    widthClass: "w-[72px]",
    mobileHidden: true,
    render: (r) => formatAttestationAge(r.attestationAgeDays),
    compare: (r) => r.attestationAgeDays,
  },
  {
    key: "depth2pctUsd",
    header: "Depth ±2%",
    align: "right",
    flashable: true,
    widthClass: "w-[96px]",
    mobileHidden: true,
    render: (r) => formatCompactUsd(r.depth2pctUsd),
    compare: (r) => r.depth2pctUsd,
  },
];

export function StablecoinTable({
  liveFrames = frames,
}: {
  liveFrames?: readonly Frame[];
}) {
  const { frame, idx } = useStablecoinFrames(liveFrames);
  const prevFrameRef = useRef<Frame | null>(null);

  const prevBySymbol = new Map<string, StablecoinSnapshot>();
  if (prevFrameRef.current) {
    for (const row of prevFrameRef.current.rows) {
      prevBySymbol.set(row.symbol, row);
    }
  }

  useEffect(() => {
    prevFrameRef.current = frame;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <caption className="sr-only">
          Institutional stablecoin monitor, mock data, updates every 500
          milliseconds
        </caption>
        <thead>
          <tr className="border-b border-ink/10">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  "px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-mid",
                  col.align === "right" ? "text-right" : "text-left",
                  col.key === "asset" ? "pl-4" : "",
                  col.key === "depth2pctUsd" ? "pr-4" : "",
                  col.widthClass,
                  col.mobileHidden ? "hidden md:table-cell" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody aria-live="off">
          {frame.rows.map((row) => {
            const prev = prevBySymbol.get(row.symbol);
            return (
              <tr
                key={row.symbol}
                className="border-b border-ink/5 transition-colors duration-150 hover:bg-ink/[0.035]"
              >
                {columns.map((col) => {
                  const prevCompare =
                    col.flashable && prev !== undefined
                      ? col.compare(prev)
                      : undefined;
                  const currCompare = col.compare(row);
                  const changed =
                    col.flashable &&
                    prevCompare !== undefined &&
                    prevCompare !== currCompare;
                  let flashClass = "";
                  if (changed) {
                    if (
                      typeof prevCompare === "number" &&
                      typeof currCompare === "number"
                    ) {
                      flashClass =
                        currCompare > prevCompare
                          ? "cell-flash-up"
                          : "cell-flash-down";
                    } else {
                      flashClass = "cell-flash-up";
                    }
                  }
                  const cellKey = changed
                    ? `${col.key}-f-${idx}`
                    : `${col.key}-s`;
                  const commonClass = [
                    "px-3 py-[7px] text-[13px] font-medium text-ink tabular-nums",
                    col.align === "right" ? "text-right" : "text-left",
                    col.key === "asset" ? "pl-4" : "",
                    col.key === "depth2pctUsd" ? "pr-4" : "",
                    col.mobileHidden ? "hidden md:table-cell" : "",
                    flashClass,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  if (col.key === "asset") {
                    return (
                      <th
                        key={cellKey}
                        scope="row"
                        className={`${commonClass} font-semibold`}
                      >
                        {col.render(row)}
                      </th>
                    );
                  }

                  return (
                    <td key={cellKey} className={commonClass}>
                      {col.render(row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
