const MEDICAL = "#7ba0c4";
const TAUPE = "#b89d7e";
const DARK = "#365471";

export default function Doctor({ variant }) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="px-2.5 py-2 flex items-center justify-between border-b border-gray-100">
          <div className="leading-tight">
            <div className="font-bold" style={{ fontSize: 8, color: DARK, letterSpacing: 1 }}>
              OSLO
            </div>
            <div className="font-bold" style={{ fontSize: 8, color: DARK, letterSpacing: 1 }}>
              HELSEKLINIKK
            </div>
          </div>
          <span style={{ fontSize: 10, color: DARK }}>☰</span>
        </div>
        <div className="aspect-[5/3] bg-gradient-to-br from-[#a8c0d8] to-[#7ba0c4] relative" />
        <div className="px-3 py-2.5">
          <div className="font-bold mb-1.5" style={{ color: DARK, fontSize: 11, fontFamily: "Georgia, serif" }}>
            Legeklinikk i Oslo
          </div>
          <div
            className="inline-block rounded-full px-3 py-1 text-white font-semibold"
            style={{ background: TAUPE, fontSize: 7 }}
          >
            Bestill time
          </div>
        </div>
        <div className="px-3 py-1 flex-1">
          <div className="font-semibold mb-1" style={{ color: DARK, fontSize: 8 }}>
            Våre tjenester
          </div>
          <div className="space-y-1">
            {[
              ["👨‍⚕️", "Allmennlege"],
              ["❤", "Helsekontroll"],
              ["💉", "Vaksinasjon"],
              ["🩺", "Spesialister"],
            ].map(([g, l]) => (
              <div key={l} className="flex items-center gap-2 py-1 border-b border-gray-100">
                <span style={{ fontSize: 10, color: DARK }}>{g}</span>
                <span style={{ color: DARK, fontSize: 7 }}>{l}</span>
              </div>
            ))}
          </div>
          <div className="font-semibold mt-2 mb-1" style={{ color: DARK, fontSize: 8 }}>
            Kontakt oss
          </div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 6.5, color: DARK }}>
            <span>📞</span>
            <span>Oslo Helseklinikk</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col text-[8px] leading-tight">
      <div className="px-4 py-2 flex items-center justify-between bg-white">
        <div className="leading-tight">
          <div className="font-bold" style={{ fontSize: 11, color: DARK, letterSpacing: 2 }}>
            OSLO
          </div>
          <div className="font-bold" style={{ fontSize: 11, color: DARK, letterSpacing: 2 }}>
            HELSEKLINIKK
          </div>
        </div>
        <div className="flex gap-3" style={{ color: DARK, fontSize: 7 }}>
          <span>Tjenester</span>
          <span>Allmennlege</span>
          <span>Helsekontroll</span>
          <span>Om klinikken</span>
          <span className="font-semibold">Kontakt oss</span>
        </div>
      </div>
      <div className="aspect-[16/7] relative bg-gradient-to-r from-[#a8c0d8] via-[#92aec8] to-[#7ba0c4]">
        <div className="absolute inset-0 flex items-center px-5">
          <div className="text-white">
            <div className="font-bold mb-2" style={{ fontFamily: "Georgia, serif", fontSize: 13 }}>
              Legeklinikk i Oslo
              <br />- Din Helse i Trygge
              <br />
              Hender
            </div>
            <div
              className="inline-block rounded-full px-4 py-1.5 font-semibold text-white mt-1"
              style={{ background: TAUPE, fontSize: 7 }}
            >
              Bestill time
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex gap-4 flex-1">
        <div className="flex-1">
          <div className="font-bold mb-2" style={{ color: DARK, fontSize: 10, fontFamily: "Georgia, serif" }}>
            Våre tjenester
          </div>
          <div className="flex gap-2">
            {[
              ["👨‍⚕️", "Allmennlege"],
              ["❤", "Helsekontroll"],
              ["💉", "Vaksinasjon"],
            ].map(([g, l]) => (
              <div key={l} className="flex-1">
                <div style={{ fontSize: 13, color: DARK }} className="mb-1">
                  {g}
                </div>
                <div className="font-semibold mb-0.5" style={{ color: DARK, fontSize: 7 }}>
                  {l}
                </div>
                <div style={{ color: "#6c7a87", fontSize: 5.5 }}>
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold mb-2" style={{ color: DARK, fontSize: 10, fontFamily: "Georgia, serif" }}>
            Møt våre leger
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1">
                <div className="aspect-square rounded bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="text-center mt-1" style={{ color: DARK, fontSize: 6 }}>
                  Dr. Lege {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
