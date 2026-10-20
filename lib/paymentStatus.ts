// Payment providers' status for the public page bugradar.in/payments-status (20 Oct). The dashboard's payment_status
// function reads each provider's own public status page every 5 minutes into Supabase; anyone may read the result with
// the publishable key (migration 20 in bugradar-dashboard). Read on the server, refreshed at most once a minute.
import { SUPABASE_URL } from "./scanResult";

const PUBLISHABLE_KEY = "sb_publishable_a5wmINCpDlYrv_ve5Tkh7g_JB2XY1UI"; // public by design (same as lib/scanResult.ts)

export type PayState = "ok" | "slow" | "partial" | "down" | "maintenance" | "unknown";
export type Provider = { id: string; name: string; kind: string; status_url: string | null; what: string | null; sort: number };
export type Status = { provider_id: string; state: PayState; summary: string | null; checked_at: string | null; failed_reads: number };
export type Problem = { id: string; provider_id: string; state: "slow" | "partial" | "down"; title: string; started_at: string; resolved_at: string | null };
export type Board = { providers: Provider[]; status: Record<string, Status>; problems: Problem[] } | null;

// local layout tests point this at a stand-in (the sandbox can't reach Supabase); production never sets it
const BASE = process.env.PAYMENT_STATUS_TEST_URL || SUPABASE_URL;

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}/rest/v1/${path}`, {
    headers: { apikey: PUBLISHABLE_KEY, Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!r.ok) throw new Error(`status ${r.status}`);
  return (await r.json()) as T;
}

export async function getBoard(): Promise<Board> {
  try {
    const since = new Date(Date.now() - 30 * 86400e3).toISOString().slice(0, 10);
    const [providers, status, problems] = await Promise.all([
      get<Provider[]>("payment_providers?select=id,name,kind,status_url,what,sort&order=sort"),
      get<Status[]>("provider_status?select=provider_id,state,summary,checked_at,failed_reads"),
      get<Problem[]>(`provider_incidents?select=id,provider_id,state,title,started_at,resolved_at&started_at=gte.${since}&order=started_at.desc&limit=50`),
    ]);
    return { providers, status: Object.fromEntries(status.map((s) => [s.provider_id, s])), problems };
  } catch {
    return null;
  }
}

export const readable = (p: Provider) => ["statuspage", "instatus", "statping"].includes(p.kind);
export const WORD: Record<PayState, string> = {
  ok: "Working", slow: "Slow", partial: "Partial outage", down: "Down", maintenance: "Maintenance", unknown: "Not known",
};
export const RANK: Record<PayState, number> = { ok: 0, maintenance: 0, unknown: 0, slow: 1, partial: 2, down: 3 };

export const ist = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true })
    .format(new Date(iso)).replace(/\b(am|pm)\b/i, (m) => m.toLowerCase());

export function lasted(from: string, to: string | null) {
  const m = Math.max(1, Math.round(((to ? Date.parse(to) : Date.now()) - Date.parse(from)) / 60e3));
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}`;
}
