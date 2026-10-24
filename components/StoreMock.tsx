"use client";

import { useState } from "react";
import { Check, X, Monitor, Smartphone, Mail } from "lucide-react";

// Hero picture: the BugRadar page inside Shopify admin, for an invented example store.
// Every line is a real check Radar runs (see "What we check" below); the store and its results are made up.

type Row = { ok: boolean; name: string; note: string };

const RESULTS: Record<"desktop" | "phone", { score: number; rows: Row[] }> = {
  desktop: {
    score: 94,
    rows: [
      { ok: true, name: "Homepage opens", note: "1.8 s, pictures load, no script errors" },
      { ok: true, name: "Menu links", note: "12 of 12 pages open" },
      { ok: false, name: "Pincode checker", note: "400001 answers \"Something went wrong\"" },
      { ok: true, name: "Add to cart", note: "item in cart, checkout button shows" },
      { ok: true, name: "Same price everywhere", note: "₹649 on card, product page and cart" },
      { ok: true, name: "Discount box", note: "a made-up code is refused" },
    ],
  },
  phone: {
    score: 89,
    rows: [
      { ok: true, name: "Phone menu", note: "opens, 12 links" },
      { ok: false, name: "WhatsApp button", note: "number has only 9 digits" },
      { ok: true, name: "Product page", note: "name, price, picture, buy button" },
      { ok: true, name: "Size switch", note: "price updates to ₹1,099" },
      { ok: true, name: "Cart drawer", note: "same item and total as the cart page" },
      { ok: true, name: "Search", note: "\"face wash\" finds 6 products" },
    ],
  },
};

export default function StoreMock() {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const r = RESULTS[device];
  const broken = r.rows.find((x) => !x.ok);
  return (
    <figure className="relative" aria-label="Example: BugRadar inside Shopify admin">
      <div className="bg-panel rounded-xl border border-panel-line shadow-[0_30px_60px_-30px_rgba(13,19,29,0.55)] overflow-hidden text-panel-ink">
        {/* admin bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-panel-line text-[12px] text-panel-muted">
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-panel-line" />
          <span className="ml-2 truncate">Shopify admin › Apps › <span className="text-panel-ink">BugRadar</span></span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="min-w-0">
              <div className="font-display font-semibold text-[16px] truncate">neem-and-nectar.in</div>
              <div className="text-[12.5px] text-panel-muted">Checked today 9:02 AM · next check tomorrow</div>
            </div>
            {/* score dial with the radar sweep */}
            <div className="relative w-[68px] h-[68px] shrink-0" aria-label={`Score ${r.score} out of 100`}>
              <svg viewBox="0 0 68 68" className="absolute inset-0">
                <circle cx="34" cy="34" r="29" fill="none" stroke="#26314A" strokeWidth="5" />
                <circle cx="34" cy="34" r="29" fill="none" stroke="#E7C578" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={`${(r.score / 100) * 182.2} 182.2`} transform="rotate(-90 34 34)" />
              </svg>
              <div className="absolute inset-[9px] rounded-full overflow-hidden motion-safe:animate-sweep"
                style={{ background: "conic-gradient(from 0deg, rgba(231,197,120,0.28), transparent 70deg)" }} aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center font-display font-semibold text-[19px]">{r.score}</div>
            </div>
          </div>

          <div className="inline-flex rounded-lg border border-panel-line p-0.5 mb-4" role="tablist" aria-label="Device">
            {(["desktop", "phone"] as const).map((d) => (
              <button key={d} role="tab" aria-selected={device === d} onClick={() => setDevice(d)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  device === d ? "bg-panel-2 text-panel-ink" : "text-panel-muted hover:text-panel-ink"}`}>
                {d === "desktop" ? <Monitor size={13} /> : <Smartphone size={13} />}
                {d === "desktop" ? "Computer" : "Phone"}
              </button>
            ))}
          </div>

          <ul className="flex flex-col divide-y divide-panel-line border-y border-panel-line">
            {r.rows.map((row) => (
              <li key={row.name} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 py-2.5">
                <span className={`mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center ${row.ok ? "bg-clear/20 text-[#6fd0b0]" : "bg-alert/25 text-[#ff8a78]"}`}>
                  {row.ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span className="text-[13.5px] font-medium">{row.name}</span>
                  <span className={`block text-[12.5px] leading-snug ${row.ok ? "text-panel-muted" : "text-[#ffb4a8]"}`}>{row.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the alert email that went out */}
      {broken && (
        <div className="relative sm:absolute sm:-left-8 sm:-bottom-7 mt-3 sm:mt-0 bg-white text-ink border border-line rounded-lg shadow-[0_18px_40px_-20px_rgba(16,22,31,0.45)] px-4 py-3 flex gap-3 items-start max-w-[300px]">
          <span className="w-8 h-8 rounded-md bg-paper-alt flex items-center justify-center shrink-0"><Mail size={15} /></span>
          <span className="min-w-0">
            <span className="block text-[12px] text-ink-soft">Email · 9:04 AM</span>
            <span className="block text-[13.5px] font-medium leading-snug">🔴 {broken.name} broke on {device === "desktop" ? "computers" : "phones"}</span>
          </span>
        </div>
      )}
      <figcaption className="mt-3 sm:mt-4 sm:text-right text-[12px] text-ink-soft">Example store. Every line is a real BugRadar check.</figcaption>
    </figure>
  );
}
