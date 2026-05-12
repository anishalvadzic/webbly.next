import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/mailer";
import { getCalendarClient } from "@/lib/googleCalendar";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function addOneHour(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateNorwegian(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = [
    "januar", "februar", "mars", "april", "mai", "juni",
    "juli", "august", "september", "oktober", "november", "desember",
  ];
  return `${day}. ${months[month - 1]} ${year}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, company, plan, date, time } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !plan?.trim() || !date?.trim() || !time?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!DATE_RE.test(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  if (!SLOTS.includes(time)) {
    return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
  }

  const endTime = addOneHour(time);
  const formattedDate = formatDateNorwegian(date);

  try {
    const calendar = getCalendarClient();

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `Intromøte — ${company?.trim() || name} — ${plan}`,
        description: `Bedrift: ${company || "—"}\nE-post: ${email}\nPakke: ${plan}`,
        start: { dateTime: `${date}T${time}:00`, timeZone: "Europe/Oslo" },
        end: { dateTime: `${date}T${endTime}:00`, timeZone: "Europe/Oslo" },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 1440 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });

    const notificationHtml = `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><title>Ny booking</title></head>
<body style="font-family:Georgia,serif;background:#faf8f5;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e8e0d6;padding:40px;">
    <h1 style="font-size:22px;color:#2c1810;margin-top:0;">Ny booking fra webbly.no</h1>
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
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;">Bedrift</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;">${company?.trim() ? escapeHtml(company) : "—"}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;">Pakke</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;">${escapeHtml(plan)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;border-top:1px solid #e8e0d6;">Tidspunkt</td>
        <td style="padding:10px 0;color:#2c1810;font-size:14px;border-top:1px solid #e8e0d6;">${formattedDate} kl. ${time}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

    const confirmationHtml = `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><title>Booking bekreftet</title></head>
<body style="font-family:Georgia,serif;background:#faf8f5;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;border:1px solid #e8e0d6;padding:40px;">
    <h1 style="font-size:22px;color:#2c1810;margin-top:0;">Booking bekreftet</h1>
    <p style="color:#8b7355;font-size:14px;line-height:1.7;">
      Hei ${escapeHtml(name)}, vi gleder oss til å snakke med deg!
    </p>
    <div style="background:#faf8f5;border-radius:12px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;color:#2c1810;font-size:15px;font-weight:bold;">
        ${formattedDate} kl. ${time}
      </p>
      <p style="margin:0;color:#8b7355;font-size:13px;">Pakke: ${escapeHtml(plan)}</p>
    </div>
    <p style="color:#8b7355;font-size:13px;line-height:1.7;">
      Du vil motta en Google Calendar-invitasjon på denne adressen.
      Møtet tar ca. 30–60 minutter.
    </p>
    <hr style="border:none;border-top:1px solid #e8e0d6;margin:24px 0;">
    <p style="color:#bfb09a;font-size:12px;margin:0;">
      Webbly · webbly.no · kontakt@webbly.no
    </p>
  </div>
</body>
</html>`;

    await Promise.all([
      transporter.sendMail({
        from: `"Webbly" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `Ny booking — ${plan} — ${name} — ${formattedDate} kl. ${time}`,
        html: notificationHtml,
      }),
      transporter.sendMail({
        from: `"Webbly" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Booking bekreftet — Webbly intromøte",
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking failed:", err);
    return NextResponse.json({ error: "Noe gikk galt. Prøv igjen." }, { status: 500 });
  }
}
