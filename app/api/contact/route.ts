import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_INJECT_RE = /[\r\n]/;

function stripControlChars(s: string): string {
  return s.replace(/[\r\n\x00-\x1F\x7F]/g, " ").trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    (phone && phone.length > 30) ||
    message.length > 2000
  ) {
    return NextResponse.json({ error: "Ugyldig input" }, { status: 400 });
  }

  // Reject newlines / control chars in any field that ends up in a mail header
  // (name -> Subject, email -> Reply-To). The body is HTML-escaped so it's fine.
  if (
    HEADER_INJECT_RE.test(name) ||
    HEADER_INJECT_RE.test(email) ||
    (phone && HEADER_INJECT_RE.test(phone))
  ) {
    return NextResponse.json({ error: "Ugyldig input" }, { status: 400 });
  }

  const safeName = stripControlChars(name);

  const html = `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><title>Ny henvendelse</title></head>
<body style="font-family:Georgia,serif;background:#faf8f5;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e8e0d6;padding:40px;">
    <h1 style="font-size:22px;color:#2c1810;margin-top:0;">Ny henvendelse fra webbly.no</h1>
    <table style="width:100%;border-collapse:collapse;margin-top:24px;">
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;width:120px;vertical-align:top;">Navn</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;">E-post</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;">
          <a href="mailto:${escapeHtml(email)}" style="color:#2c1810;">${escapeHtml(email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;">Telefon</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;">${phone?.trim() ? escapeHtml(phone) : "—"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;border-top:1px solid #e8e0d6;">Melding</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;white-space:pre-line;border-top:1px solid #e8e0d6;">${escapeHtml(message)}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Webbly" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Ny henvendelse fra ${safeName}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "Contact form email failed:",
      err instanceof Error ? err.message : "unknown error"
    );
    return NextResponse.json({ error: "Noe gikk galt. Prøv igjen." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
