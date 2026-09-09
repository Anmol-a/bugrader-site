"use client";

import { useEffect, useState } from "react";
import { Link2, Cog, Radar, BellRing } from "lucide-react";
import { howItWorksSteps } from "@/lib/content";

const positions = [0, 33.333, 66.666, 100];
const HOLD = 1100;
const TRAVEL = 1300;

type Step = { type: "hold"; node: number } | { type: "travel"; to: number };

const sequence: Step[] = [
  { type: "hold", node: 0 },
  { type: "travel", to: 1 },
  { type: "hold", node: 1 },
  { type: "travel", to: 2 },
  { type: "hold", node: 2 },
  { type: "travel", to: 3 },
  { type: "hold", node: 3 },
];

function TimelineIcon({ index, active }: { index: number; active: boolean }) {
  const color = active ? "text-gold-soft" : "text-ink";

  if (index === 0) {
    return (
      <span className="relative flex items-center justify-center">
        <Link2
          size={17}
          strokeWidth={1.75}
          className={`${color} transition-transform duration-500 ${active ? "scale-110" : "scale-100"}`}
        />
        {active && <span className="absolute -inset-1.5 rounded-full border border-gold animate-ping opacity-70" />}
      </span>
    );
  }
  if (index === 1) {
    return (
      <Cog
        size={17}
        strokeWidth={1.75}
        className={`${color} ${active ? "animate-spin" : ""}`}
        style={active ? { animationDuration: "1.1s" } : undefined}
      />
    );
  }
  if (index === 2) {
    return (
      <span className="relative flex items-center justify-center w-[17px] h-[17px]">
        <Radar size={17} strokeWidth={1.75} className={color} />
        {active && (
          <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
            <span
              className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-clear to-transparent origin-left animate-sweep"
              style={{ animationDuration: "1.1s" }}
            />
          </span>
        )}
      </span>
    );
  }
  return (
    <span className="relative flex items-center justify-center">
      <BellRing
        size={17}
        strokeWidth={1.75}
        className={`${color} transition-transform duration-300 ${active ? "rotate-12" : "rotate-0"}`}
      />
      {active && <span className="absolute -inset-1.5 rounded-full border border-alert animate-ping opacity-70" />}
    </span>
  );
}

export default function HowItWorksTimeline() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;

    const run = () => {
      const step = sequence[i];
      setStepIndex(i);
      const duration = step.type === "hold" ? HOLD : TRAVEL;
      timeout = setTimeout(() => {
        i = i + 1 >= sequence.length ? 0 : i + 1;
        run();
      }, duration);
    };

    run();
    return () => clearTimeout(timeout);
  }, []);

  const step = sequence[stepIndex];
  const activeNode = step.type === "hold" ? step.node : -1;
  const markerIndex = step.type === "travel" ? step.to : step.node;

  return (
    <div className="relative">
      <div className="hidden md:block absolute top-5 left-[6%] right-[6%] h-px bg-line" />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {howItWorksSteps.map((s, i) => {
          const active = activeNode === i;
          return (
            <div key={s.n} className="relative pr-6">
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-5 transition-colors duration-500 ${
                  active ? "bg-ink border-2 border-gold" : "bg-paper border-2 border-ink"
                }`}
              >
                <TimelineIcon index={i} active={active} />
              </div>
              <h4 className="text-[16px] font-semibold mb-2">{s.title}</h4>
              <p className="text-[14px] text-ink-soft leading-relaxed max-w-[26ch]">{s.body}</p>
            </div>
          );
        })}
      </div>

      {/* Progress marker — own track below the circles, never hidden behind them */}
      <div className="hidden md:block absolute top-[68px] left-[6%] right-[6%] h-px">
        <div
          className="absolute top-1/2 w-[7px] h-[7px] rounded-full bg-ink"
          style={{
            left: `${positions[markerIndex]}%`,
            transform: "translate(-50%, -50%)",
            transition: "left 1300ms ease-in-out",
          }}
        />
      </div>
    </div>
  );
}