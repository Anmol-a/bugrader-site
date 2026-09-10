// A radial network — one center node (the founder) connected to a ring of
// satellite nodes (the working network). Five satellites carry discipline
// labels; the rest are plain dots representing the broader bench. No names,
// no headcount claimed as exact — this is illustrative of "a network", not
// a literal roster.

const CX = 150;
const CY = 150;
const R = 108;
const TOTAL_NODES = 16;
const LABELED = [
  { index: 0, label: "Automation" },
  { index: 3, label: "RPA" },
  { index: 6, label: "Load testing" },
  { index: 9, label: "Manual QA" },
  { index: 12, label: "Process automation" },
];

function nodePosition(i: number, total: number) {
  const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CX + R * Math.cos(angle),
    y: CY + R * Math.sin(angle),
  };
}

export default function NetworkGraph() {
  const nodes = Array.from({ length: TOTAL_NODES }, (_, i) => nodePosition(i, TOTAL_NODES));
  const labeledIndexes = new Set(LABELED.map((l) => l.index));

  return (
    <div className="bg-panel rounded-xl p-6 flex flex-col items-center gap-4">
      <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#26314A" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={R * 0.6} fill="none" stroke="#26314A" strokeWidth="1" opacity="0.6" />

        {nodes.map((n, i) => (
          <line
            key={`line-${i}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke="#26314A"
            strokeWidth="1"
          />
        ))}

        {nodes.map((n, i) => {
          const isLabeled = labeledIndexes.has(i);
          return (
            <circle
              key={`node-${i}`}
              cx={n.x}
              cy={n.y}
              r={isLabeled ? 5 : 3}
              fill={isLabeled ? "#E7C578" : "#3A4B6B"}
              className={isLabeled ? "animate-pulse" : ""}
            />
          );
        })}

        <circle cx={CX} cy={CY} r="10" fill="#B9862F" />
        <circle cx={CX} cy={CY} r="16" fill="none" stroke="#B9862F" strokeWidth="1" opacity="0.5" />
      </svg>

      <div className="flex flex-wrap justify-center gap-1.5 max-w-[240px]">
        {LABELED.map((l) => (
          <span
            key={l.label}
            className="text-[10.5px] font-medium text-panel-ink bg-panel-2 border border-panel-line rounded-full px-2.5 py-1"
          >
            {l.label}
          </span>
        ))}
      </div>

      <span className="text-panel-muted text-[12px] text-center">
        Founder-led,<br />network-backed
      </span>
    </div>
  );
}