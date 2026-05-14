import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "../BrowserFrame";

const GREEN = "#4A7C59";
const LIGHT = "#F6FAF7";
const DARK = "#1C2B1F";

const PRODUCTS = [
  { name: "Canvas Tote Bag", price: "349,-", oldPrice: "499,-", badge: "Bestseller", color: "#E8E0D4", emoji: "👜" },
  { name: "Linen Shirt", price: "599,-", badge: "Ny", color: "#D4DDE8", emoji: "👕" },
  { name: "Keramikk Krus", price: "249,-", oldPrice: "349,-", badge: "Sale", color: "#E8D4D4", emoji: "☕" },
];

const FEATURES = [
  { icon: "🚚", label: "Gratis frakt over 499,-" },
  { icon: "↩️", label: "30 dagers returrett" },
  { icon: "🌿", label: "Bærekraftig produksjon" },
  { icon: "💳", label: "Sikker betaling" },
];

export const EcommerceSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scrollY = interpolate(frame, [50, 100, 130, 190], [0, -200, -200, -420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const navOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const heroOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateRight: "clamp" });
  const heroY = interpolate(frame, [8, 30], [20, 0], { extrapolateRight: "clamp" });

  const gridOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cardSprings = PRODUCTS.map((_, i) =>
    spring({ fps, frame: frame - (38 + i * 8), config: { damping: 80, stiffness: 60 } })
  );

  const selectedCard = frame > 68 ? 1 : -1;
  const selectedScale = spring({ fps, frame: frame - 68, config: { damping: 120, stiffness: 100 } });

  const featureOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const featureSprings = FEATURES.map((_, i) =>
    spring({ fps, frame: frame - (130 + i * 6), config: { damping: 80, stiffness: 70 } })
  );

  return (
    <BrowserFrame url="nordnaturlig.no" dark={false}>
      <AbsoluteFill style={{ background: LIGHT, fontFamily: "Inter, sans-serif" }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 52,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            borderBottom: "1px solid #e8ede9",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: DARK, letterSpacing: -0.5 }}>Nord Naturlig</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Nyheter", "Klær", "Hjem", "Sale"].map((item) => (
              <span key={item} style={{ fontSize: 13, color: "#555" }}>{item}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#888" }}>🔍</span>
            <div style={{ fontSize: 13, color: GREEN, fontWeight: 600, background: "#e8f5ee", padding: "5px 12px", borderRadius: 20 }}>🛒 2</div>
          </div>
        </div>

        {/* Scrolling content */}
        <div style={{ position: "absolute", top: 52, left: 0, right: 0, transform: `translateY(${scrollY}px)` }}>
          {/* Hero banner */}
          <div
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroY}px)`,
              height: 170,
              background: `linear-gradient(120deg, ${GREEN}, #2e5c3f)`,
              display: "flex",
              alignItems: "center",
              padding: "0 36px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", right: 36, top: -20, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            <div style={{ position: "absolute", right: 160, bottom: -60, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Ny kolleksjon 2026</div>
              <div style={{ fontSize: 32, color: "#fff", fontWeight: 700, lineHeight: 1.15, marginBottom: 12 }}>Sommersalg<br />opptil 40% rabatt</div>
              <div style={{ display: "inline-block", padding: "10px 24px", background: "rgba(255,255,255,0.95)", color: GREEN, borderRadius: 6, fontSize: 13, fontWeight: 700 }}>Handle nå →</div>
            </div>
          </div>

          {/* Product grid */}
          <div style={{ opacity: gridOpacity, padding: "28px 36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: "#888", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Butikk</div>
                <div style={{ fontSize: 24, color: DARK, fontWeight: 700 }}>Utvalgte produkter</div>
              </div>
              <span style={{ fontSize: 13, color: GREEN, fontWeight: 600 }}>Se alle →</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {PRODUCTS.map((p, i) => {
                const isSelected = selectedCard === i;
                const cardY = interpolate(cardSprings[i], [0, 1], [30, 0]);
                const cardOpacity = interpolate(cardSprings[i], [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={p.name}
                    style={{
                      flex: 1,
                      opacity: cardOpacity,
                      transform: `translateY(${cardY}px) scale(${isSelected ? 1 + selectedScale * 0.025 : 1})`,
                      background: "#fff",
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: isSelected ? `0 8px 30px rgba(74,124,89,0.25)` : "0 2px 8px rgba(0,0,0,0.06)",
                      border: isSelected ? `2px solid ${GREEN}` : "2px solid transparent",
                      transition: "none",
                    }}
                  >
                    <div style={{ height: 130, background: p.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: 40 }}>{p.emoji}</div>
                      <div style={{
                        position: "absolute", top: 10, left: 10,
                        background: p.badge === "Sale" ? "#e53e3e" : GREEN,
                        color: "#fff", fontSize: 10, fontWeight: 700,
                        padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5,
                      }}>
                        {p.badge}
                      </div>
                      {isSelected && (
                        <div style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                          ❤️
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "16px 18px" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 8 }}>{p.name}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 17, fontWeight: 700, color: GREEN }}>{p.price}</span>
                          {p.oldPrice && <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>{p.oldPrice}</span>}
                        </div>
                        {isSelected && (
                          <div style={{
                            background: GREEN, color: "#fff", fontSize: 11, fontWeight: 600,
                            padding: "6px 14px", borderRadius: 6,
                          }}>
                            + Legg til
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features bar */}
          <div style={{ opacity: featureOpacity, padding: "16px 36px 32px" }}>
            <div style={{ display: "flex", gap: 12 }}>
              {FEATURES.map((f, i) => {
                const fY = interpolate(featureSprings[i], [0, 1], [16, 0]);
                const fOpacity = interpolate(featureSprings[i], [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={f.label}
                    style={{
                      flex: 1,
                      opacity: fOpacity,
                      transform: `translateY(${fY}px)`,
                      background: "#fff",
                      borderRadius: 10,
                      padding: "16px",
                      textAlign: "center",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      border: "1px solid #e8ede9",
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
                    <div style={{ fontSize: 11, color: "#666", fontWeight: 500 }}>{f.label}</div>
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
