"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, AlertCircle, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const plans = {
  no: [
    {
      name: "Start",
      price: "499",
      tagline: "For bedrifter som trenger en enkel og profesjonell nettside.",
      features: [
        "Opptil 3 sider",
        "Cookie-banner inkludert",
        "Mobiltilpasset design",
        "Kontaktskjema",
        "Publisering på kundens domene",
        "SSL/HTTPS",
      ],
    },
    {
      name: "Vekst",
      price: "799",
      tagline:
        "For bedrifter som ønsker flere sider, bedre struktur og et mer komplett oppsett.",
      popular: true,
      features: [
        "Opptil 5 sider",
        "Cookie-banner inkludert",
        "Grunnleggende SEO",
        "Personvernerklæring inkludert",
        "Mobiltilpasset design",
        "Kontaktskjema",
        "Publisering på kundens domene",
        "SSL/HTTPS",
      ],
    },
    {
      name: "Pro",
      price: "999",
      tagline:
        "For bedrifter som ønsker en større nettside, analyse og ekstra oppfølging.",
      features: [
        "Opptil 8 sider",
        "Cookie-banner inkludert",
        "Grunnleggende SEO",
        "Personvernerklæring inkludert",
        "Backend analyseside / dashboard",
        "Enkel logo inkludert",
        "Mobiltilpasset design",
        "Kontaktskjema",
        "Publisering på kundens domene",
        "SSL/HTTPS",
        "Google-indeksering inkludert",
        "SEO-overvåkning",
        "SEO og ytelsesoptimalisering",
        "Prioritert support",
        "Månedlig vedlikehold inkludert",
        "Teknisk drift og sikkerhet inkludert",
        "Backup og overvåkning inkludert",
      ],
    },
  ],
  en: [
    {
      name: "Start",
      price: "499",
      tagline: "For businesses that need a simple and professional website.",
      features: [
        "Up to 3 pages",
        "Cookie banner included",
        "Mobile-optimized design",
        "Contact form",
        "Published on customer's domain",
        "SSL/HTTPS",
      ],
    },
    {
      name: "Growth",
      price: "799",
      tagline:
        "For businesses that want more pages, better structure and a more complete setup.",
      popular: true,
      features: [
        "Up to 5 pages",
        "Cookie banner included",
        "Basic SEO",
        "Privacy policy included",
        "Mobile-optimized design",
        "Contact form",
        "Published on customer's domain",
        "SSL/HTTPS",
      ],
    },
    {
      name: "Pro",
      price: "999",
      tagline:
        "For businesses that want a larger website, analytics and extra follow-up.",
      features: [
        "Up to 8 pages",
        "Cookie banner included",
        "Basic SEO",
        "Privacy policy included",
        "Backend analytics / dashboard",
        "Simple logo included",
        "Mobile-optimized design",
        "Contact form",
        "Published on customer's domain",
        "SSL/HTTPS",
        "Google indexing included",
        "SEO monitoring",
        "SEO and performance optimization",
        "Priority support",
        "Monthly maintenance included",
        "Technical operations and security included",
        "Backup and monitoring included",
      ],
    },
  ],
};

const labels = {
  no: {
    label: "Abonnementer",
    h2: "Transparent pris.\nIngen skjulte kostnader.",
    sub: "Velg pakken som passer din bedrift. Alle priser er eks. mva.",
    monthly: "/ mnd",
    note: "eks. mva, 12 mnd. avtale",
    cta: "Velg pakke",
    popular: "Mest populær",
    expandHint: "Hold musen over for å se hva som er inkludert",
    disclaimer:
      "Alle priser er eks. mva. 12 måneders avtaleperiode. Ekstra arbeid faktureres etter avtale.",
    notIncludedTitle: "Hva er ikke inkludert?",
    notIncludedText:
      "Større designendringer, ekstra undersider, nettbutikk, bookingløsninger, annonsering, profesjonell fotografering, avansert SEO og e-postoppsett er ikke inkludert i standardpakkene. Dette kan leveres som tillegg.",
  },
  en: {
    label: "Pricing",
    h2: "Transparent pricing.\nNo hidden costs.",
    sub: "Choose the plan that fits your business. All prices excl. VAT.",
    monthly: "/ mo",
    note: "excl. VAT, 12 month agreement",
    cta: "Choose Plan",
    popular: "Most popular",
    expandHint: "Hover to see what's included",
    disclaimer:
      "All prices excl. VAT. 12-month agreement. Additional work billed separately.",
    notIncludedTitle: "What's not included?",
    notIncludedText:
      "Major design changes, extra sub-pages, online store, booking solutions, advertising, professional photography, advanced SEO and email setup are not included in standard plans. These can be delivered as add-ons.",
  },
};

