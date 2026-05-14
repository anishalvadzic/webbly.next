"use client";

export default function LaptopMockup({ children }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Screen lid */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)",
          borderRadius: "16px 16px 0 0",
          padding: "18px 10px 8px",
          boxShadow:
            "0 -1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(0,0,0,0.3)",
        }}
      >
        {/* Camera */}
        <div
          style={{
            position: "absolute",
            top: 7,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#1a1a1a",
            boxShadow: "0 0 0 1.5px #444, 0 0 3px rgba(0,0,0,0.5)",
          }}
        />
        {/* Screen — 16:10 via padding-bottom trick for reliable sizing */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "62.5%",
            borderRadius: 4,
            overflow: "hidden",
            background: "#000",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div
        style={{
          height: 10,
          background:
            "linear-gradient(180deg, #c2c2c4 0%, #a8a8aa 50%, #b0b0b2 100%)",
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 4,
            background: "#d0d0d0",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>

      {/* Base */}
      <div
        style={{
          height: 4,
          background: "#999",
          marginLeft: "8%",
          marginRight: "8%",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      />

      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "5%",
          right: "5%",
          height: 12,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
          filter: "blur(4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
