import { X, Check } from "lucide-react";
import { compareRows } from "@/lib/content";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function CompareTable() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <RevealOnScroll>
        <div className="h-full bg-paper-alt border border-line rounded-xl p-7">
          <h3 className="font-display font-semibold text-[15px] text-ink-soft mb-6">Traditional QA</h3>
          <div className="flex flex-col gap-5">
            {compareRows.map((row) => (
              <div key={row.label} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-white border border-line flex items-center justify-center shrink-0 mt-0.5">
                  <X size={13} strokeWidth={2.25} className="text-ink-soft" />
                </div>
                <div>
                  <div className="text-[12px] text-ink-soft mb-0.5">{row.label}</div>
                  <div className="text-[14.5px] text-ink">{row.traditional}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <div className="h-full bg-panel rounded-xl p-7 relative overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-70 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(231,197,120,0.18), transparent 70%)" }}
          />
          <h3 className="relative font-display font-semibold text-[15px] text-gold-soft mb-6">BugRadar</h3>
          <div className="relative flex flex-col gap-5">
            {compareRows.map((row) => (
              <div key={row.label} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-clear/15 border border-clear/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={13} strokeWidth={2.5} className="text-clear" />
                </div>
                <div>
                  <div className="text-[12px] text-panel-muted mb-0.5">{row.label}</div>
                  <div className="text-[14.5px] text-panel-ink font-medium">{row.bugradar}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}