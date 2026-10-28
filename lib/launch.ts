// Launch facts in one place (28 Oct 2026).
// The Shopify app was submitted to the App Store on 28 Oct 2026. When it's approved, set APP_STORE_URL to the
// listing address: every "Coming to the Shopify App Store" note turns into an "Install on Shopify" button.

export const APP_STORE_URL: string | null = null;

// Plans, the same as the app (dashboard web/src/lib/plans.ts). Prices are fine on the website; the no-price rule is
// only for Shopify listing pictures.
export const PRO_PRICE = "$19";
export const PRO_PERIOD = "/month";
export const PRO_TRIAL = "14-day free trial";

// Promo video (unlisted until approval; switch it to Public on YouTube at launch).
export const VIDEO_ID = "iNgoipEbpxM";

// Proof numbers, verified 28 Oct 2026 (claude/START-HERE_28oct.md). Use only these.
// 818 store addresses fully checked since 13 Oct, 2,080 checks; 72 problems on 53 stores re-opened live on 25 Oct
// (53/818 ≈ 1 in 15). Never name stores. Never quote "425 bugs" or "153 stores".
export const PROOF = {
  stores: "800+",
  checks: "2,000+",
  ratio: "1 in 15",
};
