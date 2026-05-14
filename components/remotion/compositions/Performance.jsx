import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const DARK = '#1C1C1E';
const ACCENT = '#C9A96E';
const WHITE = '#FFFFFF';
const GREEN = '#16C784';
const MUTED = 'rgba(255,255,255,0.5)';

const METRICS = [
  { key: 'LCP', label: 'Largest Contentful Paint', value: '1.2s', target: 'God' },
  { key: 'FID', label: 'First Input Delay', value: '8ms', target: 'God' },
  { key: 'CLS', label: 'Cumulative Layout Shift', value: '0.01', target: 'God' },
  { key: 'TTFB', label: 'Time to First Byte', value: '220ms', target: 'God' },
];

export const Performance = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Container fade-in
  const containerOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  // Gauge animation: 0 → 100 from frame 20 to frame 80
  const gaugeProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const score = Math.round(gaugeProgress * 100);

  // Circular gauge math
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * gaugeProgress;

  // Score color tween: red → orange → green as it climbs
  const scoreColor =
    score < 50 ? '#FF4D4D' : score < 90 ? '#FFA500' : GREEN;

  // Metric pills slide in from frame 80
  const metricSprings = METRICS.map((_, i) =>
    spring({
      fps,
      frame: frame - (82 + i * 6),
      config: { damping: 22, stiffness: 100 },
    })
  );

  // Badge pop at frame 105
  const badgeSpring = spring({
    fps,
    frame: frame - 105,
    config: { damping: 14, stiffness: 110 },
  });

  // Subtle background grid
  const gridOpacity = interpolate(frame, [0, 20], [0, 0.05], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: DARK,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: gridOpacity,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: containerOpacity,
        }}
      >
        <div style={{ fontSize: 11, color: ACCENT, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>
          Lighthouse Performance
        </div>
        <div style={{ fontSize: 18, color: WHITE, fontWeight: 600 }}>Sidens hastighet, målt</div>
      </div>

      {/* Circular gauge */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          width: 280,
          height: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: containerOpacity,
        }}
      >
        <svg width={280} height={280} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={140}
            cy={140}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={14}
          />
          {/* Progress arc */}
          <circle
            cx={140}
            cy={140}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ filter: `drop-shadow(0 0 12px ${scoreColor}80)` }}
          />
        </svg>

        {/* Score number */}
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div
            style={{
              fontSize: 88,
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              color: scoreColor,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 6, letterSpacing: 1 }}>
            Performance score
          </div>
        </div>
      </div>

      {/* Metric pills */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          padding: '0 40px',
        }}
      >
        {METRICS.map((m, i) => {
          const s = metricSprings[i];
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [16, 0]);
          return (
            <div
              key={m.key}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                background: 'rgba(22, 199, 132, 0.08)',
                border: `1px solid ${GREEN}40`,
                borderRadius: 10,
                padding: '12px 16px',
                minWidth: 120,
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: GREEN,
                    boxShadow: `0 0 8px ${GREEN}`,
                  }}
                />
                <div style={{ fontSize: 10, color: GREEN, fontWeight: 700, letterSpacing: 1 }}>{m.key}</div>
              </div>
              <div style={{ fontSize: 18, color: WHITE, fontWeight: 700, marginBottom: 2 }}>{m.value}</div>
              <div style={{ fontSize: 9, color: MUTED }}>{m.target}</div>
            </div>
          );
        })}
      </div>

      {/* Bottom badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.92, 1])})`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(201, 169, 110, 0.12)',
            border: `1px solid ${ACCENT}40`,
            borderRadius: 999,
            padding: '8px 18px',
            fontSize: 12,
            color: ACCENT,
            fontWeight: 600,
          }}
        >
          <span>✦</span>
          Over bransje­snitt for norske nettsider
        </div>
      </div>
    </AbsoluteFill>
  );
};
