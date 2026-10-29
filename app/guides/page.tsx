import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import AppStoreCta from "@/components/AppStoreCta";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides for Shopify stores — BugRadar",
  description: "Short, practical fixes for the store problems BugRadar finds most often: broken menu links, social links that open \"Page not found\", and missing products that show the homepage.",
};

export default function Guides() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 flex flex-col gap-12">
        <PageIntro title="Guides for Shopify stores"
          description="The problems BugRadar finds most often on real Shopify stores, why they happen and how to fix them yourself in a few minutes." />
        <ul className="grid md:grid-cols-3 gap-5">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="block h-full border border-line rounded-xl p-6 bg-paper hover:border-ink-soft transition-colors">
                <div className="text-[12.5px] text-ink-soft mb-3">{g.minutes} min read</div>
                <h2 className="font-display text-[19px] font-semibold leading-snug mb-3 [text-wrap:balance]">{g.title}</h2>
                <p className="text-[14.5px] text-ink-soft leading-relaxed">{g.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4">
          <AppStoreCta />
          <Link href="/scan" className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] hover:border-ink-soft transition-colors bg-paper">Check your store free</Link>
        </div>
      </div>
    </section>
  );
}
