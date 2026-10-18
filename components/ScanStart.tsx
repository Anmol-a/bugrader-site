"use client";

import { useState } from "react";

// The address box on bugradar.in/scan. It only checks the address looks like a store, then opens the live check on the
// dashboard, which queues it, runs it from our server and shows each check as it happens.
export const SCAN_APP = "https://bugradar-dashboard.vercel.app/#/scan";

export { checkAddress } from "@/lib/storeAddress";
import { checkAddress, ADDRESS_ERRORS } from "@/lib/storeAddress";

// the host as typed, so a refused address can still be handed over for "this is my store, check it anyway"
function hostOf(raw: string): string {
  try {
    return new URL(`https://${raw.trim().toLowerCase().replace(/^[a-z][a-z0-9+.-]*:\/\//, "")}`).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ScanStart() {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [disputable, setDisputable] = useState("");
  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const c = checkAddress(url);
          // "not a store" can be wrong for a real Shopify store: the dashboard page explains why and takes the request
          setDisputable(c.error === ADDRESS_ERRORS.notStore ? hostOf(url) : "");
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
      {err && (
        <div className="text-alert text-[14px] mt-2">
          {err}
          {disputable && (
            <>
              {" "}
              <a className="underline text-ink" href={`${SCAN_APP}?u=${encodeURIComponent(disputable)}`}>
                Is {disputable} actually your Shopify store? Tell us →
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
