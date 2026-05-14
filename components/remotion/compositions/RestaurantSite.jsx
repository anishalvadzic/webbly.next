import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "../BrowserFrame";

const NAV_ITEMS = ["Meny", "Om oss", "Reservasjon", "Kontakt"];
const DISHES = [
  { name: "Pasta Carbonara", price: "195,-", desc: "Romersk klassiker med guanciale" },
  { name: "Biff Tenderloin", price: "345,-", desc: "Med trøffelsmør og rotgrønnsaker" },
  { name: "Tiramisu", price: "115,-", desc: "Husets signatur-dessert" },
];
const REVIEWS = [
  { text: '"Beste italienske i Oslo — vi kommer tilbake!"', author: "Marie K.", stars: 5 },
  { text: '"Fantastisk stemning og smakfull mat."', author: "Jonas B.", stars: 5 },
  { text: '"Perfekt for date night. Anbefales!"', author: "Linn S.", stars: 5 },
];

const BRAND = "#8B3A2A";
const CREAM = "#FAF6F0";
const GOLD = "#C9A96E";

export const RestaurantSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scrollY = interpolate(frame, [55, 110, 140, 195], [0, -280, -280, -560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heroOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const heroY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });
  const navOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = spring({ fps, frame: frame - 10, config: { damping: 80, stiffness: 60 } });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaScale = spring({ fps, frame: frame - 28, config: { damping: 80 } });
  const ctaOpacity = interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sectionY = interpolate(frame, [45, 65], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sectionOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const dishOpacities = DISHES.map((_, i) =>
    interpolate(frame, [55 + i * 7, 68 + i * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  const reviewsLabelOpacity = interpolate(frame, [130, 145], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const reviewOpacities = REVIEWS.map((_, i) =>
    interpolate(frame, [140 + i * 8, 155 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const reviewSprings = REVIEWS.map((_, i) =>
    spring({ fps, frame: frame - (140 + i * 8), config: { damping: 80, stiffness: 60 } })
  );

  return (
    <BrowserFrame url="trattoria-oslo.no" dark={false}>
      <AbsoluteFill style={{ background: CREAM, fontFamily: "Georgia, serif" }}>
        {/* Fixed Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            background: "rgba(250,246,240,0.95)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            zIndex: 10,
            borderBottom: "1px solid rgba(139,58,42,0.15)",
          }}
        >
          <span style={{ fontSize: 20, color: BRAND, fontWeight: 700, letterSpacing: 1 }}>
            Trattoria Oslo
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            {NAV_ITEMS.map((item) => (
              <span key={item} style={{ fontSize: 13, color: "#555", letterSpacing: 0.5, fontFamily: "Inter, sans-serif" }}>{item}</span>
            ))}
          </div>
          <div style={{ padding: "8px 20px", background: BRAND, borderRadius: 4, color: "#fff", fontSize: 12, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
            Bestill bord
          </div>
        </div>

        {/* Scrolling content */}
        <div style={{ position: "absolute", top: 56, left: 0, right: 0, transform: `translateY(${scrollY}px)` }}>
          {/* Hero */}
          <div
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroY}px)`,
              height: 300,
              background: `linear-gradient(135deg, ${BRAND} 0%, #5c1f12 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(201,169,110,0.15)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ position: "absolute", top: 40, left: 40, width: 100, height: 100, borderRadius: "50%", background: "rgba(201,169,110,0.08)" }} />

            <div style={{ opacity: titleOpacity, transform: `scale(${Math.max(0.001, titleScale * 0.1 + 0.9)})`, textAlign: "center", zIndex: 1 }}>
              <div style={{ fontSize: 11, color: GOLD, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
                Autentisk italiensk · Siden 1998
              </div>
              <h1 style={{ fontSize: 42, color: "#fff", margin: 0, fontWeight: 700, lineHeight: 1.1 }}>
                Smak av Italia
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginTop: 10 }}>
                Hjemmelaget pasta · Lokale råvarer · Oslo sentrum
              </p>
            </div>

            <div style={{ opacity: ctaOpacity, transform: `scale(${Math.max(0.001, ctaScale * 0.08 + 0.92)})`, marginTop: 28, zIndex: 1, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ padding: "12px 32px", background: GOLD, borderRadius: 4, color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                Bestill bord
              </div>
              <div style={{ padding: "12px 24px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4, color: "#fff", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
                Se meny
              </div>
            </div>
          </div>

          {/* Menu section */}
          <div style={{ opacity: sectionOpacity, transform: `translateY(${sectionY}px)`, padding: "36px 40px" }}>
            <div style={{ fontSize: 11, color: BRAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 6, fontFamily: "Inter, sans-serif" }}>
              Vår meny
            </div>
            <div style={{ fontSize: 28, color: "#222", fontWeight: 700, marginBottom: 20 }}>
              Utvalgte retter
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {DISHES.map((dish, i) => (
                <div
                  key={dish.name}
                  style={{
                    opacity: dishOpacities[i],
                    flex: 1,
                    background: "#fff",
                    borderRadius: 10,
                    padding: "20px 22px",
                    borderTop: `3px solid ${GOLD}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#222", fontWeight: 700, marginBottom: 6 }}>{dish.name}</div>
                  <div style={{ fontSize: 12, color: "#888", fontFamily: "Inter, sans-serif", marginBottom: 12, lineHeight: 1.4 }}>{dish.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 18, color: BRAND, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>{dish.price}</div>
                    <div style={{ fontSize: 11, color: GOLD, fontFamily: "Inter, sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>Se mer →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews section */}
          <div style={{ padding: "24px 40px 40px" }}>
            <div style={{ opacity: reviewsLabelOpacity }}>
              <div style={{ fontSize: 11, color: BRAND, letterSpacing: 4, textTransform: "uppercase", marginBottom: 6, fontFamily: "Inter, sans-serif" }}>
                Anmeldelser
              </div>
              <div style={{ fontSize: 28, color: "#222", fontWeight: 700, marginBottom: 20 }}>
                Hva gjestene sier
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {REVIEWS.map((review, i) => (
                <div
                  key={i}
                  style={{
                    opacity: reviewOpacities[i],
                    transform: `translateY(${interpolate(reviewSprings[i], [0, 1], [20, 0])}px)`,
                    flex: 1,
                    background: "#fff",
                    borderRadius: 10,
                    padding: "20px 22px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    borderLeft: `3px solid ${GOLD}`,
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 10 }}>
                    {"⭐".repeat(review.stars)}
                  </div>
                  <div style={{ fontSize: 14, color: "#444", lineHeight: 1.5, fontStyle: "italic", marginBottom: 12, fontFamily: "Inter, sans-serif" }}>
                    {review.text}
                  </div>
                  <div style={{ fontSize: 12, color: "#999", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                    {review.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
