import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Ban, KeyRound, Bot, Store, Timer, BellRing, Check } from "lucide-react";
import StoreMock from "@/components/StoreMock";
import StoreDemo from "@/components/StoreDemo";
import ScenarioReplay from "@/components/ScenarioReplay";
import SectionHeading from "@/components/SectionHeading";
import ProofStrip from "@/components/ProofStrip";
import FoundSection from "@/components/FoundSection";
import VideoEmbed from "@/components/VideoEmbed";
import AppStoreCta from "@/components/AppStoreCta";
import { APP_STORE_URL, PRO_PRICE, PRO_PERIOD, PRO_TRIAL } from "@/lib/launch";
import { checkAreas, homeFaq } from "@/lib/product";

export const metadata: Metadata = {
  title: "BugRadar — daily store checks for Shopify",
  description:
    "BugRadar opens your Shopify store in desktop and mobile browsers, walks the menu, collections, product pages and cart like a shopper, and alerts you the moment a check catches a problem. 800+ Shopify stores checked.",
};

const STEPS = [
  { icon: Store, title: "Add your store", body: APP_STORE_URL
      ? "Install BugRadar from the Shopify App Store. No code, no theme changes, no access to your orders or customers."
      : "Install BugRadar from the Shopify App Store (coming soon), or send us your store's address today. No code, no theme changes." },
  { icon: Timer, title: "First check in a minute", body: "Radar opens your store like a shopper, in a desktop and a mobile browser, and ticks off every check. Then again every day, or every 4 hours on Pro." },
  { icon: BellRing, title: "Email or Slack when something breaks", body: "🔴 the moment a check catches a problem, 🟢 when it's fixed. Slack is one click: Add to Slack. A store that doesn't load is checked again 10 minutes later before you're told." },
];

const SAFETY = [
  { icon: Ban, title: "Never buys anything", body: "Checkout is opened to see that it works, never filled in or paid. No orders, no test charges." },
  { icon: ShieldCheck, title: "No Shopify permissions", body: "The app asks for no access to your orders, customers or products. Radar only sees what a shopper sees." },
  { icon: KeyRound, title: "Password stores, safely", body: "Store still behind a password? Its password is kept encrypted and typed only into Shopify's own password page." },
  { icon: Bot, title: "A polite visitor", body: "A few pages per check, one at a time, and it follows your robots.txt. See how the BugRadar bot behaves." },
];

const TEASER = [
  { name: "Free", price: "$0", period: "", note: "No time limit", dark: false, items: [
    "Core checks once a day: store opens, menus, product pages, add to cart, cart",
    "In desktop and mobile browsers",
    "Email the moment a check catches a problem, and when it's fixed",
  ] },
  { name: "Pro", price: PRO_PRICE, period: PRO_PERIOD, note: PRO_TRIAL, dark: true, items: [
    "Every check, up to 35, every 4 hours",
    "Slack alerts, morning summary and a Monday report",
    "Payment-provider alerts, screenshots and history",
  ] },
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
            </div>
            <h1 className="font-display text-[36px] md:text-[52px] font-semibold leading-[1.08] tracking-tight mb-5 max-w-[15ch] [text-wrap:balance]">
              Your store, checked like a shopper. Every day.
            </h1>
            <p className="text-[17.5px] text-ink-soft max-w-[46ch] mb-8 leading-relaxed">
              BugRadar opens your Shopify store in desktop and mobile browsers, walks the menu, product pages and cart,
              and tells you the moment a check catches a problem, before a customer finds it.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/scan" className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px]">
                Check your store free
              </Link>
              {APP_STORE_URL ? (
                <AppStoreCta />
              ) : (
                <Link href="/contact" className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] hover:border-ink-soft transition-colors bg-paper">
                  Start daily checks
                </Link>
              )}
            </div>
            <p className="text-[13px] text-ink-soft mt-4">Free check in 2 minutes · no sign-up · never places an order</p>
            {!APP_STORE_URL && <AppStoreCta className="mt-5" />}
          </div>
          <div className="min-w-0">
            <StoreDemo />
          </div>
        </div>
      </section>

      <ProofStrip />

      {/* Problem */}
      <section className="py-20">
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

      <FoundSection />

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
          <div className="mt-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="font-display text-[22px] font-semibold mb-2">See it work</h3>
              <p className="text-[15px] text-ink-soft leading-relaxed max-w-[44ch]">
                A short tour of BugRadar: what it checks on your store and what you get when something
                breaks.
              </p>
            </div>
            <div className="min-w-0"><VideoEmbed /></div>
          </div>
        </div>
      </section>

      {/* What you see */}
      <section className="border-t border-line py-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <SectionHeading title="What you see every morning"
            description="Your store's score, every check in desktop and mobile browsers, and what broke in plain words. Inside your Shopify admin, with alerts by email or Slack." />
          <div className="min-w-0 lg:pl-6 pb-8"><StoreMock /></div>
        </div>
      </section>

      {/* What we check */}
      <section id="checks" className="bg-panel text-panel-ink py-20 scroll-mt-24">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading onDark title="What BugRadar checks"
            description="Up to 35 checks across your whole store, each in a desktop and a mobile browser. Free runs the core checks once a day; Pro runs all of them every 4 hours. Checkout is opened, never filled in or paid." />
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
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <SectionHeading title="Start free. Go Pro when you want more." description="Billed through Shopify, on your usual Shopify bill. Cancel any time." />
          <div className="grid md:grid-cols-2 gap-5">
            {TEASER.map((p) => (
              <div key={p.name} className={`rounded-xl p-6 md:p-7 border ${p.dark ? "bg-panel text-panel-ink border-panel-line" : "bg-white border-line"}`}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
                  <h3 className="font-display text-[20px] font-semibold">{p.name}</h3>
                  <div className="font-display"><span className="text-[28px] font-semibold">{p.price}</span><span className={`text-[14px] ${p.dark ? "text-panel-muted" : "text-ink-soft"}`}>{p.period}</span></div>
                </div>
                <p className={`text-[13.5px] mb-5 ${p.dark ? "text-gold-soft" : "text-ink-soft"}`}>{p.note}</p>
                <ul className="flex flex-col gap-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2.5 text-[14.5px]">
                      <Check size={16} className={`mt-[3px] ${p.dark ? "text-gold-soft" : "text-clear"}`} aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-7 flex justify-center">
            <Link href="/pricing" className="border border-line px-5 py-3 rounded-md font-medium text-[15px] bg-white hover:border-ink-soft transition-colors">Compare plans</Link>
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
          <p className="text-[15px] text-panel-muted mb-7">1 in 15 stores we checked had one. Find out in about two minutes. Free, no sign-up.</p>
          <Link href="/scan" className="inline-block bg-gold text-[#241703] px-6 py-3.5 rounded-md font-semibold text-[15px]">
            Check your store free
          </Link>
        </div>
      </section>
    </>
  );
}
