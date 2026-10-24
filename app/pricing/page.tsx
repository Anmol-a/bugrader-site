import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Pricing — BugRadar",
  description: "BugRadar is free while it's in beta: daily checks of your Shopify store on a computer and a phone, with email alerts.",
};

const BETA = [
  "Daily check of your whole store, on a computer and a phone",
  "30+ checks: menus, collections, product pages, cart, checkout, search",
  "Pincode, Cash on Delivery and WhatsApp button checks",
  "🔴 / 🟢 email the moment something breaks or is fixed",
  "9:00 AM summary and a Monday report",
  "Payment-provider status for the providers you use",
  "Password-protected and pre-launch stores",
  "Dashboard with every check, screenshot and a shareable report",
];

const LATER = [
  "Checks every few hours instead of once a day",
  "Our own check of your payment step",
  "Alerts on WhatsApp and Slack",
];

export default function Pricing() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
          <PageIntro
            title="Free while BugRadar is in beta."
            description="Everything below costs nothing during the beta. When paid plans start, beta stores hear about it first, and nothing is charged without you choosing a plan."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <div className="bg-panel text-panel-ink rounded-xl p-7 md:p-8 border border-panel-line">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
              <h2 className="font-display text-[22px] font-semibold">Beta</h2>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gold-soft border border-gold/60 rounded-full px-2 py-[1px]">Now</span>
            </div>
            <div className="font-display text-[40px] font-semibold leading-tight mb-1">₹0</div>
            <p className="text-panel-muted text-[14px] mb-6">per store, during the beta</p>
            <ul className="flex flex-col gap-3 mb-8">
              {BETA.map((b) => (
                <li key={b} className="grid grid-cols-[18px_minmax(0,1fr)] gap-3 text-[14.5px]">
                  <Check size={16} className="text-gold-soft mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="bg-gold text-[#241703] px-5 py-3 rounded-md font-semibold text-[14.5px]">Get early access</Link>
              <Link href="/scan" className="border border-panel-line text-panel-ink px-5 py-3 rounded-md font-medium text-[14.5px]">Try the free check</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-line rounded-xl p-6">
              <h2 className="font-display text-[19px] font-semibold mb-1">Paid plans, later</h2>
              <p className="text-[14px] text-ink-soft mb-4">Billed through Shopify, cancel any time from your Shopify admin. Planned:</p>
              <ul className="flex flex-col gap-2.5">
                {LATER.map((l) => (
                  <li key={l} className="text-[14px] pl-3.5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold">{l}</li>
                ))}
              </ul>
            </div>
            <div className="bg-paper-alt border border-line rounded-xl p-6">
              <h2 className="font-display text-[19px] font-semibold mb-1">Need a person to test something?</h2>
              <p className="text-[14px] text-ink-soft mb-4">
                Before a big sale or a site move, our QA team can test your store by hand, or build automation for flows
                beyond the storefront.
              </p>
              <Link href="/services" className="text-[14px] font-medium underline underline-offset-4">Custom QA projects</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
