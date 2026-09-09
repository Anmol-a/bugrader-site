"use client";

import { useEffect, useState } from "react";
import { Tag, MessageCircle, Users } from "lucide-react";
import { scenarioSteps } from "@/lib/content";

const icons = [Tag, MessageCircle, Users];

export default function ScenarioReplay() {
  const [visibleCount, setVisibleCount] = useState(scenarioSteps.length);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;
    setVisibleCount(0);

    const step = () => {
      i += 1;
      setVisibleCount(i);
      if (i < scenarioSteps.length) {
        timeout = setTimeout(step, 1300);
      } else {
        timeout = setTimeout(() => {
          i = 0;
          setVisibleCount(0);
          timeout = setTimeout(step, 700);
        }, 2800);
      }
    };
    timeout = setTimeout(step, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-panel rounded-xl px-6 py-6">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-2 h-2 rounded-full bg-alert" />
        <span className="text-[12.5px] text-panel-muted">A familiar Tuesday, before BugRadar</span>
      </div>
      <div className="flex flex-col gap-4">
        {scenarioSteps.map((step, i) => {
          const Icon = icons[i];
          const visible = i < visibleCount;
          return (
            <div
              key={step.time}
              className={`flex gap-4 items-start transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-panel-2 flex items-center justify-center shrink-0">
                <Icon size={15} strokeWidth={1.75} className="text-gold-soft" />
              </div>
              <div>
                <div className="text-panel-muted text-[12px] font-display font-semibold mb-0.5">{step.time}</div>
                <div className="text-panel-ink text-[14.5px] leading-snug">{step.event}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}