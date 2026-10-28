import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — BugRadar",
  description:
    "What BugRadar collects when you use the free store check, daily checks, the dashboard or the Shopify app, why, where it is kept and how to have it deleted.",
};

const UPDATED = "25 October 2026";

type Section = { title: string; rows?: [string, string][]; body?: string[] };

const sections: Section[] = [
  {
    title: "Who we are",
    body: [
      "BugRadar (bugradar.in) checks online stores the way a shopper would and tells the store's team when something breaks.",
      "For anything in this policy, write to hello@bugradar.in. We answer within 7 days.",
    ],
  },
  {
    title: "What we collect and why",
    rows: [
      ["Free store check (bugradar.in/scan)", "The store address you type, the result and screenshots of the store's public pages, and a one-way hash of your IP address so one visitor can't flood the checker. If you leave your email to hear more, we keep it to reply to you."],
      ["Contact form", "Your name, email, company and message. They are sent to our inbox (hello@bugradar.in) so we can reply. They are not stored on the website."],
      ["Dashboard account", "Your email address, used to sign you in with a one-time link and to send the alerts and summaries you switch on."],
      ["Daily checks", "The store address, the results of each check, screenshots of the store's public pages and the alert settings you choose."],
      ["Store password (optional)", "If a store is password-protected (a Shopify development or pre-launch store), its owner can give us the storefront password. See \"Store passwords\" below."],
      ["Shopify app", "When a store installs BugRadar from Shopify, we read the store's name, its addresses (myshopify.com and its main domain) and its contact email. If no contact email is readable, we use the email of the staff member who opened the app. We ask Shopify for no access scopes: we can't read orders, customers, products or any other store data through Shopify."],
    ],
  },
  {
    title: "What we never collect",
    body: [
      "We never collect the personal data of a store's shoppers. Our checks visit public store pages only: they never sign in as a customer, place orders, enter payment details, submit forms or subscribe to anything.",
      "We don't use advertising or analytics cookies on bugradar.in. The dashboard keeps your sign-in in your browser's storage so you stay signed in.",
      "We don't sell any data, and we don't use store pages, screenshots or results to train AI models.",
    ],
  },
  {
    title: "Store passwords",
    body: [
      "A store password is stored encrypted (Supabase Vault). It is never shown again, not even to the person who saved it.",
      "Our checker reads it only while it is checking that store, and types it only into Shopify's own storefront password form on the store's exact address. It is kept out of screenshots, recordings, logs and error messages.",
      "It is deleted when the owner clears it, when the store or workspace is deleted, or when the Shopify app is uninstalled.",
    ],
  },
  {
    title: "Who helps us run BugRadar",
    rows: [
      ["Supabase", "Database, sign-in and file storage, in Mumbai, India (AWS ap-south-1)."],
      ["Our own check server", "Runs the store checks (a rented server from Contabo)."],
      ["Resend", "Sends our emails: sign-in links, alerts, summaries and contact-form messages."],
      ["Vercel", "Hosts bugradar.in and the dashboard."],
      ["Cloudflare Turnstile", "Tells people from bots on the free store check."],
      ["Shopify", "Installs and opens the BugRadar app inside the Shopify admin."],
    ],
    body: [
      "Each of these only receives what it needs for its part of the work. Some of them may process data outside India.",
    ],
  },
  {
    title: "Who can see what",
    body: [
      "Free store check results can be opened by anyone with the result's link, so you can share it. A result shows only the store's public pages.",
      "Daily check results, screenshots and alerts are visible only to the members of the store's workspace and to the BugRadar team, who look at them to support you and to improve the checks.",
      "A workspace member can make a read-only report link to share with someone else. Anyone with that link can open that one report until the link expires or is turned off.",
    ],
  },
  {
    title: "How long we keep it",
    rows: [
      ["Daily checks and dashboard data", "While the workspace exists. Ask us to delete the workspace and its stores, results, screenshots and alert settings are deleted."],
      ["Shopify app installs", "Uninstalling pauses the checks and deletes the store password at once. Shopify then tells us to erase the store's data (48 hours later) and we delete the workspace the app made, with its results and screenshots."],
      ["Free store checks and emails you left", "Until you ask us to delete them."],
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask to see, correct or delete the data we hold about you or your store at any time: write to hello@bugradar.in from the email address it concerns.",
      "You can switch alerts and summaries off in the dashboard, and stop checks of your store at any time.",
      "Store owners who don't want our checker to visit their store can block it in robots.txt; see bugradar.in/bot.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If we change this policy we update the date below. If a change affects how we use data you already gave us, we email the workspace owners first.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="pt-16 pb-20">
      <div className="max-w-[860px] mx-auto px-6 sm:px-8">
        <h1 className="font-display text-[32px] md:text-[40px] font-semibold tracking-tight mb-3">Privacy policy</h1>
        <p className="text-[16.5px] text-ink-soft mb-2 max-w-[60ch]">
          What BugRadar collects, why, where it is kept and how to have it deleted. Written in plain words.
        </p>
        <p className="text-[13.5px] text-ink-soft opacity-75 mb-12">Last updated {UPDATED}</p>

        <div className="flex flex-col gap-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-[21px] md:text-[23px] font-semibold mb-4">{s.title}</h2>
              {s.rows && (
                <dl className="divide-y divide-line border-y border-line mb-4">
                  {s.rows.map(([k, v]) => (
                    <div key={k} className="grid md:grid-cols-[220px_1fr] gap-1.5 md:gap-8 py-4">
                      <dt className="font-medium text-[15px]">{k}</dt>
                      <dd className="text-[15px] text-ink-soft leading-relaxed break-words">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {s.body && (
                <div className="flex flex-col gap-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-[15px] text-ink-soft leading-relaxed max-w-[68ch]">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
