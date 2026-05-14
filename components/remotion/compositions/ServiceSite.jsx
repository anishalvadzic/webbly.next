import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "../BrowserFrame";

const NAVY = "#1B2B4B";
const YELLOW = "#F5A623";
const LIGHT = "#F4F6FB";

const SERVICES = [
  { icon: "⚡", label: "Elektriker", desc: "Sikring, montering og feilsøking" },
  { icon: "🔧", label: "Service", desc: "Vedlikehold og reparasjoner" },
  { icon: "🏠", label: "Nybygg", desc: "Totalentreprise elektrisk" },
];

const STATS = [
  { value: "500+", label: "Prosjekter" },
  { value: "4.9", label: "Google Rating" },
  { value: "30 min", label: "Responstid" },
  { value: "15 år", label: "Erfaring" },
];

const TESTIMONIALS = [
  { text: '"Rask og profesjonell service. Anbefales!"', author: "Per H.", role: "Huseier" },
  { text: '"Beste elektrikeren vi har brukt."', author: "Tone M.", role: "Bedriftseier" },
];

export const ServiceSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scrollY = interpolate(frame, [50, 100, 140, 195], [0, -240, -240, -500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const navOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  const heroOpacity = interpolate(frame, [6, 22], [0, 1], { extrapolateRight: "clamp" });
  const heroX = interpolate(frame, [6, 26], [-20, 0], { extrapolateRight: "clamp" });
  const phoneSpring = spring({ fps, frame: frame - 20, config: { damping: 100, stiffness: 80 } });
  const phoneOpacity = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeSpring = spring({ fps, frame: frame - 30, config: { damping: 80 } });
  const badgeOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const serviceLabel = interpolate(frame, [48, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sSprings = SERVICES.map((_, i) =>
    spring({ fps, frame: frame - (52 + i * 8), config: { damping: 80, stiffness: 70 } })
  );

  const statsOpacity = interpolate(frame, [130, 145], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const statsSprings = STATS.map((_, i) =>
    spring({ fps, frame: frame - (135 + i * 5), config: { damping: 80, stiffness: 70 } })
  );

  const testimonialOpacity = interpolate(frame, [155, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const testimonialSprings = TESTIMONIALS.map((_, i) =>
    spring({ fps, frame: frame - (160 + i * 8), config: { damping: 80 } })
  );

  return (
    <BrowserFrame url="bergerelektro.no" dark={true}>
      <AbsoluteFill style={{ background: LIGHT, fontFamily: "Inter, sans-serif" }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 52,
            background: NAVY,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: YELLOW, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>Berger Elektro</span>
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            {["Tjenester", "Om oss", "Prosjekter", "Kontakt"].map((item) => (
              <span key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{item}</span>
            ))}
          </div>
          <div style={{ padding: "8px 18px", background: YELLOW, borderRadius: 4, color: "#fff", fontSize: 12, fontWeight: 700 }}>
            Ring oss
          </div>
        </div>

        {/* Scrolling content */}
        <div style={{ position: "absolute", top: 52, left: 0, right: 0, transform: `translateY(${scrollY}px)` }}>
          {/* Hero */}
          <div
            style={{
              opacity: heroOpacity,
              transform: `translateX(${heroX}px)`,
              height: 270,
              background: NAVY,
              padding: "0 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", background: "rgba(245,166,35,0.12)" }} />
            <div style={{ position: "absolute", bottom: -30, left: 200, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
            <div style={{ fontSize: 11, color: YELLOW, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>
              Autorisert elektriker · Oslo og Akershus
            </div>
            <h1 style={{ fontSize: 38, color: "#fff", margin: 0, fontWeight: 800, lineHeight: 1.15, maxWidth: 480 }}>
              Rask og pålitelig<br />elektrisk hjelp
            </h1>

            <div
              style={{
                opacity: phoneOpacity,
                transform: `translateY(${interpolate(phoneSpring, [0, 1], [12, 0])})`,
                marginTop: 22,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div style={{ padding: "11px 28px", background: YELLOW, borderRadius: 6, color: "#fff", fontSize: 14, fontWeight: 700 }}>
                Ring oss nå
              </div>
              <div style={{ fontSize: 22, color: "#fff", fontWeight: 700, fontFamily: "Georgia, serif" }}>
                +47 911 22 333
              </div>
            </div>

            <div
              style={{
                opacity: badgeOpacity,
                transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "5px 14px",
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 11 }}>✅</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Svar innen 30 minutter</span>
            </div>
          </div>

          {/* Services */}
          <div style={{ padding: "32px 36px" }}>
            <div style={{ opacity: serviceLabel }}>
              <div style={{ fontSize: 11, color: NAVY, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Våre tjenester</div>
              <div style={{ fontSize: 24, color: "#222", fontWeight: 700, marginBottom: 18 }}>Hva vi tilbyr</div>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {SERVICES.map((s, i) => {
                const cardY = interpolate(sSprings[i], [0, 1], [20, 0]);
                const cardOpacity = interpolate(sSprings[i], [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={s.label}
                    style={{
                      flex: 1,
                      opacity: cardOpacity,
                      transform: `translateY(${cardY}px)`,
                      background: "#fff",
                      borderRadius: 10,
                      padding: "22px 20px",
                      borderLeft: `4px solid ${YELLOW}`,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div style={{ opacity: statsOpacity, padding: "8px 36px 28px" }}>
            <div style={{ display: "flex", gap: 12 }}>
              {STATS.map((stat, i) => {
                const sY = interpolate(statsSprings[i], [0, 1], [14, 0]);
                const sO = interpolate(statsSprings[i], [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={stat.label}
                    style={{
                      flex: 1,
                      opacity: sO,
                      transform: `translateY(${sY}px)`,
                      background: NAVY,
                      borderRadius: 10,
                      padding: "18px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800, color: YELLOW, marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ opacity: testimonialOpacity, padding: "8px 36px 40px" }}>
            <div style={{ fontSize: 11, color: NAVY, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Kundeomtaler</div>
            <div style={{ fontSize: 24, color: "#222", fontWeight: 700, marginBottom: 18 }}>Hva kundene sier</div>
            <div style={{ display: "flex", gap: 14 }}>
              {TESTIMONIALS.map((t, i) => {
                const tY = interpolate(testimonialSprings[i], [0, 1], [16, 0]);
                const tO = interpolate(testimonialSprings[i], [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      opacity: tO,
                      transform: `translateY(${tY}px)`,
                      background: "#fff",
                      borderRadius: 10,
                      padding: "22px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ fontSize: 14, marginBottom: 10 }}>⭐⭐⭐⭐⭐</div>
                    <div style={{ fontSize: 14, color: "#444", fontStyle: "italic", lineHeight: 1.5, marginBottom: 14 }}>{t.text}</div>
                    <div style={{ fontSize: 13, color: NAVY, fontWeight: 700 }}>{t.author}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>{t.role}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
