import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CONFIGS = {
  restaurant: {
    brand: "#8B3A2A",
    accent: "#C9A96E",
    bg: "#FAF6F0",
    name: "Trattoria Oslo",
    heroTitle: "Smak av Italia",
    heroSub: "Hjemmelaget pasta · Ferske råvarer",
    cta: "Bestill bord",
    sections: [
      {
        title: "Dagens meny",
        items: [
          { icon: "🍝", label: "Pasta Carbonara", sub: "195,-" },
          { icon: "🥩", label: "Biff Tenderloin", sub: "345,-" },
          { icon: "🍰", label: "Tiramisu", sub: "115,-" },
        ],
      },
      {
        title: "Anmeldelser",
        items: [
          { icon: "⭐", label: '"Beste pasta i Oslo"', sub: "— Marie K." },
          { icon: "⭐", label: '"Fantastisk stemning"', sub: "— Jonas B." },
        ],
      },
    ],
  },
  ecommerce: {
    brand: "#4A7C59",
    accent: "#4A7C59",
    bg: "#F6FAF7",
    name: "Nord Naturlig",
    heroTitle: "Ny kolleksjon",
    heroSub: "Bærekraftig mote · Norsk design",
    cta: "Handle nå",
    sections: [
      {
        title: "Populære produkter",
        items: [
          { icon: "👜", label: "Canvas Tote Bag", sub: "349,-" },
          { icon: "👕", label: "Linen Shirt", sub: "599,-" },
          { icon: "☕", label: "Keramikk Krus", sub: "249,-" },
        ],
      },
      {
        title: "Kategorier",
        items: [
          { icon: "👗", label: "Klær", sub: "24 produkter" },
          { icon: "🏠", label: "Hjem & Interiør", sub: "18 produkter" },
        ],
      },
    ],
  },
  service: {
    brand: "#1B2B4B",
    accent: "#F5A623",
    bg: "#F4F6FB",
    name: "Berger Elektro",
    heroTitle: "Rask elektrisk hjelp",
    heroSub: "Autorisert · Oslo og Akershus",
    cta: "Ring oss nå",
    sections: [
      {
        title: "Våre tjenester",
        items: [
          { icon: "⚡", label: "Elektriker", sub: "Sikring & montering" },
          { icon: "🔧", label: "Service", sub: "Vedlikehold" },
          { icon: "🏠", label: "Nybygg", sub: "Totalentreprise" },
        ],
      },
      {
        title: "Hvorfor oss?",
        items: [
          { icon: "✅", label: "Svar innen 30 min", sub: "Rask respons" },
          { icon: "🏆", label: "500+ prosjekter", sub: "Erfaring" },
        ],
      },
    ],
  },
  portfolio: {
    brand: "#ffffff",
    accent: "#888",
    bg: "#111",
    name: "MAGNUS BERG",
    heroTitle: "Kreativ Design",
    heroSub: "Arkitektur · Merkevare · Digital",
    cta: "Se arbeid",
    dark: true,
    sections: [
      {
        title: "Utvalgte prosjekter",
        items: [
          { icon: "🏗️", label: "Fjord Studio", sub: "Arkitektur" },
          { icon: "🎨", label: "Lyse Brand", sub: "Merkevare" },
          { icon: "💻", label: "Nova Digital", sub: "Nettside" },
        ],
      },
      {
        title: "Om meg",
        items: [
          { icon: "📍", label: "Basert i Oslo", sub: "Norge" },
          { icon: "📧", label: "Kontakt", sub: "hei@magnusberg.no" },
        ],
      },
    ],
  },
};

