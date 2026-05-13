"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check } from "lucide-react";

const QUESTIONS = [
  {
    no: "Hva er ditt viktigste behov?",
    en: "What is your main priority?",
    options: [
      { no: "En profesjonell nettside til beste pris", en: "A professional website at the best price", plan: "Start" },
      { no: "Synlighet på Google og vekst i søk", en: "Google visibility and search growth", plan: "Vekst" },
      { no: "En komplett løsning med alt inkludert", en: "A complete solution with everything included", plan: "Pro" },
    ],
  },
  {
    no: "Hvor stor er bedriften din?",
    en: "How big is your business?",
    options: [
      { no: "Soloselskap eller nyoppstartet", en: "Solo or just starting out", plan: "Start" },
      { no: "Liten bedrift (2–10 ansatte)", en: "Small business (2–10 employees)", plan: "Vekst" },
      { no: "Etablert bedrift med klare behov", en: "Established business with clear needs", plan: "Pro" },
    ],
  },
  {
    no: "Hva er viktigst fremover?",
    en: "What matters most going forward?",
    options: [
      { no: "Komme i gang raskt og enkelt", en: "Getting started quickly and easily", plan: "Start" },
      { no: "Månedlig SEO og Google-annonsering", en: "Monthly SEO and Google advertising", plan: "Vekst" },
      { no: "Prioritert support og full service", en: "Priority support and full service", plan: "Pro" },
    ],
  },
];

const PLAN_DATA = {
  Start: {
    price: "499",
    no: {
      tagline: "For bedrifter som trenger en enkel og profesjonell nettside.",
      features: ["Opptil 3 sider", "Mobiltilpasset design", "SSL/HTTPS"],
    },
    en: {
      tagline: "For businesses that need a simple and professional website.",
      features: ["Up to 3 pages", "Mobile-optimized design", "SSL/HTTPS"],
    },
  },
  Vekst: {
    price: "799",
    no: {
      tagline: "For bedrifter som ønsker flere sider, bedre struktur og et mer komplett oppsett.",
      features: ["Opptil 5 sider", "Grunnleggende SEO", "Personvernerklæring inkludert"],
    },
    en: {
      tagline: "For businesses that want more pages, better structure and a more complete setup.",
      features: ["Up to 5 pages", "Basic SEO", "Privacy policy included"],
    },
  },
  Pro: {
    price: "999",
    no: {
      tagline: "For bedrifter som ønsker en større nettside, analyse og ekstra oppfølging.",
      features: ["Opptil 8 sider", "Backend analyseside", "Prioritert support"],
    },
    en: {
      tagline: "For businesses that want a larger website, analytics and extra follow-up.",
      features: ["Up to 8 pages", "Analytics dashboard", "Priority support"],
    },
  },
};

const LABELS = {
  no: {
    section: "Finn riktig pakke",
    heading: "Ikke sikker på hvilken pakke?",
    sub: "Svar på tre raske spørsmål, så anbefaler vi den rette pakken for deg.",
    stepOf: (n) => `Spørsmål ${n} av 3`,
    recommend: "Vi anbefaler",
    priceSuffix: "kr / mnd",
    note: "eks. mva, 12 mnd. avtale",
    cta: (name) => `Book ${name} nå`,
    reset: "Start på nytt",
  },
  en: {
    section: "Find your plan",
    heading: "Not sure which plan fits?",
    sub: "Answer three quick questions and we'll recommend the right plan for you.",
    stepOf: (n) => `Question ${n} of 3`,
    recommend: "We recommend",
    priceSuffix: "kr / mo",
    note: "excl. VAT, 12 month agreement",
    cta: (name) => `Book ${name} now`,
    reset: "Start over",
  },
};

function recommend(answers) {
  const counts = { Start: 0, Vekst: 0, Pro: 0 };
  answers.forEach((a) => counts[a]++);
  const max = Math.max(...Object.values(counts));
  if (counts.Vekst === max) return "Vekst";
  if (counts.Pro === max) return "Pro";
  return "Start";
}

export default function PackageQuiz({ lang, onSelectPlan }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const t = LABELS[lang];

  function handleOption(plan) {
    const next = [...answers, plan];
    setDirection(1);
    setAnswers(next);
    setStep(next.length === 3 ? 3 : next.length);
  }

  function reset() {
    setDirection(-1);
    setAnswers([]);
    setStep(0);
  }

  const recommendation = step === 3 ? recommend(answers) : null;
  const planData = recommendation ? PLAN_DATA[recommendation] : null;
  const localName = recommendation === "Vekst" && lang === "en" ? "Growth" : recommendation;

  return (
    <section ref={ref} className="py-20 bg-white border-t border-beige-100">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4">
            {t.section}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-brown mb-4">
            {t.heading}
          </h2>
          <p className="font-body text-warm-brown/70 text-sm leading-relaxed">
            {t.sub}
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {step < 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-beige-400 text-center mb-5">
                  {t.stepOf(step + 1)}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-deep-brown text-center mb-8">
                  {QUESTIONS[step][lang]}
                </h3>
                <div className="space-y-3">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleOption(opt.plan)}
                      className="w-full text-left px-6 py-4 rounded-xl border border-beige-200 bg-beige-50 font-body text-sm text-warm-brown hover:border-deep-brown hover:bg-white hover:text-deep-brown transition-all duration-150 cursor-pointer"
                    >
                      {opt[lang]}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="bg-[#f5f0ea] border border-[#e8e0d6] rounded-2xl p-8 text-center">
                  <p className="font-body text-xs font-semibold tracking-widest uppercase text-[#bfb09a] mb-3">
                    {t.recommend}
                  </p>
                  <h3 className="font-display text-4xl font-semibold text-deep-brown mb-2">
                    {localName}
                  </h3>
                  <div className="mb-1">
                    <span className="font-display text-3xl font-semibold text-deep-brown">
                      {planData.price}
                    </span>
                    <span className="font-body text-sm text-warm-brown/60 ml-1">
                      {t.priceSuffix}
                    </span>
                  </div>
                  <p className="font-body text-xs text-warm-brown/50 mb-5">{t.note}</p>
                  <p className="font-body text-sm text-warm-brown/70 leading-relaxed mb-6">
                    {planData[lang].tagline}
                  </p>
                  <ul className="space-y-2 mb-8 text-left max-w-xs mx-auto">
                    {planData[lang].features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 font-body text-sm text-warm-brown/80">
                        <Check className="w-4 h-4 text-deep-brown flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectPlan(localName)}
                    className="w-full py-4 rounded-xl bg-deep-brown text-beige-50 font-body text-sm font-medium hover:bg-warm-brown transition-colors duration-200 cursor-pointer mb-4"
                  >
                    {t.cta(localName)}
                  </motion.button>
                  <button
                    onClick={reset}
                    className="font-body text-xs text-warm-brown/50 hover:text-warm-brown underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {t.reset}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
