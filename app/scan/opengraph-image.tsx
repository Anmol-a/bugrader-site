import { ImageResponse } from "next/og";

// The preview picture for bugradar.in/scan itself (19 Oct): what someone sees when the free check link is shared.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BugRadar free Shopify store check";

const CHECKS = ["Homepage", "Menu", "Collection", "Product page", "Search", "Missing pages", "Search engines"];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "64px 72px", background: "linear-gradient(135deg, #07121c 0%, #0c2233 100%)", color: "#e8f1f7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
          <div style={{ width: 34, height: 34, borderRadius: 34, border: "3px solid #4fc3f7", display: "flex" }} />
          BUGRADAR
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>Is anything broken on your store right now?</div>
          <div style={{ fontSize: 30, color: "#b9cad6" }}>A free check of your Shopify store, like a real shopper, in about two minutes.</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {CHECKS.map((c) => (
            <div key={c} style={{ fontSize: 24, color: "#cfe3ef", border: "2px solid #24465c", borderRadius: 30, padding: "6px 18px" }}>{c}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
