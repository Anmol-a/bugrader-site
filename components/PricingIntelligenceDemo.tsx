import { Search, Link2, ArrowDown } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

// Entirely fabricated, generic data for illustration only — no real brand,
// marketplace, product, or price data of any kind. Built as real UI
// components (SVG + Tailwind), not a screenshot of anything.

const stats = [
  { label: "Products tracked", value: "68" },
  { label: "Products undercut", value: "27" },
  { label: "Top-10 pricing", value: "6" },
];

const sources = [
  { name: "Marketplace A", ok: true, lastRun: "Today, 09:15" },
  { name: "Marketplace B", ok: false, lastRun: "No recent data" },
  { name: "Marketplace C", ok: true, lastRun: "Today, 09:12" },
  { name: "Own store", ok: true, lastRun: "Today, 09:10" },
];

const undercutTrend = [32, 38, 44, 40, 33, 30, 31, 45, 34, 30, 29, 33, 31, 34];

const priceSeries = [
  { name: "Marketplace A", color: "#E7C578", values: [1900, 1900, 1850, 1900, 1780, 1900, 1900, 1900, 1900, 1900] },
  { name: "Marketplace C", color: "#7CA8E7", values: [1950, 1950, 1950, 1900, 1900, 1900, 1300, 1900, 1500, 1900] },
  { name: "Own store", color: "#2F8F73", values: [1699, 1699, 1699, 1699, 1699, 1699, 1699, 1699, 1699, 1699] },
];

const gapBuckets = [
  { range: "0–100", count: 14 },
  { range: "100–300", count: 9 },
  { range: "300–500", count: 4 },
  { range: "500–1000", count: 0 },
  { range: "1000+", count: 3 },
];

const criticalSkus = [
  { name: "Wireless Charging Pad", variant: "15W fast-charge", gap: -4100 },
  { name: "Noise Cancelling Earbuds", variant: "Matte black", gap: -1700 },
  { name: "Smart Fitness Tracker", variant: "Steel strap", gap: -1600 },
  { name: "Portable Blender Bottle", variant: "600ml", gap: -500 },
  { name: "Compact Air Fryer", variant: "3.5L", gap: -370 },
];

const position = { overpriced: 27, competitive: 35, cheapest: 6 };

function sparkPath(values: number[], w: number, h: number, pad = 6) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function PricingIntelligenceDemo() {
  const gapMax = Math.max(...gapBuckets.map((g) => g.count));
  const positionTotal = position.overpriced + position.competitive + position.cheapest;

  return (
    <RevealOnScroll>
      <div className="bg-panel rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 px-5 py-3.5 border-b border-panel-line">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-panel-line shrink-0" />
            <span className="ml-1 text-[12px] text-panel-muted font-display truncate">Pricing Intelligence</span>
          </div>
          <span className="text-[11px] text-panel-muted sm:ml-auto pl-[26px] sm:pl-0">
            Illustrative build — not a real client system
          </span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-panel-2 border border-panel-line rounded-lg px-4 py-3.5">
                <div className="text-[11px] text-panel-muted mb-1">{s.label}</div>
                <div className="font-display text-[22px] font-semibold text-panel-ink">{s.value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[11.5px] text-panel-muted font-semibold uppercase tracking-wide mb-2.5">
              Scraper run status
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sources.map((s) => (
                <div key={s.name} className="bg-panel-2 border border-panel-line rounded-lg px-3.5 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-panel-ink">{s.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-clear" : "bg-alert"}`} />
                  </div>
                  <div className="text-[11px] text-panel-muted">{s.lastRun}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-panel-2 border border-panel-line rounded-lg p-4">
              <div className="text-[12px] text-panel-muted mb-2">Undercut trend</div>
              <svg viewBox="0 0 400 110" className="w-full h-[100px]">
                <path
                  d={sparkPath(undercutTrend, 400, 110)}
                  fill="none"
                  stroke="#C6402F"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="bg-panel-2 border border-panel-line rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-panel-muted">Price trend</span>
                <div className="flex gap-3">
                  {priceSeries.map((s) => (
                    <span key={s.name} className="flex items-center gap-1 text-[10.5px] text-panel-muted">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 400 110" className="w-full h-[100px]">
                {priceSeries.map((s) => (
                  <path
                    key={s.name}
                    d={sparkPath(s.values, 400, 110)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-panel-2 border border-panel-line rounded-lg p-4">
              <div className="text-[12px] text-panel-muted mb-3">Gap distribution</div>
              <div className="flex flex-col gap-2">
                {gapBuckets.map((g) => (
                  <div key={g.range} className="flex items-center gap-3">
                    <span className="text-[11px] text-panel-muted w-16 shrink-0">{g.range}</span>
                    <div className="flex-1 h-2 rounded-full bg-panel overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold-soft"
                        style={{ width: `${gapMax ? (g.count / gapMax) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-panel-ink w-4 text-right shrink-0">{g.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-panel-2 border border-panel-line rounded-lg p-4">
              <div className="text-[12px] text-panel-muted mb-3">Price position vs market</div>
              <div className="flex h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-alert" style={{ width: `${(position.overpriced / positionTotal) * 100}%` }} />
                <div className="bg-gold-soft" style={{ width: `${(position.competitive / positionTotal) * 100}%` }} />
                <div className="bg-clear" style={{ width: `${(position.cheapest / positionTotal) * 100}%` }} />
              </div>
              <div className="flex flex-col gap-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-panel-muted flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-alert" /> Overpriced
                  </span>
                  <span className="text-panel-ink font-medium">{position.overpriced}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-panel-muted flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold-soft" /> Competitive
                  </span>
                  <span className="text-panel-ink font-medium">{position.competitive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-panel-muted flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-clear" /> Cheapest
                  </span>
                  <span className="text-panel-ink font-medium">{position.cheapest}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-panel-2 border border-panel-line rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-panel-line">
              <span className="text-[12px] text-panel-muted">Critical undercut SKUs</span>
              <span className="flex items-center gap-1 text-[11px] text-panel-muted">
                <Search size={12} /> Search product...
              </span>
            </div>
            {criticalSkus.map((sku) => (
              <div
                key={sku.name}
                className="flex items-center justify-between px-4 py-2.5 border-b border-panel-line last:border-b-0"
              >
                <div>
                  <div className="text-[13px] text-panel-ink font-medium">{sku.name}</div>
                  <div className="text-[11px] text-panel-muted">{sku.variant}</div>
                </div>
                <span className="flex items-center gap-1 text-[13px] font-medium text-alert">
                  <ArrowDown size={12} />₹{Math.abs(sku.gap)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-panel-muted">
            <Link2 size={11} />
            Every price above links back to the exact listing it was pulled from.
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}