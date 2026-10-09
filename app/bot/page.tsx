import type { Metadata } from "next";

// Public description of BugRadar's monitoring bot, for store owners, CDNs and bot directories (Cloudflare BotBase).
// Unlisted on purpose: not linked from the site menu and not indexed by search engines.
export const metadata: Metadata = {
  title: "BugRadar bot — BugRadar",
  description: "What the BugRadar monitoring bot does, how it identifies itself and how to contact us.",
  robots: { index: false, follow: false },
};

const rows: [string, string][] = [
  ["What it does", "Checks Shopify stores' shopper journeys (home, collection, product page, add to cart, cart) to catch broken pages, wrong prices and failed add-to-cart, on desktop and mobile."],
  ["Volume", "Low: a handful of pages per store per run, one page at a time, with pauses between pages."],
  ["Identity", "Every request carries the User-Agent token BugRadar/0.1 (+bugradar.in) and is signed with Web Bot Auth (HTTP Message Signatures)."],
  ["Signing keys", "https://bugradar.in/.well-known/http-message-signatures-directory"],
  ["Rules it follows", "Respects robots.txt and Retry-After, never places orders or enters payment details, never creates accounts, never submits forms or subscribes."],
  ["Data", "Keeps only test results and screenshots for the store's own report. No content is used to train AI models."],
  ["Block or contact", "To stop or limit it, disallow BugRadar in robots.txt or write to hello@bugradar.in."],
];

export default function BotPage() {
  return (
    <section className="pt-16 pb-20">
      <div className="max-w-[860px] mx-auto px-8">
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold tracking-tight mb-3">BugRadar bot</h1>
        <p className="text-[16.5px] text-ink-soft mb-10 max-w-[60ch]">
          BugRadar&apos;s monitor visits online stores the way a shopper would, to find problems before customers do.
        </p>
        <dl className="divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <div key={k} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5">
              <dt className="font-medium">{k}</dt>
              <dd className="text-ink-soft break-words">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
