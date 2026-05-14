import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const DARK = '#1C1C1E';
const ACCENT = '#C9A96E';
const WHITE = '#FFFFFF';

const WORDS = ['Rask.', 'Moderne.', 'Imponerende.'];

export const AnimationFeature = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  // Word cycling — each word shows for ~20 frames
  const wordIndex = frame < 30 ? 0 : frame < 60 ? 1 : 2;
  const wordFrame = frame < 30 ? frame : frame < 60 ? frame - 30 : frame - 60;
  const wordOpacity = interpolate(wordFrame, [0, 10, 20, 26], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wordY = interpolate(wordFrame, [0, 12], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Floating dot grid
  const dot = (seed, delay) => {
    const s = spring({ fps, frame: frame - delay, config: { damping: 60, stiffness: 40 } });
    return interpolate(s, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  };

  const dotOpacities = [
    dot(1, 8), dot(2, 14), dot(3, 20), dot(4, 26),
    dot(5, 12), dot(6, 18), dot(7, 24), dot(8, 30),
    dot(9, 16), dot(10, 22), dot(11, 28), dot(12, 34),
  ];

  // Button hover pulse
  const btnFrame = (frame % 45);
  const btnScale = interpolate(btnFrame, [0, 10, 20, 30], [1, 1.06, 1.06, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnGlow = interpolate(btnFrame, [0, 15, 30], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Spring icon
  const iconSpring = spring({ fps, frame: frame - 38, config: { damping: 40, stiffness: 60 } });
  const iconY = interpolate(iconSpring, [0, 1], [0, -12]);
  const iconOpacity = interpolate(frame, [38, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Line drawing effect
  const lineWidth = interpolate(frame, [5, 35], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: DARK, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      {/* Dot grid decoration */}
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {dotOpacities.map((o, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: ACCENT,
              opacity: o * 0.35,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div style={{
        position: 'absolute', top: 40, left: 0, right: 0,
        opacity: labelOpacity,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: ACCENT, letterSpacing: 4, textTransform: 'uppercase' }}>FUNKSJON</div>
      </div>

      {/* Animated word */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            opacity: wordOpacity,
            transform: `translateY(${wordY}px)`,
            fontSize: 58,
            fontWeight: 800,
            color: WHITE,
            letterSpacing: -2,
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          {WORDS[wordIndex]}
        </div>

        {/* Animated underline */}
        <div style={{ marginTop: 12, height: 3, background: ACCENT, borderRadius: 2, width: `${lineWidth}%`, marginLeft: 'auto', marginRight: 'auto', maxWidth: 200 }} />
      </div>

      {/* Bouncing icon */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 80,
          opacity: iconOpacity,
          transform: `translateY(${iconY}px)`,
          background: 'rgba(201,169,110,0.15)',
          border: `1px solid ${ACCENT}`,
          borderRadius: 12,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 22 }}>✨</span>
        <div>
          <div style={{ fontSize: 12, color: WHITE, fontWeight: 600 }}>Mikro-animasjoner</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Hvert element er levende</div>
        </div>
      </div>

      {/* Pulsing CTA button */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          right: 80,
          opacity: btnOpacity,
          transform: `scale(${btnScale})`,
        }}
      >
        <div
          style={{
            padding: '14px 28px',
            background: ACCENT,
            borderRadius: 8,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            boxShadow: `0 0 ${btnGlow * 20}px ${btnGlow * 8}px rgba(201,169,110,0.4)`,
            cursor: 'pointer',
          }}
        >
          Kom i gang →
        </div>
      </div>
    </AbsoluteFill>
  );
};