export const MobileSitePreview = ({ type = "restaurant" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = CONFIGS[type];
  const isDark = c.dark;
  const textColor = isDark ? "#fff" : "#222";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "#888";
  const cardBg = isDark ? "#1c1c1e" : "#fff";
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  const scrollY = interpolate(frame, [60, 140], [0, -260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const navOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const heroOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateRight: "clamp",
  });
  const heroY = interpolate(frame, [8, 24], [16, 0], {
    extrapolateRight: "clamp",
  });

  const ctaSpring = spring({
    fps,
    frame: frame - 26,
    config: { damping: 80 },
  });

  return (
    <AbsoluteFill
      style={{ background: c.bg, fontFamily: "Inter, sans-serif" }}
    >
      {/* Status bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          fontSize: 12,
          fontWeight: 600,
          color: isDark ? "#fff" : "#000",
          zIndex: 20,
        }}
      >
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 10 }}>5G</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ transform: `translateY(${scrollY}px)` }}>
          {/* Nav bar */}
          <div
            style={{
              opacity: navOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: `1px solid ${dividerColor}`,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: isDark ? "#fff" : c.brand,
                letterSpacing: isDark ? 1 : -0.3,
              }}
            >
              {c.name}
            </span>
            {/* Hamburger */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div
                style={{
                  width: 18,
                  height: 2,
                  background: isDark ? "#fff" : c.brand,
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 2,
                  background: isDark ? "#fff" : c.brand,
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 2,
                  background: isDark ? "#fff" : c.brand,
                  borderRadius: 1,
                }}
              />
            </div>
          </div>

          {/* Hero */}
          <div
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroY}px)`,
              padding: "32px 20px 28px",
              background: isDark
                ? `linear-gradient(135deg, ${c.bg} 0%, #1a1a2e 100%)`
                : `linear-gradient(135deg, ${c.brand} 0%, ${c.brand}dd 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                fontSize: 10,
                color: isDark ? c.accent : "rgba(255,255,255,0.75)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {c.heroSub}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              {c.heroTitle}
            </div>
            <div
              style={{
                opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
                transform: `scale(${interpolate(ctaSpring, [0, 1], [0.9, 1])})`,
                display: "inline-block",
                padding: "10px 24px",
                background: isDark ? "#fff" : c.accent || "rgba(255,255,255,0.95)",
                color: isDark ? "#111" : "#fff",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {c.cta}
            </div>
          </div>

          {/* Sections */}
          {c.sections.map((section, si) => {
            const sectionDelay = 40 + si * 30;
            const sOpacity = interpolate(
              frame,
              [sectionDelay, sectionDelay + 16],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div key={si} style={{ opacity: sOpacity, padding: "20px" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: isDark ? c.accent : c.brand,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 12,
                    fontWeight: 600,
                  }}
                >
                  {section.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map((item, ii) => {
                    const itemDelay = sectionDelay + 10 + ii * 6;
                    const iSpring = spring({
                      fps,
                      frame: frame - itemDelay,
                      config: { damping: 80, stiffness: 70 },
                    });
                    const iY = interpolate(iSpring, [0, 1], [12, 0]);
                    const iOpacity = interpolate(
                      iSpring,
                      [0, 0.4],
                      [0, 1],
                      { extrapolateRight: "clamp" }
                    );

                    return (
                      <div
                        key={ii}
                        style={{
                          opacity: iOpacity,
                          transform: `translateY(${iY}px)`,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          background: cardBg,
                          borderRadius: 10,
                          padding: "14px 14px",
                          boxShadow: isDark
                            ? "0 1px 4px rgba(0,0,0,0.3)"
                            : "0 1px 6px rgba(0,0,0,0.06)",
                          border: `1px solid ${dividerColor}`,
                        }}
                      >
                        <div style={{ fontSize: 22, flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: textColor,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{ fontSize: 11, color: subtextColor, marginTop: 2 }}
                          >
                            {item.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div style={{ padding: "16px 20px 40px" }}>
            <div
              style={{
                opacity: interpolate(frame, [120, 140], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                background: isDark ? "#fff" : c.brand,
                color: isDark ? "#111" : "#fff",
                borderRadius: 10,
                padding: "14px",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Kontakt oss →
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RestaurantSiteMobile = () => (
  <MobileSitePreview type="restaurant" />
);
export const EcommerceSiteMobile = () => (
  <MobileSitePreview type="ecommerce" />
);
export const ServiceSiteMobile = () => <MobileSitePreview type="service" />;
export const PortfolioSiteMobile = () => (
  <MobileSitePreview type="portfolio" />
);
