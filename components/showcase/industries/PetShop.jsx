const WARM = "#e8a85c";
const DEEP = "#7a4e1e";
const SOFT = "#fdf5e9";
const GREEN = "#7eaf6b";

function Logo({ small }) {
  return (
    <div className="flex items-center gap-1 leading-none">
      <span style={{ fontSize: small ? 11 : 16 }}>🐾</span>
      <div
        className="font-bold tracking-tight"
        style={{ color: DEEP, fontSize: small ? 8 : 11, fontFamily: "Georgia, serif" }}
      >
        Dyrekos
      </div>
    </div>
  );
}

const PRODUCTS = [
  { n: "Hundefor Premium", p: "299 kr", g: "🦴" },
  { n: "Kattetårn", p: "799 kr", g: "🐈" },
  { n: "Hundebånd", p: "199 kr", g: "🐕" },
  { n: "Kattemat", p: "129 kr", g: "🐟" },
];

export default function PetShop({ variant }) {
  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: SOFT }}>
        <div className="px-2.5 py-2 flex items-center justify-between bg-white">
          <Logo small />
          <div className="flex gap-2 items-center">
            <span style={{ fontSize: 10 }}>🔍</span>
            <span style={{ fontSize: 10 }}>🛒</span>
          </div>
        </div>
        <div className="px-2.5 py-2.5 text-center" style={{ background: WARM, color: "white" }}>
          <div className="font-bold mb-1" style={{ fontSize: 10, fontFamily: "Georgia, serif" }}>
            Alt til ditt
            <br />
            kjæledyr
          </div>
          <div
            className="inline-block rounded-full font-bold mt-1 px-3 py-1"
            style={{ background: "white", color: WARM, fontSize: 7 }}
          >
            Handle nå
          </div>
        </div>
        <div className="px-2 py-2 flex-1 grid grid-cols-2 gap-1.5">
          {PRODUCTS.map((p) => (
            <div key={p.n} className="bg-white rounded-lg p-1.5 flex flex-col items-center text-center">
              <div className="rounded-md w-full aspect-square flex items-center justify-center mb-1" style={{ background: SOFT, fontSize: 14 }}>
                {p.g}
              </div>
              <div className="font-semibold leading-tight" style={{ color: DEEP, fontSize: 6 }}>
                {p.n}
              </div>
              <div className="font-bold mt-0.5" style={{ color: WARM, fontSize: 6.5 }}>
                {p.p}
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 py-1.5 text-center text-white font-bold" style={{ background: GREEN, fontSize: 7 }}>
          Fri frakt over 499 kr
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: SOFT }}>
      <div className="px-4 py-2 flex items-center justify-between bg-white border-b border-black/5">
        <Logo />
        <div className="flex gap-3" style={{ color: DEEP, fontSize: 7 }}>
          <span className="font-semibold">Hjem</span>
          <span>Hund</span>
          <span>Katt</span>
          <span>Smådyr</span>
          <span>Tilbud</span>
        </div>
        <div className="flex gap-2 items-center" style={{ color: DEEP, fontSize: 9 }}>
          <span>🔍</span>
          <span>👤</span>
          <span>🛒</span>
        </div>
      </div>
      <div className="px-4 py-3 flex gap-3 items-center" style={{ background: WARM, color: "white" }}>
        <div className="flex-1">
          <div className="font-bold mb-1" style={{ fontSize: 14, fontFamily: "Georgia, serif" }}>
            Alt til ditt kjæledyr
          </div>
          <div className="opacity-80 mb-2" style={{ fontSize: 6.5 }}>
            Premium fôr, leker og tilbehør —
            <br />
            levert direkte hjem.
          </div>
          <div
            className="inline-block rounded-full font-bold px-3 py-1.5"
            style={{ background: "white", color: WARM, fontSize: 7 }}
          >
            Handle nå
          </div>
        </div>
        <div className="w-[36%] aspect-[5/4] rounded-lg bg-gradient-to-br from-white/40 to-white/10 flex items-center justify-center" style={{ fontSize: 38 }}>
          🐕
        </div>
      </div>
      <div className="px-4 py-2 flex-1">
        <div className="font-bold mb-1.5" style={{ color: DEEP, fontSize: 9, fontFamily: "Georgia, serif" }}>
          Populære produkter
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PRODUCTS.map((p) => (
            <div key={p.n} className="bg-white rounded-lg p-1.5 flex flex-col items-center text-center">
              <div className="rounded-md w-full aspect-square flex items-center justify-center mb-1" style={{ background: SOFT, fontSize: 18 }}>
                {p.g}
              </div>
              <div className="font-semibold leading-tight" style={{ color: DEEP, fontSize: 6.5 }}>
                {p.n}
              </div>
              <div className="font-bold mt-0.5" style={{ color: WARM, fontSize: 7 }}>
                {p.p}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-1.5 text-center text-white font-bold" style={{ background: GREEN, fontSize: 7 }}>
        Fri frakt over 499 kr · Levering 1–2 dager
      </div>
    </div>
  );
}
