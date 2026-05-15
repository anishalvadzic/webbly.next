export default function VoernPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden font-body" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #0f0f1f 100%)" }}>
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 25% 20%, rgba(201,169,97,0.15), transparent 45%), radial-gradient(circle at 80% 70%, rgba(120,80,160,0.18), transparent 50%)" }} />

      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-white/90 z-10">
        <div className="flex items-center gap-2">
          <div className="font-display text-[16px] tracking-[0.3em]">VŒRN</div>
        </div>
        <div className="flex gap-5 text-[10px] uppercase tracking-wider">
          <span>Kolleksjon</span>
          <span>Lookbook</span>
          <span>Atelier</span>
          <span>Journal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/60 uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md bg-white/[0.08] border border-white/10">
            <span style={{ color: "#c9a961" }}>●</span> Pose
          </span>
        </div>
      </div>

      <div className="absolute inset-0 pt-16 grid grid-cols-2 gap-10 px-12 pb-8">
        <div className="flex flex-col justify-end">
          <div className="text-[8px] uppercase tracking-[0.3em] text-white/40 mb-3 font-semibold">
            Vinter '26 · Kapittel 02 · Tilgjengelig nå
          </div>
          <h1 className="font-display text-white text-[44px] leading-[0.9] tracking-tight mb-4">
            Stoffer som
            <br />
            <em style={{ color: "#c9a961" }}>husker</em> deg.
            <br />
            Snitt som
            <br />
            <em style={{ color: "#c9a961" }}>tåler</em> tid.
          </h1>
          <p className="text-[10px] text-white/55 leading-relaxed max-w-[32ch] italic">
            Atelier Vœrn er en norsk klesmaker som lager <em style={{ color: "#c9a961" }}>få plagg, lenger</em>. Hver kolleksjon nummerert, hvert plagg laget for å bæres i mange år.
          </p>
          <div className="mt-5 text-[8px] uppercase tracking-[0.3em] text-white/30 font-semibold">
            N° 047 · Edition of 80 · Manuel Helene
          </div>
          <div className="text-[8px] text-white/40 mt-2 italic">
            Oslo, Norge — håndsydd i Bergen. Tilgjengelig i butikk.
          </div>
        </div>

        <div className="relative flex items-end justify-end">
          <div className="relative w-[80%] aspect-[5/7] rounded-md overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2c1f3d 0%, #4a3a5e 35%, #6b5577 70%, #8a7892 100%)" }} />
            <div className="absolute inset-0 backdrop-blur-2xl" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.12), transparent 65%)" }} />
            <div className="absolute top-3 left-3 backdrop-blur-md bg-black/30 border border-white/10 rounded-full px-2 py-1 text-[8px] text-white/80 uppercase tracking-wider">
              N° 047
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="font-display text-white text-[14px] mb-0.5">Manuel Helene</div>
              <div className="text-[8px] text-white/55 italic">Helsekull merino, hibde-syd i Bergen. Tilgjengelig i kull.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
