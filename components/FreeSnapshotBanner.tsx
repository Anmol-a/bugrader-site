import Link from "next/link";
import { freeSnapshot } from "@/lib/content";

export default function FreeSnapshotBanner() {
  return (
    <div className="bg-panel rounded-xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="text-panel-ink text-[15px] leading-relaxed max-w-[56ch]">
        <span className="text-gold-soft font-medium">{freeSnapshot.heading}</span>{" "}
        {freeSnapshot.body}
        <div className="text-panel-muted text-[13px] mt-1">{freeSnapshot.sub}</div>
      </div>
      <Link
        href="/contact"
        className="shrink-0 inline-block bg-gold text-[#241703] px-5 py-3 rounded-md font-semibold text-[14.5px] whitespace-nowrap"
      >
        {freeSnapshot.cta}
      </Link>
    </div>
  );
}
