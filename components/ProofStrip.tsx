import { ArrowDown } from "lucide-react";
import { PROOF } from "@/lib/launch";

// Under the hero: what the robot shopper has already done. Numbers from lib/launch.ts only.
const STATS: [string, string][] = [
  [PROOF.stores, "Shopify stores checked by the robot shopper"],
  [PROOF.checks, "checks run in desktop and mobile browsers"],
  [PROOF.ratio, "stores had a dead link or broken page shoppers could hit"],
];

export default function ProofStrip() {
  return (
    <section aria-label="What BugRadar has checked so far" className="border-y border-line bg-white">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 py-7 md:py-8 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-x-10 gap-y-5 items-center">
        {STATS.map(([n, label], i) => (
          <div
            key={label}
            className={`flex items-baseline gap-3 md:block min-w-0 ${i > 0 ? "border-t border-line pt-5 md:border-t-0 md:pt-0 md:border-l md:pl-10" : ""}`}
          >
            <div className="font-display text-[30px] md:text-[34px] font-semibold leading-none tabular-nums shrink-0 md:mb-2">
              {n}
            </div>
            <div className="text-[14px] text-ink-soft leading-snug">{label}</div>
          </div>
        ))}
        <a
          href="#found"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink-soft w-fit"
        >
          What we found <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
