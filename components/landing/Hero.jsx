"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

const EASE = [0.32, 0.72, 0, 1];

export default function Hero({ lang }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven progress through the hero (0 = top, 1 = scrolled past)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven dissolve into the next section
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.45, 0.6, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.8, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const t = {
    no: {
      eyebrow: "Webbly · Lørenskog",
      h1a: "Profesjonelle nettsider",
      h1b: "for bedrifter",
      h1c: "i Norge.",
      sub: "Webbly bygger profesjonelle, raske og mobilvennlige nettsider for norske bedrifter. Fast månedspris fra 499 kr, publisering på eget domene og online på tre virkedager.",
      cta: "Velg din pakke",
      ctaSecondary: "Ta kontakt",
      scroll: "Utforsk",
    },
    en: {
      eyebrow: "Webbly · Lørenskog",
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
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-deep-brown"
    >
      {/* Background video */}
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: videoOpacity, scale: videoScale }}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <video
          src="/hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Bottom mask — softly dissolves the video into beige-50 of the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-b from-transparent to-beige-50 pointer-events-none"
        />
      </motion.div>

      {/* Darkening overlay for text legibility — grows as user scrolls */}
      <motion.div
        style={prefersReducedMotion ? { opacity: 0.5 } : { opacity: overlayOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-deep-brown/70 via-deep-brown/30 to-deep-brown/40" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="inline-block text-[10px] tracking-[0.3em] uppercase font-semibold text-beige-50/80 mb-5 px-3 py-1 rounded-full border border-beige-50/15 bg-beige-50/[0.04] backdrop-blur-sm"
        >
          {t.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-beige-50 mb-6"
          style={{ lineHeight: 1.05, letterSpacing: "-0.02em", textWrap: "balance" }}
        >
          {t.h1a}{" "}
          <em className="italic text-beige-200">{t.h1b}</em>
          <br className="hidden md:block" />
          {t.h1c}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="font-body text-lg text-beige-100/85 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ textWrap: "pretty" }}
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => scrollTo("#pricing")}
            className="group inline-flex items-center gap-2.5 bg-beige-50 text-deep-brown pl-6 pr-2 py-2 rounded-full text-sm font-body font-medium shadow-xl shadow-deep-brown/40 hover:bg-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {t.cta}
            <span className="w-8 h-8 rounded-full bg-deep-brown/8 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2.2} />
            </span>
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 text-beige-50 px-6 py-3 rounded-full text-sm font-body font-medium hover:bg-beige-50/10 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <Mail className="w-4 h-4" strokeWidth={2} />
            {t.ctaSecondary}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#services")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-beige-50/60 hover:text-beige-50 cursor-pointer transition-colors z-10"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase">
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" strokeWidth={2} />
        </motion.div>
      </motion.button>
    </section>
  );
}
