"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import { RestaurantSite } from "@/components/remotion/compositions/RestaurantSite";
import { EcommerceSite } from "@/components/remotion/compositions/EcommerceSite";
import { ServiceSite } from "@/components/remotion/compositions/ServiceSite";
import { PortfolioSite } from "@/components/remotion/compositions/PortfolioSite";
import { BookingFeature } from "@/components/remotion/compositions/BookingFeature";
import { AnimationFeature } from "@/components/remotion/compositions/AnimationFeature";

const RemotionPlayer = dynamic(
  () => import("@/components/remotion/RemotionPlayerWrapper"),
  { ssr: false }
);

const INDUSTRIES = [
  {
    id: "restaurant",
    label: "Restaurant & Café",
    description:
      "Elegant presentasjon av meny, galleri og reservasjon. Gjestene booker bord direkte fra siden.",
    tags: ["Meny", "Reservasjon", "Galleri", "Google Maps"],
    component: RestaurantSite,
  },
  {
    id: "ecommerce",
    label: "Nettbutikk",
    description:
      "Salgsorientert design med produktkatalog, handlekurv og rask utsjekkprosess.",
    tags: ["Produkter", "Handlekurv", "Betaling", "Lager"],
    component: EcommerceSite,
  },
  {
    id: "service",
    label: "Håndverk & Service",
    description:
      "Profesjonell side for håndverkere med tydelig CTA, tjenesteoversikt og anmeldelser.",
    tags: ["Kontaktskjema", "Tjenester", "Anmeldelser", "Rask lasting"],
    component: ServiceSite,
  },
  {
    id: "portfolio",
    label: "Portfolio & Kreativ",
    description:
      "Minimalistisk og slående presentasjon av prosjekter. La arbeidet tale for seg selv.",
    tags: ["Prosjekter", "Galleri", "Case studies", "Dark mode"],
    component: PortfolioSite,
  },
];

const FEATURES = [
  {
    id: "booking",
    label: "Bookingsystem",
    description:
      "Integrert kalender lar kunder booke direkte. Automatiske bekreftelser på e-post og SMS.",
    tags: ["Kalender", "SMS-varsling", "Google Calendar"],
    component: BookingFeature,
  },
  {
    id: "animations",
    label: "Animasjoner & Bevegelse",
    description:
      "Mikro-animasjoner og scroll-effekter som gjør siden levende og minneverdig.",
    tags: ["Spring physics", "Scroll-effekter", "Hover states"],
    component: AnimationFeature,
  },
];

function PlayerCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group relative bg-[#161616] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors duration-300"
    >
      {/* Player area */}
      <div className="relative aspect-[16/10] bg-[#0d0d0d]">
        <RemotionPlayer component={item.component} />
      </div>

      {/* Card info */}
      <div className="p-6">
        <h3 className="font-display text-xl text-white mb-2">{item.label}</h3>
        <p className="text-sm text-white/55 leading-relaxed mb-4 font-body">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body text-white/40 border border-white/10 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExamplesPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="bg-[#111111] min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      {/* Navbar spacer (fixed navbar is 64px) */}
      <div className="h-16" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[hsl(25,20%,18%)] opacity-25 blur-[120px]" />
        </div>

        {/* Dot grid decoration */}
        <div className="absolute top-20 right-20 grid grid-cols-6 gap-3 opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          ))}
        </div>
        <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-6"
          >
            Eksempler
          </motion.div>

          <div className="overflow-hidden">
            {["Alt som er", "mulig."].map((word, i) => (
              <motion.div
                key={word}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-display text-[clamp(3rem,10vw,6.5rem)] text-white leading-[1.05] tracking-tight">
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-body text-lg text-white/50 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Se hva vi kan bygge for din bedrift — interaktive animasjoner av
            virkelige nettsider vi lager.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Industry section ─────────────────────────────────── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-3">
            Bransjer
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Tilpasset din industri
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INDUSTRIES.map((item, i) => (
            <PlayerCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Features section ─────────────────────────────────── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-3">
            Muligheter
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Funksjoner som imponerer
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((item, i) => (
            <PlayerCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-[#1C1814] border border-[#C9A96E]/20 rounded-3xl px-8 py-16">
            <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-4">
              Neste steg
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
              Klar for å komme i gang?
            </h2>
            <p className="font-body text-white/50 text-lg mb-10">
              Vi leverer profesjonelle nettsider på 3 dager — skreddersydd for
              din bedrift.
            </p>
            <a
              href="/#contact"
              className="inline-block font-body text-sm bg-[#C9A96E] text-white px-8 py-4 rounded-xl hover:bg-[#b8966a] hover:shadow-lg hover:shadow-[#C9A96E]/20 hover:-translate-y-0.5 transition-all duration-200 font-semibold"
            >
              Ta kontakt
            </a>
          </div>
        </motion.div>
      </section>
      <Footer lang={lang} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      <CookieBanner
        lang={lang}
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </div>
  );
}
