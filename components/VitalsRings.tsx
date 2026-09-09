import { dashboardRings } from "@/lib/content";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function VitalsRings() {
  return (
    <div className="flex flex-wrap gap-11">
      {dashboardRings.map((ring) => {
        const offset = CIRCUMFERENCE * (1 - ring.pct / 100);
        const isGood = ring.pct >= 98;
        return (
          <div key={ring.name} className="flex flex-col items-center gap-3.5 w-[120px]">
            <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] -rotate-90">
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#DBE0E7" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                stroke={isGood ? "#2F8F73" : "#B9862F"}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="text-center">
              <div className="font-display text-[19px] font-semibold">{ring.pct}%</div>
              <div className="text-[13px] text-ink-soft mt-0.5">{ring.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
