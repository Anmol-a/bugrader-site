import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppStoreCta from "@/components/AppStoreCta";
import { GUIDES, guide } from "@/lib/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guide((await params).slug);
  if (!g) return {};
  return { title: `${g.title} — BugRadar`, description: g.description, alternates: { canonical: `https://bugradar.in/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, type: "article", publishedTime: g.date } };
}

export default async function GuidePage({ params }: Props) {
  const g = guide((await params).slug);
  if (!g) notFound();
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  return (
    <article className="py-16 md:py-20">
      <div className="max-w-[720px] mx-auto px-6 sm:px-8">
        <Link href="/guides" className="text-[13.5px] text-ink-soft hover:underline underline-offset-2">← Guides</Link>
        <h1 className="font-display text-[30px] md:text-[38px] font-semibold leading-tight mt-5 mb-4 [text-wrap:balance]">{g.title}</h1>
        <p className="text-[13px] text-ink-soft mb-10">
          <time dateTime={g.date}>{new Date(g.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> · {g.minutes} min read · Team BugRadar
        </p>
        <div className="flex flex-col gap-5 text-[16.5px] leading-relaxed">
          {g.body.map((b, i) =>
            "h" in b ? <h2 key={i} className="font-display text-[22px] font-semibold mt-5">{b.h}</h2>
            : "ul" in b ? <ul key={i} className="list-disc pl-6 flex flex-col gap-2">{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>
            : "tip" in b ? <p key={i} className="border-l-2 border-gold pl-4 text-ink-soft">{b.tip}</p>
            : <p key={i}>{b.p}</p>)}
        </div>
        <div className="mt-12 pt-8 border-t border-line flex flex-wrap items-center gap-4">
          <AppStoreCta />
          <Link href="/scan" className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] hover:border-ink-soft transition-colors bg-paper">Check your store free</Link>
        </div>
        <div className="mt-12">
          <div className="text-[12px] tracking-[0.1em] uppercase text-ink-soft mb-3">More guides</div>
          <ul className="flex flex-col gap-2">
            {others.map((o) => <li key={o.slug}><Link href={`/guides/${o.slug}`} className="text-[15px] hover:underline underline-offset-2">{o.title}</Link></li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}
