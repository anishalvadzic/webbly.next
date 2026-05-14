"use client";

export default function PhoneMockup({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(180deg, #2c2c2e 0%, #1a1a1c 100%)",
        borderRadius: 32,
        padding: "10px 5px",
        boxShadow:
          "0 25px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset, 4px 0 8px -2px rgba(0,0,0,0.2), -4px 0 8px -2px rgba(0,0,0,0.2)",
      }}
    >
      {/* Dynamic Island */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          maxWidth: 70,
          height: 20,
          background: "#000",
          borderRadius: 12,
          zIndex: 10,
        }}
      />

      {/* Side buttons */}
      <div
        style={{
          position: "absolute",
          left: -2,
          top: "18%",
          width: 2,
          height: "5%",
          background: "#444",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -2,
          top: "26%",
          width: 2,
          height: "8%",
          background: "#444",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -2,
          top: "36%",
          width: 2,
          height: "8%",
          background: "#444",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -2,
          top: "26%",
          width: 2,
          height: "10%",
          background: "#444",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Screen — 9:19.5 (iPhone) via padding-bottom trick */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "216.7%",
          borderRadius: 24,
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

      {/* Home indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: "50%",
          transform: "translateX(-50%)",
          width: "22%",
          maxWidth: 36,
          height: 4,
          background: "rgba(255,255,255,0.25)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}
