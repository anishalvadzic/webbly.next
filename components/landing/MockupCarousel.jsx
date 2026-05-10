"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const mockups = [
  {
    industry: { no: "Frisørsalong", en: "Hair Salon" },
    name: "Studio Hår & Velvære",
    color: "#c8a97e",
    bg: "#fdf6ee",
    accent: "#3d2b1f",
    emoji: "✂️",
    nav: ["Hjem", "Tjenester", "Bestill", "Om oss"],
    hero: { no: "Skjønnhet starter her.", en: "Beauty starts here." },
    sub: { no: "Bestill time på 30 sekunder", en: "Book in 30 seconds" },
    tags: ["Klipp", "Farge", "Behandling", "Styling"],
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
  },
  {
    industry: { no: "Elektrikerfirma", en: "Electrician" },
    name: "Lysgaard Elektro AS",
    color: "#e8b84b",
    bg: "#fffbf0",
    accent: "#1a1a2e",
    emoji: "⚡",
    nav: ["Hjem", "Tjenester", "Referanser", "Kontakt"],
    hero: { no: "Trygg strøm — alltid.", en: "Safe power — always." },
    sub: {
      no: "Sertifisert elektriker i Oslo",
      en: "Certified electrician in Oslo",
    },
    tags: ["Installasjon", "Feilsøking", "HMS", "Nødhjelp"],
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
  },
  {
    industry: { no: "Legekontor", en: "Medical Clinic" },
    name: "Frisk Legesenter",
    color: "#7fb3a0",
    bg: "#f4faf8",
    accent: "#1e3a34",
    emoji: "🩺",
    nav: ["Hjem", "Leger", "Tjenester", "Time"],
    hero: { no: "Din helse, vår prioritet.", en: "Your health, our priority." },
    sub: { no: "Bestill legetime online", en: "Book a doctor online" },
    tags: ["Fastlege", "Blodprøve", "Vaksinasjon", "Rådgivning"],
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
  },
  {
    industry: { no: "Rørlegger", en: "Plumber" },
    name: "Nordvann VVS",
    color: "#6fa3c8",
    bg: "#f0f7fc",
    accent: "#0d2137",
    emoji: "🔧",
    nav: ["Hjem", "Tjenester", "Priser", "Kontakt"],
    hero: { no: "Ingen lekkasje for liten.", en: "No leak too small." },
    sub: {
      no: "Rask og pålitelig VVS-hjelp",
      en: "Fast & reliable plumbing",
    },
    tags: ["Rør", "Baderom", "Varme", "Akutt"],
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
  {
    industry: { no: "Veterinær", en: "Veterinarian" },
    name: "Dyreklinikk Pelsen",
    color: "#b57abf",
    bg: "#fdf6ff",
    accent: "#2d1040",
    emoji: "🐾",
    nav: ["Hjem", "Om oss", "Tjenester", "Bestill"],
    hero: {
      no: "Kjærlighet for dyrene dine.",
      en: "Love for your animals.",
    },
    sub: {
      no: "Omsorgsfull behandling for kjæledyr",
      en: "Caring treatment for pets",
    },
    tags: ["Hund", "Katt", "Vaksinasjon", "Kirurgi"],
    img: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&q=80",
  },
];

