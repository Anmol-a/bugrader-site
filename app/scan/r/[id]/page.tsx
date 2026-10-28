import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Forward from "./Forward";
import { RESULT_APP, countsOf, descriptionOf, getScan, headlineOf, scoreColour, tested, titleOf } from "@/lib/scanResult";

// bugradar.in/scan/r/<id>: the shareable address of one free check (19 Oct). Shows the score and headline, carries a
// preview card (title, description, picture from ./opengraph-image), and forwards to the full result on the dashboard.
// Results are the store owner's business: never indexed.
type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = await getScan(id);
  if (!s) return { metadataBase: new URL("https://bugradar.in"), title: "Free store check — BugRadar", robots: { index: false, follow: false } };
  const title = titleOf(s), description = descriptionOf(s), url = `https://bugradar.in/scan/r/${s.id}`;
  return {
    metadataBase: new URL("https://bugradar.in"),
    title, description,
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "BugRadar", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SharedResult({ params }: Props) {
  const { id } = await params;
  const s = await getScan(id);
  if (!s) notFound();
  const to = RESULT_APP + s.id;
  return (
    <main>
      <Forward to={to} />
      <section className="max-w-[760px] mx-auto px-8 py-16 md:py-24">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-[13px] text-ink-soft">{s.host} · free store check</span>
        </div>
        <div className="flex items-center gap-6 mb-6">
          {tested(s) && (
            <div className="shrink-0 w-[96px] h-[96px] rounded-full border-[6px] grid place-items-center font-display text-[34px] font-semibold"
              style={{ borderColor: scoreColour(s.score) }} aria-label={`Score ${s.score} out of 100`}>
              {s.score}
            </div>
          )}
          <h1 className="font-display text-[30px] md:text-[40px] font-semibold leading-[1.1] tracking-tight">{headlineOf(s)}</h1>
        </div>
        {tested(s) && (
          <p className="text-[17px] text-ink-soft mb-8">Score {s.score}/100 · {countsOf(s)} in a desktop browser.</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={to} className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px] text-center">See the full result →</a>
          <a href="/scan" className="border border-line px-[22px] py-3.5 rounded-md font-medium text-[15px] text-center">Check your own store, free</a>
        </div>
        <p className="text-[13px] text-ink-soft mt-6">Opening the full result…</p>
      </section>
    </main>
  );
}
