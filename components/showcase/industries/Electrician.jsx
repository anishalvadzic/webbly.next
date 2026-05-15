const NAVY = "#1e3a5f";
const LIGHT = "#f4f6fa";

function Logo({ small }) {
  return (
    <div className="flex items-center gap-1.5 leading-none">
      <div
        className="rounded-sm flex items-center justify-center text-white font-bold"
        style={{
          background: NAVY,
          width: small ? 14 : 22,
          height: small ? 14 : 22,
          fontSize: small ? 9 : 13,
        }}
      >
        E
      </div>
      <div
        className="font-bold tracking-tight"
        style={{ color: NAVY, fontSize: small ? 8 : 11 }}
      >
        OSLO ELEKTRIKER
      </div>
    </div>
  );
}

function ServiceIcon({ label, glyph, mobile }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div
        className="rounded-lg flex items-center justify-center"
        style={{
          background: LIGHT,
          color: NAVY,
          width: mobile ? 22 : 32,
          height: mobile ? 22 : 32,
          fontSize: mobile ? 11 : 16,
        }}
      >
        {glyph}
      </div>
      <div
        className="font-semibold text-center"
        style={{ color: NAVY, fontSize: mobile ? 6 : 8 }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Electrician({ variant }) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="w-full h-full bg-white flex flex-col text-[6px] leading-tight">
        <div className="px-2 py-1.5 text-white text-[5px] flex justify-between" style={{ background: NAVY }}>
          <span>Døgnvakt: 22 10 00 00</span>
          <span>☰</span>
        </div>
        <div className="px-2 py-1.5 flex items-center justify-between bg-white border-b border-gray-100">
          <Logo small />
        </div>
        <div className="px-2.5 py-2.5" style={{ background: NAVY, color: "white" }}>
          <div className="font-bold leading-tight mb-1" style={{ fontSize: 10 }}>
            Din Elektriker
            <br />i Oslo
          </div>
          <div className="rounded-md bg-white text-center py-1 font-bold mt-2" style={{ color: NAVY, fontSize: 7 }}>
            Ring nå: 22 10 00 00
          </div>
        </div>
        <div className="px-2 py-2 flex-1">
          <div className="font-bold text-center mb-1.5" style={{ color: NAVY, fontSize: 8 }}>
            Våre Tjenester
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { l: "El-installasjon", g: "⚡" },
              { l: "Feilsøking", g: "🔧" },
              { l: "Sikringsskap", g: "▦" },
              { l: "Belysning", g: "💡" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded border border-gray-100 p-1.5 flex flex-col items-center gap-0.5"
                style={{ background: LIGHT }}
              >
                <div style={{ fontSize: 11 }}>{s.g}</div>
                <div className="font-semibold text-center" style={{ color: NAVY, fontSize: 5.5 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col text-[8px] leading-tight">
      <div className="px-4 py-1 text-white text-[6px] flex justify-between" style={{ background: NAVY }}>
        <span>OEAS — Oslo Elektriker AS</span>
        <span className="flex gap-3">
          <span>Døgnvakt: 22 10 00 00</span>
          <span>Kontakt oss</span>
        </span>
      </div>
      <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-gray-100">
        <Logo />
        <div className="flex gap-3" style={{ color: NAVY, fontSize: 7 }}>
          <span>Tjenester ▾</span>
          <span>Om Oss</span>
          <span>Referanser</span>
          <span className="font-semibold">Priser</span>
        </div>
      </div>
      <div className="px-4 py-3 flex gap-3" style={{ background: NAVY }}>
        <div className="flex-1 text-white">
          <div className="font-bold mb-1" style={{ fontSize: 13 }}>
            Din Pålitelige Elektriker i Oslo
          </div>
          <div className="opacity-80 mb-2" style={{ fontSize: 6.5 }}>
            Profesjonelle løsninger for private og bedrifter —
            <br />
            Døgnvakt: 22 10 00 00
          </div>
          <div className="flex gap-1.5">
            <div className="rounded bg-white px-2 py-1 font-bold" style={{ color: NAVY, fontSize: 6.5 }}>
              Bestill Elektriker
            </div>
            <div className="rounded border border-white px-2 py-1 font-bold" style={{ fontSize: 6.5 }}>
              Våre Tjenester
            </div>
          </div>
        </div>
        <div className="w-[34%] rounded bg-gradient-to-br from-[#2d4a78] to-[#1a2b48]" />
      </div>
      <div className="px-4 py-2.5 flex gap-2">
        <ServiceIcon label="El-installasjon" glyph="⚡" />
        <ServiceIcon label="Feilsøking" glyph="🔧" />
        <ServiceIcon label="Belysning" glyph="💡" />
        <ServiceIcon label="Sikringsskap" glyph="▦" />
      </div>
      <div className="px-4 pb-2 flex gap-2 flex-1">
        <div className="flex-1 rounded bg-gradient-to-br from-gray-100 to-gray-200" />
        <div className="rounded p-2 flex-1" style={{ background: LIGHT }}>
          <div className="font-semibold mb-0.5" style={{ color: NAVY, fontSize: 6 }}>
            "Rask og profesjonell"
          </div>
          <div className="opacity-60" style={{ fontSize: 5.5, color: NAVY }}>
            — Anders L.
          </div>
        </div>
        <div className="rounded p-2 flex-1" style={{ background: LIGHT }}>
          <div className="font-semibold mb-0.5" style={{ color: NAVY, fontSize: 6 }}>
            "Anbefales sterkt"
          </div>
          <div className="opacity-60" style={{ fontSize: 5.5, color: NAVY }}>
            — Mari S.
          </div>
        </div>
      </div>
    </div>
  );
}
