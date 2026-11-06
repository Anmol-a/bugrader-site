import { FALLBACK, lookUp, target } from "@/lib/goLink";

// bugradar.in/go/<code>: an outreach email's free-check link (see lib/goLink.ts). Never cached, never indexed.
export const dynamic = "force-dynamic";

const go = (to: string) =>
  new Response(null, { status: 302, headers: { Location: to, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return go(target(await lookUp(code.toLowerCase(), request.headers.get("user-agent"))));
}

// Link checkers often only ask HEAD: answer without counting a click
export async function HEAD() {
  return go(FALLBACK);
}
