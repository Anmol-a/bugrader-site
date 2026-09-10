import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Layers } from "lucide-react";
import ModuleWidget from "@/components/ModuleWidget";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getCapabilityIcon } from "@/lib/capabilityIcons";
import PricingIntelligenceDemo from "@/components/PricingIntelligenceDemo";
import { serviceModules } from "@/lib/content";

type Params = { slug: string };

function getModule(slug: string) {
  return serviceModules.find((m) => m.slug === slug);
}

export function generateStaticParams(): Params[] {
  return serviceModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return {};
  return {
    title: `${mod.title} — BugRadar`,
    description: mod.tagline,
  };
}

export default async function ModulePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  return (
    <>
      <section className="pt-16 pb-4">
        <div className="max-w-[1180px] mx-auto px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft mb-8 hover:text-ink"
          >
            <ArrowLeft size={14} />
            All services
          </Link>
          <div className="group flex items-center gap-4 mb-5">
            <ModuleWidget slug={mod.slug} size="lg" />
            <h1 className="font-display text-[32px] md:text-[40px] font-semibold leading-tight">
              {mod.title}
            </h1>
          </div>
          <p className="text-[17px] text-ink-soft leading-relaxed max-w-[62ch] mb-2">{mod.summary}</p>
        </div>
      </section>

      {mod.stats && (
        <section className="border-t border-line py-10">
          <div className="max-w-[1180px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {mod.stats.map((s) => (
                <div key={s.label} className="border-l-2 border-gold pl-4">
                  <div className="font-display text-[17px] md:text-[19px] font-semibold leading-tight mb-1">
                    {s.value}
                  </div>
                  <div className="text-[12.5px] text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <h3 className="font-display text-[20px] font-semibold mb-8">What this covers</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mod.capabilities.map((c, i) => {
              const Icon = getCapabilityIcon(c.title);
              return (
                <RevealOnScroll key={c.title} delay={(i % 3) * 80}>
                  <div className="h-full bg-white border border-line rounded-xl p-6 hover:border-ink-soft hover:shadow-[0_12px_28px_-16px_rgba(16,22,31,0.25)] transition-all duration-300">
                    <div className="w-11 h-11 rounded-lg bg-paper-alt border border-line flex items-center justify-center mb-5">
                      <Icon size={19} strokeWidth={1.75} className="text-ink" />
                    </div>
                    <h4 className="font-display font-semibold text-[15.5px] mb-2">{c.title}</h4>
                    <p className="text-[14px] text-ink-soft leading-relaxed">{c.body}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {mod.manualQaNote && (
        <section className="border-t border-line py-4 pb-16">
          <div className="max-w-[1180px] mx-auto px-8">
            <RevealOnScroll>
              <div className="bg-paper-alt border border-line rounded-xl p-7 flex gap-5 items-start">
                <div className="w-11 h-11 rounded-lg bg-white border border-line flex items-center justify-center shrink-0">
                  <Layers size={19} strokeWidth={1.75} className="text-ink" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[15.5px] mb-2">
                    Manual QA is the foundation, not a fallback
                  </h4>
                  <p className="text-[14px] text-ink-soft leading-relaxed max-w-[68ch]">{mod.manualQaNote}</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {mod.caseSnapshot && (
        <section className="border-t border-line py-4 pb-16">
          <div className="max-w-[1180px] mx-auto px-8 flex flex-col gap-6">
            <RevealOnScroll>
              <div className="bg-paper-alt border border-line rounded-xl p-7">
                <h4 className="font-display font-semibold text-[15.5px] mb-2">
                  {mod.caseSnapshot.title}
                </h4>
                <p className="text-[14px] text-ink-soft leading-relaxed max-w-[68ch]">
                  {mod.caseSnapshot.body}
                </p>
              </div>
            </RevealOnScroll>
            {mod.slug === "data-automation" && <PricingIntelligenceDemo />}
          </div>
        </section>
      )}

      {mod.toolGroups && (
        <section className="bg-panel py-16 border-t border-line">
          <div className="max-w-[1180px] mx-auto px-8">
            <h3 className="font-display text-[20px] font-semibold text-panel-ink mb-8">
              Tooling &amp; coverage
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {mod.toolGroups.map((g) => (
                <RevealOnScroll key={g.category}>
                  <div>
                    <h4 className="text-[12.5px] text-panel-muted font-semibold uppercase tracking-wide mb-3">
                      {g.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((tool) => (
                        <span
                          key={tool}
                          className="font-display text-[13px] font-medium border border-panel-line rounded-full px-3.5 py-1.5 text-panel-ink bg-panel-2"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {mod.outputs && (
        <section className="py-16 border-t border-line">
          <div className="max-w-[1180px] mx-auto px-8">
            <h3 className="font-display text-[20px] font-semibold mb-8">What you actually get</h3>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {mod.outputs.map((o) => (
                <div key={o} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-clear/10 border border-clear/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} strokeWidth={2.5} className="text-clear" />
                  </div>
                  <p className="text-[14.5px] text-ink leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-panel py-16 text-center">
        <div className="max-w-[560px] mx-auto px-8">
          <h2 className="font-display text-[24px] font-semibold text-panel-ink mb-3">
            Want {mod.title.toLowerCase()} on your systems?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-gold text-[#241703] px-5 py-3 rounded-md font-semibold text-[14.5px]"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}