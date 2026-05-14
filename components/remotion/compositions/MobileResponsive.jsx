import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const DARK = '#1C1C1E';
const ACCENT = '#C9A96E';
const WHITE = '#FFFFFF';
const SURFACE = '#2A2A2C';
const MUTED = 'rgba(255,255,255,0.5)';

export const MobileResponsive = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Device width morph: desktop (900) → tablet (560) → mobile (320)
  const deviceWidth = interpolate(
    frame,
    [0, 50, 90, 130],
    [900, 900, 560, 320],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const deviceHeight = interpolate(
    frame,
    [0, 50, 90, 130],
    [520, 520, 540, 600],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Mode threshold for content layout
  const mode = deviceWidth > 700 ? 'desktop' : deviceWidth > 420 ? 'tablet' : 'mobile';

  // Breakpoint label that crossfades
  const labelText =
    mode === 'desktop' ? 'DESKTOP — 1200px' : mode === 'tablet' ? 'TABLET — 768px' : 'MOBIL — 375px';

  const labelPulse = spring({
    fps,
    frame: frame - (mode === 'desktop' ? 0 : mode === 'tablet' ? 50 : 90),
    config: { damping: 18, stiffness: 90 },
  });
  const labelScale = interpolate(labelPulse, [0, 1], [0.92, 1]);

  // Device chrome — rounded rect frame
  const cornerRadius = mode === 'mobile' ? 32 : mode === 'tablet' ? 18 : 10;

  // Card grid columns
  const cardCols = mode === 'desktop' ? 3 : mode === 'tablet' ? 2 : 1;
  const cardCount = cardCols * 2;

  const heroOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtle background grid
  const gridOpacity = interpolate(frame, [0, 20], [0, 0.06], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: DARK,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: gridOpacity,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: heroOpacity,
        }}
      >
        <div style={{ fontSize: 11, color: ACCENT, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 6 }}>
          Responsivt design
        </div>
        <div
          style={{
            fontSize: 13,
            color: WHITE,
            letterSpacing: 2,
            fontWeight: 600,
            transform: `scale(${labelScale})`,
            transformOrigin: 'center',
          }}
        >
          {labelText}
        </div>
      </div>

      {/* Device frame */}
      <div
        style={{
          width: deviceWidth,
          height: deviceHeight,
          background: SURFACE,
          borderRadius: cornerRadius,
          border: `2px solid rgba(255,255,255,0.08)`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          opacity: heroOpacity,
        }}
      >
        {/* Browser/app chrome */}
        <div
          style={{
            height: mode === 'mobile' ? 28 : 24,
            background: '#1f1f21',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12,
            paddingRight: 12,
            gap: 6,
            flexShrink: 0,
          }}
        >
          {mode !== 'mobile' && (
            <>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
            </>
          )}
          <div
            style={{
              flex: 1,
              height: mode === 'mobile' ? 16 : 14,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              marginLeft: mode === 'mobile' ? 0 : 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            webbly.no
          </div>
        </div>

        {/* Site navbar */}
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 14, color: WHITE, fontWeight: 700, letterSpacing: 0.5 }}>Webbly</div>
          {mode === 'mobile' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ width: 18, height: 2, background: WHITE, borderRadius: 1 }} />
              <div style={{ width: 18, height: 2, background: WHITE, borderRadius: 1 }} />
              <div style={{ width: 18, height: 2, background: WHITE, borderRadius: 1 }} />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: mode === 'tablet' ? 14 : 22, fontSize: 11, color: MUTED }}>
              <span>Hjem</span>
              <span>Tjenester</span>
              <span>Priser</span>
              <span>Kontakt</span>
            </div>
          )}
        </div>

        {/* Hero block */}
        <div
          style={{
            padding: mode === 'mobile' ? '20px 18px 14px' : '28px 28px 18px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: mode === 'mobile' ? 18 : mode === 'tablet' ? 22 : 28,
              fontFamily: 'Georgia, serif',
              color: WHITE,
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Profesjonelle nettsider
          </div>
          <div
            style={{
              fontSize: mode === 'mobile' ? 11 : 12,
              color: MUTED,
              lineHeight: 1.5,
              marginBottom: 14,
              maxWidth: mode === 'mobile' ? '100%' : '70%',
            }}
          >
            Raske, mobilvennlige sider for norske bedrifter.
          </div>
          <div
            style={{
              display: 'inline-block',
              background: ACCENT,
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 6,
              width: mode === 'mobile' ? '100%' : 'auto',
              textAlign: 'center',
            }}
          >
            Kom i gang
          </div>
        </div>

        {/* Card grid */}
        <div
          style={{
            padding: mode === 'mobile' ? '0 18px 18px' : '0 28px 28px',
            display: 'grid',
            gridTemplateColumns: `repeat(${cardCols}, 1fr)`,
            gap: mode === 'mobile' ? 10 : 14,
            flex: 1,
            alignContent: 'start',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={`${cardCols}-${i}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8,
                padding: mode === 'mobile' ? '12px' : '14px',
                minHeight: mode === 'mobile' ? 56 : 72,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: 'rgba(201,169,110,0.15)',
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  height: 7,
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: 3,
                  marginBottom: 6,
                  width: '70%',
                }}
              />
              <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 2, width: '90%' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 12,
          color: MUTED,
          opacity: heroOpacity,
        }}
      >
        Samme nettside — tilpasser seg alle skjermstørrelser
      </div>
    </AbsoluteFill>
  );
};
