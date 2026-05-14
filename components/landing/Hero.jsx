"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

const FloatingOrb = ({ cx, cy, r, delay, duration }) => (
  <motion.circle
    cx={cx}
    cy={cy}
    r={r}
    fill="hsl(32, 25%, 82%)"
    opacity={0.35}
    animate={{ cy: [cy, cy - 18, cy], opacity: [0.35, 0.55, 0.35] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Hero({ lang }) {
  const t = {
    no: {
      h1a: "Profesjonelle nettsider",
      h1b: "for bedrifter",
      h1c: "i Norge.",
      sub: "Webbly bygger profesjonelle, raske og mobilvennlige nettsider for norske bedrifter. Fast månedspris fra 499 kr, publisering på eget domene og online på tre virkedager.",
      cta: "Velg din pakke",
      ctaSecondary: "Ta kontakt",
      scroll: "Utforsk",
    },
    en: {
      h1a: "Professional websites",
      h1b: "for businesses",
      h1c: "in Norway.",
      sub: "Webbly builds professional, fast and mobile-friendly websites for Norwegian businesses. Fixed monthly price from 499 kr, published on your own domain and online in three business days.",
      cta: "Choose Your Plan",
      ctaSecondary: "Contact us",
      scroll: "Explore",
    },
  }[lang];

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-beige-50">
      {/* Animated SVG background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <FloatingOrb cx={200} cy={150} r={180} delay={0} duration={3.5} />
          <FloatingOrb cx={1000} cy={600} r={220} delay={1.5} duration={4} />
          <FloatingOrb cx={600} cy={400} r={120} delay={0.8} duration={3} />
          <FloatingOrb cx={100} cy={650} r={90} delay={2} duration={4.5} />
          <FloatingOrb cx={1100} cy={120} r={100} delay={0.3} duration={3.8} />
        </svg>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-deep-brown mb-6"
          style={{ lineHeight: 1.5, textWrap: "balance" }}
        >
          {t.h1a}{" "}
          <em className="not-italic relative inline-block">{t.h1b}</em>{" "}
          <br className="hidden md:block" />
          {t.h1c}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-body text-lg text-warm-brown/75 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ textWrap: "pretty" }}
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#pricing")}
            className="inline-flex items-center gap-2 bg-deep-brown text-beige-50 px-8 py-4 rounded-xl text-sm font-body font-medium shadow-lg hover:bg-warm-brown hover:shadow-xl hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            {t.cta}
            <ArrowDown className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 text-deep-brown px-6 py-4 rounded-xl text-sm font-body font-medium hover:text-warm-brown transition-colors duration-200 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            {t.ctaSecondary}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#services")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-warm-brown/50 hover:text-warm-brown cursor-pointer transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-body tracking-widest uppercase">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
