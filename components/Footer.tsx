const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["/#how", "How it works"],
      ["/#checks", "What we check"],
      ["/pricing", "Pricing"],
      ["/scan", "Free store check"],
      ["/payments-status", "Payment providers status"],
      ["/guides", "Guides"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About"],
      ["/contact", "Contact"],
    ],
  },
  {
    title: "Trust",
    links: [
      ["/privacy", "Privacy"],
      ["/bot", "BugRadar bot"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid gap-10 grid-cols-2 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
          <div className="flex items-center gap-3 font-display font-semibold text-[17px]">
            <svg viewBox="0 0 100 100" className="w-[30px] h-[30px] shrink-0" aria-hidden="true">
              <rect width="100" height="100" rx="22" className="fill-panel" />
              <path d="M 46 58 L 65.7 20.9 A 42 42 0 0 1 87.8 62.4 Z" className="fill-gold" />
              <circle cx="46" cy="58" r="5.5" className="fill-gold" />
            </svg>
            BugRadar
          </div>
          <p className="text-[13.5px] text-ink-soft max-w-[34ch]">Daily shopper checks for Shopify stores. Find bugs before customers do.</p>
          <a href="mailto:hello@bugradar.in" className="text-[13.5px] text-ink-soft underline underline-offset-2 w-fit">hello@bugradar.in</a>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <div className="text-[12px] tracking-[0.1em] uppercase text-ink-soft mb-3">{c.title}</div>
            <ul className="flex flex-col gap-2">
              {c.links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-[14px] text-ink hover:underline underline-offset-2">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 mt-10 pt-6 border-t border-line flex flex-col sm:flex-row gap-2 justify-between text-[12.5px] text-ink-soft">
        <span>© 2026 BugRadar</span>
        <span>Shopify is a trademark of Shopify Inc. BugRadar is not made by Shopify.</span>
      </div>
    </footer>
  );
}
