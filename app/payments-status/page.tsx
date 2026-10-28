import type { Metadata } from "next";
import { getBoard, ist, lasted, RANK, readable, unreadable, WORD, type PayState, type Provider, type Status } from "@/lib/paymentStatus";

// Is India's checkout and payment stack working right now? (20 Oct 2026). Read from each provider's own public
// status page every 5 minutes by BugRadar. Rendered on every visit (20 Oct review: a cached copy showed old status
// after a quiet spell, and one failed refresh could cache "updating" over a good page).
export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Live status of the payment providers and checkouts Indian online stores use: Shopify, GoKwik, Razorpay, Shopflo and Juspay. Read from their own status pages every 5 minutes.";
export const metadata: Metadata = {
  metadataBase: new URL("https://bugradar.in"),
  title: "Payment providers status, live — BugRadar",
  description: DESCRIPTION,
  alternates: { canonical: "https://bugradar.in/payments-status" },
  openGraph: { title: "Are India's payment providers working right now? — BugRadar", description: DESCRIPTION,
    url: "https://bugradar.in/payments-status", siteName: "BugRadar", type: "website" },
  twitter: { card: "summary", title: "Payment providers status — BugRadar", description: DESCRIPTION },
};

const TONE: Record<PayState, { dot: string; text: string; edge: string }> = {
  ok: { dot: "bg-clear", text: "text-clear", edge: "border-t-clear" },
  slow: { dot: "bg-gold", text: "text-gold", edge: "border-t-gold" },
  partial: { dot: "bg-gold", text: "text-gold", edge: "border-t-gold" },
  down: { dot: "bg-alert", text: "text-alert", edge: "border-t-alert" },
  maintenance: { dot: "bg-ink-soft", text: "text-ink-soft", edge: "border-t-line" },
  unknown: { dot: "bg-ink-soft", text: "text-ink-soft", edge: "border-t-line" },
};

function Card({ p, s }: { p: Provider; s?: Status }) {
  const known = readable(p) && !unreadable(s);
  const live = readable(p);
  const st: PayState = known ? s!.state : "unknown";
  const t = TONE[st];
  const label = !live ? (p.kind === "link" ? "Not read yet" : "No status page")
    : !known ? (s?.read_ok_at || (s?.failed_reads ?? 0) > 0 ? "Can't read their page" : "Not read yet") : WORD[st];
  const line = !live
    ? p.kind === "link" ? `We can't read ${p.name}'s status page automatically yet.` : `${p.name} doesn't publish a status page we can find.`
    : !known ? "We can't read their status page right now, so we can't say how it's doing."
    : st === "ok" ? "Taking payments normally" : st === "maintenance" ? "Planned maintenance on their side" : s?.summary ?? WORD[st];
  return (
    <div className={`border border-line ${known ? `border-t-[3px] ${t.edge}` : ""} rounded-xl bg-paper p-5 flex flex-col gap-1.5`}>
      <div className="flex items-center gap-3">
        <span className="font-display font-semibold text-[18px]">{p.name}</span>
        <span className={`ml-auto shrink-0 whitespace-nowrap inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${known ? t.text : "text-ink-soft"}`}>
          {known && <span className={`w-2 h-2 rounded-full ${t.dot}`} />}{label}
        </span>
      </div>
      {p.what && <div className="text-[13.5px] text-ink-soft">{p.what}</div>}
      <div className="text-[15px] mt-1">{line}</div>
      <div className="flex items-center gap-3 mt-auto pt-2 text-[13px] text-ink-soft">
        {live && s?.read_ok_at && <span>{known ? "Read" : "Last good read"} {ist(s.read_ok_at)}</span>}
        {p.status_url && <a href={p.status_url} target="_blank" rel="noreferrer" className="ml-auto underline underline-offset-2">Their status page ↗</a>}
      </div>
    </div>
  );
}

