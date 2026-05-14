import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserFrame } from "../BrowserFrame";

const PROJECTS = [
  { title: "Fjord Studio", category: "Arkitektur", color1: "#1a2a3a", color2: "#2d4a6a", year: "2026" },
  { title: "Lyse Brand", category: "Merkevare", color1: "#2a1a3a", color2: "#4a2d6a", year: "2025" },
];

const GALLERY = [
  { color: "#1a2a3a", label: "Bolig" },
  { color: "#2a1a2a", label: "Kontor" },
  { color: "#1a3a2a", label: "Natur" },
  { color: "#3a2a1a", label: "Interior" },
];

export const PortfolioSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const project = frame < 55 ? 0 : 1;
  const transitionProgress = interpolate(frame, [50, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const navOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const titleOpacity0 = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY0 = interpolate(frame, [10, 28], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagSpring0 = spring({ fps, frame: frame - 22, config: { damping: 80 } });
  const numSpring0 = spring({ fps, frame: frame - 16, config: { damping: 90 } });

  const titleOpacity1 = interpolate(frame, [60, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY1 = interpolate(frame, [60, 76], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagSpring1 = spring({ fps, frame: frame - 68, config: { damping: 80 } });

  const scrollY = interpolate(frame, [90, 140], [0, -400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const galleryOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gallerySprings = GALLERY.map((_, i) =>
    spring({ fps, frame: frame - (110 + i * 6), config: { damping: 80, stiffness: 60 } })
  );

  const aboutOpacity = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const aboutSpring = spring({ fps, frame: frame - 150, config: { damping: 80 } });

  return (
    <BrowserFrame url="magnusberg.no" dark={true}>
      <AbsoluteFill style={{ background: "#111", fontFamily: "Inter, sans-serif" }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 52,
            background: "rgba(17,17,17,0.9)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 36px",
            zIndex: 10,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>MAGNUS BERG</span>
          <div style={{ display: "flex", gap: 26 }}>
            {["Arbeid", "Om", "Kontakt"].map((item) => (
              <span key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{item}</span>
            ))}
          </div>
          <div style={{ padding: "7px 16px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, color: "#fff", fontSize: 12 }}>
            Kontakt
          </div>
        </div>

        {/* Scrollable area */}
        <div style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            {/* Project 1 */}
            <AbsoluteFill
              style={{
                opacity: interpolate(transitionProgress, [0, 1], [1, 0]),
                background: `linear-gradient(135deg, ${PROJECTS[0].color1} 0%, ${PROJECTS[0].color2} 100%)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "0 36px 40px",
                overflow: "hidden",
                height: 650,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: "20%", right: "10%", width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <div style={{ position: "absolute", top: "50%", left: "30%", width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

              <div style={{ opacity: interpolate(tagSpring0, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }), transform: `translateX(${interpolate(tagSpring0, [0, 1], [-10, 0])})`, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                {PROJECTS[0].category} · {PROJECTS[0].year}
              </div>
              <div style={{ opacity: titleOpacity0, transform: `translateY(${titleY0}px)`, fontSize: 50, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                {PROJECTS[0].title}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ opacity: interpolate(numSpring0, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }), fontSize: 12, color: "rgba(255,255,255,0.5)" }}>01 / 04</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>NESTE →</div>
              </div>
            </AbsoluteFill>

            {/* Project 2 */}
            <AbsoluteFill
              style={{
                opacity: transitionProgress,
                background: `linear-gradient(135deg, ${PROJECTS[1].color1} 0%, ${PROJECTS[1].color2} 100%)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "0 36px 40px",
                overflow: "hidden",
                height: 650,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: "15%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

              <div style={{ opacity: interpolate(tagSpring1, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }), fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
                {PROJECTS[1].category} · {PROJECTS[1].year}
              </div>
              <div style={{ opacity: titleOpacity1, transform: `translateY(${titleY1}px)`, fontSize: 50, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                {PROJECTS[1].title}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>02 / 04</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>NESTE →</div>
              </div>
            </AbsoluteFill>

            {/* Gallery section (below the fold) */}
            <div style={{ marginTop: 660, padding: "40px 36px", background: "#111" }}>
              <div style={{ opacity: galleryOpacity }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Galleri</div>
                <div style={{ fontSize: 28, color: "#fff", fontWeight: 700, marginBottom: 24 }}>Flere prosjekter</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {GALLERY.map((g, i) => {
                  const gY = interpolate(gallerySprings[i], [0, 1], [20, 0]);
                  const gO = interpolate(gallerySprings[i], [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
                  return (
                    <div key={g.label} style={{
                      opacity: gO,
                      transform: `translateY(${gY}px)`,
                      background: `linear-gradient(135deg, ${g.color} 0%, ${g.color}99 100%)`,
                      borderRadius: 10,
                      height: 120,
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 16,
                    }}>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{g.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* About section */}
              <div style={{
                opacity: aboutOpacity,
                transform: `translateY(${interpolate(aboutSpring, [0, 1], [20, 0])}px)`,
                marginTop: 32,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "28px 24px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 20, color: "#fff", fontWeight: 700, marginBottom: 10 }}>Om meg</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  Kreativ designer basert i Oslo med 8 års erfaring innen arkitektur, merkevarebygging og digital design. La oss skape noe vakkert sammen.
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                  <div style={{ padding: "8px 20px", background: "#fff", color: "#111", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>Kontakt meg</div>
                  <div style={{ padding: "8px 20px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 6, fontSize: 12 }}>Last ned CV</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
