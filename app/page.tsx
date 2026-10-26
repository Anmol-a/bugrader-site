import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Ban, KeyRound, Bot, Store, Timer, BellRing } from "lucide-react";
import StoreMock from "@/components/StoreMock";
import StoreDemo from "@/components/StoreDemo";
import ScenarioReplay from "@/components/ScenarioReplay";
import SectionHeading from "@/components/SectionHeading";
import { checkAreas, homeFaq } from "@/lib/product";

export const metadata: Metadata = {
  title: "BugRadar — daily store checks for Shopify",
  description:
    "BugRadar opens your Shopify store on a computer and a phone every day, walks the menu, collections, product pages and cart like a shopper, and emails you the moment something breaks.",
};

const STEPS = [
  { icon: Store, title: "Add your store", body: "Install BugRadar on Shopify, or give us your store's address during the beta. No code, no theme changes, no permissions to approve." },
  { icon: Timer, title: "First check in a minute", body: "Radar opens your store like a shopper, on a computer and on a phone, and ticks off every check. Then it does it again every day." },
  { icon: BellRing, title: "Email when something breaks", body: "🔴 when a check breaks, 🟢 when it's fixed, and a short 9:00 AM summary. A store that doesn't load is checked again 10 minutes later before you're told." },
];

const SAFETY = [
  { icon: Ban, title: "Never buys anything", body: "Checkout is opened to see that it works, never filled in or paid. No orders, no test charges." },
  { icon: ShieldCheck, title: "No Shopify permissions", body: "The app asks for no access to your orders, customers or products. Radar only sees what a shopper sees." },
  { icon: KeyRound, title: "Password stores, safely", body: "Store still behind a password? Its password is kept encrypted and typed only into Shopify's own password page." },
  { icon: Bot, title: "A polite visitor", body: "A few pages per check, one at a time, and it follows your robots.txt. See how the BugRadar bot behaves." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-[1180px] mx-auto px-6 sm:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-14 items-center pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-[13px] text-ink-soft">For Shopify stores</span>
              <span className="ml-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-gold border border-gold/60 rounded-full px-2 py-[1px]">Beta</span>
            </div>
            <h1 className="font-display text-[36px] md:text-[52px] font-semibold leading-[1.08] tracking-tight mb-5 max-w-[15ch] [text-wrap:balance]">
              Your store, checked like a shopper. Every day.
            </h1>
            <p className="text-[17.5px] text-ink-soft max-w-[46ch] mb-8 leading-relaxed">
              BugRadar opens your Shopify store on a computer and a phone, walks the menu, product pages and cart,
              and emails you the moment something breaks, before a customer finds it.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/scan" className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px]">
                Check your store free
              </Link>
              <Link href="/contact" className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] hover:border-ink-soft transition-colors bg-paper">
                Get early access
              </Link>
            </div>
            <p className="text-[13px] text-ink-soft mt-4">Free check in 2 minutes · no sign-up · never places an order</p>
          </div>
          <div className="min-w-0">
            <StoreDemo />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-line py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading
              title="Most stores find out from a customer."
              description="A theme update, a new app or a price change can quietly break a page. Nobody on the team clicks through the whole store every morning, so the first person to notice is a shopper who leaves."
            />
          </div>
          <ScenarioReplay />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-line py-20 scroll-mt-24">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading title="How it works" description="Nothing to set up and nothing to write. You only hear from BugRadar when something changes." />
          <ol className="grid md:grid-cols-3 gap-5">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="bg-white border border-line rounded-xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-panel text-gold-soft flex items-center justify-center"><Icon size={18} strokeWidth={1.75} /></span>
                  <span className="font-display text-[13px] text-ink-soft">Step {i + 1}</span>
                </div>
                <h3 className="font-display text-[19px] font-semibold">{title}</h3>
                <p className="text-[14.5px] text-ink-soft leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you see */}
      <section className="border-t border-line py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <SectionHeading title="What you see every morning"
            description="Your store's score, every check on a computer and on a phone, and what broke in plain words. Inside your Shopify admin, with the same thing in your inbox." />
          <div className="min-w-0 lg:pl-6 pb-8"><StoreMock /></div>
        </div>
      </section>

      {/* What we check */}
      <section id="checks" className="bg-panel text-panel-ink py-20 scroll-mt-24">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading onDark title="What BugRadar checks, every day"
            description="Over 30 checks across your whole store, each on a computer and on a phone. Checkout is opened, never filled in or paid." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checkAreas.map((a) => (
              <div key={a.title} className="bg-panel-2 border border-panel-line rounded-xl p-5 flex flex-col gap-3 min-w-0">
                <h3 className="font-display text-[16.5px] font-semibold">{a.title}</h3>
                <ul className="flex flex-col gap-2">
                  {a.items.map((it) => (
                    <li key={it} className="text-[13.5px] text-panel-muted leading-snug pl-3.5 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold/70">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading title="It looks. It never touches your money." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAFETY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-lg bg-paper-alt border border-line flex items-center justify-center"><Icon size={18} strokeWidth={1.75} /></span>
                <h3 className="font-semibold text-[15.5px]">{title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-[13.5px] text-ink-soft mt-8">
            Details: <Link href="/bot" className="underline underline-offset-2">how the BugRadar bot behaves</Link> ·{" "}
            <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>
          </p>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-paper-alt border-y border-line py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-[28px] font-semibold mb-2.5">Free while BugRadar is in beta</h2>
            <p className="text-[15.5px] text-ink-soft leading-relaxed max-w-[52ch]">
              Daily checks on a computer and a phone, email alerts, the morning summary and payment-provider status, at no cost
              during the beta. Paid plans with more frequent checks come later, and we&apos;ll tell you before anything changes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 md:justify-end">
            <Link href="/pricing" className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] bg-white hover:border-ink-soft transition-colors">See pricing</Link>
            <Link href="/contact" className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px]">Get early access</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-[860px] mx-auto px-6 sm:px-8">
          <h2 className="font-display text-[28px] font-semibold mb-8">Questions store owners ask</h2>
          <div className="divide-y divide-line border-y border-line">
            {homeFaq.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between gap-6 font-medium text-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded">
                  {q}
                  <span className="text-ink-soft transition-transform group-open:rotate-45 shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="text-[15px] text-ink-soft leading-relaxed mt-3 max-w-[68ch]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-panel py-16 text-center">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <h2 className="font-display text-[28px] font-semibold text-panel-ink mb-3">Is anything broken on your store right now?</h2>
          <p className="text-[15px] text-panel-muted mb-7">Find out in about two minutes. Free, no sign-up.</p>
          <Link href="/scan" className="inline-block bg-gold text-[#241703] px-6 py-3.5 rounded-md font-semibold text-[15px]">
            Check your store free
          </Link>
        </div>
      </section>
    </>
  );
}
