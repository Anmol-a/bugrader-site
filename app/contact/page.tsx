import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/lib/content";

export const metadata: Metadata = {
  title: "Early access — BugRadar",
  description: "Get daily BugRadar checks on your Shopify store during the beta. Free.",
};

const NEXT: [string, string][] = [
  ["We reply within a day", "and confirm your store's address."],
  ["Daily checks start", "on a computer and a phone, with email alerts to you."],
  ["You move to the Shopify app", "when it's listed in the App Store. Nothing to redo."],
];

export default function Contact() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="font-display text-[30px] md:text-[34px] font-semibold mb-2.5">Get early access</h1>
          <p className="text-[15.5px] leading-relaxed text-ink-soft max-w-[56ch] mb-11">
            BugRadar&apos;s Shopify app is in beta. Tell us your store and we&apos;ll start its daily checks, free while the beta lasts.
          </p>
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
