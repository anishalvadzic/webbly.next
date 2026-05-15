"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import DeviceShowcase from "@/components/showcase/DeviceShowcase";

export default function ExamplesPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="bg-beige-50 min-h-screen overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} />
      <div className="h-16" />

      <section className="px-6 pt-16 md:pt-24 pb-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-body tracking-[0.3em] uppercase text-warm-brown/70 mb-4"
        >
          Eksempler
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl text-deep-brown mb-6 leading-[1.05]"
        >
          Alt som er mulig.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-body text-lg md:text-xl text-warm-brown/70 max-w-2xl mx-auto"
        >
          Bla gjennom utvalgte bransje-eksempler — designet og bygget av Webbly.
        </motion.p>
      </section>

      <DeviceShowcase />

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
