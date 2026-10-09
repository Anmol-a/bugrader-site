/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Web Bot Auth: Radar's public key directory. Stores' edge (Shopify / Cloudflare) fetches it to verify that signed
  // requests really come from BugRadar. The spec requires this media type.
  async headers() {
    return [
      {
        source: "/.well-known/http-message-signatures-directory",
        headers: [
          { key: "Content-Type", value: "application/http-message-signatures-directory+json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
