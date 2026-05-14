import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const BEIGE = '#FAF6F0';
const BROWN = '#3D2B1F';
const ACCENT = '#C9A96E';
const DAYS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
const DATES = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
];
const SELECTED_DATE = { row: 2, col: 2 }; // 15

export const BookingFeature = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ fps, frame: frame - 5, config: { damping: 80, stiffness: 50 } });
  const cardOpacity = interpolate(frame, [5, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const headerOpacity = interpolate(frame, [12, 26], [0, 1], { extrapolateRight: 'clamp' });
  const daysOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateRight: 'clamp' });

  const row0Opacity = interpolate(frame, [24, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Opacity = interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Opacity = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Opacity = interpolate(frame, [42, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rowOpacities = [row0Opacity, row1Opacity, row2Opacity, row3Opacity];

  const selectedSpring = spring({ fps, frame: frame - 50, config: { damping: 100, stiffness: 120 } });
  const selectedScale = interpolate(selectedSpring, [0, 1], [0.6, 1]);
  const selectedOpacity = interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const confirmSpring = spring({ fps, frame: frame - 66, config: { damping: 80 } });
  const confirmOpacity = interpolate(frame, [66, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ fps, frame: frame - 74, config: { damping: 90, stiffness: 80 } });
  const badgeOpacity = interpolate(frame, [74, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,169,110,0.08)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(61,43,31,0.04)' }} />

      {/* Label */}
      <div style={{
        position: 'absolute', top: 40,
        opacity: headerOpacity,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: ACCENT, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8 }}>FUNKSJON</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: BROWN }}>Bookingsystem</div>
      </div>

      {/* Calendar card */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [30, 0])})`,
          background: '#fff',
          borderRadius: 16,
          padding: '24px 28px',
          width: 380,
          boxShadow: '0 8px 40px rgba(61,43,31,0.12)',
        }}
      >
        {/* Month header */}
        <div style={{ opacity: headerOpacity, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: BROWN }}>Juni 2025</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: BROWN }}>‹</div>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: BROWN }}>›</div>
          </div>
        </div>

        {/* Day headers */}
        <div style={{ opacity: daysOpacity, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600 }}>{d}</div>
          ))}
        </div>

        {/* Date grid */}
        {DATES.map((row, ri) => (
          <div key={ri} style={{ opacity: rowOpacities[ri], display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
            {row.map((date, ci) => {
              const isSelected = ri === SELECTED_DATE.row && ci === SELECTED_DATE.col;
              return (
                <div
                  key={ci}
                  style={{
                    textAlign: 'center',
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? '#fff' : date ? BROWN : 'transparent',
                    background: isSelected
                      ? `rgba(61,43,31,${interpolate(selectedOpacity, [0,1],[0,1])})`
                      : 'transparent',
                    transform: isSelected ? `scale(${selectedScale})` : 'scale(1)',
                    transition: 'none',
                  }}
                >
                  {date}
                </div>
              );
            })}
          </div>
        ))}

        {/* Confirm button */}
        <div
          style={{
            opacity: confirmOpacity,
            transform: `translateY(${interpolate(confirmSpring, [0, 1], [10, 0])})`,
            marginTop: 18,
            padding: '13px',
            background: BROWN,
            borderRadius: 8,
            textAlign: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Bekreft time – 15. juni
        </div>
      </div>

      {/* Success badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${interpolate(badgeSpring, [0, 1], [0.7, 1])}) translateY(${interpolate(badgeSpring, [0, 1], [10, 0])}px)`,
          position: 'absolute',
          bottom: 50,
          background: '#22c55e',
          color: '#fff',
          borderRadius: 24,
          padding: '10px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
        }}
      >
        <span>✓</span>
        <span>Time bekreftet!</span>
      </div>
    </AbsoluteFill>
  );
};
