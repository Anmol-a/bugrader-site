import { ShoppingBag } from "lucide-react";
import { APP_STORE_URL } from "@/lib/launch";

// Before approval: a quiet note that the app is on its way. After approval (APP_STORE_URL set): the install button.
export default function AppStoreCta({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  if (APP_STORE_URL) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener"
        className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-md font-semibold text-[15px] ${
          onDark ? "bg-gold text-[#241703]" : "bg-ink text-paper"
        } ${className}`}
      >
        <ShoppingBag size={16} strokeWidth={2} aria-hidden="true" />
        Install on Shopify
      </a>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-2 text-[13px] rounded-full px-3 py-1.5 border ${
        onDark ? "border-panel-line text-panel-muted" : "border-line text-ink-soft bg-paper"
      } ${className}`}
    >
      <ShoppingBag size={14} strokeWidth={1.75} aria-hidden="true" className={onDark ? "text-gold-soft" : "text-gold"} />
      Coming to the Shopify App Store
    </span>
  );
}