const DesktopMockup = ({ m, lang }) => (
  <div
    className="w-full rounded-2xl overflow-hidden shadow-2xl border border-beige-200"
    style={{ background: m.bg }}
  >
    <div className="bg-beige-100 px-4 py-2 flex items-center gap-2 border-b border-beige-200">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-300" />
        <div className="w-3 h-3 rounded-full bg-yellow-300" />
        <div className="w-3 h-3 rounded-full bg-green-300" />
      </div>
      <div className="flex-1 mx-4 bg-white rounded-full px-3 py-1 text-xs font-body text-warm-brown/50 text-center">
        www.
        {m.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/å/g, "a")
          .replace(/æ/g, "a")
          .replace(/ø/g, "o")}
        .no
      </div>
    </div>
    <div className="flex items-center justify-between px-6 py-3 border-b border-black/5">
      <span
        className="font-display text-sm font-semibold"
        style={{ color: m.accent }}
      >
        {m.name}
      </span>
      <div className="hidden sm:flex items-center gap-5">
        {m.nav.map((n) => (
          <span
            key={n}
            className="text-xs font-body"
            style={{ color: m.accent + "aa" }}
          >
            {n}
          </span>
        ))}
      </div>
      <button
        className="text-xs font-body px-3 py-1.5 rounded-full text-white"
        style={{ background: m.accent }}
      >
        Kontakt
      </button>
    </div>
    <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
      <img
        src={m.img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 px-8 py-10">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1 rounded-full mb-4"
          style={{ background: m.color + "33", color: m.accent }}
        >
          <span>{m.emoji}</span>
          <span>{m.industry[lang]}</span>
        </div>
        <h3
          className="font-display text-2xl font-semibold mb-2 leading-tight"
          style={{ color: m.accent }}
        >
          {m.hero[lang]}
        </h3>
        <p
          className="font-body text-sm mb-5"
          style={{ color: m.accent + "99" }}
        >
          {m.sub[lang]}
        </p>
        <div className="flex gap-2 flex-wrap">
          {m.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body px-3 py-1 rounded-full border"
              style={{
                borderColor: m.color,
                color: m.accent,
                background: m.color + "22",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const IPhoneMockup = ({ m, lang }) => (
  <div className="relative flex-shrink-0" style={{ width: 220, perspective: "1200px" }}>
    <motion.div
      animate={{ rotateY: [-4, 4, -4], rotateX: [2, -2, 2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        style={{
          width: 220,
          height: 450,
          borderRadius: 44,
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.5)",
          padding: "12px 9px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: -3, top: 90, width: 3, height: 36, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg,#3a3a3a,#222)", boxShadow: "-1px 0 3px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -3, top: 140, width: 3, height: 56, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg,#3a3a3a,#222)", boxShadow: "-1px 0 3px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -3, top: 208, width: 3, height: 56, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg,#3a3a3a,#222)", boxShadow: "-1px 0 3px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", right: -3, top: 150, width: 3, height: 80, borderRadius: "0 3px 3px 0", background: "linear-gradient(180deg,#3a3a3a,#222)", boxShadow: "1px 0 3px rgba(0,0,0,0.5)" }} />

        <div style={{ width: "100%", height: "100%", borderRadius: 34, overflow: "hidden", background: m.bg, position: "relative" }}>
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 80, height: 24, borderRadius: 20, background: "#111", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.6)" }} />

          <div style={{ paddingTop: 44, height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px 6px", borderBottom: `1px solid ${m.color}33` }}>
              <span style={{ fontFamily: "serif", fontSize: 10, fontWeight: 700, color: m.accent }}>{m.name.split(" ")[0]}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ width: 14, height: 1.5, borderRadius: 2, background: m.accent }} />
                <div style={{ width: 10, height: 1.5, borderRadius: 2, background: m.accent }} />
              </div>
            </div>

            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              <img src={m.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
              <div style={{ position: "relative", zIndex: 1, padding: "16px 14px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9, padding: "3px 8px", borderRadius: 20, background: m.color + "33", color: m.accent, marginBottom: 10, fontFamily: "sans-serif" }}>
                  <span>{m.emoji}</span>
                  <span>{m.industry[lang]}</span>
                </div>
                <div style={{ fontFamily: "serif", fontSize: 16, fontWeight: 700, color: m.accent, lineHeight: 1.25, marginBottom: 6 }}>{m.hero[lang]}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 9, color: m.accent + "99", marginBottom: 14 }}>{m.sub[lang]}</div>
                <button style={{ fontSize: 9, fontFamily: "sans-serif", padding: "5px 12px", borderRadius: 20, background: m.accent, color: "#fff", border: "none" }}>
                  {lang === "no" ? "Bestill" : "Book"}
                </button>
              </div>
              <div style={{ position: "absolute", bottom: 16, left: 14, display: "flex", gap: 5, flexWrap: "wrap" }}>
                {m.tags.slice(0, 3).map((tag) => (
                  <span key={tag} style={{ fontSize: 8, fontFamily: "sans-serif", padding: "3px 7px", borderRadius: 20, border: `1px solid ${m.color}`, color: m.accent, background: m.color + "22" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 12px" }}>
              <div style={{ width: 48, height: 4, borderRadius: 4, background: m.accent + "55" }} />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", top: 12, left: 9, right: 9, height: "45%", borderRadius: "34px 34px 60% 60%", background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 100%)", pointerEvents: "none" }} />
      </div>
    </motion.div>

    <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", width: 160, height: 20, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)" }} />
  </div>
);

export default function MockupCarousel({ lang }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (paused) return;
    const duration = 5000;
    const step = 50;
    let elapsed = (progress * duration) / 100;

    const progressInterval = setInterval(() => {
      elapsed += step;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setActive((i) => (i + 1) % mockups.length);
      }
    }, step);

    return () => clearInterval(progressInterval);
  }, [paused]);

  const prev = () => setActive((i) => (i - 1 + mockups.length) % mockups.length);
  const next = () => setActive((i) => (i + 1) % mockups.length);

  const t = {
    no: {
      label: "Eksempler",
      h2: "Se hva vi kan lage\nfor din bransje.",
      sub: "Alle nettsider er skreddersydde — her er et utvalg av hva Webbly leverer.",
    },
    en: {
      label: "Examples",
      h2: "See what we can build\nfor your industry.",
      sub: "Every website is tailor-made — here's a taste of what Webbly delivers.",
    },
  }[lang];

  const m = mockups[active];

  return (
    <section id="examples" className="py-28 bg-beige-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4"
          >
            {t.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="font-display text-4xl md:text-5xl font-semibold text-deep-brown whitespace-pre-line mb-4"
          >
            {t.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Industry pills */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {mockups.map((mockup, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm transition-all duration-300 cursor-pointer border ${
                active === i
                  ? "text-beige-50 border-transparent shadow-md"
                  : "bg-white border-beige-200 text-warm-brown hover:border-beige-300"
              }`}
              style={
                active === i
                  ? { background: mockup.accent, borderColor: mockup.accent }
                  : {}
              }
            >
              <span>{mockup.emoji}</span>
              <span>{mockup.industry[lang]}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-desktop"}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <DesktopMockup m={m} lang={lang} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2 flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "-iphone"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <IPhoneMockup m={m} lang={lang} />
              </motion.div>
            </AnimatePresence>
            <p className="font-body text-xs text-warm-brown/50 text-center mt-6">
              {lang === "no" ? "Alltid mobiloptimalisert" : "Always mobile-optimized"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-beige-300 flex items-center justify-center hover:bg-beige-100 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-warm-brown" />
          </button>
          <div className="flex gap-2 items-center">
            {mockups.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setProgress(0); }}
                className="transition-all duration-300 rounded-full cursor-pointer overflow-hidden relative"
                style={{
                  width: active === i ? 48 : 8,
                  height: 8,
                  background: "hsl(32,25%,82%)",
                }}
              >
                {active === i && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: mockups[active].accent,
                      transition: "width 50ms linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-beige-300 flex items-center justify-center hover:bg-beige-100 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-warm-brown" />
          </button>
          <button
            onClick={() => setPaused((p) => !p)}
            className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center hover:bg-beige-100 transition-colors cursor-pointer ml-2"
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? (
              <Play className="w-3 h-3 text-warm-brown" />
            ) : (
              <Pause className="w-3 h-3 text-warm-brown" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
