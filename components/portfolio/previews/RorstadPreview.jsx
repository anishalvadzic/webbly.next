export default function RorstadPreview() {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden font-body">
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a1929] flex items-center justify-between px-6 text-[9px] text-white/80">
        <span>Døgnvakt — vi rykker ut nå</span>
        <span>Sandakerveien 24c · Logg inn</span>
      </div>

      <div className="absolute top-7 left-0 right-0 h-12 bg-white border-b border-[#e2e7ed] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1267d6] flex items-center justify-center text-white text-[10px] font-bold">R</div>
          <span className="font-semibold text-[#0a1929] text-[11px]">Rørstad VVS</span>
        </div>
        <div className="flex gap-5 text-[10px] text-[#0a1929]">
          <span className="text-[#1267d6]">Hjem</span>
          <span>Tjenester</span>
          <span>Prosjekter</span>
          <span>Om oss</span>
          <span>Kontakt</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#0a1929]">22 50 40 30</span>
          <span className="text-[9px] text-white bg-[#d94f30] px-2.5 py-1 rounded font-semibold">Akutt hjelp</span>
        </div>
      </div>

      <div className="absolute inset-0 pt-[76px] grid grid-cols-2 gap-8 px-12 pb-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 self-start text-[9px] uppercase tracking-wider text-[#1267d6] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1267d6]" />
            Sertifisert mesterbedrift siden 1998
          </span>
          <h1 className="font-display text-[#0a1929] text-[42px] leading-[0.95] tracking-tight mb-3">
            Rørleggeren <em className="text-[#1267d6]">Oslo</em>
            <br />
            stoler på — når det
            <br />
            <em className="text-[#1267d6]">haster.</em>
          </h1>
          <p className="text-[10px] text-[#5a6b7d] leading-relaxed max-w-[28ch] mb-5">
            Vi tar oss av baderomsoppussinger, varmeanlegg og akutte lekkasjer. Fast pris før vi starter.
          </p>
          <div className="flex gap-2">
            <span className="bg-[#1267d6] text-white px-3 py-1.5 rounded text-[10px] font-semibold">Få tilbud på 1 minutt →</span>
            <span className="border border-[#0a1929] text-[#0a1929] px-3 py-1.5 rounded text-[10px] font-semibold">Se alle tjenester</span>
          </div>
          <div className="flex gap-6 mt-6 pt-4 border-t border-[#e2e7ed]">
            <div>
              <div className="font-display text-[#0a1929] text-xl">2400+</div>
              <div className="text-[8px] text-[#5a6b7d] uppercase tracking-wider">Fornøyde kunder</div>
            </div>
            <div>
              <div className="font-display text-[#0a1929] text-xl">4,9 ★</div>
              <div className="text-[8px] text-[#5a6b7d] uppercase tracking-wider">Snittvurdering</div>
            </div>
            <div>
              <div className="font-display text-[#0a1929] text-xl">25 år</div>
              <div className="text-[8px] text-[#5a6b7d] uppercase tracking-wider">I bransjen</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#cfdce8] via-[#a8bfd3] to-[#7592b3]" />
          <div className="absolute inset-0 rounded-md opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 70% 70%, rgba(10,25,41,0.3), transparent 60%)" }} />
          <div className="absolute top-3 right-3 bg-white rounded-md px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
            <span className="text-[#1267d6] text-[11px]">★</span>
            <div>
              <div className="text-[9px] font-semibold text-[#0a1929] leading-none">4,9 av 5 stjerner</div>
              <div className="text-[7px] text-[#5a6b7d]">på Mittanbud · 837 omtaler</div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-white rounded-md px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1267d6] flex items-center justify-center text-white text-[7px]">✓</span>
            <div>
              <div className="text-[9px] font-semibold text-[#0a1929] leading-none">Akkurat fullført</div>
              <div className="text-[7px] text-[#5a6b7d]">Frogner — bytte av varmtvannsbereder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