function PriceCard({ plan, t, onSelectPlan, alwaysExpanded, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = alwaysExpanded || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-expanded={isExpanded}
      className={`relative rounded-3xl p-8 flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-brown/40 transition-shadow duration-300 ${
        plan.popular
          ? "bg-deep-brown text-beige-50 shadow-2xl shadow-deep-brown/25 scale-[1.02] hover:shadow-deep-brown/40"
          : "bg-white border border-beige-200 shadow-sm hover:shadow-xl hover:shadow-deep-brown/10"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-beige-200 text-warm-brown text-xs font-body font-semibold px-4 py-1.5 rounded-full shadow-sm">
            {t.popular}
          </span>
        </div>
      )}

      <div className="mb-6 pt-2">
        <h3
          className={`font-display text-2xl font-semibold mb-2 ${
            plan.popular ? "text-beige-50" : "text-deep-brown"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`font-body text-sm leading-relaxed ${
            plan.popular ? "text-beige-300" : "text-warm-brown/65"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="mb-2">
        <div className="flex items-end gap-1">
          <span
            className={`font-display text-5xl font-semibold tracking-tight ${
              plan.popular ? "text-beige-50" : "text-deep-brown"
            }`}
          >
            {plan.price}kr
          </span>
          <span
            className={`font-body text-sm mb-2 ${
              plan.popular ? "text-beige-300" : "text-warm-brown/60"
            }`}
          >
            {t.monthly}
          </span>
        </div>
        <p
          className={`font-body text-xs mt-1 ${
            plan.popular ? "text-beige-400" : "text-warm-brown/50"
          }`}
        >
          {t.note}
        </p>
      </div>

      {!alwaysExpanded && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className={`flex items-center gap-1.5 mt-4 font-body text-xs ${
              plan.popular ? "text-beige-400" : "text-warm-brown/45"
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>{t.expandHint}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          opacity: {
            duration: 0.3,
            ease: "easeOut",
            delay: isExpanded ? 0.1 : 0,
          },
        }}
        className="overflow-hidden"
      >
        <div
          className={`w-full h-px mt-6 mb-6 ${
            plan.popular ? "bg-beige-600/30" : "bg-beige-200"
          }`}
        />

        <ul className="space-y-3 mb-8">
          {plan.features.map((f, j) => (
            <li key={j} className="flex items-start gap-3">
              <Check
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  plan.popular ? "text-beige-300" : "text-warm-brown/60"
                }`}
              />
              <span
                className={`font-body text-sm ${
                  plan.popular ? "text-beige-100" : "text-warm-brown/80"
                }`}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPlan(plan.name);
          }}
          className={`w-full py-3.5 rounded-xl font-body text-sm font-medium transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
            plan.popular
              ? "bg-beige-50 text-deep-brown hover:bg-beige-100 hover:shadow-beige-200/60"
              : "bg-deep-brown text-beige-50 hover:bg-warm-brown hover:shadow-deep-brown/25"
          }`}
        >
          {t.cta}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing({ lang, onSelectPlan }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const t = labels[lang];
  const currentPlans = plans[lang];

  return (
    <section id="pricing" className="py-28 bg-beige-50">
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
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-semibold text-deep-brown whitespace-pre-line mb-4"
            style={{ textWrap: "balance" }}
          >
            {t.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70"
          >
            {t.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {currentPlans.map((plan, i) => (
            <PriceCard
              key={i}
              plan={plan}
              t={t}
              onSelectPlan={onSelectPlan}
              alwaysExpanded={isMobile}
              index={i}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-xs text-warm-brown/50 text-center mt-8"
        >
          {t.disclaimer}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <a
            href="/terms"
            className="font-body text-xs text-warm-brown/50 hover:text-warm-brown underline underline-offset-2 transition-colors cursor-pointer"
          >
            {lang === "no"
              ? "Les fullstendige vilkår og betingelser →"
              : "Read full terms and conditions →"}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-beige-100/80 border border-beige-200 rounded-2xl px-7 py-6 max-w-3xl mx-auto flex gap-4 items-start"
        >
          <AlertCircle className="w-5 h-5 text-beige-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body text-sm font-semibold text-warm-brown mb-1">
              {t.notIncludedTitle}
            </p>
            <p className="font-body text-sm text-warm-brown/70 leading-relaxed">
              {t.notIncludedText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
