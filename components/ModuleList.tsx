import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ModuleWidget from "@/components/ModuleWidget";
import RevealOnScroll from "@/components/RevealOnScroll";

type Item = {
  slug: string;
  title: string;
  tagline: string;
  capabilities: { title: string; body: string }[];
};

export default function ModuleList({ items }: { items: Item[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {items.map((m, i) => (
        <RevealOnScroll key={m.slug} delay={(i % 2) * 80}>
          <Link
            href={`/services/${m.slug}`}
            className="group relative flex flex-col h-full bg-panel rounded-xl p-7 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(231,197,120,0.25), transparent 70%)" }}
            />

            <div className="relative flex items-center gap-4 mb-5">
              <ModuleWidget slug={m.slug} size="lg" />
              <div>
                <h3 className="font-display font-semibold text-[18px] text-panel-ink mb-0.5">{m.title}</h3>
                <p className="text-panel-muted text-[13.5px] leading-snug">{m.tagline}</p>
              </div>
            </div>

            <ul className="relative flex flex-col gap-2 mb-6">
              {m.capabilities.slice(0, 3).map((c) => (
                <li key={c.title} className="flex items-start gap-2 text-[13.5px] text-panel-muted">
                  <Check size={14} strokeWidth={2.25} className="text-clear mt-[3px] shrink-0" />
                  <span>{c.title}</span>
                </li>
              ))}
            </ul>

            <span className="relative mt-auto flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-soft">
              Explore module
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}