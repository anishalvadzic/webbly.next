export default function BjorkPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden font-body" style={{ background: "linear-gradient(180deg, #f4ede0 0%, #ebe0cc 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#f4ede0]/95 backdrop-blur-sm border-b border-[#0d2a1a]/8 flex items-center justify-between px-7 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#c4623e] flex items-center justify-center text-[#f4ede0] text-[10px] font-bold">B</div>
          <span className="font-display text-[#0d2a1a] text-[14px]">
            Bjørk <em>&amp; Brød</em>
          </span>
        </div>
        <div className="flex gap-5 text-[10px] text-[#0d2a1a]/85">
          <span className="text-[#c4623e] font-semibold">Hjem</span>
          <span>Meny</span>
          <span>Kafé</span>
          <span>Brød på bestilling</span>
          <span>Besøk oss</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[#0d2a1a]/55">Åpent nå · til 17:00</span>
          <span className="text-[9px] text-[#f4ede0] bg-[#0d2a1a] px-2.5 py-1 rounded-full font-semibold">Reservér bord</span>
        </div>
      </div>

      <div className="absolute top-12 left-7 right-7 mt-2 text-[8px] text-[#5b6b5e] uppercase tracking-[0.2em] flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#c4623e]" />
        Nabolagsbakeri på Grünerløkka — siden 2014
      </div>

      <div className="absolute inset-0 pt-16 grid grid-cols-2 gap-8 px-12 pb-8">
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-[#0d2a1a] text-[42px] leading-[0.95] tracking-tight mb-4">
            Brød fra
            <br />
            <em className="text-[#c4623e]">i går.</em>
            <br />
            Kaffe fra <em className="text-[#c4623e]">i dag.</em>
          </h1>
          <p className="text-[10px] text-[#0d2a1a]/65 leading-relaxed max-w-[30ch] mb-5 italic">
            Et lite, varmt bakeri og kafé i hjertet av Grünerløkka. Surdeigsbrød, ferske bakverk og kaffe brent rett over gata.
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[9px] text-[#0d2a1a] py-1.5 border-b border-[#0d2a1a]/10">
              <span>Hverdager</span>
              <span className="font-semibold tabular-nums">07:00 — 17:00</span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#0d2a1a] py-1.5 border-b border-[#0d2a1a]/10">
              <span>Lørdag</span>
              <span className="font-semibold tabular-nums">08:00 — 16:00</span>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#0d2a1a] py-1.5">
              <span>Søndag</span>
              <span className="font-semibold tabular-nums">09:00 — 15:00</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[24px] overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #5e3a26 0%, #8a5a3a 30%, #b07b50 65%, #d09969 100%)" }} />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,220,180,0.3), transparent 50%)" }} />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="font-display text-[#f4ede0]/90 text-[80px] leading-none italic" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
                Brød
              </div>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 backdrop-blur-md bg-[#f4ede0]/85 rounded-md px-2.5 py-1.5 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-semibold text-[#0d2a1a]">Surdeig — i dag</div>
                <div className="text-[7px] text-[#5b6b5e]">Hentes mellom 14 og 17</div>
              </div>
              <span className="text-[8px] text-[#f4ede0] bg-[#c4623e] px-2 py-1 rounded-full font-semibold uppercase tracking-wider">Bestill</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
