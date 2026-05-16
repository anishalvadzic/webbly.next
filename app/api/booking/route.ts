import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/mailer";
import { getCalendarClient } from "@/lib/googleCalendar";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEADER_INJECT_RE = /[\r\n]/;
const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const ALLOWED_PLANS = new Set([
  "Start",
  "Vekst",
  "Pro",
  "Growth", // EN alias for Vekst
]);

function stripControlChars(s: string): string {
  return s.replace(/[\r\n\x00-\x1F\x7F]/g, " ").trim();
}

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

  if (!ALLOWED_PLANS.has(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (
    name.length > 100 ||
    email.length > 254 ||
    (company && company.length > 100)
  ) {
    return NextResponse.json({ error: "Ugyldig input" }, { status: 400 });
  }

  // Reject newlines / control chars in any field that ends up in a mail header
  // (name + plan -> Subject, email -> attendees / to).
  if (
    HEADER_INJECT_RE.test(name) ||
    HEADER_INJECT_RE.test(email) ||
    (company && HEADER_INJECT_RE.test(company))
  ) {
    return NextResponse.json({ error: "Ugyldig input" }, { status: 400 });
  }

  const safeName = stripControlChars(name);
  const safeCompany = company ? stripControlChars(company) : "";

  const endTime = addOneHour(time);
  const formattedDate = formatDateNorwegian(date);

  try {
    const calendar = getCalendarClient();

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Intromøte — ${safeCompany || safeName} — ${plan}`,
        description: `Bedrift: ${safeCompany || "—"}\nE-post: ${email}\nPakke: ${plan}`,
        start: { dateTime: `${date}T${time}:00`, timeZone: "Europe/Oslo" },
        end: { dateTime: `${date}T${endTime}:00`, timeZone: "Europe/Oslo" },
        attendees: [{ email }],
        conferenceData: {
          createRequest: {
            requestId: `webbly-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 1440 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });

    const meetLink = event.data.conferenceData?.entryPoints
      ?.find((e) => e.entryPointType === "video")?.uri ?? null;

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
      ${meetLink ? `<tr>
        <td style="padding:10px 0;color:#8b7355;font-size:13px;vertical-align:top;border-top:1px solid #e8e0d6;">Google Meet</td>
        <td style="padding:10px 0;font-size:14px;border-top:1px solid #e8e0d6;"><a href="${meetLink}" style="color:#2c1810;text-decoration:underline;">${meetLink}</a></td>
      </tr>` : ""}
    </table>
  </div>
</body>
</html>`;

    const confirmationHtml = `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Booking bekreftet — Webbly</title>
</head>
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf8f5;padding:32px 16px;">
<tr><td align="center">
<table cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr>
    <td style="background-color:#1e140e;padding:36px 40px;text-align:center;border-radius:16px 16px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px;">
        <tr>
          <td width="38" height="38" style="background-color:#e8ddd4;border-radius:50%;text-align:center;vertical-align:middle;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#1e140e;">W</td>
          <td style="padding-left:10px;vertical-align:middle;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#ffffff;">Webbly</td>
        </tr>
      </table>
      <p style="margin:0;color:#c8bdb5;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Booking bekreftet</p>
    </td>
  </tr>

  <!-- GREETING -->
  <tr>
    <td style="background-color:#ffffff;padding:40px 40px 28px;">
      <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#2c1810;line-height:1.3;">Hei ${escapeHtml(name)},</h1>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#8b7355;line-height:1.75;">Vi ser frem til å bli bedre kjent med deg og bedriften din! Her er en bekreftelse på ditt uforpliktende intromøte.</p>
    </td>
  </tr>

  <!-- BOOKING SUMMARY -->
  <tr>
    <td style="background-color:#ffffff;padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f0ea;border:1px solid #e8e0d6;border-radius:12px;">
        <tr>
          <td style="padding:22px 24px 10px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#bfb09a;letter-spacing:2.5px;text-transform:uppercase;">Møtedetaljer</p>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size:18px;vertical-align:top;padding-top:1px;">&#128197;</td>
                <td style="padding-left:10px;">
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;color:#2c1810;">${formattedDate} kl. ${time}</p>
                  <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8b7355;">Varighet: 30–60 minutter</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size:16px;vertical-align:middle;">&#128230;</td>
                <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c1810;vertical-align:middle;"><strong>Pakke:</strong> ${escapeHtml(plan)}</td>
              </tr>
            </table>
          </td>
        </tr>
        ${company?.trim() ? `<tr>
          <td style="padding:8px 24px 22px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size:16px;vertical-align:middle;">&#127970;</td>
                <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c1810;vertical-align:middle;"><strong>Bedrift:</strong> ${escapeHtml(company)}</td>
              </tr>
            </table>
          </td>
        </tr>` : `<tr><td style="padding-bottom:22px;"></td></tr>`}
      </table>
    </td>
  </tr>

  <!-- PREPARATION -->
  <tr>
    <td style="background-color:#ffffff;padding:0 40px 32px;">
      <h2 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;color:#2c1810;">Tenk gjerne gjennom dette på forhånd</h2>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:13px;">
        <tr>
          <td width="26" style="vertical-align:top;padding-top:2px;">
            <span style="display:inline-block;width:20px;height:20px;background-color:#2c1810;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">&#10003;</span>
          </td>
          <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c1810;line-height:1.6;"><strong>Hva slags nettside drømmer du om?</strong> — stil, tone, og hvilket inntrykk du ønsker å gi besøkende.</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:13px;">
        <tr>
          <td width="26" style="vertical-align:top;padding-top:2px;">
            <span style="display:inline-block;width:20px;height:20px;background-color:#2c1810;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">&#10003;</span>
          </td>
          <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c1810;line-height:1.6;"><strong>Har du sett nettsider du liker?</strong> — ta gjerne skjermbilder eller lenker, det hjelper oss å forstå smaken din.</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="26" style="vertical-align:top;padding-top:2px;">
            <span style="display:inline-block;width:20px;height:20px;background-color:#2c1810;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">&#10003;</span>
          </td>
          <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#2c1810;line-height:1.6;"><strong>Hvem er kundene dine?</strong> — beskriv gjerne hvem du ønsker å nå, og hva du vil at nettsiden skal gjøre for bedriften.</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- WHAT TO EXPECT -->
  <tr>
    <td style="background-color:#f5f0ea;border-top:1px solid #e8e0d6;border-bottom:1px solid #e8e0d6;padding:26px 40px;">
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#bfb09a;letter-spacing:2.5px;text-transform:uppercase;">Hva skjer videre</p>
      <p style="margin:0 0 ${meetLink ? "16px" : "0"};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#8b7355;line-height:1.75;">Du vil motta en Google Calendar-invitasjon på denne e-postadressen. Møtet er avslappet og uforpliktende — vi vil bare bli kjent med deg og bedriften din. Etter møtet lager vi nettsiden din, og den er klar innen 3 dager.</p>
      ${meetLink ? `<a href="${meetLink}" style="display:inline-block;background-color:#1e140e;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:11px 22px;border-radius:8px;">Bli med på Google Meet &#8599;</a>` : ""}
    </td>
  </tr>

  <!-- CONTACT -->
  <tr>
    <td style="background-color:#ffffff;padding:28px 40px;">
      <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#2c1810;">Har du spørsmål?</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#8b7355;line-height:1.75;">Ta gjerne kontakt med oss direkte på <a href="mailto:kontakt@webbly.no" style="color:#2c1810;text-decoration:underline;">kontakt@webbly.no</a> — vi svarer raskt.</p>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background-color:#1e140e;padding:28px 40px;text-align:center;border-radius:0 0 16px 16px;">
      <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#e8ddd4;">Webbly</p>
      <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b5e55;line-height:1.6;">Nettsider for norske bedrifter. Levert på tre dager.</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;">
        <a href="https://webbly.no" style="color:#bfb09a;text-decoration:none;">webbly.no</a>
        <span style="color:#3d2e22;margin:0 8px;">&middot;</span>
        <a href="mailto:kontakt@webbly.no" style="color:#bfb09a;text-decoration:none;">kontakt@webbly.no</a>
        <span style="color:#3d2e22;margin:0 8px;">&middot;</span>
        <a href="https://webbly.no/personvern" style="color:#bfb09a;text-decoration:none;">Personvern</a>
      </p>
    </td>
  </tr>

</table>
<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#bfb09a;text-align:center;">&copy; 2026 Webbly. Alle rettigheter forbeholdt.</p>
</td></tr>
</table>
</body>
</html>`;

    await Promise.all([
      transporter.sendMail({
        from: `"Webbly" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `Ny booking — ${plan} — ${safeName} — ${formattedDate} kl. ${time}`,
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
    console.error(
      "Booking failed:",
      err instanceof Error ? err.message : "unknown error"
    );
    return NextResponse.json({ error: "Noe gikk galt. Prøv igjen." }, { status: 500 });
  }
}
