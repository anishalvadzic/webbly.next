import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from '../BrowserFrame';

const NAVY = '#1B2B4B';
const YELLOW = '#F5A623';
const LIGHT = '#F4F6FB';

const SERVICES = [
  { icon: '⚡', label: 'Elektriker', desc: 'Sikring, montering, feil' },
  { icon: '🔧', label: 'Service', desc: 'Vedlikehold & reparasjon' },
  { icon: '🏠', label: 'Nybygg', desc: 'Totalentreprise' },
];

export const ServiceSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const navOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });

  const heroOpacity = interpolate(frame, [6, 22], [0, 1], { extrapolateRight: 'clamp' });
  const heroX = interpolate(frame, [6, 26], [-20, 0], { extrapolateRight: 'clamp' });

  const phoneSpring = spring({ fps, frame: frame - 20, config: { damping: 100, stiffness: 80 } });
  const phoneOpacity = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const badgeSpring = spring({ fps, frame: frame - 30, config: { damping: 80 } });
  const badgeOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const serviceLabel = interpolate(frame, [48, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s0Spring = spring({ fps, frame: frame - 52, config: { damping: 80, stiffness: 70 } });
  const s1Spring = spring({ fps, frame: frame - 60, config: { damping: 80, stiffness: 70 } });
  const s2Spring = spring({ fps, frame: frame - 68, config: { damping: 80, stiffness: 70 } });
  const sSprings = [s0Spring, s1Spring, s2Spring];

  return (
    <BrowserFrame url="bergerelektro.no" dark={true}>
      <AbsoluteFill style={{ background: LIGHT, fontFamily: 'Inter, sans-serif' }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 52,
            background: NAVY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 36px',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: YELLOW, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: -0.3 }}>Berger Elektro</span>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Tjenester', 'Om oss', 'Prosjekter', 'Kontakt'].map((item) => (
              <span key={item} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateX(${heroX}px)`,
            position: 'absolute',
            top: 52, left: 0, right: 0,
            height: 260,
            background: NAVY,
            padding: '0 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(245,166,35,0.12)' }} />
          <div style={{ fontSize: 11, color: YELLOW, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
            Autorisert elektriker · Oslo og Akershus
          </div>
          <h1 style={{ fontSize: 36, color: '#fff', margin: 0, fontWeight: 800, lineHeight: 1.15, maxWidth: 420 }}>
            Rask og pålitelig elektrisk hjelp
          </h1>

          <div
            style={{
              opacity: phoneOpacity,
              transform: `translateY(${interpolate(phoneSpring, [0, 1], [12, 0])})`,
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{ padding: '11px 28px', background: YELLOW, borderRadius: 4, color: '#fff', fontSize: 14, fontWeight: 700 }}>
              Ring oss nå
            </div>
            <div style={{ fontSize: 20, color: '#fff', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
              +47 911 22 333
            </div>
          </div>

          <div
            style={{
              opacity: badgeOpacity,
              transform: `scale(${interpolate(badgeSpring, [0, 1], [0.8, 1])})`,
              marginTop: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '5px 14px',
              width: 'fit-content',
            }}
          >
            <span style={{ fontSize: 11 }}>✅</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>Svar innen 30 minutter</span>
          </div>
        </div>

        {/* Services */}
        <div style={{ position: 'absolute', top: 326, left: 36, right: 36 }}>
          <div style={{ opacity: serviceLabel, fontSize: 11, color: '#888', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
            Våre tjenester
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {SERVICES.map((s, i) => {
              const cardY = interpolate(sSprings[i], [0, 1], [20, 0]);
              const cardOpacity = interpolate(sSprings[i], [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
              return (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    opacity: cardOpacity,
                    transform: `translateY(${cardY}px)`,
                    background: '#fff',
                    borderRadius: 8,
                    padding: '20px 18px',
                    borderLeft: `4px solid ${YELLOW}`,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
