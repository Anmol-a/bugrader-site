import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import AppStoreCta from "@/components/AppStoreCta";
import { APP_STORE_URL, PRO_PRICE, PRO_PERIOD, PRO_TRIAL } from "@/lib/launch";

// Free / Pro, the same as the Shopify app (dashboard web/src/lib/plans.ts, 27 Oct 2026).
export const metadata: Metadata = {
  title: "Pricing — BugRadar",
  description: `BugRadar Free: core checks of your Shopify store once a day in desktop and mobile browsers, with email alerts. Pro: every check every 4 hours, Slack and more, ${PRO_PRICE}${PRO_PERIOD} after a ${PRO_TRIAL}.`,
};

const FREE = [
  "Core checks once a day: the store opens, homepage and menus, a shopper's path, every product page, add to cart and the cart",
  "Each check in a desktop and a mobile browser",
  "🔴 email the moment a check catches a problem, 🟢 when it's fixed",
  "Your store's score and results inside Shopify admin",
];

const PRO = [
  "Every check, up to 35: also collections, search, checkout, the discount box, pincode, Cash on Delivery, WhatsApp button, policy pages and Google tags",
  "Checked every 4 hours instead of once a day",
  "Slack alerts: one click, Add to Slack",
  "9:00 AM summary and a Monday report",
  "Payment-provider alerts for the providers you use",
  "Screenshots and history of every check",
];

const FAQ: [string, string][] = [
  ["How is Pro billed?", "Through Shopify, on your usual Shopify bill. Prices are in US dollars. Cancel any time from your Shopify admin."],
  ["What happens after the free trial?", `The ${PRO_TRIAL} gives you everything in Pro. Cancel before it ends and nothing is charged. Otherwise Pro is ${PRO_PRICE}${PRO_PERIOD}.`],
  ["Can I stay on Free?", "Yes. Free has no time limit, and you can move between Free and Pro whenever you like."],
  ["I run more than one store.", "Each store has its own plan and its own checks."],
];

export default function Pricing() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <PageIntro
            title="Start free. Go Pro when you want more."
            description="Both plans check your store like a shopper, in desktop and mobile browsers, and never place an order. Pro checks everything, more often, and adds Slack."
          />
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-6 items-stretch">
          {/* Free */}
          <div className="bg-white border border-line rounded-xl p-7 md:p-8 flex flex-col">
            <h2 className="font-display text-[22px] font-semibold mb-1">Free</h2>
            <div className="font-display text-[40px] font-semibold leading-tight mb-1">$0</div>
            <p className="text-ink-soft text-[14px] mb-6">per store, no time limit</p>
            <ul className="flex flex-col gap-3 mb-8">
              {FREE.map((b) => (
                <li key={b} className="grid grid-cols-[18px_minmax(0,1fr)] gap-3 text-[14.5px]">
                  <Check size={16} className="text-clear mt-1" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3">
              {APP_STORE_URL && <AppStoreCta />}
              <Link href="/scan" className={APP_STORE_URL
                ? "border border-line px-5 py-3 rounded-md font-medium text-[14.5px] hover:border-ink-soft transition-colors"
                : "bg-ink text-paper px-5 py-3 rounded-md font-medium text-[14.5px]"}>Check your store free</Link>
              {!APP_STORE_URL && (
                <Link href="/contact" className="border border-line px-5 py-3 rounded-md font-medium text-[14.5px] hover:border-ink-soft transition-colors">Start daily checks</Link>
              )}
            </div>
          </div>

          {/* Pro */}
          <div className="bg-panel text-panel-ink rounded-xl p-7 md:p-8 border border-panel-line flex flex-col">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
              <h2 className="font-display text-[22px] font-semibold">Pro</h2>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold-soft border border-gold/60 rounded-full px-2 py-[1px]">{PRO_TRIAL}</span>
            </div>
            <div className="font-display leading-tight mb-1">
              <span className="text-[40px] font-semibold">{PRO_PRICE}</span>
              <span className="text-[16px] text-panel-muted">{PRO_PERIOD}</span>
            </div>
            <p className="text-panel-muted text-[14px] mb-6">per store, billed through Shopify</p>
            <p className="text-[14px] text-panel-muted mb-3">Everything in Free, plus:</p>
            <ul className="flex flex-col gap-3 mb-8">
              {PRO.map((b) => (
                <li key={b} className="grid grid-cols-[18px_minmax(0,1fr)] gap-3 text-[14.5px]">
                  <Check size={16} className="text-gold-soft mt-1" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <AppStoreCta onDark />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <div className="bg-paper-alt border border-line rounded-xl p-6 md:p-8">
            <h2 className="font-display text-[19px] font-semibold mb-4">Billing questions</h2>
            <dl className="grid md:grid-cols-2 gap-x-10 gap-y-5 text-[14.5px]">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-medium mb-1">{q}</dt>
                  <dd className="text-ink-soft leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
