import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ModuleWidget from "@/components/ModuleWidget";

const featured = [
  { slug: "continuous-monitoring", title: "Continuous Monitoring", blurb: "Every journey, watched on a schedule, forever." },
  { slug: "test-automation", title: "Test Automation", blurb: "Web, app, API and manual QA coverage." },
  { slug: "rpa", title: "RPA", blurb: "Software robots for repetitive digital work." },
];

export default function ModulesPreview() {
  return (
    <section className="bg-panel py-20">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
          <div>
            <h2 className="font-display text-[26px] font-semibold text-panel-ink mb-2">
              See what else BugRadar covers.
            </h2>
            <p className="text-panel-muted text-[15px] max-w-[52ch]">
              Six service modules, each with its own scope — this is a starting three.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-gold-soft shrink-0"
          >
            All services
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden border border-panel-line">
          {featured.map((m) => (
            <Link
              key={m.slug}
              href={`/services/${m.slug}`}
              className="group flex items-center gap-5 px-6 py-5 border-b border-panel-line last:border-b-0 hover:bg-panel-2 transition-colors"
            >
              <ModuleWidget slug={m.slug} />
              <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-4">
                <h3 className="font-display font-semibold text-[16px] text-panel-ink shrink-0">{m.title}</h3>
                <span className="text-panel-muted text-[13.5px] truncate">{m.blurb}</span>
              </div>
              <ArrowRight
                size={18}
                className="text-panel-muted group-hover:text-gold-soft group-hover:translate-x-1 transition-all shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}