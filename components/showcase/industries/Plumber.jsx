const BLUE = "#2a7ad3";
const SOFT = "#eaf3fc";

function Logo({ small }) {
  return (
    <div className="flex items-center gap-1.5 leading-none">
      <div
        className="rounded-full flex items-center justify-center text-white font-bold"
        style={{
          background: BLUE,
          width: small ? 14 : 22,
          height: small ? 14 : 22,
          fontSize: small ? 8 : 12,
        }}
      >
        ◐
      </div>
      <div
        className="font-bold leading-none"
        style={{ color: "#1a3a5c", fontSize: small ? 7 : 9 }}
      >
        Rørlegger
        <br />
        <span style={{ fontWeight: 500, opacity: 0.7 }}>i Oslo</span>
      </div>
    </div>
  );
}

export default function Plumber({ variant }) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="w-full h-full bg-white flex flex-col text-[6px] leading-tight">
        <div className="px-2 py-1.5 flex items-center justify-between bg-white border-b border-gray-100">
          <Logo small />
          <span style={{ color: BLUE, fontSize: 9 }}>☰</span>
        </div>
        <div className="px-2.5 py-2.5 text-center">
          <div className="font-bold mb-1.5" style={{ color: "#1a3a5c", fontSize: 11 }}>
            Rørlegger
            <br />i Oslo
          </div>
          <div className="rounded-full inline-block px-3 py-1 font-bold text-white" style={{ background: BLUE, fontSize: 7 }}>
            Akutt hjelp
          </div>
        </div>
        <div className="px-2 py-1 flex-1 flex flex-col gap-1.5">
          {[
            { l: "Bad og sanitær", g: "🚿", d: "Service ipsum dolor sit amet, sanitær varmeanlegg." },
            { l: "Varmeanlegg", g: "🔥", d: "Service ipsum dolor sit amet, varmeanlegg." },
          ].map((s) => (
            <div key={s.l} className="rounded-lg p-2 flex gap-2 items-center" style={{ background: SOFT }}>
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center" style={{ fontSize: 12 }}>
                {s.g}
              </div>
              <div className="flex-1">
                <div className="font-bold mb-0.5" style={{ color: "#1a3a5c", fontSize: 7 }}>
                  {s.l}
                </div>
                <div style={{ color: "#4a5e75", fontSize: 5.5 }}>{s.d}</div>
              </div>
            </div>
          ))}
          <div className="rounded-lg p-2 bg-gradient-to-br from-gray-100 to-gray-200 flex-1 min-h-[24px]" />
        </div>
        <div className="px-2 py-1.5 text-white text-center font-bold" style={{ background: BLUE, fontSize: 8 }}>
          Kontakt oss
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col text-[8px] leading-tight">
      <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-gray-100">
        <Logo />
        <div className="flex gap-3" style={{ color: "#1a3a5c", fontSize: 7 }}>
          <span className="font-semibold" style={{ color: BLUE }}>
            Hjem
          </span>
          <span>Tjenester</span>
          <span>Om Oss</span>
          <span>Kontakt</span>
        </div>
      </div>
      <div className="px-4 py-3 flex-1 flex gap-3 items-center">
        <div className="flex-1">
          <div className="font-bold mb-1" style={{ color: "#1a3a5c", fontSize: 14 }}>
            Rørlegger i Oslo -<br />
            <span>Pålitelig Håndverk</span>
          </div>
          <div className="rounded-full inline-block px-3 py-1.5 font-bold text-white mt-2" style={{ background: BLUE, fontSize: 7 }}>
            Akutt hjelp
          </div>
        </div>
        <div className="w-[45%] aspect-[5/3] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200" />
      </div>
      <div className="px-4 pb-3 grid grid-cols-3 gap-2">
        {[
          { l: "Bad og sanitær", g: "🚿", d: "Service ipsum dolor sit amet, sanitær varmeanlegg." },
          { l: "Varmeanlegg", g: "🔥", d: "Service ipsum dolor sit amet, varmeanlegg." },
          { l: "Anmeldelser", g: "★★★★★", d: "5.0 — over 200 kunder" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg p-2" style={{ background: SOFT }}>
            <div className="mb-1" style={{ fontSize: 11 }}>
              {s.g}
            </div>
            <div className="font-bold mb-0.5" style={{ color: "#1a3a5c", fontSize: 7 }}>
              {s.l}
            </div>
            <div style={{ color: "#4a5e75", fontSize: 5.5 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
