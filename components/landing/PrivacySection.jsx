"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Shield } from "lucide-react";

function AccordionItem({ title, content, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="border border-beige-200 rounded-2xl overflow-hidden bg-white/60"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-beige-50 transition-colors"
      >
        <span className="font-display text-base font-medium text-deep-brown">
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-warm-brown/60" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="px-6 pb-6 font-body text-sm text-warm-brown/80 leading-relaxed border-t border-beige-100">
              <div className="pt-4">{content}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivacySection({ lang }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const t = {
    no: {
      label: "Personvern & Cookies",
      h2: "Vi tar ditt personvern\npå alvor.",
      sub: "Her finner du all informasjon om hvordan vi samler inn, bruker og beskytter dine personopplysninger.",
      updated: "Sist oppdatert: Mai 2026",
      s1title: "1. Hvem er vi?",
      s1content:
        "Webbly er et norsk selskap som tilbyr profesjonelle nettsideløsninger for bedrifter. Vi er behandlingsansvarlig for de personopplysningene vi samler inn via dette nettstedet. Kontaktinformasjon: kontakt@webbly.no",
      s2title: "2. Hvilke opplysninger samler vi inn?",
      s2content:
        "Vi kan samle inn følgende opplysninger: Navn og e-postadresse når du fyller ut kontaktskjema eller booker møte. Bedriftsnavn og kontaktinformasjon. Tekniske data som IP-adresse, nettlesertype og hvilke sider du besøker (via informasjonskapsler). Vi samler aldri inn sensitive personopplysninger uten ditt eksplisitte samtykke.",
      s3title: "3. Informasjonskapsler (cookies)",
      s3content:
        "Vi bruker informasjonskapsler for å: Huske dine preferanser på nettstedet. Analysere trafikk og forbedre brukeropplevelsen (analysecookies). Tekniske cookies som er nødvendige for at nettstedet skal fungere. Du kan til enhver tid trekke tilbake samtykket ditt ved å klikke på «Avslå» i cookie-banneret, eller ved å slette informasjonskapslene i nettleseren din. Merk: Visse funksjoner kan slutte å fungere om du deaktiverer alle cookies.",
      s4title: "4. Dine rettigheter",
      s4content:
        "I henhold til GDPR har du rett til å: Få innsyn i hvilke personopplysninger vi har om deg. Kreve retting av feilaktige opplysninger. Kreve sletting av dine opplysninger («retten til å bli glemt»). Klage til Datatilsynet dersom du mener vi behandler opplysningene dine i strid med regelverket. Ta kontakt med oss på kontakt@webbly.no for å benytte deg av dine rettigheter.",
      s5title: "5. Oppbevaring og sikkerhet",
      s5content:
        "Vi oppbevarer personopplysningene dine kun så lenge det er nødvendig for det formålet de ble innhentet. Kontaktforespørsler slettes etter 12 måneder. Vi benytter sikker kryptering (SSL/TLS) og beskytter data i henhold til gjeldende sikkerhetsstandarder. Vi deler aldri dine opplysninger med tredjeparter uten ditt samtykke, med unntak av nødvendige tekniske samarbeidspartnere som er pålagt taushetsplikt.",
    },
    en: {
      label: "Privacy & Cookies",
      h2: "We take your privacy\nseriously.",
      sub: "Here you'll find all the information about how we collect, use, and protect your personal data.",
      updated: "Last updated: May 2026",
      s1title: "1. Who are we?",
      s1content:
        "Webbly is a Norwegian company offering professional website solutions for small businesses. We are the data controller for personal information collected via this website. Contact: kontakt@webbly.no",
      s2title: "2. What data do we collect?",
      s2content:
        "We may collect: Name and email when you submit a contact form or book a meeting. Company name and contact information. Technical data such as IP address, browser type, and pages visited (via cookies). We never collect sensitive personal data without your explicit consent.",
      s3title: "3. Cookies",
      s3content:
        "We use cookies to: Remember your preferences on the site. Analyse traffic and improve user experience (analytics cookies). Essential technical cookies required for the site to work. You can withdraw consent at any time by clicking 'Decline' in the cookie banner, or by clearing cookies in your browser. Note: Certain features may stop working if all cookies are disabled.",
      s4title: "4. Your rights",
      s4content:
        "Under GDPR you have the right to: Access the personal data we hold about you. Request correction of inaccurate data. Request deletion of your data ('right to be forgotten'). Lodge a complaint with the Norwegian Data Protection Authority if you believe we are processing your data unlawfully. Contact us at kontakt@webbly.no to exercise your rights.",
      s5title: "5. Storage and security",
      s5content:
        "We retain your personal data only as long as necessary for the purpose it was collected. Contact requests are deleted after 12 months. We use secure encryption (SSL/TLS) and protect data according to current security standards. We never share your data with third parties without consent, except for necessary technical partners who are bound by confidentiality.",
    },
  }[lang];

  const items = [
    { title: t.s1title, content: t.s1content },
    { title: t.s2title, content: t.s2content },
    { title: t.s3title, content: t.s3content },
    { title: t.s4title, content: t.s4content },
    { title: t.s5title, content: t.s5content },
  ];

  return (
    <section id="privacy-section" className="py-28 bg-beige-100/60">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="inline-flex w-12 h-12 rounded-full bg-deep-brown items-center justify-center mb-5"
          >
            <Shield className="w-5 h-5 text-beige-50" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4"
          >
            {t.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-semibold text-deep-brown whitespace-pre-line mb-4"
          >
            {t.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70 mb-2"
          >
            {t.sub}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-body text-xs text-beige-400"
          >
            {t.updated}
          </motion.p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
