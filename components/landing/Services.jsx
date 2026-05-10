"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Wrench, Sparkles, LayoutTemplate, Clock } from "lucide-react";

const Card = ({ icon: Icon, title, desc, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group bg-white/60 border border-beige-200 rounded-2xl p-7 hover:bg-white/90 hover:border-beige-300 hover:shadow-md transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-beige-100 flex items-center justify-center mb-5 group-hover:bg-beige-200 transition-colors duration-300">
        <Icon className="w-5 h-5 text-warm-brown" />
      </div>
      <h3 className="font-display text-lg font-medium text-deep-brown mb-2">
        {title}
      </h3>
      <p className="font-body text-sm text-warm-brown/75 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default function Services({ lang }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const t = {
    no: {
      label: "Hva vi gjør",
      h2: "Din online suksess\nstarter her.",
      sub: "Vi bygger nettsiden du fortjener, skreddersydd for dine behov. Du kan fokusere på det du gjør best.",
      cards: [
        {
          icon: Clock,
          title: "3 dagers levering",
          desc: "Din profesjonelle nettside er klar på kun 3 virkedager. Raskt, enkelt og uten stress.",
        },
        {
          icon: Shield,
          title: "Sikkerhet og vedlikehold",
          desc: "Vi håndterer sikkerhet, oppdateringer og sørger for at nettsiden alltid er trygg og stabil.",
        },
        {
          icon: Wrench,
          title: "Enkel redigering",
          desc: "Trenger du en endring? Det er enkelt og raskt. Du sier fra, vi fikser det.",
        },
        {
          icon: LayoutTemplate,
          title: "Skreddersydd design",
          desc: "Ingen generiske maler. En unik design som fanger essensen av din bedrift og ditt varemerke.",
        },
        {
          icon: Zap,
          title: "Lynrask ytelse",
          desc: "Optimalisert for fart og brukervennlighet på alle enheter. Vi gir kundene dine den beste opplevelsen.",
        },
        {
          icon: Sparkles,
          title: "SEO inkludert",
          desc: "Vi legger grunnlaget for synlighet i søkemotorer, slik at potensielle kunder finner deg lettere.",
        },
      ],
    },
    en: {
      label: "What we do",
      h2: "Your online success\nstarts here.",
      sub: "We build the website you deserve, tailored to your needs. You can focus on what you do best.",
      cards: [
        {
          icon: Clock,
          title: "3-Day Delivery",
          desc: "Your professional website is ready in just 3 business days. Fast, simple and stress-free.",
        },
        {
          icon: Shield,
          title: "Security and Maintenance",
          desc: "We handle security, updates, and ensure your website is always safe and stable.",
        },
        {
          icon: Wrench,
          title: "Easy Editing",
          desc: "Need a change? It is simple and fast. You let us know, we get it done.",
        },
        {
          icon: LayoutTemplate,
          title: "Tailored Design",
          desc: "No generic templates. A unique design that captures the essence of your business and brand.",
        },
        {
          icon: Zap,
          title: "Lightning Performance",
          desc: "Optimized for speed and usability on all devices. We give your customers the best experience.",
        },
        {
          icon: Sparkles,
          title: "SEO Included",
          desc: "We lay the groundwork for search engine visibility, making it easier for potential customers to find you.",
        },
      ],
    },
  }[lang];

  return (
    <section id="services" className="py-28 bg-beige-50">
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
            style={{ textWrap: "balance" }}
          >
            {t.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70 max-w-xl mx-auto"
          >
            {t.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.cards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
