import Link from "next/link";
import { Check } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { pricingTiers } from "@/lib/content";

export default function PricingTiers() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
      {pricingTiers.map((t, i) => (
        <RevealOnScroll key={t.title} delay={(i % 4) * 70} className="h-full">
          <div
            className={`h-full flex flex-col bg-white rounded-xl p-6 border ${
              t.featured ? "border-gold" : "border-line"
            }`}
          >
            <div
              className={`text-[11.5px] uppercase tracking-wide font-semibold mb-2.5 ${
                t.featured ? "text-gold" : "text-ink-soft"
              }`}
            >
              {t.tier}
            </div>
            <h3 className="font-display font-semibold text-[19px] mb-2">{t.title}</h3>
            <div className="font-display font-semibold text-[21px] mb-3">
              {t.price}
              {t.period && (
                <span className="text-[13px] font-body font-normal text-ink-soft">{t.period}</span>
              )}
            </div>
            <p className="text-[14px] text-ink-soft leading-relaxed mb-5 min-h-[42px]">{t.tagline}</p>

            <ul className="flex flex-col gap-2.5 mb-5 flex-grow">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13.5px] text-ink leading-snug">
                  <Check size={14} strokeWidth={2.25} className="text-clear mt-[3px] shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {t.note && (
              <p className="text-[12px] text-ink-soft italic leading-relaxed mb-4">{t.note}</p>
            )}

            <Link
              href="/contact"
              className={`mt-auto inline-block text-center px-5 py-3 rounded-md font-medium text-[14px] transition-colors ${
                t.featured
                  ? "bg-gold text-[#241703] font-semibold"
                  : "border border-line hover:border-ink-soft"
              }`}
            >
              {t.cta}
            </Link>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
