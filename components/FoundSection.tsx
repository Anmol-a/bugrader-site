import SectionHeading from "@/components/SectionHeading";

// "What we found": the kinds of real problems from the 72 re-checked live on 25 Oct 2026 (claude/VERIFIED-BUGS_25oct.md).
// Examples are made up on purpose. Never name a store here.
type Kind = { count: string; unit: string; title: string; body: string; tap: string; path: string; result: string };

const KINDS: Kind[] = [
  {
    count: "62",
    unit: "dead links",
    title: "Links that open “Page not found”",
    body: "A menu item, sale banner, homepage button or footer link points to a page that was renamed or deleted. By far the most common problem.",
    tap: "Banner: “Only this week”",
    path: "/collections/sale",
    result: "Page not found",
  },
  {
    count: "10",
    unit: "stores",
    title: "Missing pages that quietly show the homepage",
    body: "An old product link from an ad, WhatsApp or Google lands on the homepage with no message. Google flags these too.",
    tap: "Old link from an ad",
    path: "/products/summer-kit",
    result: "Homepage, no message",
  },
  {
    count: "9",
    unit: "of those links",
    title: "Refund, shipping or terms page missing",
    body: "The footer links to a policy page that doesn't exist, right where careful shoppers look before they pay.",
    tap: "Footer: “Refund policy”",
    path: "/pages/refund-policy",
    result: "Page not found",
  },
  {
    count: "5",
    unit: "of those links",
    title: "Social and phone links missing https://",
    body: "The footer's Instagram or phone link opens a page on the store itself instead of the app, so it goes nowhere.",
    tap: "Footer: “Instagram”",
    path: "/www.instagram.com/yourstore",
    result: "Page not found",
  },
];

export default function FoundSection() {
  return (
    <section id="found" className="border-t border-line py-20 scroll-mt-24">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
        <SectionHeading
          title="What we found on 800+ Shopify stores"
          description="The robot shopper walked 818 Shopify stores from 13 October. On 25 October every problem a page visit could prove was opened again: 72 were still live, on 53 stores. Here are the kinds, with made-up examples. No store is named."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {KINDS.map((k) => (
            <article key={k.title} className="bg-white border border-line rounded-xl p-6 flex flex-col gap-3 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[32px] font-semibold leading-none tabular-nums">{k.count}</span>
                <span className="text-[13px] text-ink-soft">{k.unit}</span>
              </div>
              <h3 className="font-display text-[18.5px] font-semibold leading-snug">{k.title}</h3>
              <p className="text-[14.5px] text-ink-soft leading-relaxed">{k.body}</p>
              <div className="mt-auto pt-1">
                <div className="rounded-lg bg-paper border border-line px-3.5 py-3 text-[13px] flex flex-col gap-1.5 min-w-0">
                  <span className="text-ink-soft">{k.tap}</span>
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                    <span className="font-mono text-[12.5px] text-ink break-all">yourstore.com{k.path}</span>
                    <span aria-hidden="true" className="text-ink-soft">→</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-alert">
                      <span className="w-1.5 h-1.5 rounded-full bg-alert" aria-hidden="true" />
                      {k.result}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="text-[13px] text-ink-soft mt-6 max-w-[80ch]">
          Only problems a plain page visit can prove are counted here, so the real number is higher. BugRadar looks for
          every one of these on your store, in desktop and mobile browsers.
        </p>
      </div>
    </section>
  );
}
