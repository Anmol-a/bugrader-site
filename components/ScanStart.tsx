"use client";

import { useState } from "react";

// The address box on bugradar.in/scan. It only checks the address looks like a store, then opens the live check on the
// dashboard, which queues it, runs it from our server and shows each check as it happens.
export const SCAN_APP = "https://bugradar-dashboard.vercel.app/#/scan";

const NOT_STORES =
  /(^|\.)(wikipedia|google|youtube|facebook|instagram|twitter|x|linkedin|reddit|amazon|flipkart|myntra|github|gov|nic|edu|ac)\.[a-z.]+$|\.(gov|edu|mil)(\.[a-z]{2})?$/i;
const RESTRICTED = /(porn|xxx|sex|adult|escort|casino|betting|bet365|gambl|rummy|poker|cannabis|weed|drugs?|vape|gun|weapon)/i;

export function checkAddress(raw: string): { host?: string; error?: string } {
  const s = raw.trim().toLowerCase();
  if (!s) return { error: "Type your store's address, like yourstore.com" };
  let host = "";
  try {
    host = new URL(/^https?:\/\//.test(s) ? s : `https://${s}`).hostname.replace(/^www\./, "");
  } catch {
    /* below */
  }
  if (!host || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) || /^\d+(\.\d+){3}$/.test(host))
    return { error: "That doesn't look like a web address. Try yourstore.com" };
  if (RESTRICTED.test(host)) return { error: "We can't check this site." };
  if (NOT_STORES.test(host)) return { error: "This isn't an online store. BugRadar checks Shopify stores." };
  return { host };
}

export default function ScanStart() {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const c = checkAddress(url);
          if (c.error) return setErr(c.error);
          setErr(null);
          window.location.href = `${SCAN_APP}?u=${encodeURIComponent(c.host!)}`;
        }}
      >
        <input
          className="flex-1 min-w-0 border border-line bg-paper rounded-md px-4 py-3.5 text-[16px] outline-none focus:border-ink-soft"
          inputMode="url"
          autoComplete="url"
          placeholder="yourstore.com"
          aria-label="Store address"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px] whitespace-nowrap">
          Check my store
        </button>
      </form>
      {err && <div className="text-alert text-[14px] mt-2">{err}</div>}
    </div>
  );
}
