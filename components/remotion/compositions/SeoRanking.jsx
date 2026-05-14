import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from '../BrowserFrame';

const ACCENT = '#C9A96E';
const MUTED = '#70757A';
const GOOGLE_BLUE = '#1A0DAB';
const GOOGLE_GREEN = '#006621';
const TEXT_DARK = '#202124';

const SEARCH_QUERY = 'frisør oslo';

const RESULTS = [
  {
    id: 'bella',
    title: 'Salong Bella Vista — Oslo Sentrum',
    url: 'salongbellavista.no',
    snippet: 'Eksklusiv frisørsalong i hjertet av Oslo. Bestill time online.',
  },
  {
    id: 'hair',
    title: 'Hår & Stil — Frisør i Grünerløkka',
    url: 'harogstil.no',
    snippet: 'Moderne salong med erfarne stylister. Klipp, farge og styling.',
  },
  {
    id: 'klipp',
    title: 'Klipp Oslo AS',
    url: 'klipposlo.no',
    snippet: 'Tradisjonsrik frisør med sentral beliggenhet i Oslo.',
  },
  {
    id: 'karen',
    title: 'Frisør Karen — Personlig service',
    url: 'frisorkaren.no',
    snippet: 'Spesialist på dame- og herreklipp siden 2008.',
  },
  {
    id: 'webbly',
    title: 'Frisør Nova — Topp omtalt i 2026',
    url: 'frisornova.no',
    snippet: '★★★★★ 5.0 (245 anmeldelser) · Online booking 24/7 · Ny side med Webbly.',
  },
];

const ROW_HEIGHT = 88;
const SWAP_DURATION = 8;

export const SeoRanking = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typing animation in search box (frames 0–25)
  const typedLength = Math.round(
    interpolate(frame, [4, 24], [0, SEARCH_QUERY.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const typedText = SEARCH_QUERY.slice(0, typedLength);
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  // Results appear (frames 28–48)
  const resultsOpacity = interpolate(frame, [28, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Climb events: Webbly's rank goes 4 → 3 → 2 → 1 → 0 over frames 55–115
  const ranks = {
    bella: interpolate(frame, [100, 100 + SWAP_DURATION], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    hair: interpolate(frame, [85, 85 + SWAP_DURATION], [1, 2], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    klipp: interpolate(frame, [70, 70 + SWAP_DURATION], [2, 3], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    karen: interpolate(frame, [55, 55 + SWAP_DURATION], [3, 4], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    webbly: interpolate(
      frame,
      [55, 55 + SWAP_DURATION, 70, 70 + SWAP_DURATION, 85, 85 + SWAP_DURATION, 100, 100 + SWAP_DURATION],
      [4, 3, 3, 2, 2, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
  };

  // #1 highlight glow (frames 115+)
  const glowProgress = interpolate(frame, [115, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowPulse = interpolate(frame % 30, [0, 15, 30], [0.7, 1, 0.7]);

  // Click counter (frames 125+)
  const clickCount = Math.round(
    interpolate(frame, [125, 145], [0, 245], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const counterOpacity = interpolate(frame, [125, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counterSpring = spring({
    fps,
    frame: frame - 125,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <BrowserFrame url="google.com/search?q=frisør+oslo">
      <AbsoluteFill style={{ background: '#ffffff', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
        {/* Google logo */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 40,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: -1,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </div>

        {/* Search box */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 160,
            right: 60,
            height: 44,
            background: '#fff',
            border: '1px solid #DFE1E5',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            boxShadow: '0 1px 6px rgba(32,33,36,0.08)',
          }}
        >
          {/* Magnifying glass icon */}
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ marginRight: 12 }}>
            <circle cx={11} cy={11} r={7} stroke="#9AA0A6" strokeWidth={2} />
            <line x1={21} y1={21} x2={16} y2={16} stroke="#9AA0A6" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 16, color: TEXT_DARK, fontFamily: 'Arial, sans-serif' }}>
            {typedText}
            <span style={{ opacity: caretOn && frame < 30 ? 1 : 0, marginLeft: 1 }}>|</span>
          </span>
        </div>

        {/* Result stats line */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            left: 40,
            fontSize: 12,
            color: MUTED,
            opacity: resultsOpacity,
          }}
        >
          Ca. 1 240 000 resultater (0,38 sekunder)
        </div>

        {/* Results list — absolute positioned, animated y */}
        <div style={{ position: 'absolute', top: 130, left: 40, right: 40, opacity: resultsOpacity }}>
          {RESULTS.map((r) => {
            const rank = ranks[r.id];
            const isWebbly = r.id === 'webbly';
            const isNumberOne = isWebbly && rank < 0.5;

            const glowRadius = isWebbly ? glowProgress * glowPulse * 18 : 0;

            return (
              <div
                key={r.id}
                style={{
                  position: 'absolute',
                  top: rank * ROW_HEIGHT,
                  left: 0,
                  right: 0,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: isNumberOne
                    ? `rgba(201, 169, 110, ${0.06 + glowProgress * 0.06})`
                    : 'transparent',
                  border: isNumberOne
                    ? `1px solid rgba(201, 169, 110, ${0.2 + glowProgress * 0.3})`
                    : '1px solid transparent',
                  boxShadow: isNumberOne ? `0 0 ${glowRadius}px rgba(201, 169, 110, 0.4)` : 'none',
                  transition: 'background 200ms',
                }}
              >
                <div style={{ fontSize: 13, color: GOOGLE_GREEN, marginBottom: 3 }}>{r.url}</div>
                <div
                  style={{
                    fontSize: 18,
                    color: GOOGLE_BLUE,
                    fontWeight: 400,
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  {r.title}
                </div>
                <div style={{ fontSize: 13, color: '#4D5156', lineHeight: 1.45 }}>{r.snippet}</div>
              </div>
            );
          })}
        </div>

        {/* Click counter badge (top-right) */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            right: 40,
            opacity: counterOpacity,
            transform: `scale(${interpolate(counterSpring, [0, 1], [0.85, 1])})`,
            background: '#1C1C1E',
            color: '#fff',
            borderRadius: 10,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: `0 8px 24px rgba(0,0,0,0.18)`,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            ↑
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{clickCount}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, marginTop: 2 }}>
              KLIKK DENNE UKEN
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
