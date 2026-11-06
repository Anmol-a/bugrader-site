// bugradar.in/go/<code> (6 Nov 2026): the free-check link in BugRadar's outreach emails. Each email has its own 16-hex
// code (bugradar-dashboard migration 44). The route asks the database for that code's store, which also logs the click,
// then sends the person to the live free check of their store, which starts by itself. Any problem: the plain /scan page.
import { PUBLISHABLE_KEY, SUPABASE_URL } from "./scanResult";

export const CODE = /^[0-9a-f]{16}$/;
export const LIVE_CHECK = "https://bugradar-dashboard.vercel.app/#/scan?u=";
export const FALLBACK = "https://bugradar.in/scan";
// what the database may answer: a plain store address, nothing that could steer the redirect elsewhere
const HOST = /^(?=.{3,253}$)[a-z0-9-]+(\.[a-z0-9-]+)+$/;

/** Where a store's link goes: its live check, or /scan when the store address is missing or odd. */
export function target(store: unknown): string {
  return typeof store === "string" && HOST.test(store) ? LIVE_CHECK + encodeURIComponent(store) : FALLBACK;
}

/** The store for a code (and the click logged), or null. Never throws; gives up after 4 seconds. */
export async function lookUp(code: string, ua: string | null, f: typeof fetch = fetch): Promise<string | null> {
  if (!CODE.test(code)) return null;
  try {
    const r = await f(`${SUPABASE_URL}/rest/v1/rpc/outreach_click`, {
      method: "POST",
      headers: { apikey: PUBLISHABLE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ code, ua: (ua ?? "").slice(0, 300) }),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return null;
    const store = await r.json();
    return typeof store === "string" ? store : null;
  } catch {
    return null;
  }
}
