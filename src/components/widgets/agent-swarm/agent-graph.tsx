"use client";

import type { AgentNodeId, EdgeId } from "./frames";

type NodePos = { id: AgentNodeId; label: string; x: number; y: number };

const NODES: readonly NodePos[] = [
  { id: "intake", label: "Intake", x: 60, y: 110 },
  { id: "doc", label: "Doc Verifier", x: 200, y: 50 },
  { id: "sanctions", label: "Sanctions", x: 340, y: 110 },
  { id: "risk", label: "Risk Scorer", x: 200, y: 180 },
  { id: "reviewer", label: "Reviewer", x: 480, y: 180 },
];

type EdgeDef = {
  id: EdgeId;
  from: AgentNodeId;
  to: AgentNodeId;
  flag?: boolean;
};

const EDGES: readonly EdgeDef[] = [
  { id: "intake-doc", from: "intake", to: "doc" },
  { id: "doc-sanctions", from: "doc", to: "sanctions" },
  { id: "sanctions-risk", from: "sanctions", to: "risk" },
  { id: "risk-reviewer", from: "risk", to: "reviewer" },
  { id: "risk-reviewer-flag", from: "risk", to: "reviewer", flag: true },
];

const NODE_W = 108;
const NODE_H = 36;

function nodeAnchor(
  from: NodePos,
  to: NodePos,
): { x1: number; y1: number; x2: number; y2: number } {
  // attach edge to nearest horizontal/vertical face of the node rectangles
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const horiz = Math.abs(dx) > Math.abs(dy);
  const fromX = horiz ? from.x + (dx > 0 ? NODE_W / 2 : -NODE_W / 2) : from.x;
  const fromY = horiz ? from.y : from.y + (dy > 0 ? NODE_H / 2 : -NODE_H / 2);
  const toX = horiz ? to.x + (dx > 0 ? -NODE_W / 2 : NODE_W / 2) : to.x;
  const toY = horiz ? to.y : to.y + (dy > 0 ? -NODE_H / 2 : NODE_H / 2);
  return { x1: fromX, y1: fromY, x2: toX, y2: toY };
}

export function AgentGraph({
  activeNode,
  activeEdge,
}: {
  activeNode: AgentNodeId;
  activeEdge: EdgeId | null;
}) {
  const nodeById = new Map<AgentNodeId, NodePos>(NODES.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="-4 0 548 240"
      role="img"
      aria-label="AML/KYC agent graph"
      className="block w-full h-auto max-w-[480px] mx-auto md:max-w-none"
    >
      <title>AML/KYC agent graph</title>
      <defs>
        <marker
          id="arrow-ink"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0a0a0a" />
        </marker>
        <marker
          id="arrow-active"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0a0a0a" />
        </marker>
        <marker
          id="arrow-flag"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0a0a0a" />
        </marker>
      </defs>

      {/* Edges */}
      <g>
        {EDGES.map((edge) => {
          const from = nodeById.get(edge.from);
          const to = nodeById.get(edge.to);
          if (!from || !to) return null;
          const { x1, y1, x2, y2 } = nodeAnchor(from, to);
          const isActive = edge.id === activeEdge;
          const stroke = edge.flag ? "#0a0a0a" : "#0a0a0a";
          const opacity = isActive ? 1 : 0.18;
          const dash = edge.flag ? "4 3" : undefined;
          return (
            <g key={edge.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={isActive ? 1.6 : 1}
                strokeDasharray={dash}
                opacity={opacity}
                markerEnd="url(#arrow-ink)"
              />
              {isActive ? (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={4}
                  opacity={0.18}
                />
              ) : null}
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {NODES.map((n) => {
          const isActive = n.id === activeNode;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}
            >
              {isActive ? (
                <rect
                  x={-4}
                  y={-4}
                  width={NODE_W + 8}
                  height={NODE_H + 8}
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth={1}
                  opacity={0.25}
                >
                  <animate
                    attributeName="opacity"
                    values="0.05;0.35;0.05"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </rect>
              ) : null}
              <rect
                width={NODE_W}
                height={NODE_H}
                fill={isActive ? "#0a0a0a" : "#fafafa"}
                stroke="#0a0a0a"
                strokeWidth={1}
              />
              <text
                x={NODE_W / 2}
                y={NODE_H / 2 + 4}
                textAnchor="middle"
                fontFamily="var(--font-body)"
                fontSize={11}
                fontWeight={600}
                letterSpacing="0.08em"
                fill={isActive ? "#fafafa" : "#0a0a0a"}
              >
                {n.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
