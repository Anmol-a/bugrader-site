import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ModuleWidget from "@/components/ModuleWidget";

type Item = {
  slug: string;
  title: string;
  tagline: string;
};

export default function ModuleList({ items }: { items: Item[] }) {
  return (
    <div className="bg-panel rounded-xl overflow-hidden">
      {items.map((m) => (
        <Link
          key={m.slug}
          href={`/services/${m.slug}`}
          className="group flex items-center gap-5 px-6 py-5 border-b border-panel-line last:border-b-0 hover:bg-panel-2 transition-colors"
        >
          <ModuleWidget slug={m.slug} />
          <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-4">
            <h3 className="font-display font-semibold text-[16px] text-panel-ink shrink-0">{m.title}</h3>
            <span className="text-panel-muted text-[13.5px] truncate">{m.tagline}</span>
          </div>
          <ArrowRight
            size={18}
            className="text-panel-muted group-hover:text-gold-soft group-hover:translate-x-1 transition-all shrink-0"
          />
        </Link>
      ))}
    </div>
  );
}