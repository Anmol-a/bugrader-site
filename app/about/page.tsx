import type { Metadata } from "next";
import Link from "next/link";
import { Ban, Smartphone, Settings, BellOff } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About — BugRadar",
  description: "Why BugRadar exists, who builds it, and the rules it follows on every store it checks.",
};

const FACTS: [string, string][] = [
  ["800+", "Shopify stores checked while building BugRadar"],
  ["72", "real problems on 53 Shopify stores, each re-checked live on 25 Oct 2026"],
  ["Up to 35", "shopper checks per store, each in desktop and mobile browsers"],
];

const RULES = [
  { icon: Ban, title: "It looks, it never buys", body: "Checkout is opened to see that it works, never filled in or paid. No orders, no test charges, no forms sent." },
  { icon: Smartphone, title: "Desktop and mobile browsers", body: "Most shoppers are on mobile, so every check runs twice: once in a desktop browser, once in a mobile browser." },
  { icon: Settings, title: "Nothing to set up", body: "BugRadar finds your menu, collections, products and cart by itself from your store's address. No code, no theme changes, no tests to write." },
  { icon: BellOff, title: "Quiet until it matters", body: "You hear from BugRadar when something breaks or gets fixed, plus a short morning summary on Pro. A store that didn't load is looked at again before anyone is told." },
];

export default function About() {
  return (
    <>
      <section className="pt-16 pb-14">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-[1.2fr_1fr] gap-14 items-start">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[34px] md:text-[42px] font-semibold leading-tight max-w-[16ch] [text-wrap:balance]">
              Stores break quietly. BugRadar notices first.
            </h1>
            <p className="text-[16px] leading-relaxed text-ink-soft max-w-[58ch]">
              A theme update moves the buy button. A new app clashes with the cart. A menu link still points to a
              collection that was deleted last month. Nobody clicks through the whole store every morning, so the store
              owner hears about it from a customer, or from a quiet drop in sales.
            </p>
            <p className="text-[16px] leading-relaxed text-ink-soft max-w-[58ch]">
              BugRadar is a robot shopper that walks your Shopify store every day, in desktop and mobile browsers, and
              tells you the moment a check catches a problem.
            </p>
            <p className="text-[16px] leading-relaxed text-ink-soft max-w-[58ch]">
              It&apos;s built in Mumbai by a QA lead with eight years of production testing, the last six spent building
              and running the test automation of a large consumer app from scratch. BugRadar is the daily check every
              store should have and almost none do.
            </p>
          </div>
          <dl className="bg-panel text-panel-ink rounded-xl p-7 flex flex-col gap-6">
            {FACTS.map(([n, label]) => (
              <div key={label} className="border-l-2 border-gold pl-4">
                <dt className="font-display text-[30px] font-semibold leading-none mb-1.5 tabular-nums">{n}</dt>
                <dd className="text-[14px] text-panel-muted leading-snug">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading title="The rules BugRadar follows on every store" />
          <div className="grid sm:grid-cols-2 gap-5">
            {RULES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-line rounded-xl p-6 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-lg bg-paper-alt border border-line flex items-center justify-center"><Icon size={18} strokeWidth={1.75} /></span>
                <h2 className="text-[16px] font-semibold">{title}</h2>
                <p className="text-[14.5px] text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-[26px] font-semibold">See it on your own store</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/scan" className="bg-ink text-paper px-5 py-3 rounded-md font-medium text-[15px]">Check your store free</Link>
            <Link href="/contact" className="border border-line bg-white px-5 py-3 rounded-md font-medium text-[15px]">Start daily checks</Link>
          </div>
        </div>
      </section>
    </>
  );
}