export default async function PaymentsStatusPage() {
  const board = await getBoard();
  const live = (board?.providers ?? []).filter(readable);
  const other = (board?.providers ?? []).filter((p) => !readable(p));
  const known = live.filter((p) => !unreadable(board!.status[p.id]));
  const cantRead = live.filter((p) => unreadable(board!.status[p.id]));
  const worst = known.reduce<Provider | null>((w, p) => {
    const s = board!.status[p.id]?.state ?? "unknown";
    return RANK[s] > RANK[w ? board!.status[w.id]?.state ?? "ok" : "ok"] ? p : w;
  }, null);
  const bad = known.filter((p) => RANK[board!.status[p.id]?.state ?? "ok"] > 0);
  // "as of": the oldest good reading among the providers the headline speaks for
  const asOf = known.map((p) => board!.status[p.id]?.read_ok_at).filter((x): x is string => !!x).sort()[0] ?? null;
  const name = (id: string) => board?.providers.find((p) => p.id === id)?.name ?? id;

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 py-16 md:py-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-[13px] text-ink-soft">Payment providers · live</span>
          </div>
          <h1 className="font-display text-[34px] md:text-[46px] font-semibold leading-[1.1] tracking-tight mb-5 max-w-[22ch]">
            Are India&apos;s payment providers working right now?
          </h1>
          <p className="text-[17px] text-ink-soft max-w-[60ch] leading-relaxed">
            When a payment provider has trouble, customers can&apos;t pay and conversion drops. BugRadar reads the public status
            pages of the checkouts and gateways Indian stores use, every 5 minutes.
          </p>

          {!board ? (
            <div className="mt-10 border border-line rounded-xl bg-paper p-6 text-[16px]">
              The status board is updating. Please try again in a minute.
            </div>
          ) : (
            <div className={`mt-10 rounded-xl p-6 md:p-7 bg-panel text-panel-ink border-l-4 ${worst ? (board.status[worst.id]?.state === "down" ? "border-alert" : "border-gold") : cantRead.length ? "border-gold" : "border-clear"}`}>
              {bad.length ? (
                <>
                  <div className="font-display text-[22px] md:text-[26px] font-semibold">
                    {bad.length === 1 ? `${bad[0].name} reports a problem` : `${bad.length} providers report problems`}
                  </div>
                  <ul className="mt-3 grid gap-1.5 text-[15.5px]">
                    {bad.map((p) => (
                      <li key={p.id}><span className="font-medium">{p.name}</span>: {(board.status[p.id]?.summary ?? WORD[board.status[p.id]?.state ?? "unknown"])}</li>
                    ))}
                  </ul>
                  <p className="text-panel-muted text-[14.5px] mt-3">If your checkout uses {bad.length === 1 ? "it" : "one of these"}, some customers may not be able to pay right now.</p>
                </>
              ) : known.length ? (
                <div className="font-display text-[22px] md:text-[26px] font-semibold flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-clear shrink-0" />
                  {known.length === live.length ? `All ${known.length} providers we read report no problems` : `${known.length} of ${live.length} providers report no problems`}
                </div>
              ) : (
                <div className="font-display text-[22px] md:text-[26px] font-semibold">We can&apos;t read the providers&apos; status pages right now</div>
              )}
              {cantRead.length > 0 && (
                <p className="text-panel-muted text-[14.5px] mt-3">
                  We can&apos;t read {cantRead.map((p) => p.name).join(", ")}&apos;s status page{cantRead.length > 1 ? "s" : ""} right now, so we can&apos;t say how {cantRead.length > 1 ? "they are" : "it is"} doing.
                </p>
              )}
              {asOf && <p className="text-panel-muted text-[13px] mt-3">As of {ist(asOf)} India time · read every 5 minutes</p>}
            </div>
          )}
        </div>
      </section>

      {board && (
        <section className="border-t border-line py-14">
          <div className="max-w-[1180px] mx-auto px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {live.map((p) => <Card key={p.id} p={p} s={board.status[p.id]} />)}
            </div>
            {other.length > 0 && (
              <>
                <h2 className="font-display text-[20px] font-semibold mt-12 mb-4">Not watched automatically yet</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {other.map((p) => <Card key={p.id} p={p} />)}
                </div>
              </>
            )}

            <h2 className="font-display text-[20px] font-semibold mt-12 mb-4">Problems in the last 30 days</h2>
            {board.problems.length ? (
              <ul className="grid gap-3 max-w-[80ch]">
                {board.problems.map((i) => (
                  <li key={i.id} className="flex gap-3 items-start border border-line rounded-lg bg-paper px-4 py-3 text-[15px]">
                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${i.resolved_at ? "bg-ink-soft" : TONE[i.state].dot}`} />
                    <span>
                      <span className="font-medium">{name(i.provider_id)}</span>: {i.title}
                      <span className="block text-[13.5px] text-ink-soft">
                        {ist(i.started_at)} · {i.resolved_at ? `fixed after ${lasted(i.started_at, i.resolved_at)}` : `still going (${lasted(i.started_at, null)})`}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-soft text-[15px]">None of the providers we read has reported a problem in the last 30 days.</p>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-line py-16 bg-paper-alt">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-8 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-[26px] md:text-[30px] font-semibold mb-4 max-w-[24ch]">
              Get an email the moment your provider has a problem
            </h2>
            <p className="text-ink-soft text-[15.5px] leading-relaxed max-w-[52ch]">
              BugRadar finds the providers your store uses, watches their status pages for you, and emails you when one
              reports a problem, and again when it&apos;s fixed. It comes with BugRadar Pro, along with checks of your
              store every 4 hours in desktop and mobile browsers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href="/contact" className="inline-flex items-center rounded-lg bg-ink text-paper px-5 py-3 font-medium">Get alerts for your store</a>
            <a href="/scan" className="inline-flex items-center rounded-lg border border-ink/30 px-5 py-3 font-medium">Free store check</a>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-10">
        <div className="max-w-[1180px] mx-auto px-8">
          <p className="text-[13px] text-ink-soft max-w-[85ch]">
            Information comes from each provider&apos;s own public status page and shows what they report; it can lag behind
            what customers see. BugRadar isn&apos;t affiliated with these companies. Names belong to their owners. The list
            of providers grows as we find more public status pages.
          </p>
        </div>
      </section>
    </main>
  );
}
