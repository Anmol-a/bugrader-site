// A free check's result, read on the server for the share page bugradar.in/scan/r/<id> and its preview picture (19 Oct).
// The result page itself lives on the dashboard after a "#", which link previews (WhatsApp, LinkedIn, X) never see; this
// page gives each result a real address with its own title, description and picture, then forwards people there.
// scan_status is a public database function (the result page uses it with the same publishable key).

export const SUPABASE_URL = "https://onijwpgvpojpvgumvfim.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_a5wmINCpDlYrv_ve5Tkh7g_JB2XY1UI"; // public by design (it is in the dashboard too)
export const RESULT_APP = "https://bugradar-dashboard.vercel.app/#/scan/";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ScanSummary = {
  checked?: number; passed?: number; failed?: number; warnings?: number; not_tested?: number;
  problems?: { key: string; name: string; status: string; reason: string | null }[];
};
export type Scan = {
  id: string; host: string; status: string; verdict: string | null; score: number | null;
  summary: ScanSummary | null; finished_at: string | null;
};

export async function getScan(id: string): Promise<Scan | null> {
  if (!UUID.test(id)) return null;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/scan_status`, {
      method: "POST",
      headers: { apikey: PUBLISHABLE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ scan_id: id }),
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const rows = (await r.json()) as Scan[];
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

/** Finished and measured: a score exists. Anything else is "couldn't check" or "still running". */
export const tested = (s: Scan) => s.status === "done" && s.score != null;

// problems are failed checks; older rows also listed "works, with a note" under problems with status "warning"
const failedCount = (s: Scan) => s.summary?.failed ?? (s.summary?.problems ?? []).filter((p) => p.status === "failed").length;

export function headlineOf(s: Scan): string {
  if (!tested(s)) return s.status === "done" || s.status === "failed" ? `We couldn't check ${s.host}` : `Checking ${s.host}…`;
  const f = failedCount(s), n = s.summary?.warnings ?? 0;
  if (!f) return n ? (n === 1 ? "The store works, with one note." : "The store works, with a few notes.") : "Everything we checked works.";
  return f === 1 ? "We found 1 problem." : `We found ${f} problems.`;
}

/** The share title: "bummer.in scored 97/100 on BugRadar's free store check". */
export function titleOf(s: Scan): string {
  return tested(s) ? `${s.host} scored ${s.score}/100 on BugRadar's free store check` : `${s.host} — BugRadar free store check`;
}

export function descriptionOf(s: Scan): string {
  if (!tested(s)) return "BugRadar's free check opens a Shopify store like a shopper and checks the 7 things a customer hits first.";
  const c = s.summary ?? {};
  const top = (c.problems ?? []).find((p) => p.status === "failed");
  const passed = `${c.passed ?? 0} of ${c.checked ?? 0} checks passed.`;
  return `${headlineOf(s)} ${passed}${top ? ` Top problem: ${top.name}.` : ""} Check your own Shopify store free at bugradar.in/scan.`;
}

/** Green 90+, amber 70+, red below: the same bands the dashboard's dial uses. */
export function scoreColour(score: number | null): string {
  if (score == null) return "#8a96a3";
  return score >= 90 ? "#2bd38a" : score >= 70 ? "#f5b301" : "#ff5a6a";
}
