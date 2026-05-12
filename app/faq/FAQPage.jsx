"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";

const faqData = {
  no: [
    {
      id: "kom-i-gang",
      category: "Kom i gang",
      items: [
        {
          q: "Hva trenger dere fra meg for å starte?",
          a: "Logo (PNG eller SVG), bedriftsnavn, organisasjonsnummer, ønsket domenenavn, kontaktinformasjon som skal vises på siden, lenker til sosiale medier og en kort beskrivelse av bedriften og hva dere tilbyr. Vi hjelper deg med resten — tekst, bilder og design.",
        },
        {
          q: "Har jeg behov for et domene fra før?",
          a: "Nei. Vi registrerer et nytt domene for deg som del av oppstarten, eller vi overfører et eksisterende domene du allerede eier. Vi håndterer hele prosessen og passer på at alt er satt opp riktig.",
        },
        {
          q: "Hva skjer på intromøtet?",
          a: "Vi kartlegger bedriften din, dine ønsker og mål for nettsiden. Møtet tar 30–60 minutter og er helt uforpliktende. Etter møtet sender vi deg et konkret tilbud basert på dine behov.",
        },
        {
          q: "Hvor lang tid tar det å lansere nettsiden?",
          a: "Normalt 1–3 uker fra vi har mottatt alt nødvendig materiale fra deg. Har du logo, tekst og bilder klart, kan vi komme i gang umiddelbart.",
        },
      ],
    },
    {
      id: "pakker-priser",
      category: "Pakkene og priser",
      items: [
        {
          q: "Hva er forskjellen på pakkene?",
          a: "Start (499 kr/mnd) gir deg en enkel, profesjonell nettside med alt du trenger for å bli funnet på nett. Vekst (799 kr/mnd) inkluderer i tillegg Google-annonsering og månedlig SEO-arbeid for å øke trafikken. Pro (999 kr/mnd) er vår mest komplette pakke med nettbutikk, prioritert support og avansert analyse.",
        },
        {
          q: "Er det noen oppstartsavgift?",
          a: "Nei — ingen oppstartsavgift og ingen skjulte kostnader. Månedsprisen er det eneste du betaler.",
        },
        {
          q: "Kan jeg bytte pakke underveis?",
          a: "Ja. Du kan oppgradere eller nedgradere pakke med én måneds varsel. Vi tilpasser nettsiden din ved et eventuelt pakkeskifte.",
        },
        {
          q: "Hva er bindingstiden?",
          a: "12 måneder. Etter bindingstiden løper avtalen automatisk videre måned for måned med 1 måneds gjensidig oppsigelsestid.",
        },
      ],
    },
    {
      id: "domene-teknisk",
      category: "Domene og teknisk",
      items: [
        {
          q: "Er domene og hosting inkludert?",
          a: "Ja. Alle pakker inkluderer .no- eller .com-domene og sikker hosting med SSL-sertifikat (https). Du trenger ikke tenke på teknisk drift.",
        },
        {
          q: "Fungerer nettsiden på mobil og nettbrett?",
          a: "Ja, alle nettsider vi lager er fullt responsive. De ser bra ut og fungerer godt på alle skjermstørrelser — fra mobiltelefon til stor skjerm.",
        },
        {
          q: "Hvem eier domenet?",
          a: "Du eier domenet. Det registreres på bedriftens organisasjonsnummer og kan overføres til deg hvis du avslutter samarbeidet med oss.",
        },
        {
          q: "Bruker dere WordPress eller egne systemer?",
          a: "Vi bruker moderne teknologi tilpasset din pakke og dine behov. Alle løsninger er raske, sikre og optimalisert for søkemotorer — uten unødvendig kompleksitet.",
        },
      ],
    },
    {
      id: "design-innhold",
      category: "Design og innhold",
      items: [
        {
          q: "Må jeg skrive tekstene selv?",
          a: "Nei. Vi skriver tekst tilpasset bedriften din basert på informasjonen du gir oss. Du godkjenner alltid innholdet før nettsiden publiseres.",
        },
        {
          q: "Kan jeg bruke egne bilder?",
          a: "Absolutt. Har du gode bilder av bedriften, produkter eller ansatte, bruker vi dem gjerne. Ellers velger vi ut profesjonelle stockbilder som passer til din bransje og merkevare.",
        },
        {
          q: "Kan jeg påvirke designet?",
          a: "Ja. Vi starter alltid med en designrunde der du gir tilbakemelding på farger, fonter og layout. Vi jobber til du er fornøyd.",
        },
        {
          q: "Hva hvis jeg ikke er fornøyd med designet?",
          a: "Inntil 2 designrunder er inkludert i alle pakker. Vi gjør justeringer basert på din tilbakemelding og sørger for at resultatet er noe du er stolt av.",
        },
      ],
    },
    {
      id: "etter-lansering",
      category: "Etter lansering",
      items: [
        {
          q: "Hva inkluderer månedlig support?",
          a: "Tekstendringer, bildeoppdateringer, teknisk vedlikehold og sikkerhetsoppdateringer. Alt håndteres av oss — du trenger ikke gjøre noe selv.",
        },
        {
          q: "Kan jeg oppdatere nettsiden selv?",
          a: "På Pro-pakken gir vi deg tilgang til et enkelt administrasjonsgrensesnitt. På Start og Vekst håndterer vi alle endringer for deg — send oss en e-post eller melding, så ordner vi det.",
        },
        {
          q: "Hva skjer med nettsiden hvis jeg sier opp?",
          a: "Du eier domenet og kan ta med deg innholdet. Vi eksporterer all tekst og alle bilder til deg ved avslutning av avtalen.",
        },
        {
          q: "Tilbyr dere e-post (f.eks. kontakt@minbedrift.no)?",
          a: "Vi kan sette opp profesjonell e-post via Google Workspace eller Microsoft 365 som en tilleggstjeneste. Ta det opp på intromøtet, så finner vi den beste løsningen for deg.",
        },
      ],
    },
    {
      id: "fakturering",
      category: "Fakturering",
      items: [
        {
          q: "Når faktureres jeg?",
          a: "Månedlig, forskuddsvis. Første faktura sendes ved oppstart av samarbeidet.",
        },
        {
          q: "Hvilke betalingsmetoder aksepteres?",
          a: "Vi sender faktura (EHF/PDF). Kortbetaling og Vipps Bedrift er tilgjengelig på forespørsel.",
        },
        {
          q: "Er prisene inkludert MVA?",
          a: "Nei. Alle priser er eksklusiv MVA. MVA på 25 % legges til for norske bedriftskunder.",
        },
        {
          q: "Kan jeg få faktura på bedriften?",
          a: "Ja — det er standard. Vi fakturerer alltid på bedriftens organisasjonsnummer.",
        },
      ],
    },
  ],
  en: [
    {
      id: "getting-started",
      category: "Getting Started",
      items: [
        {
          q: "What do you need from me to get started?",
          a: "Your logo (PNG or SVG), business name, organization number, preferred domain name, contact information to display on the site, social media links, and a brief description of your business. We'll handle the rest — copy, images, and design.",
        },
        {
          q: "Do I need to have a domain already?",
          a: "No. We can register a new domain for you as part of the onboarding, or transfer an existing domain you already own. We handle the entire process.",
        },
        {
          q: "What happens at the intro meeting?",
          a: "We learn about your business, your goals and wishes for the website. The meeting takes 30–60 minutes and is completely non-binding. Afterwards, we'll send you a concrete proposal.",
        },
        {
          q: "How long does it take to launch?",
          a: "Typically 1–3 weeks from when we receive all necessary materials from you. If you have your logo, copy and images ready, we can start immediately.",
        },
      ],
    },
    {
      id: "packages-pricing",
      category: "Packages & Pricing",
      items: [
        {
          q: "What's the difference between the packages?",
          a: "Start (499 NOK/mo) gives you a simple, professional website with everything you need to be found online. Growth (799 NOK/mo) also includes Google Ads and monthly SEO work. Pro (999 NOK/mo) is our most complete package with an online store, priority support and advanced analytics.",
        },
        {
          q: "Is there a setup fee?",
          a: "No — no setup fee and no hidden costs. The monthly price is all you pay.",
        },
        {
          q: "Can I switch packages?",
          a: "Yes. You can upgrade or downgrade with one month's notice. We'll adapt your website accordingly.",
        },
        {
          q: "What is the contract period?",
          a: "12 months. After the initial term, the agreement continues month to month with 1 month's mutual notice.",
        },
      ],
    },
    {
      id: "domain-technical",
      category: "Domain & Technical",
      items: [
        {
          q: "Are domain and hosting included?",
          a: "Yes. All packages include a .no or .com domain and secure hosting with an SSL certificate (https). You don't need to think about technical operations.",
        },
        {
          q: "Does the website work on mobile and tablet?",
          a: "Yes, all websites we create are fully responsive. They look great and work well on all screen sizes — from mobile phone to large desktop.",
        },
        {
          q: "Who owns the domain?",
          a: "You own the domain. It's registered to your company's organization number and can be transferred to you if you end the agreement with us.",
        },
        {
          q: "Do you use WordPress or custom systems?",
          a: "We use modern technology suited to your package and needs. All solutions are fast, secure and optimized for search engines.",
        },
      ],
    },
    {
      id: "design-content",
      category: "Design & Content",
      items: [
        {
          q: "Do I need to write the copy myself?",
          a: "No. We write copy tailored to your business based on the information you provide. You always approve all content before the website goes live.",
        },
        {
          q: "Can I use my own photos?",
          a: "Absolutely. If you have good photos of your business, products or team, we'll use them. Otherwise we'll select professional stock images that match your industry and brand.",
        },
        {
          q: "Can I influence the design?",
          a: "Yes. We always start with a design round where you give feedback on colors, fonts and layout. We work until you're happy.",
        },
        {
          q: "What if I'm not happy with the design?",
          a: "Up to 2 design rounds are included in all packages. We make adjustments based on your feedback until you're proud of the result.",
        },
      ],
    },
    {
      id: "after-launch",
      category: "After Launch",
      items: [
        {
          q: "What does monthly support include?",
          a: "Text changes, image updates, technical maintenance and security updates. We handle everything — you don't need to do anything yourself.",
        },
        {
          q: "Can I update the website myself?",
          a: "On the Pro package, we give you access to a simple admin interface. On Start and Growth, we handle all changes for you — just send us an email or message.",
        },
        {
          q: "What happens to my website if I cancel?",
          a: "You own the domain and can take your content with you. We export all text and images to you upon termination of the agreement.",
        },
        {
          q: "Do you offer email (e.g. hello@mybusiness.com)?",
          a: "We can set up professional email via Google Workspace or Microsoft 365 as an add-on service. Bring it up at the intro meeting and we'll find the best solution for you.",
        },
      ],
    },
    {
      id: "billing",
      category: "Billing",
      items: [
        {
          q: "When am I billed?",
          a: "Monthly, in advance. The first invoice is sent at the start of the agreement.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We send invoices (EHF/PDF). Card payment and Vipps Business are available on request.",
        },
        {
          q: "Are prices including VAT?",
          a: "No. All prices are exclusive of VAT. 25% VAT is added for Norwegian business customers.",
        },
        {
          q: "Can I get an invoice to my company?",
          a: "Yes — that's standard. We always invoice to the company's organization number.",
        },
      ],
    },
  ],
};

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-beige-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
      >
        <span className="font-body text-sm font-medium text-deep-brown group-hover:text-warm-brown transition-colors">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-beige-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-warm-brown/75 leading-relaxed pb-5">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [openItems, setOpenItems] = useState({});

  const data = faqData[lang];

  const toggle = (categoryId, index) => {
    const key = `${categoryId}-${index}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const t = {
    no: {
      label: "FAQ",
      h1: "Svar på det du lurer på.",
      sub: "Her finner du svar på de vanligste spørsmålene om Webbly. Finner du ikke svaret du ser etter, er du alltid velkommen til å ta kontakt.",
      cta: "Book et gratis intromøte",
      ctaSub: "Still spørsmål direkte — vi svarer innen én virkedag.",
    },
    en: {
      label: "FAQ",
      h1: "Answers to your questions.",
      sub: "Find answers to the most common questions about Webbly. If you can't find what you're looking for, feel free to reach out.",
      cta: "Book a free intro meeting",
      ctaSub: "Ask us directly — we respond within one business day.",
    },
  }[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-beige-50">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4"
          >
            {t.label}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl md:text-6xl font-semibold text-deep-brown mb-6"
          >
            {t.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-warm-brown/75 leading-relaxed"
          >
            {t.sub}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-beige-200" />
      </div>

      {/* FAQ sections */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-14">
          {data.map((section, si) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: si * 0.06, ease: "easeOut" }}
            >
              <h2 className="font-display text-2xl font-semibold text-deep-brown mb-1">
                {section.category}
              </h2>
              <div className="h-px bg-beige-200 mb-2" />
              <div>
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    isOpen={!!openItems[`${section.id}-${i}`]}
                    onToggle={() => toggle(section.id, i)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center bg-deep-brown rounded-3xl px-8 py-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-beige-50 mb-3">
            {t.cta}
          </h2>
          <p className="font-body text-sm text-beige-300 mb-8">{t.ctaSub}</p>
          <a
            href="/#pricing"
            className="inline-block bg-beige-50 text-deep-brown font-body text-sm font-medium px-8 py-4 rounded-xl hover:bg-beige-100 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            {t.cta}
          </a>
        </motion.div>
      </section>

      <Footer lang={lang} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      <CookieBanner
        lang={lang}
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </div>
  );
}
