import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "BugRadar Contact Form <hello@bugradar.in>",
      to: "hello@bugradar.in",
      replyTo: body.email,
      subject: `New inquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Company: ${body.company ?? "—"}`,
        "",
        "What they sell / where it breaks:",
        body.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}