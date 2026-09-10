"use client";

import { useEffect, useRef, useState } from "react";
import { Radio } from "lucide-react";
import { dashboardRings } from "@/lib/content";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION = 1400;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function status(pct: number) {
  if (pct >= 98) return { label: "Healthy", color: "#2F8F73", dot: "bg-clear" };
  if (pct >= 92) return { label: "Watching", color: "#E7C578", dot: "bg-gold-soft" };
  return { label: "Degraded", color: "#C6402F", dot: "bg-alert" };
}

export default function VitalsRings() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }
    const start = performance.now() + 200;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const t = Math.min(1, elapsed / DURATION);
      setProgress(easeOutExpo(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative bg-panel rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #26314A 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-flow" />
      </div>

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-2 px-5 py-3.5 border-b border-panel-line">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
          <span className="ml-1 text-[12px] text-panel-muted font-display tracking-wide truncate">
            app.bugradar.in/dashboard
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-panel-muted font-medium sm:ml-auto pl-[26px] sm:pl-0">
          <Radio size={12} className="text-gold-soft animate-pulse shrink-0" />
          Sample view — illustrative data
        </span>
      </div>

      <div className="relative p-5 sm:p-8 md:p-11 grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
        {dashboardRings.map((ring, i) => {
          const s = status(ring.pct);
          const displayPct = Math.round(progress * ring.pct);
          const offset = CIRCUMFERENCE * (1 - (progress * ring.pct) / 100);
          const gradId = `ring-grad-${i}`;
          return (
            <div key={ring.name} className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-[110px] sm:max-w-[128px] aspect-square">
                <div
                  className="absolute inset-2 rounded-full blur-xl opacity-40 transition-opacity duration-700"
                  style={{ background: s.color, opacity: progress * 0.35 }}
                />
                <svg viewBox="0 0 100 100" className="relative w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.55" />
                      <stop offset="100%" stopColor={s.color} stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#1B2436" strokeWidth="7" />
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    stroke={`url(#${gradId})`}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    style={{ filter: `drop-shadow(0 0 6px ${s.color}66)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[16px] sm:text-[22px] font-semibold text-panel-ink tabular-nums">
                    {displayPct}%
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[13px] sm:text-[14px] font-medium text-panel-ink mb-1">{ring.name}</div>
                <div className="flex items-center justify-center gap-1.5 text-[10.5px] sm:text-[11.5px] text-panel-muted">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative border-t border-panel-line px-8 py-3.5">
        <p className="text-[11.5px] text-panel-muted">
          Numbers shown are illustrative, not live telemetry — a real dashboard populates once monitoring is live on your journeys.
        </p>
      </div>
    </div>
  );
}