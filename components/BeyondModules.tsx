import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type Props = {
  aiCapability: { title: string; body: string };
  relatedModules: { slug: string; title: string }[];
};

export default function BeyondModules({ aiCapability, relatedModules }: Props) {
  return (
    <div className="grid md:grid-cols-5 gap-5">
      <RevealOnScroll className="md:col-span-3">
        <div className="h-full bg-panel rounded-xl p-8 relative overflow-hidden">
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-60 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(231,197,120,0.16), transparent 70%)" }}
          />
          <div className="relative w-12 h-12 rounded-lg bg-panel-2 flex items-center justify-center mb-5">
            <Sparkles size={22} strokeWidth={1.75} className="text-gold-soft" />
          </div>
          <h3 className="relative font-display font-semibold text-[20px] text-panel-ink mb-3">
            {aiCapability.title}
          </h3>
          <p className="relative text-[14.5px] text-panel-muted leading-relaxed max-w-[46ch]">
            {aiCapability.body}
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100} className="md:col-span-2">
        <div className="h-full border border-line rounded-xl p-7 bg-white flex flex-col">
          <h4 className="font-display font-semibold text-[14px] text-ink-soft mb-4">
            Already covered above
          </h4>
          <div className="flex flex-col gap-2.5">
            {relatedModules.map((m) => (
              <Link
                key={m.slug}
                href={`/services/${m.slug}`}
                className="group flex items-center justify-between text-[14px] font-medium py-2 border-b border-line last:border-b-0"
              >
                {m.title}
                <ArrowRight size={14} className="text-ink-soft group-hover:translate-x-0.5 group-hover:text-ink transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}