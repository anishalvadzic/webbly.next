"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Clock,
  TrendingUp,
  HeadphonesIcon,
  Search,
  Smartphone,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";

const features = [
  { icon: Smartphone, text: "Moderne og mobilvennlige nettsider" },
  { icon: Clock, text: "Rask levering – klar på 3 virkedager" },
  { icon: TrendingUp, text: "Enkle og transparente priser" },
  { icon: Search, text: "SEO-grunnoppsett og Google-indeksering" },
  { icon: HeadphonesIcon, text: "Support og mulighet for videreutvikling" },
  { icon: Zap, text: "Rask og effektiv prosess fra start til lansering" },
];

export default function AboutPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-beige-50">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4"
          >
            Om oss
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-semibold text-deep-brown mb-6"
            style={{ textWrap: "balance" }}
          >
            Om Webbly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-warm-brown/75 leading-relaxed mb-4"
          >
            Webbly hjelper bedrifter med å få profesjonelle
            nettsider raskt, enkelt og til en fornuftig pris.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="font-body text-lg text-warm-brown/75 leading-relaxed"
          >
            Vi er et norsk selskap med lokale i Lørenskog, og vi brenner for å
            gjøre det enklere for bedrifter å komme seg på nett uten lange
            prosesser, unødvendig kompleksitet eller høye kostnader.
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-beige-200" />
      </div>

      {/* Hvorfor Webbly */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-4">
              Hvorfor Webbly?
            </h2>
            <p className="font-body text-warm-brown/70 max-w-2xl mx-auto leading-relaxed">
              Mange bedrifter trenger en god nettside, men opplever at det
              enten blir for dyrt, tar for lang tid eller blir for teknisk.
              Webbly er laget for å løse nettopp dette.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-beige-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md hover:border-beige-300 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-beige-100 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-warm-brown" />
                </div>
                <p className="font-body text-sm text-warm-brown/85 leading-relaxed pt-1">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70 max-w-2xl mx-auto text-center mt-10 leading-relaxed"
          >
            Målet vårt er at bedriften skal få en nettside som ser profesjonell
            ut, bygger troverdighet og gjør det lettere for kunder å ta kontakt.
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-beige-200" />
      </div>

      {/* Hvem står bak */}
      <section className="py-20 px-6 bg-beige-100/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
              Hvem står bak Webbly?
            </h2>
            <div className="bg-white border border-beige-200 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-deep-brown flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl font-semibold text-beige-50">
                    A
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-deep-brown">
                    Anis Halvadzic
                  </p>
                  <p className="font-body text-sm text-warm-brown/60">
                    CEO & Grunnlegger
                  </p>
                </div>
              </div>
              <p className="font-body text-warm-brown/75 leading-relaxed mb-4">
                Anis har over 10 års erfaring med forretningsutvikling,
                konseptutvikling og testing av nye ideer. Gjennom flere år har
                han jobbet med å forstå hva som gjør at produkter, tjenester og
                digitale løsninger faktisk skaper verdi for kunder.
              </p>
              <p className="font-body text-warm-brown/75 leading-relaxed">
                Denne erfaringen brukes i Webbly til å hjelpe bedrifter med mer
                enn bare design. En god nettside må forklare tydelig hva
                bedriften tilbyr, hvorfor kunden skal velge den, og gjøre det
                enkelt å ta kontakt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vår måte å jobbe på */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
              Vår måte å jobbe på
            </h2>
            <p className="font-body text-warm-brown/75 leading-relaxed mb-4">
              Vi tror på en praktisk og effektiv prosess. I stedet for lange
              møter og kompliserte prosjektløp starter vi med å forstå
              bedriften, tjenestene og målet med nettsiden.
            </p>
            <p className="font-body text-warm-brown/75 leading-relaxed mb-4">
              Deretter bygger vi en ryddig, moderne og mobilvennlig nettside som
              er tilpasset kundene bedriften ønsker å nå.
            </p>
            <p className="font-body text-warm-brown/75 leading-relaxed">
              Vi bruker moderne AI- og webteknologi for å jobbe raskere, men
              alltid med menneskelig vurdering i bunn. Resultatet er en løsning
              som både er effektivt laget og gjennomtenkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lokal forankring */}
      <section className="py-20 px-6 bg-beige-100/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-6">
              Et norsk selskap med lokal forankring
            </h2>
            <p className="font-body text-warm-brown/75 leading-relaxed mb-4">
              Webbly holder til i Lørenskog og jobber med norske bedrifter som
              ønsker en enklere vei til en profesjonell digital tilstedeværelse.
            </p>
            <p className="font-body text-warm-brown/75 leading-relaxed">
              Vi forstår det norske markedet, norske kunder og behovene
              bedrifter har i hverdagen. Derfor bygger vi nettsider som er
              enkle å forstå, lette å bruke og laget for å skape tillit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-deep-brown rounded-3xl px-8 py-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-beige-50 mb-4">
            Vil du ha en nettside som ser profesjonell ut og fungerer fra dag én?
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="mt-6 inline-block bg-beige-50 text-deep-brown font-body font-medium px-8 py-4 rounded-xl hover:bg-beige-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-sm"
          >
            Kontakt oss
          </motion.button>
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
