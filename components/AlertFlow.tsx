"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Send, ArrowUpCircle, type LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [CircleCheck, Send, ArrowUpCircle];
const HOLD = 1400;

export default function AlertFlow({ steps }: { steps: { title: string; body: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, HOLD);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-panel rounded-xl p-7 md:p-10">
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
        <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-panel-line">
          <div
            className="h-full bg-gold-soft transition-all ease-in-out"
            style={{ width: `${(active / (steps.length - 1)) * 100}%`, transitionDuration: `${HOLD}ms` }}
          />
        </div>

        {steps.map((s, i) => {
          const Icon = icons[i];
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={s.title} className={`relative flex flex-col ${i > 0 ? "md:pl-8" : ""} ${i < steps.length - 1 ? "md:pr-8" : ""}`}>
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                  isActive
                    ? "bg-gold text-[#241703] scale-110"
                    : isPast
                    ? "bg-panel-2 text-clear border border-clear/40"
                    : "bg-panel-2 text-panel-muted border border-panel-line"
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
                {isActive && <span className="absolute -inset-1.5 rounded-full border border-gold animate-ping opacity-60" />}
              </div>
              <h4 className="text-[16px] font-semibold text-panel-ink mb-1.5">{s.title}</h4>
              <p className="text-[14px] text-panel-muted leading-relaxed max-w-[26ch]">{s.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}