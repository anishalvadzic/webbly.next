"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollDrivenFrame } from "@/components/remotion/useScrollDrivenFrame";
import { RestaurantSite } from "@/components/remotion/compositions/RestaurantSite";
import { EcommerceSite } from "@/components/remotion/compositions/EcommerceSite";
import { ServiceSite } from "@/components/remotion/compositions/ServiceSite";
import { PortfolioSite } from "@/components/remotion/compositions/PortfolioSite";
import { BookingFeature } from "@/components/remotion/compositions/BookingFeature";
import { AnimationFeature } from "@/components/remotion/compositions/AnimationFeature";
import { MobileResponsive } from "@/components/remotion/compositions/MobileResponsive";
import { Performance } from "@/components/remotion/compositions/Performance";
import { SeoRanking } from "@/components/remotion/compositions/SeoRanking";

const RemotionPlayer = dynamic(
  () => import("@/components/remotion/RemotionPlayerWrapper"),
  { ssr: false }
);

const INDUSTRIES = [
  {
    id: "restaurant",
    label: "Restaurant & Café",
    heading: "Bord booket fra forsiden.",
    description:
      "Elegant presentasjon av meny, galleri og reservasjon. Gjestene booker direkte uten å forlate siden — og du får varsel på mobilen.",
    tags: ["Meny", "Reservasjon", "Galleri", "Google Maps"],
    component: RestaurantSite,
    durationInFrames: 90,
  },
  {
    id: "ecommerce",
    label: "Nettbutikk",
    heading: "Salg som faktisk konverterer.",
    description:
      "Produktkatalog, handlekurv og rask utsjekkprosess. Hver detalj er optimalisert for å gjøre besøkende til kunder.",
    tags: ["Produkter", "Handlekurv", "Betaling", "Lager"],
    component: EcommerceSite,
    durationInFrames: 90,
  },
  {
    id: "service",
    label: "Håndverk & Service",
    heading: "Tillit fra første klikk.",
    description:
      "Profesjonell side med tydelig CTA, tjenesteoversikt og anmeldelser som bygger troverdighet før telefonen ringer.",
    tags: ["Kontaktskjema", "Tjenester", "Anmeldelser", "Rask lasting"],
    component: ServiceSite,
    durationInFrames: 90,
  },
  {
    id: "portfolio",
    label: "Portfolio & Kreativ",
    heading: "La arbeidet snakke.",
    description:
      "Minimalistisk og slående presentasjon av prosjekter. Stille design, sterke bilder, ingen distraksjoner.",
    tags: ["Prosjekter", "Galleri", "Case studies", "Dark mode"],
    component: PortfolioSite,
    durationInFrames: 90,
  },
];

const FEATURES = [
  {
    id: "booking",
    label: "Bookingsystem",
    heading: "Kalenderen jobber for deg.",
    description:
      "Integrert kalender lar kunder booke 24/7. Automatiske bekreftelser på e-post og SMS — du møter bare opp.",
    tags: ["Kalender", "SMS-varsling", "Google Calendar"],
    component: BookingFeature,
    durationInFrames: 90,
  },
  {
    id: "animations",
    label: "Animasjoner & Bevegelse",
    heading: "Levende, men ikke støyende.",
    description:
      "Mikro-animasjoner og scroll-effekter som gjør siden minneverdig. Hver bevegelse har en grunn.",
    tags: ["Spring physics", "Scroll-effekter", "Hover states"],
    component: AnimationFeature,
    durationInFrames: 90,
  },
  {
    id: "mobile",
    label: "Mobil-responsiv",
    heading: "Perfekt på hver skjerm.",
    description:
      "Mer enn 70% av besøkene kommer fra mobil. Sidene vi bygger tilpasser seg sømløst fra desktop til lommen din.",
    tags: ["Responsivt grid", "Touch-vennlig", "Hurtig på 4G"],
    component: MobileResponsive,
    durationInFrames: 150,
  },
  {
    id: "performance",
    label: "Hastighet & Performance",
    heading: "Raskere enn konkurrentene.",
    description:
      "Sider som laster på under sekundet. Google liker det. Brukerne elsker det. Konverteringen viser det.",
    tags: ["Lighthouse 90+", "Core Web Vitals", "Lazy loading"],
    component: Performance,
    durationInFrames: 120,
  },
  {
    id: "seo",
    label: "SEO som virker",
    heading: "Funn­bar i Google.",
    description:
      "Strukturert data, lynraske sider og lokal SEO som faktisk gir resultat. Vi bygger for å bli funnet — ikke bare sett.",
    tags: ["Lokal SEO", "Schema markup", "Sitemap"],
    component: SeoRanking,
    durationInFrames: 150,
  },
];

