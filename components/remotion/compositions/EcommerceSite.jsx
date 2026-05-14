import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from '../BrowserFrame';

const GREEN = '#4A7C59';
const LIGHT = '#F6FAF7';
const DARK = '#1C2B1F';

const PRODUCTS = [
  { name: 'Canvas Tote Bag', price: '349,-', badge: 'Bestseller', color: '#E8E0D4' },
  { name: 'Linen Shirt', price: '599,-', badge: 'Ny', color: '#D4DDE8' },
  { name: 'Keramikk Krus', price: '249,-', badge: 'Sale', color: '#E8D4D4' },
];

export const EcommerceSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const navOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const heroOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateRight: 'clamp' });
  const heroY = interpolate(frame, [8, 30], [20, 0], { extrapolateRight: 'clamp' });

  const gridOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const card0Spring = spring({ fps, frame: frame - 38, config: { damping: 80, stiffness: 60 } });
  const card1Spring = spring({ fps, frame: frame - 46, config: { damping: 80, stiffness: 60 } });
  const card2Spring = spring({ fps, frame: frame - 54, config: { damping: 80, stiffness: 60 } });
  const cardSprings = [card0Spring, card1Spring, card2Spring];

  const selectedCard = frame > 68 ? 1 : -1;
  const selectedScale = spring({ fps, frame: frame - 68, config: { damping: 120, stiffness: 100 } });

  return (
    <BrowserFrame url="nordnaturlig.no" dark={false}>
      <AbsoluteFill style={{ background: LIGHT, fontFamily: 'Inter, sans-serif' }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 52,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 36px',
            borderBottom: '1px solid #e8ede9',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: DARK, letterSpacing: -0.5 }}>Nord Naturlig</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Nyheter', 'Klær', 'Hjem', 'Sale'].map((item) => (
              <span key={item} style={{ fontSize: 13, color: '#555' }}>{item}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: GREEN, fontWeight: 600 }}>🛒 2</div>
        </div>

        {/* Hero banner */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroY}px)`,
            position: 'absolute',
            top: 52, left: 0, right: 0,
            height: 160,
            background: `linear-gradient(120deg, ${GREEN}, #2e5c3f)`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 36px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', right: 36, top: -20, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Ny kolleksjon</div>
            <div style={{ fontSize: 30, color: '#fff', fontWeight: 700, lineHeight: 1.15 }}>Sommersalg<br />opptil 40% rabatt</div>
          </div>
        </div>

        {/* Product grid */}
        <div
          style={{
            opacity: gridOpacity,
            position: 'absolute',
            top: 228,
            left: 36, right: 36,
          }}
        >
          <div style={{ fontSize: 11, color: '#888', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>Utvalgte produkter</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {PRODUCTS.map((p, i) => {
              const isSelected = selectedCard === i;
              const cardY = interpolate(cardSprings[i], [0, 1], [30, 0]);
              const cardOpacity = interpolate(cardSprings[i], [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
              return (
                <div
                  key={p.name}
                  style={{
                    flex: 1,
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px) scale(${isSelected ? 1 + selectedScale * 0.025 : 1})`,
                    background: '#fff',
                    borderRadius: 10,
                    overflow: 'hidden',
                    boxShadow: isSelected ? '0 8px 30px rgba(74,124,89,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                    border: isSelected ? `2px solid ${GREEN}` : '2px solid transparent',
                  }}
                >
                  <div style={{ height: 120, background: p.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 36 }}>
                      {i === 0 ? '👜' : i === 1 ? '👕' : '☕'}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 10, left: 10,
                        background: i === 2 ? '#e53e3e' : GREEN,
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 3,
                        letterSpacing: 0.5,
                      }}
                    >
                      {p.badge}
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 6 }}>{p.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: GREEN }}>{p.price}</span>
                      {isSelected && (
                        <div style={{
                          background: GREEN, color: '#fff', fontSize: 11, fontWeight: 600,
                          padding: '5px 12px', borderRadius: 4,
                        }}>
                          + Handlekurv
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
