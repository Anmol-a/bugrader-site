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
          // the directory response proves it belongs to the key it lists (Cloudflare requires it); valid for 1 year
          { key: "Signature-Input", value: "binding0=(\"@authority\";req);alg=\"ed25519\";keyid=\"VOywuAh_WA9CCG1jjhj_yrYGBFoQ0TGEgxNzujd-qxk\";nonce=\"4tBY2uTXOkt5Z8C7sY-gXJLK27D9QDr-r8kGr2LXTRQ\";tag=\"http-message-signatures-directory\";created=1791565151;expires=1823101151" },
          { key: "Signature", value: "binding0=:UgY3uSk0PlwQ+ZiwgFtQlUk8K3iakcVlS4u5hItJ5jZ6M69u51wxm9hqxiJn1lSfevY59CLTOPVkHuQhiiM1CA==:" },
        ],
      },
    ];
  },
};

export default nextConfig;
