import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Webbly — Nettsider for norske bedrifter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "hsl(32, 25%, 95%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "hsl(20, 20%, 12%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "hsl(32, 25%, 95%)",
              fontWeight: 700,
            }}
          >
            W
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "hsl(20, 20%, 12%)",
              letterSpacing: "-2px",
            }}
          >
            Webbly
          </div>
          <div
            style={{
              fontSize: 28,
              color: "hsl(20, 15%, 35%)",
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            Profesjonelle nettsider for norske småbedrifter
          </div>
          <div
            style={{
              marginTop: 16,
              background: "hsl(20, 20%, 12%)",
              color: "hsl(32, 25%, 95%)",
              borderRadius: 40,
              padding: "12px 32px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Fra 499 kr/mnd
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
