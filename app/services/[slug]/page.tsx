import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ModuleWidget from "@/components/ModuleWidget";
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
          <p className="text-[17px] text-ink-soft leading-relaxed max-w-[56ch] mb-2">{mod.tagline}</p>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <p className="text-[16px] leading-relaxed max-w-[64ch] mb-12">{mod.summary}</p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {mod.capabilities.map((c) => (
              <div key={c.title} className="border-t border-line pt-5">
                <h4 className="font-display font-semibold text-[15.5px] mb-1.5">{c.title}</h4>
                <p className="text-[14px] text-ink-soft leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mod.tools && (
        <section className="bg-paper-alt py-16 border-t border-line">
          <div className="max-w-[1180px] mx-auto px-8">
            <h4 className="text-[13.5px] text-ink-soft font-semibold mb-4">Built with</h4>
            <div className="flex flex-wrap gap-2.5">
              {mod.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-display text-[13.5px] font-medium border border-line rounded-full px-4 py-1.5 bg-white"
                >
                  {tool}
                </span>
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