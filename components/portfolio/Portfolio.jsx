"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import PortfolioModal from "./PortfolioModal";

const EASE = [0.32, 0.72, 0, 1];

const CASES = [
  {
    slug: "rorstad",
    brand: "Rørstad VVS",
    industry: "Rørlegger · Lead-gen",
    headline: "For håndverkere som vil bli ringt.",
    blurb:
      "Lokal håndverkerside bygget for tillit fra første klikk. Klare priser, raskt tilbudsskjema og en transparent prosessguide.",
    accent: "#1267d6",
    url: "/work/rorstad/",
    includes: ["Tilbudsskjema", "Faste priser", "Google Maps", "Døgnvakt-CTA"],
  },
  {
    slug: "voern",
    brand: "Atelier Vœrn",
    industry: "Mote · E-handel",
    headline: "For luksusvaremerker som selger på følelse.",
    blurb:
      "Direct-to-consumer luksusmote. Drivende blob-gradienter bak frostede produktkort, egen markør og gull-accenter som hever hver detalj.",
    accent: "#c9a961",
    url: "/work/voern/",
    includes: ["Produktkort", "Glassmorfisme", "Egen markør", "Lookbook"],
  },
  {
    slug: "bjork",
    brand: "Bjørk & Brød",
    industry: "Restaurant · Bordbestilling",
    headline: "For restauranter som lever av nabolaget.",
    blurb:
      "Nabolagsbakeri med organiske former, varm terrakotta-palett og en reservasjonsflyt som faktisk konverterer småprat til besøk.",
    accent: "#c4623e",
    url: "/work/bjork/",
    includes: ["Reservasjon", "Meny", "Åpningstider", "Kart"],
  },
];

function Case({ data, index, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start py-12 md:py-16 border-t border-deep-brown/10"
    >
      <div className="md:col-span-3">
        <div className="text-[10px] tracking-[0.3em] uppercase text-warm-brown/55 mb-3 font-semibold">
          Case · {String(index + 1).padStart(2, "0")} / 03
        </div>
        <div
          className="font-display text-7xl md:text-8xl leading-[0.9] tracking-tight"
          style={{ color: data.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="md:col-span-6">
        <span
          className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full mb-5 border"
          style={{
            color: data.accent,
            borderColor: `${data.accent}33`,
            background: `${data.accent}0a`,
          }}
        >
          {data.industry}
        </span>
        <h3
          className="font-display text-3xl md:text-5xl text-deep-brown leading-[1.04] tracking-tight mb-4"
          style={{ textWrap: "balance" }}
        >
          {data.headline}
        </h3>
        <p className="text-base md:text-lg text-warm-brown/70 leading-relaxed mb-6 max-w-[52ch]">
          {data.blurb}
        </p>
        <ul className="flex flex-wrap gap-2">
          {data.includes.map((t) => (
            <li
              key={t}
              className="text-xs text-warm-brown/70 px-3 py-1.5 rounded-full bg-deep-brown/[0.04] border border-deep-brown/[0.06]"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-3 flex md:justify-end md:items-end">
        <button
          type="button"
          onClick={() => onOpen(data)}
          className="group inline-flex items-center gap-2.5 bg-deep-brown text-beige-50 pl-5 pr-2 py-2 rounded-full text-sm font-medium hover:bg-warm-brown active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        >
          Se live
          <span className="w-8 h-8 rounded-full bg-beige-50/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.2} />
          </span>
        </button>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [modalCase, setModalCase] = useState(null);

  return (
    <section
      id="arbeid"
      className="relative bg-beige-50 py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-beige-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-beige-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-semibold text-warm-brown/60 mb-5 px-3 py-1 rounded-full border border-deep-brown/10 bg-white/40">
            Eksempler · Inspirasjon
          </span>
          <h2
            className="font-display text-5xl md:text-7xl text-deep-brown leading-[1.02] tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Se hva vi kan{" "}
            <em className="italic text-warm-brown">bygge</em> for deg.
          </h2>
          <p className="text-lg md:text-xl text-warm-brown/70 leading-relaxed max-w-[58ch]">
            Tre ekte eksempler bygget for ulike bransjer. Trykk{" "}
            <em className="italic">Se live</em> for å åpne den faktiske
            prototypen i nettleseren.
          </p>
        </motion.div>

        <div className="border-b border-deep-brown/10">
          {CASES.map((c, i) => (
            <Case key={c.slug} data={c} index={i} onOpen={setModalCase} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <p className="font-display text-3xl md:text-4xl text-deep-brown leading-tight max-w-md">
            Klar for ditt eget prosjekt?
          </p>
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2.5 bg-deep-brown text-beige-50 pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-warm-brown transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            Få et forslag
            <span className="w-8 h-8 rounded-full bg-beige-50/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
            </span>
          </a>
        </motion.div>
      </div>

      <PortfolioModal data={modalCase} onClose={() => setModalCase(null)} />
    </section>
  );
}
