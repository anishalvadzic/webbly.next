import { AbsoluteFill } from 'remotion';

export const BrowserFrame = ({ children, url = 'webbly.no', dark = false }) => {
  const bg = dark ? '#1a1a1a' : '#ffffff';
  const chromeBg = dark ? '#2d2d2d' : '#f1f3f4';
  const dotColors = ['#ff5f57', '#febc2e', '#28c840'];
  const addressBg = dark ? '#3d3d3d' : '#e8eaed';
  const addressText = dark ? '#aaaaaa' : '#555555';

  return (
    <AbsoluteFill style={{ background: bg, borderRadius: 12, overflow: 'hidden' }}>
      {/* Chrome bar */}
      <div
        style={{
          height: 44,
          background: chromeBg,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {dotColors.map((c, i) => (
            <div
              key={i}
              style={{ width: 12, height: 12, borderRadius: '50%', background: c }}
            />
          ))}
        </div>

        {/* Address bar */}
        <div
          style={{
            flex: 1,
            height: 26,
            background: addressBg,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              color: addressText,
              letterSpacing: 0.2,
            }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
