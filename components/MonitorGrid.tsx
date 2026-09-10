"use client";

import { LogIn, ShoppingCart, Tag, CreditCard, Search, UserCog, Infinity as InfinityIcon, Plus, type LucideIcon } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type Journey = { label: string; desc: string; icon: string };

const journeyIcons: Record<string, LucideIcon> = {
  login: LogIn,
  cart: ShoppingCart,
  tag: Tag,
  payment: CreditCard,
  search: Search,
  account: UserCog,
};

export default function MonitorGrid({ items }: { items: Journey[] }) {
  return (
    <div className="flex flex-col gap-8">
      <RevealOnScroll>
        <div className="relative bg-panel rounded-xl p-8 md:p-10 overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(231,197,120,0.18), transparent 70%)" }}
          />
          <div className="relative flex items-start gap-5">
            <div className="w-12 h-12 rounded-lg bg-panel-2 flex items-center justify-center shrink-0 relative">
              <InfinityIcon size={22} strokeWidth={1.75} className="text-gold-soft" />
              <span className="absolute -inset-1.5 rounded-lg border border-gold/30 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-[20px] md:text-[23px] font-semibold text-panel-ink mb-2 leading-snug">
                If a broken flow costs you a customer, we monitor it.
              </h3>
              <p className="text-[14.5px] text-panel-muted leading-relaxed max-w-[58ch]">
                That&apos;s the actual scope — not a checklist. The tags below are the journeys we see
                most often across clients, shown as examples of the kind of thing we cover, not a
                boundary on it.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <div className="flex flex-wrap gap-3">
          {items.map((j) => {
            const Icon = journeyIcons[j.icon];
            return (
              <div key={j.label} className="group relative">
                <div className="flex items-center gap-2 rounded-full border border-line bg-white pl-3 pr-4 py-2 cursor-default hover:border-ink-soft transition-colors">
                  <Icon size={15} strokeWidth={1.75} className="text-ink-soft" />
                  <span className="text-[13.5px] font-medium text-ink">{j.label}</span>
                </div>
                <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-64 opacity-0 scale-95 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 origin-top-left">
                  <div className="bg-ink text-paper rounded-lg px-4 py-3 text-[12.5px] leading-relaxed shadow-xl">
                    {j.desc}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-2 rounded-full border border-dashed border-ink-soft/40 pl-3 pr-4 py-2">
            <Plus size={15} strokeWidth={1.75} className="text-ink-soft" />
            <span className="text-[13.5px] font-medium text-ink-soft">Whatever yours is</span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}