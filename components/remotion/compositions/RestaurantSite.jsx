import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from '../BrowserFrame';

const NAV_ITEMS = ['Meny', 'Om oss', 'Reservasjon', 'Kontakt'];
const DISHES = [
  { name: 'Pasta Carbonara', price: '195,-', desc: 'Romersk klassiker' },
  { name: 'Biff Tenderloin', price: '345,-', desc: 'Med trøffelsmør' },
  { name: 'Tiramisu', price: '115,-', desc: 'Husets dessert' },
];

const BRAND = '#8B3A2A';
const CREAM = '#FAF6F0';
const GOLD = '#C9A96E';

export const RestaurantSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heroOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const heroY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: 'clamp' });

  const navOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: 'clamp' });

  const titleScale = spring({ fps, frame: frame - 10, config: { damping: 80, stiffness: 60 } });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaScale = spring({ fps, frame: frame - 28, config: { damping: 80 } });
  const ctaOpacity = interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const sectionY = interpolate(frame, [45, 65], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sectionOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dish0Opacity = interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dish1Opacity = interpolate(frame, [62, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dish2Opacity = interpolate(frame, [69, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dishOpacities = [dish0Opacity, dish1Opacity, dish2Opacity];

  return (
    <BrowserFrame url="trattoria-oslo.no" dark={false}>
      <AbsoluteFill style={{ background: CREAM, fontFamily: 'Georgia, serif' }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            background: 'rgba(250,246,240,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            zIndex: 10,
            borderBottom: '1px solid rgba(139,58,42,0.15)',
          }}
        >
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: BRAND, fontWeight: 700, letterSpacing: 1 }}>
            Trattoria Oslo
          </span>
          <div style={{ display: 'flex', gap: 28 }}>
            {NAV_ITEMS.map((item) => (
              <span key={item} style={{ fontSize: 13, color: '#555', letterSpacing: 0.5 }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroY}px)`,
            position: 'absolute',
            top: 56,
            left: 0,
            right: 0,
            height: 300,
            background: `linear-gradient(135deg, ${BRAND} 0%, #5c1f12 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* decorative circles */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(201,169,110,0.15)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${Math.max(0.001, titleScale * 0.1 + 0.9)})`,
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 11, color: GOLD, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>
              Autentisk italiensk
            </div>
            <h1 style={{ fontSize: 42, color: '#fff', margin: 0, fontWeight: 700, lineHeight: 1.1 }}>
              Smak av Italia
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginTop: 10, marginBottom: 0 }}>
              Hjemmelaget pasta · Lokale råvarer · Oslo sentrum
            </p>
          </div>

          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${Math.max(0.001, ctaScale * 0.08 + 0.92)})`,
              marginTop: 28,
              zIndex: 1,
            }}
          >
            <div
              style={{
                padding: '12px 32px',
                background: GOLD,
                borderRadius: 4,
                color: '#fff',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: 0.5,
                cursor: 'pointer',
              }}
            >
              Bestill bord
            </div>
          </div>
        </div>

        {/* Menu section */}
        <div
          style={{
            opacity: sectionOpacity,
            transform: `translateY(${sectionY}px)`,
            position: 'absolute',
            top: 370,
            left: 0,
            right: 0,
            padding: '0 40px',
          }}
        >
          <div style={{ fontSize: 11, color: BRAND, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
            Vår meny
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {DISHES.map((dish, i) => (
              <div
                key={dish.name}
                style={{
                  opacity: dishOpacities[i],
                  flex: 1,
                  background: '#fff',
                  borderRadius: 8,
                  padding: '18px 20px',
                  borderTop: `3px solid ${GOLD}`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                }}
              >
                <div style={{ fontSize: 15, color: '#222', fontWeight: 700, marginBottom: 4 }}>{dish.name}</div>
                <div style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>{dish.desc}</div>
                <div style={{ fontSize: 16, color: BRAND, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{dish.price}</div>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
