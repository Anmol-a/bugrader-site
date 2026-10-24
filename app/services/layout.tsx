import type { Metadata } from "next";

// The old agency pages (test automation, RPA, data automation…). BugRadar is a Shopify product now (25 Oct 2026):
// these stay reachable for old links but aren't linked from the site and aren't indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
