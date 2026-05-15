const CREAM = "#faf5ec";
const ACCENT = "#c19587";
const TEXT = "#3a2e28";

export default function HairSalon({ variant }) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: CREAM, color: TEXT }}>
        <div className="px-2.5 py-2 flex items-center justify-between border-b border-black/5">
          <div className="leading-none">
            <div style={{ fontSize: 9, fontFamily: "Georgia, serif", letterSpacing: 2 }}>LINNÉA</div>
            <div style={{ fontSize: 5, letterSpacing: 4, opacity: 0.6 }}>FRISØR</div>
          </div>
          <span style={{ fontSize: 10 }}>☰</span>
        </div>
        <div className="aspect-[5/3] bg-gradient-to-br from-[#e8d8c2] to-[#c8a888] relative">
          <div
            className="absolute inset-0 opacity-30 bg-gradient-to-t from-black/40 to-transparent"
          />
        </div>
        <div className="px-3 py-2.5 text-center">
          <div className="mb-1.5" style={{ fontFamily: "Georgia, serif", fontSize: 10 }}>
            Velkommen til
            <br />
            Linnéa Frisør Oslo
          </div>
          <div
            className="inline-block rounded-full text-white font-semibold px-3 py-1"
            style={{ background: ACCENT, fontSize: 7 }}
          >
            Bestill Time
          </div>
        </div>
        <div className="w-full h-[1px]" style={{ background: ACCENT, opacity: 0.4 }} />
        <div className="px-3 py-2 flex-1">
          <div className="text-center font-semibold mb-1.5" style={{ fontSize: 8, fontFamily: "Georgia, serif" }}>
            Klipp, Farge og
            <br />
            Styling
          </div>
          <div className="flex justify-center gap-3 mt-2" style={{ color: ACCENT, fontSize: 11 }}>
            <span>✂</span>
            <span>🖌</span>
            <span>🎨</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: CREAM, color: TEXT }}>
      <div className="px-4 py-2 flex items-center justify-between" style={{ background: "transparent" }}>
        <div className="leading-none">
          <div style={{ fontSize: 12, fontFamily: "Georgia, serif", letterSpacing: 3, color: "white" }}>LINNÉA</div>
          <div style={{ fontSize: 6, letterSpacing: 6, color: "rgba(255,255,255,0.7)" }}>FRISØR</div>
        </div>
        <div className="flex gap-3 text-white" style={{ fontSize: 7 }}>
          <span>Hjem</span>
          <span>Tjenester</span>
          <span>Om Oss</span>
          <span>Kontakt</span>
          <span>Galleri</span>
        </div>
      </div>
      <div className="aspect-[16/7] bg-gradient-to-br from-[#d4baa0] to-[#a8896a] relative -mt-7 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative px-4 pb-3 text-white">
          <div className="mb-1" style={{ fontFamily: "Georgia, serif", fontSize: 12 }}>
            Velkommen til Oslos
            <br />
            mest eksklusive
            <br />
            frisørsalong
          </div>
          <div
            className="inline-block rounded-full font-semibold px-3 py-1 mt-1"
            style={{ background: ACCENT, fontSize: 7, color: "white", letterSpacing: 1 }}
          >
            BESTILL TIME
          </div>
        </div>
      </div>
      <div className="px-4 py-2 text-center" style={{ background: "rgba(193, 149, 135, 0.15)" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 8, color: ACCENT }}>Crocker</div>
      </div>
      <div className="px-4 py-3 flex gap-4 flex-1">
        <div className="flex-1">
          <div className="mb-2" style={{ fontFamily: "Georgia, serif", fontSize: 11 }}>
            Klipp, farge & styling
            <br />
            for din unike stil
          </div>
          <div className="flex gap-3 mt-3" style={{ color: ACCENT, fontSize: 14 }}>
            <span>✂</span>
            <span>🖌</span>
            <span>🎨</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-1.5" style={{ fontFamily: "Georgia, serif", fontSize: 10 }}>
            Våre frisører i Oslo
          </div>
          <div className="space-y-0.5" style={{ fontSize: 7 }}>
            {[
              ["Linnéa Frisører", "200 kr"],
              ["Klipp, farge", "200 kr"],
              ["Brodn, farge", "200 kr"],
              ["Brushed styling", "300 kr"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-0.5 border-b border-black/5">
                <span>{k}</span>
                <span style={{ opacity: 0.7 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
