"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: "electrician",
    label: "Nettside for elektrikere",
    description:
      "Tydelig priser, døgnvakt på første side og rask kontakt — bygget for å vinne oppdrag i Oslo.",
    src: "/showcase/electrician.png",
  },
  {
    id: "plumber",
    label: "Nettside for rørleggere",
    description:
      "Akutt-hjelp-CTA, tjenesteoversikt og anmeldelser som bygger tillit før telefonen ringer.",
    src: "/showcase/plumber.png",
  },
  {
    id: "salon",
    label: "Nettside for frisører",
    description:
      "Elegant presentasjon med online booking, prisliste og portfolio-galleri av frisyrer.",
    src: "/showcase/salon.png",
  },
  {
    id: "doctor",
    label: "Nettside for legekontor",
    description:
      "Profesjonell og betryggende — med online timebestilling og oversikt over leger og tjenester.",
    src: "/showcase/doctor.png",
  },
  {
    id: "petshop",
    label: "Nettbutikk for dyreutstyr",
    description:
      "Komplett nettbutikk med produktkatalog, handlekurv og betaling — optimalisert for konvertering.",
    src: "/showcase/petshop.png",
  },
];

export default function DeviceShowcase() {
  const [[index, direction], setState] = useState([0, 0]);
  const slide = SLIDES[index];

  const go = useCallback((delta) => {
    setState(([prev]) => [
      (prev + delta + SLIDES.length) % SLIDES.length,
      delta,
    ]);
  }, []);

  const jumpTo = useCallback((target) => {
    setState(([prev]) => [target, target > prev ? 1 : -1]);
  }, []);

  return (
    <section className="relative bg-beige-50 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-beige-200/40 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-beige-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <div className="text-[10px] md:text-xs font-body tracking-[0.3em] uppercase text-warm-brown/70 mb-3">
            Eksempler
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-deep-brown mb-4 leading-[1.05]">
            Nettsider for din bransje
          </h2>
          <p className="font-body text-base md:text-lg text-warm-brown/70 max-w-2xl mx-auto">
            Se hvordan vi tilpasser design og funksjonalitet til ulike industrier
            — alltid med samme premium kvalitet.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => go(-1)}
            aria-label="Forrige eksempel"
            className="hidden md:flex absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg shadow-deep-brown/10 text-deep-brown hover:scale-105 hover:shadow-deep-brown/20 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Neste eksempel"
            className="hidden md:flex absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg shadow-deep-brown/10 text-deep-brown hover:scale-105 hover:shadow-deep-brown/20 active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative aspect-[2/1] md:aspect-[16/9] max-w-5xl mx-auto md:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -300) go(1);
                  else if (info.offset.x > 60 || info.velocity.x > 300) go(-1);
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                  className="object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-14 mb-6 min-h-[88px] md:min-h-[80px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-label"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-deep-brown mb-2">
                {slide.label}
              </h3>
              <p className="font-body text-sm md:text-base text-warm-brown/70 max-w-xl mx-auto px-4">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpTo(i)}
              aria-label={`Gå til ${s.label}`}
              className="group p-2 -m-2"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-deep-brown"
                    : "w-2 bg-deep-brown/25 group-hover:bg-deep-brown/50"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-deep-brown text-beige-50 px-8 py-4 rounded-xl font-body font-medium hover:bg-warm-brown hover:-translate-y-0.5 hover:shadow-xl hover:shadow-deep-brown/20 transition-all duration-200"
          >
            Få et forslag til din bedrift
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
