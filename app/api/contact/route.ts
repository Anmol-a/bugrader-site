import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact form → one email to hello@bugradar.in. Guards (28 Oct 2026): field length limits, a hidden "website"
// box that only robots fill in, and a small per-address limit so a script can't burn the Resend quota.

const LIMITS = { name: 120, email: 254, company: 200, message: 4000, journeys: 12, journey: 80 } as const;
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 5;
const recent = new Map<string, number[]>(); // per server instance; good enough for a contact form

function tooMany(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > PER_WINDOW;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages from this connection. Please try again later." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Name, email and message are all required." }, { status: 400 });
  }

  // the hidden box: a real person never sees it, so anything in it is a robot. Pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, LIMITS.message) : "";
  const journeys = Array.isArray(body.journeys)
    ? body.journeys.slice(0, LIMITS.journeys).map((j) => clean(j, LIMITS.journey)).filter(Boolean)
    : [];

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email and message are all required." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "That doesn't look like an email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "BugRadar Contact Form <hello@bugradar.in>",
    to: "hello@bugradar.in",
    replyTo: email,
    subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Store: ${company || "—"}`,
      `Journeys flagged: ${journeys.length ? journeys.join(", ") : "—"}`,
      "",
      "What they sell / where it breaks:",
      message,
    ].join("\n"),
  }).catch((err) => ({ data: null, error: err }));

  if (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  console.log("Resend accepted send, email id:", data?.id);
  return NextResponse.json({ ok: true });
}
