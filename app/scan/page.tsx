import type { Metadata } from "next";
import ScanStart from "@/components/ScanStart";

// The free store check (launched 18 Oct 2026). The address box hands off to the live check on the dashboard
// (bugradar-dashboard.vercel.app/#/scan), which runs Radar from our own server and shows each check as it happens.
const DESCRIPTION =
  "Type your Shopify store's address. In about two minutes BugRadar opens it like a shopper and checks the homepage, menu, a collection, a product page, search, missing pages and search-engine tags. Free, no sign-up.";
export const metadata: Metadata = {
  metadataBase: new URL("https://bugradar.in"),
  title: "Free store check — BugRadar",
  description: DESCRIPTION,
  alternates: { canonical: "https://bugradar.in/scan" },
  // the preview card when the link is shared; the picture is ./opengraph-image.tsx
  openGraph: { title: "Is anything broken on your store right now? — BugRadar", description: DESCRIPTION,
    url: "https://bugradar.in/scan", siteName: "BugRadar", type: "website" },
  twitter: { card: "summary_large_image", title: "Free Shopify store check — BugRadar", description: DESCRIPTION },
};

const CHECKS: [string, string][] = [
  ["Homepage", "Opens, loads fast, no broken images or page errors."],
  ["Menu", "The main menu's links open real pages."],
  ["Collection", "A collection page lists products."],
  ["Product page", "Name, price, picture and the buy button are all there."],
  ["Search", "Searching finds real products, not an empty page."],
  ["Missing pages", "A page that doesn't exist says so (404), as Google expects."],
  ["Search engines", "The homepage title and description are set."],
];

const STEPS: [string, string][] = [
  ["Type your address", "The one shoppers visit, or your .myshopify.com address. No sign-up, no app to install."],
  ["Watch it run", "Radar opens your store in a real browser and ticks off each check live."],
  ["Get the result", "A score out of 100 and each check in plain words, with the page to open when something's wrong."],
];

const DAILY: string[] = [
  "A full shopper journey: home → collection → product → cart → checkout button",
  "Add to cart, change quantity, remove",
  "Everything again in a mobile browser",
  "Pincode delivery checker and coupon box",
  "Sizes, colours and sold-out products",
  "Every day (every 4 hours on Pro), with an alert the moment a check catches a problem",
];

export default function ScanPage() {
  return (
    <main>
      {/* Hero: the address box */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-[1.15fr_1fr] gap-14 items-start py-16 md:py-24">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-[13px] text-ink-soft">Free store check</span>
            </div>
            <h1 className="font-display text-[34px] md:text-[48px] font-semibold leading-[1.1] tracking-tight mb-5 max-w-[16ch]">
              Is anything broken on your store right now?
            </h1>
            <p className="text-[17px] text-ink-soft max-w-[46ch] mb-8 leading-relaxed">
              Type your Shopify store&apos;s address. In about two minutes BugRadar opens it like a shopper and checks
              the seven things a customer hits first.
            </p>
            <ScanStart />
            <p className="text-[13px] text-ink-soft mt-3">Free · no sign-up · one check per store per day</p>
          </div>

          <div className="bg-panel rounded-xl p-6 md:p-7 text-panel-ink">
            <div className="text-[12px] tracking-[0.1em] uppercase text-panel-muted mb-4">What the free check tests</div>
            <ol className="grid gap-3.5">
              {CHECKS.map(([name, what], i) => (
                <li key={name} className="grid grid-cols-[22px_1fr] gap-3">
                  <span className="font-display text-gold-soft text-[14px] leading-6">{i + 1}</span>
                  <span>
                    <span className="font-medium">{name}</span>
                    <span className="block text-panel-muted text-[14px] leading-snug">{what}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <h2 className="font-display text-[26px] md:text-[30px] font-semibold mb-8">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(([title, body], i) => (
              <div key={title} className="border border-line rounded-xl p-6 bg-paper">
                <div className="font-display text-gold text-[13px] mb-2">Step {i + 1}</div>
                <div className="font-medium text-[16px] mb-1.5">{title}</div>
                <p className="text-ink-soft text-[14.5px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-ink-soft text-[14px] mt-6 max-w-[70ch] leading-relaxed">
            Radar is read-only. It never places an order, never fills a form, follows your store&apos;s robots.txt and
            identifies itself in every request. <a href="/bot" className="underline underline-offset-2">About the bot</a>.
          </p>
        </div>
      </section>

      {/* What BugRadar is building */}
      <section className="border-t border-line py-16 bg-paper-alt">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-[26px] md:text-[30px] font-semibold mb-4 max-w-[20ch]">
              The free check is seven checks, once. Daily checks go much further.
            </h2>
            <p className="text-ink-soft text-[15.5px] leading-relaxed max-w-[48ch]">
              The same robot shopper, every day, in desktop and mobile browsers, with an email the moment a check
              catches a problem. Free for the core checks; Pro checks everything every 4 hours.
            </p>
            <a href="/contact" className="inline-block mt-5 bg-ink text-paper px-5 py-3 rounded-md font-medium text-[14.5px]">Start daily checks</a>
          </div>
          <ul className="grid gap-3">
            {DAILY.map((d) => (
              <li key={d} className="flex gap-3 items-start border border-line rounded-lg bg-paper px-4 py-3 text-[15px]">
                <span aria-hidden="true" className="text-gold">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-10">
        <div className="max-w-[1180px] mx-auto px-8">
          <p className="text-[13px] text-ink-soft max-w-[80ch]">
            Checks are added every week and results can change as Radar learns. The free check works
            for Shopify stores today; other platforms are coming.
          </p>
        </div>
      </section>
    </main>
  );
}
