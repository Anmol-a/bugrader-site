import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

// bugradar.in/sitemap.xml (14 Nov 2026): every page Google should index. Left out on purpose, matching robots.ts and
// the pages' own noindex: /services (old agency pages), /bot, /scan/r/<id> (one store's private result), /go, /api.
const BASE = "https://bugradar.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/scan`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/payments-status`, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(`${g.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...guides];
}
