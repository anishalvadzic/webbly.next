"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import LaptopMockup from "@/components/remotion/LaptopMockup";
import PhoneMockup from "@/components/remotion/PhoneMockup";
import { RestaurantSite } from "@/components/remotion/compositions/RestaurantSite";
import { EcommerceSite } from "@/components/remotion/compositions/EcommerceSite";
import { ServiceSite } from "@/components/remotion/compositions/ServiceSite";
import { PortfolioSite } from "@/components/remotion/compositions/PortfolioSite";
import {
  RestaurantSiteMobile,
  EcommerceSiteMobile,
  ServiceSiteMobile,
  PortfolioSiteMobile,
} from "@/components/remotion/compositions/MobileSitePreview";

const RemotionPlayer = dynamic(
  () => import("@/components/remotion/RemotionPlayerWrapper"),
  { ssr: false }
);

const EXAMPLES = [
  {
    id: "restaurant",
    label: "Restaurant & Café",
    headline: "Elegant matopplevelse online",
    description:
      "En vakker nettside for restauranter med interaktiv meny, bildegalleri og online reservasjon. Gjestene booker bord direkte — og du får færre no-shows med automatiske påminnelser.",
    tags: ["Meny", "Reservasjon", "Galleri", "Google Maps", "Anmeldelser"],
    desktop: RestaurantSite,
    mobile: RestaurantSiteMobile,
    desktopDuration: 210,
    mobileDuration: 160,
    accent: "#C9A96E",
  },
  {
    id: "ecommerce",
    label: "Nettbutikk",
    headline: "Salgsdrevet design som konverterer",
    description:
      "Salgsorientert nettbutikk med produktkatalog, handlekurv og rask utsjekk. Integrert lager, fraktalternativer og sikker betaling med Vipps og kort.",
    tags: ["Produkter", "Handlekurv", "Betaling", "Lager", "Frakt"],
    desktop: EcommerceSite,
    mobile: EcommerceSiteMobile,
    desktopDuration: 210,
    mobileDuration: 160,
    accent: "#4A7C59",
  },
  {
    id: "service",
    label: "Håndverk & Service",
    headline: "Profesjonell side som gir oppdrag",
    description:
      "Tydelig og tillitsskapende nettside for håndverkere og servicebedrifter. Sterk CTA, tjenesteoversikt, kundeomtaler og direkte kontakt — alt som trengs for å få telefonen til å ringe.",
    tags: ["Kontaktskjema", "Tjenester", "Anmeldelser", "Rask lasting", "SEO"],
    desktop: ServiceSite,
    mobile: ServiceSiteMobile,
    desktopDuration: 210,
    mobileDuration: 160,
    accent: "#F5A623",
  },
  {
    id: "portfolio",
    label: "Portfolio & Kreativ",
    headline: "La arbeidet tale for seg selv",
    description:
      "Minimalistisk og visuelt slående portfolio for kreative profesjonelle. Fullskjerms prosjektvisning, galleri og om-seksjon — designet for å imponere potensielle kunder.",
    tags: ["Prosjekter", "Galleri", "Case studies", "Dark mode", "Animasjoner"],
    desktop: PortfolioSite,
    mobile: PortfolioSiteMobile,
    desktopDuration: 210,
    mobileDuration: 160,
    accent: "#8b8b8b",
  },
];

function ExampleSection({ example, index, reverse }) {
  const isEven = index % 2 === 0;
  const layoutReverse = reverse ?? !isEven;

  return (
    <section className="relative px-6 py-16 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: example.accent }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${
            layoutReverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-10 lg:gap-16`}
        >
          {/* Device mockups */}
          <motion.div
            initial={{ opacity: 0, x: layoutReverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0 w-full lg:w-[58%]"
          >
            <div className="relative">
              {/* Laptop */}
              <LaptopMockup>
                <RemotionPlayer
                  component={example.desktop}
                  durationInFrames={example.desktopDuration}
                  width={1200}
                  height={750}
                />
              </LaptopMockup>

              {/* Phone — overlapping bottom-right */}
              <div
                className={`absolute -bottom-4 ${
                  layoutReverse ? "-left-4 md:left-4" : "-right-4 md:right-4"
                } w-[22%] min-w-[120px] max-w-[180px] z-10`}
              >
                <PhoneMockup>
                  <RemotionPlayer
                    component={example.mobile}
                    durationInFrames={example.mobileDuration}
                    width={390}
                    height={844}
                    fps={30}
                  />
                </PhoneMockup>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 min-w-0"
          >
            <div
              className="text-xs font-body tracking-[0.3em] uppercase mb-3 font-semibold"
              style={{ color: example.accent }}
            >
              {example.label}
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight mb-5">
              {example.headline}
            </h2>
            <p className="font-body text-base text-white/50 leading-relaxed mb-7 max-w-lg">
              {example.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body text-white/40 border border-white/10 rounded-full px-3.5 py-1.5 hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="max-w-6xl mx-auto mt-16 md:mt-28">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>
    </section>
  );
}

export default function ExamplesPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <div className="h-16" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[hsl(25,20%,18%)] opacity-20 blur-[120px]" />
        </div>

        <div className="absolute top-20 right-20 grid grid-cols-6 gap-3 opacity-15">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          ))}
        </div>
        <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3 opacity-8">
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
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
            className="font-body text-lg text-white/45 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Se hva vi kan bygge for din bedrift — interaktive forhåndsvisninger av
            virkelige nettsider vi designer, både på laptop og mobil.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-xs font-body tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Example sections */}
      {EXAMPLES.map((example, i) => (
        <ExampleSection key={example.id} example={example} index={i} />
      ))}

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-[#1C1814] border border-[#C9A96E]/20 rounded-3xl px-8 py-14 md:py-20">
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

      <Footer
        lang={lang}
        onOpenCookieSettings={() => setCookieSettingsOpen(true)}
      />
      <CookieBanner
        lang={lang}
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </div>
  );
}
