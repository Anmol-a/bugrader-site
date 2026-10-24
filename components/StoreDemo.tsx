"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, X, Play, RotateCcw, Mail, Menu, ShoppingBag } from "lucide-react";

// "Try it": an invented example store on a phone. Tap any part to see what BugRadar checks there and today's result,
// or press "Watch BugRadar shop" to play the whole walk. Every check here is a real BugRadar check; the store isn't.

type SpotId = "announce" | "menu" | "product" | "size" | "pincode" | "cart" | "whatsapp" | "footer";
type Spot = { id: SpotId; label: string; check: string; ok: boolean; result: string };

const SPOTS: Spot[] = [
  { id: "announce", label: "Announcement bar", check: "The link in the bar opens a real page, not \"Page not found\".", ok: true, result: "/collections/offers opens and lists 24 products" },
  { id: "menu", label: "Menu", check: "Every menu page opens. On phones, the menu button shows its links.", ok: true, result: "12 of 12 menu pages open" },
  { id: "product", label: "Photo, name & price", check: "The photo loads, the name and price show, and the price is the same here, on the collection and in the cart.", ok: true, result: "₹649 on the card, this page and the cart" },
  { id: "size", label: "Size", check: "Picking another size updates the price and the buy button.", ok: true, result: "50 ml → ₹1,099" },
  { id: "pincode", label: "Pincode checker", check: "A real pincode (Mumbai 400001) gets an answer, and the Cash on Delivery line agrees with it.", ok: false, result: "400001 answered \"Something went wrong\"" },
  { id: "cart", label: "Add to cart", check: "The item lands in the cart, the total updates and checkout opens. Nothing is typed in and nothing is paid.", ok: true, result: "In cart, ₹649, checkout opened and left" },
  { id: "whatsapp", label: "WhatsApp button", check: "The button leads to a real phone number. BugRadar reads it and never sends a message.", ok: true, result: "+91 98•••••12, 10 digits" },
  { id: "footer", label: "Footer pages", check: "Shipping, returns and contact pages open and aren't empty.", ok: true, result: "3 of 3 open" },
];

const STEP_MS = 1700;

