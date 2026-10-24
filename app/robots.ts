import type { MetadataRoute } from "next";

// Search engines: index the product pages; the old agency pages (/services) stay out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/services", "/api/"] }],
    host: "https://bugradar.in",
  };
}
