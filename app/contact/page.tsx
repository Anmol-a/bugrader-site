import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/lib/content";
import AppStoreCta from "@/components/AppStoreCta";

export const metadata: Metadata = {
  title: "Get started — BugRadar",
  description: "Install BugRadar from the Shopify App Store, or tell us your store and we'll set up its daily checks for you.",
};

const NEXT: [string, string][] = [
  ["We reply within a day", "and confirm your store's address."],
  ["Daily checks start", "in desktop and mobile browsers, with email alerts to you."],
  ["Install the Shopify app when you're ready", "and pick Free or Pro there. Nothing to redo."],
];

export default function Contact() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="font-display text-[30px] md:text-[34px] font-semibold mb-2.5">Start daily checks on your store</h1>
          <p className="text-[15.5px] leading-relaxed text-ink-soft max-w-[56ch] mb-6">
            The quickest way is to install BugRadar from the Shopify App Store. If you&apos;d rather we set it up for you, tell us your store and we&apos;ll start its daily checks right away, on the Free plan.
          </p>
          <AppStoreCta className="mb-10" />
          <ol className="flex flex-col gap-4 mb-10">
            {NEXT.map(([b, t], i) => (
              <li key={b} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 text-[15px]">
                <span className="font-display text-gold font-semibold">{i + 1}</span>
                <span><span className="font-medium">{b}</span> <span className="text-ink-soft">{t}</span></span>
              </li>
            ))}
          </ol>
          <p className="text-[14.5px] text-ink-soft mb-2">
            Want to see results first? <Link href="/scan" className="underline underline-offset-2">Run the free check</Link>.
          </p>
          <p className="text-[14.5px] text-ink-soft">
            Anything else: <a href={`mailto:${contactEmail}`} className="font-medium text-ink underline decoration-line underline-offset-4">{contactEmail}</a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
