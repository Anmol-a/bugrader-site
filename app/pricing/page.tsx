import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import FreeSnapshotBanner from "@/components/FreeSnapshotBanner";
import PricingTiers from "@/components/PricingTiers";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Pricing — BugRadar",
  description:
    "From a single pre-flight check to full-time coverage — pick the level your site actually needs.",
};

export default function Pricing() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-[1180px] mx-auto px-8">
          <PageIntro
            title="Pick your level of coverage."
            description="From a single pre-flight check to full-time coverage — start wherever your site actually needs it."
          />
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-[1180px] mx-auto px-8">
          <RevealOnScroll>
            <FreeSnapshotBanner />
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1180px] mx-auto px-8">
          <PricingTiers />
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8 text-center">
          <h2 className="font-display text-[26px] font-semibold mb-3 max-w-[46ch] mx-auto">
            A person does this. Not a bot.
          </h2>
          <p className="text-[15.5px] text-ink-soft leading-relaxed max-w-[64ch] mx-auto">
            Every audit and every alert starts with someone actually looking — the same
            hands-on process that found a live test product wearing a premium badge, and a
            checkout that silently split search results over a lowercase letter. Software
            runs on a schedule. We&apos;re the ones who decide what it should have caught.
          </p>
        </div>
      </section>

      <section className="bg-panel py-16 text-center">
        <div className="max-w-[560px] mx-auto px-8">
          <h2 className="font-display text-[26px] font-semibold text-panel-ink mb-3">
            Not sure which tier fits?
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
