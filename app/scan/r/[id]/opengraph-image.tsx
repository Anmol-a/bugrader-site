import { ImageResponse } from "next/og";
import { detailOf, getScan, headlineOf, scoreColour, tested } from "@/lib/scanResult";

// The preview picture for a shared free-check result (WhatsApp, LinkedIn, X): the store, its score and the headline.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BugRadar free store check result";
export const revalidate = 300;

export default async function Image({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const { id } = await Promise.resolve(params);
  const s = await getScan(id);
  const host = s?.host ?? "Your store";
  const score = s && tested(s) ? s.score : null;
  const colour = scoreColour(score);
  const headline = s ? headlineOf(s) : "Free Shopify store check";
  const sub = s ? detailOf(s) : "Seven checks a customer hits first, in about two minutes.";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "64px 72px", background: "linear-gradient(135deg, #07121c 0%, #0c2233 100%)", color: "#e8f1f7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
          <div style={{ width: 34, height: 34, borderRadius: 34, border: "3px solid #4fc3f7", display: "flex" }} />
          BUGRADAR
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          {score != null && (
            <div style={{ width: 230, height: 230, borderRadius: 230, border: `14px solid ${colour}`, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 96, fontWeight: 700 }}>{score}</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
            <div style={{ fontSize: 30, color: "#8fb3c9", letterSpacing: 2 }}>{`${host.toUpperCase()} · FREE STORE CHECK`}</div>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{headline}</div>
            <div style={{ fontSize: 28, color: "#b9cad6", lineHeight: 1.35 }}>{sub}</div>
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#8fb3c9" }}>Check your own Shopify store free · bugradar.in/scan</div>
      </div>
    ),
    size,
  );
}
