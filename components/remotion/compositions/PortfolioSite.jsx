import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BrowserFrame } from '../BrowserFrame';

const PROJECTS = [
  { title: 'Fjord Studio', category: 'Arkitektur', color1: '#1a2a3a', color2: '#2d4a6a' },
  { title: 'Lyse Brand', category: 'Merkevare', color1: '#2a1a3a', color2: '#4a2d6a' },
];

export const PortfolioSite = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const project = frame < 52 ? 0 : 1;
  const transitionProgress = interpolate(frame, [48, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const navOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  const titleOpacity0 = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY0 = interpolate(frame, [10, 28], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tagSpring0 = spring({ fps, frame: frame - 22, config: { damping: 80 } });
  const numSpring0 = spring({ fps, frame: frame - 16, config: { damping: 90 } });

  const titleOpacity1 = interpolate(frame, [60, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY1 = interpolate(frame, [60, 76], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagSpring1 = spring({ fps, frame: frame - 68, config: { damping: 80 } });

  const p = PROJECTS[project];
  const pNext = PROJECTS[1];

  return (
    <BrowserFrame url="magnusberg.no" dark={true}>
      <AbsoluteFill style={{ background: '#111', fontFamily: 'Inter, sans-serif' }}>
        {/* Navbar */}
        <div
          style={{
            opacity: navOpacity,
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 52,
            background: 'rgba(17,17,17,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 36px',
            zIndex: 10,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>MAGNUS BERG</span>
          <div style={{ display: 'flex', gap: 26 }}>
            {['Arbeid', 'Om', 'Kontakt'].map((item) => (
              <span key={item} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Project 1 */}
        <AbsoluteFill
          style={{
            opacity: interpolate(transitionProgress, [0, 1], [1, 0]),
            background: `linear-gradient(135deg, ${PROJECTS[0].color1} 0%, ${PROJECTS[0].color2} 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 36px 40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '20%', right: '10%', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '30%', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

          <div
            style={{
              opacity: interpolate(tagSpring0, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateX(${interpolate(tagSpring0, [0, 1], [-10, 0])})`,
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {PROJECTS[0].category}
          </div>
          <div
            style={{
              opacity: titleOpacity0,
              transform: `translateY(${titleY0}px)`,
              fontSize: 46,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {PROJECTS[0].title}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              opacity: interpolate(numSpring0, [0, 0.5], [0, 1], { extrapolateRight: 'clamp' }),
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
            }}>01 / 04</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>→</div>
          </div>
        </AbsoluteFill>

        {/* Project 2 */}
        <AbsoluteFill
          style={{
            opacity: transitionProgress,
            background: `linear-gradient(135deg, ${PROJECTS[1].color1} 0%, ${PROJECTS[1].color2} 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 36px 40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '15%', left: '15%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div
            style={{
              opacity: interpolate(tagSpring1, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {PROJECTS[1].category}
          </div>
          <div
            style={{
              opacity: titleOpacity1,
              transform: `translateY(${titleY1}px)`,
              fontSize: 46,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {PROJECTS[1].title}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>02 / 04</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>→</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </BrowserFrame>
  );
};
