import { NextResponse } from "next/server";

// This endpoint does not send email or store submissions anywhere yet — it only
// logs to the server console. Before launch, wire this up to a real provider,
// e.g. Resend, SendGrid, or a Google Sheet / CRM webhook, and add basic rate
// limiting and spam protection (a honeypot field or hCaptcha) if this goes public.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  console.log("New BugRadar contact submission:", {
    name: body.name,
    email: body.email,
    company: body.company ?? "",
    message: body.message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