function Chapter({ item, index, alternate }) {
  const playerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isMobile = useIsMobile();
  const isDesktop = mounted && !isMobile;

  const { targetRef, scrollYProgress } = useScrollDrivenFrame(
    item.durationInFrames ?? 90,
    playerRef,
    isDesktop
  );

  // On mobile: play/pause as the section scrolls into/out of view
  useEffect(() => {
    if (!mounted || isDesktop || !targetRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playerRef.current?.play();
        else playerRef.current?.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [mounted, isDesktop]);

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.82, 1],
    [0.25, 1, 1, 0.5]
  );
  const copyY = useTransform(scrollYProgress, [0, 0.18], [40, 0]);
  const playerScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.96, 1, 1, 0.98]
  );

  return (
    <section
      ref={targetRef}
      className="relative md:h-[150vh]"
    >
      <div
        className="min-h-[80vh] py-16 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:py-0 flex items-center px-6 md:px-12"
      >
        <div
          className={`max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
            alternate ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Player */}
          <motion.div
            style={isDesktop ? { scale: playerScale } : undefined}
            className="md:col-span-7 w-full"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/5 shadow-2xl shadow-black/40">
              <RemotionPlayer
                component={item.component}
                durationInFrames={item.durationInFrames ?? 90}
                scrollDriven={isDesktop}
                playerRef={playerRef}
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            style={isDesktop ? { opacity: copyOpacity, y: copyY } : undefined}
            className="md:col-span-5"
          >
            <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-5">
              {String(index + 1).padStart(2, "0")} — {item.label}
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-tight">
              {item.heading}
            </h2>
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed mb-8">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body text-white/45 border border-white/10 rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionDivider({ kicker, title }) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-4">
          {kicker}
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.05] tracking-tight max-w-3xl">
          {title}
        </h2>
        <div className="mt-10 h-px bg-gradient-to-r from-[#C9A96E]/40 via-white/10 to-transparent" />
      </motion.div>
    </section>
  );
}

export default function ExamplesPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroDotsY = useTransform(heroProgress, [0, 1], [0, -80]);
  const heroDotsOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  const chapters = [...INDUSTRIES, ...FEATURES];

  return (
    <div className="bg-[#0E0E0F] min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <div className="h-16" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center overflow-hidden"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[hsl(25,20%,20%)] opacity-30 blur-[140px]" />
        </div>

        {/* Parallax dot decorations */}
        <motion.div
          style={{ y: heroDotsY, opacity: heroDotsOpacity }}
          className="absolute top-24 right-24 grid grid-cols-7 gap-3 opacity-25 pointer-events-none"
        >
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          ))}
        </motion.div>
        <motion.div
          style={{ y: heroDotsY, opacity: heroDotsOpacity }}
          className="absolute bottom-24 left-24 grid grid-cols-5 gap-3 opacity-15 pointer-events-none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-8"
          >
            Eksempler
          </motion.div>

          <div className="overflow-hidden">
            {["Alt som er", "mulig."].map((word, i) => (
              <motion.div
                key={word}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h1 className="font-display text-[clamp(3.5rem,11vw,8rem)] text-white leading-[1.02] tracking-tight">
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="font-body text-xl md:text-2xl text-white/55 mt-10 max-w-2xl mx-auto leading-relaxed"
          >
            Scroll for å se hva vi kan bygge — hver animasjon spilles av
            mens du beveger deg gjennom siden.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity: heroDotsOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Bransjer ─────────────────────────────────────────── */}
      <SectionDivider kicker="Bransjer" title="Tilpasset din industri." />

      {INDUSTRIES.map((item, i) => (
        <Chapter
          key={item.id}
          item={item}
          index={i}
          alternate={i % 2 === 1}
        />
      ))}

      {/* ── Funksjoner ───────────────────────────────────────── */}
      <SectionDivider
        kicker="Funksjoner & teknologi"
        title="Bygget for å imponere — og levere."
      />

      {FEATURES.map((item, i) => (
        <Chapter
          key={item.id}
          item={item}
          index={INDUSTRIES.length + i}
          alternate={(INDUSTRIES.length + i) % 2 === 1}
        />
      ))}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-32 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#C9A96E]/10 blur-[160px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="bg-[#161410] border border-[#C9A96E]/25 rounded-3xl px-8 md:px-16 py-20 md:py-24">
            <div className="text-xs font-body tracking-[0.3em] uppercase text-[#C9A96E] mb-6">
              Neste steg
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[1.05] tracking-tight">
              Klar for å komme i gang?
            </h2>
            <p className="font-body text-xl text-white/55 mb-12 max-w-xl mx-auto leading-relaxed">
              Vi leverer profesjonelle nettsider på tre virkedager —
              skreddersydd for din bedrift.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 font-body text-sm bg-[#C9A96E] text-white px-10 py-5 rounded-xl hover:bg-[#b8966a] hover:shadow-xl hover:shadow-[#C9A96E]/25 hover:-translate-y-0.5 transition-all duration-200 font-semibold"
            >
              Ta kontakt
              <ArrowRight className="w-4 h-4" />
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