// one tappable part of the store (module level, so taps don't remount it and keyboard focus stays put)
function Hot({ id, active, seen, onTap, className = "", children }:
  { id: SpotId; active: SpotId | null; seen: Set<SpotId>; onTap: (id: SpotId) => void; className?: string; children: ReactNode }) {
  const on = active === id;
  const s = SPOTS.find((x) => x.id === id)!;
  return (
    <button type="button" onClick={() => onTap(id)} aria-pressed={on} aria-label={`${s.label}: what BugRadar checks`}
      className={`relative block w-full text-left rounded-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        on ? "ring-2 ring-gold ring-offset-1 ring-offset-white" : "hover:ring-1 hover:ring-gold/60"} ${className}`}>
      {children}
      {!seen.has(id) && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gold motion-safe:animate-blip" aria-hidden="true" />
      )}
      {seen.has(id) && (
        <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${s.ok ? "bg-clear" : "bg-alert"}`} aria-hidden="true">
          {s.ok ? <Check size={10} strokeWidth={3.5} /> : <X size={10} strokeWidth={3.5} />}
        </span>
      )}
    </button>
  );
}

export default function StoreDemo() {
  const [active, setActive] = useState<SpotId | null>(null);
  const [seen, setSeen] = useState<Set<SpotId>>(new Set());
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spot = SPOTS.find((s) => s.id === active) ?? null;
  const finished = seen.size === SPOTS.length;

  function show(id: SpotId) {
    setActive(id);
    setSeen((prev) => new Set(prev).add(id));
  }
  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }
  function play() {
    stop();
    setSeen(new Set());
    setPlaying(true);
    let i = 0;
    const next = () => {
      if (i >= SPOTS.length) { setPlaying(false); setActive(null); return; }
      show(SPOTS[i].id);
      i += 1;
      timer.current = setTimeout(next, STEP_MS);
    };
    next();
  }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const tap = (id: SpotId) => { stop(); show(id); };
  const pincodeSeen = seen.has("pincode");

  const hp = { active, seen, onTap: tap };

  return (
    <div className="grid sm:grid-cols-[290px_minmax(0,1fr)] gap-x-5 gap-y-3 items-start">
      <div className="sm:col-span-2 text-[12px] tracking-[0.1em] uppercase text-ink-soft text-center sm:text-left">
        Try it · tap any part of this example store
      </div>
      {/* the phone */}
      <div className="mx-auto sm:mx-0 w-[290px] max-w-full rounded-[34px] bg-panel p-2.5 shadow-[0_30px_60px_-30px_rgba(13,19,29,0.55)]">
        <div className="rounded-[26px] bg-white overflow-hidden text-[#1d2a22]">
          <div className="flex justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-[#1d2a22]/70"><span>9:02</span><span>5G ▮▮▮</span></div>

          <div className="px-2 pt-1 flex flex-col gap-2 pb-3">
            <Hot id="announce" {...hp}>
              <div className="bg-[#2f5d3a] text-white text-[10.5px] text-center py-1.5 rounded-md">Free delivery above ₹499 · <u>Shop offers</u></div>
            </Hot>

            <div className="flex items-center justify-between gap-2">
              <Hot id="menu" {...hp} className="!w-auto p-1.5"><Menu size={17} /></Hot>
              <span className="font-display font-semibold text-[14px] tracking-tight">neem &amp; nectar</span>
              <span className="relative p-1.5" aria-hidden="true">
                <ShoppingBag size={17} />
                {seen.has("cart") && <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#2f5d3a] text-white text-[8px] flex items-center justify-center">1</span>}
              </span>
            </div>

            <Hot id="product" {...hp}>
              <div className="h-[132px] rounded-md bg-gradient-to-br from-[#f3e2c4] via-[#e9cf9f] to-[#c99a5b] flex items-end justify-center overflow-hidden">
                <div className="w-[46px] h-[92px] rounded-t-[18px] rounded-b-md bg-gradient-to-b from-[#7b3d1d] to-[#4c2310] shadow-lg relative mb-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-sm bg-[#2b2b2b]" />
                  <div className="absolute top-8 inset-x-1.5 h-6 rounded-sm bg-[#f6ead2] text-[6px] text-[#4c2310] flex items-center justify-center font-semibold">GLOW OIL</div>
                </div>
              </div>
              <div className="pt-2 px-0.5">
                <div className="text-[13px] font-semibold leading-tight">Kumkumadi Glow Oil</div>
                <div className="text-[13px] mt-0.5">₹649 <span className="text-[#1d2a22]/50 line-through text-[11px]">₹799</span></div>
              </div>
            </Hot>

            <Hot id="size" {...hp}>
              <div className="flex gap-1.5 text-[11px]">
                <span className="px-2.5 py-1 rounded-full border-2 border-[#2f5d3a] font-semibold">30 ml</span>
                <span className="px-2.5 py-1 rounded-full border border-[#1d2a22]/25">50 ml</span>
              </div>
            </Hot>

            <Hot id="pincode" {...hp}>
              <div className="border border-[#1d2a22]/15 rounded-md p-2">
                <div className="text-[10.5px] text-[#1d2a22]/70 mb-1">Check delivery</div>
                <div className="flex gap-1.5">
                  <span className="flex-1 border border-[#1d2a22]/20 rounded px-2 py-1 text-[11px]">400001</span>
                  <span className="px-2 py-1 rounded bg-[#1d2a22] text-white text-[10.5px]">Check</span>
                </div>
                <div className={`text-[10.5px] mt-1 ${pincodeSeen ? "text-[#c6402f] font-medium" : "text-[#1d2a22]/60"}`}>
                  {pincodeSeen ? "Something went wrong. Try again." : "Cash on Delivery available"}
                </div>
              </div>
            </Hot>

            <Hot id="cart" {...hp}>
              <div className="bg-[#2f5d3a] text-white text-center text-[12.5px] font-semibold py-2.5 rounded-md">Add to cart</div>
            </Hot>

            <div className="flex items-end justify-between gap-2 pt-1">
              <Hot id="footer" {...hp} className="!w-auto">
                <div className="text-[10px] text-[#1d2a22]/60 flex gap-2 px-1 py-1"><span>Shipping</span><span>Returns</span><span>Contact</span></div>
              </Hot>
              <Hot id="whatsapp" {...hp} className="!w-auto !rounded-full">
                <span className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.6 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>
                </span>
              </Hot>
            </div>
          </div>
        </div>
      </div>

      {/* what BugRadar does there */}
      <div className="min-w-0 flex flex-col gap-3" aria-live="polite">
        {spot ? (
          <div className="bg-white border border-line rounded-xl p-4 flex flex-col gap-2.5">
            <div className="font-display font-semibold text-[16px]">{spot.label}</div>
            <div>
              <div className="text-[11.5px] uppercase tracking-[0.08em] text-ink-soft mb-0.5">BugRadar checks</div>
              <p className="text-[14px] leading-snug">{spot.check}</p>
            </div>
            <div className={`flex gap-2 items-start rounded-lg px-3 py-2 text-[13.5px] ${spot.ok ? "bg-clear/10 text-[#1f6a54]" : "bg-alert/10 text-[#a3321f]"}`}>
              {spot.ok ? <Check size={16} className="mt-0.5 shrink-0" /> : <X size={16} className="mt-0.5 shrink-0" />}
              <span><span className="font-medium">Today:</span> {spot.result}</span>
            </div>
            {!spot.ok && (
              <div className="flex gap-2.5 items-start border border-line rounded-lg px-3 py-2.5">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <span className="text-[13px] leading-snug"><span className="text-ink-soft">Email to you, 9:04 AM:</span> 🔴 Pincode checker broke on phones. Open the product page to see it.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-line rounded-xl p-4">
            <p className="text-[14.5px] leading-relaxed">
              {finished
                ? "That's one product page. Every day BugRadar walks the whole store like this, on a computer and on a phone, and found 1 problem here."
                : "This is what BugRadar does on your store every day. Tap any part of the page to see what it checks, or watch it shop."}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={playing ? stop : play}
            className="inline-flex items-center gap-2 bg-ink text-paper px-4 py-2.5 rounded-md text-[14px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
            {playing ? "Pause" : finished ? <><RotateCcw size={15} /> Watch again</> : <><Play size={15} /> Watch BugRadar shop</>}
          </button>
          <span className="text-[13px] text-ink-soft tabular-nums">{seen.size} of {SPOTS.length} checked</span>
        </div>
      </div>
    </div>
  );
}
