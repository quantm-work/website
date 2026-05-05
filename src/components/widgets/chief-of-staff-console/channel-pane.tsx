"use client";

import { useId } from "react";
import type {
  Channel,
  DecisionArtifact,
  DocArtifact,
  MessageItem,
  TableArtifact,
  TaskArtifact,
  ThreadItem,
} from "./channel-data";

type ChannelPaneProps = {
  channel: Channel;
  /** Tick within the active channel — drives micro-motion. */
  subTick: number;
  /** Global tick — used as a deterministic seed for counters. */
  tick: number;
};

export function ChannelPane({ channel, subTick, tick }: ChannelPaneProps) {
  const headerId = useId();
  const messageKey = useId();

  // Slide a window through the static thread so the pane feels like a
  // live transcript rather than a pre-rendered slab. After the window
  // reaches the end, append tool-call lines so new activity keeps landing.
  const threadLen = channel.thread.length;
  const baseWindowSize = Math.min(threadLen, 5);
  const advance = Math.floor(subTick / 2); // advance every 2 ticks
  const windowEnd = Math.min(threadLen, baseWindowSize + advance);
  const windowStart = Math.max(0, windowEnd - baseWindowSize);
  const visibleThread = channel.thread.slice(windowStart, windowEnd);

  // Once the window is at the end, start appending tool calls.
  const overflow = baseWindowSize + advance - threadLen;
  const appendCount =
    overflow > 0 ? Math.min(channel.appendCalls.length, overflow) : 0;
  const appended = channel.appendCalls.slice(0, appendCount);

  return (
    <section
      aria-labelledby={headerId}
      className="flex h-full flex-col bg-paper max-md:min-h-[320px]"
    >
      <header className="flex items-baseline justify-between border-b border-ink/10 px-4 py-2">
        <h3 id={headerId} className="text-[12px] font-semibold text-ink">
          <span className="text-mid">#</span>
          {channel.name}
        </h3>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-mid">
          {channel.hasRunningTask ? (
            <>
              <span
                aria-hidden="true"
                className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
              />
              <span>task running</span>
            </>
          ) : (
            <>
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-ink/30"
              />
              <span>idle</span>
            </>
          )}
        </span>
      </header>

      <ol className="flex-1 space-y-3 overflow-hidden px-4 py-3 max-md:overflow-visible">
        {visibleThread.map((item, i) => (
          <li
            key={`${messageKey}-base-${windowStart + i}`}
            className="transition-opacity duration-300"
          >
            <ThreadEntry item={item} tick={tick} />
          </li>
        ))}
        {appended.map((item, i) => (
          <li
            key={`${messageKey}-append-${i}`}
            className="animate-[fade-in-up_320ms_cubic-bezier(0.16,1,0.3,1)]"
            style={{ animationFillMode: "both" }}
          >
            <ThreadEntry item={item} tick={tick} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ThreadEntry({ item, tick }: { item: ThreadItem; tick: number }) {
  if (item.kind === "message") return <MessageRow item={item} />;
  if (item.kind === "doc") return <DocCard item={item} />;
  if (item.kind === "task") return <TaskCard item={item} tick={tick} />;
  if (item.kind === "table") return <TableCard item={item} tick={tick} />;
  return <DecisionCard item={item} />;
}

function MessageRow({ item }: { item: MessageItem }) {
  const isCOS = item.speaker === "COS";
  const isManager = item.speaker === "Manager";
  const isTool = item.speaker === "Tool";
  const label = isTool && item.tool ? item.tool : item.speaker.toLowerCase();
  return (
    <div>
      <div className="mb-0.5 flex items-baseline gap-2">
        <span
          className={[
            "text-[9.5px] font-semibold uppercase tracking-[0.14em]",
            isCOS && "text-ink",
            isManager && "text-mid",
            isTool && "text-mid",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isTool ? `tool · ${label}` : item.speaker}
        </span>
      </div>
      <p
        className={[
          "text-[12px] leading-snug",
          isCOS && "font-medium text-ink",
          isManager && "text-ink/80",
          isTool && "italic text-mid",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {item.text}
      </p>
    </div>
  );
}

function DocCard({ item }: { item: DocArtifact }) {
  return (
    <div className="border border-ink/15 bg-paper">
      <div className="flex items-baseline justify-between border-b border-ink/10 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mid">
          Doc · draft
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-mid">
          {item.status}
        </span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[12px] font-semibold text-ink">{item.title}</p>
        <p className="mt-1 text-[11.5px] leading-snug text-ink/75">
          {item.excerpt}
        </p>
      </div>
    </div>
  );
}

function TaskCard({ item, tick }: { item: TaskArtifact; tick: number }) {
  const isRunning = item.state === "running";
  const isDone = item.state === "done";
  // running tasks: animate a tiny progress ticker so it feels alive.
  const tickerWidth = isRunning ? 30 + ((tick * 7) % 60) : isDone ? 100 : 0;
  return (
    <div className="border border-ink/15 bg-paper">
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={[
              "inline-flex size-3 shrink-0 items-center justify-center border",
              isDone
                ? "border-ink bg-ink"
                : isRunning
                  ? "border-ink"
                  : "border-ink/40",
            ].join(" ")}
          >
            {isDone ? (
              <svg
                viewBox="0 0 12 12"
                className="size-2 text-paper"
                aria-hidden="true"
              >
                <title>done</title>
                <path
                  d="M2 6.5 L5 9 L10 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </span>
          <span
            className={[
              "truncate text-[12px]",
              isDone ? "text-mid line-through" : "text-ink",
            ].join(" ")}
          >
            {item.label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isRunning ? (
            <span
              aria-hidden="true"
              className="inline-block size-1.5 animate-pulse rounded-full bg-ink"
            />
          ) : null}
          <span
            className={[
              "text-[10px] uppercase tracking-[0.12em]",
              isRunning ? "text-ink" : "text-mid",
            ].join(" ")}
          >
            {isDone
              ? "done"
              : isRunning
                ? "running"
                : `scheduled · ${item.due}`}
          </span>
        </div>
      </div>
      {isRunning ? (
        <div className="h-[2px] bg-ink/[0.06]" aria-hidden="true">
          <div
            className="h-full bg-ink"
            style={{
              width: `${tickerWidth}%`,
              transition: "width 480ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function TableCard({ item, tick }: { item: TableArtifact; tick: number }) {
  return (
    <div className="border border-ink/15 bg-paper">
      <div className="border-b border-ink/10 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mid">
          {item.title}
        </span>
      </div>
      <table className="w-full table-fixed border-collapse text-[11px] tabular-nums">
        <thead>
          <tr className="border-b border-ink/10 text-left text-[9.5px] uppercase tracking-[0.12em] text-mid">
            {item.columns.map((col) => (
              <th key={col} className="px-3 py-1 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item.rows.map((row, rowIdx) => {
            const isPulse = rowIdx === tick % item.rows.length;
            return (
              <tr
                key={row.join("|")}
                className={[
                  "border-b border-ink/5 last:border-b-0 transition-colors duration-300",
                  isPulse ? "bg-ink/[0.03]" : "",
                ].join(" ")}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={`${row.join("|")}-${item.columns[cellIdx]}`}
                    className={[
                      "px-3 py-1",
                      cellIdx === 0 ? "text-ink" : "text-ink/80",
                    ].join(" ")}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DecisionCard({ item }: { item: DecisionArtifact }) {
  return (
    <div className="border border-ink bg-ink/[0.03]">
      <div className="flex items-baseline justify-between border-b border-ink/15 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
          Decision needed
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-mid">
          awaiting manager
        </span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[12px] leading-snug text-ink">{item.summary}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="border border-ink px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
            Approve
          </span>
          <span className="border border-ink/30 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.12em] text-mid">
            Defer
          </span>
        </div>
      </div>
    </div>
  );
}
