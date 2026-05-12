import { google } from "googleapis";

export function getCalendarClient() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "";

  if (!json) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON env var");
  }

  const credentials = JSON.parse(json) as {
    client_email: string;
    private_key: string;
  };

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}
