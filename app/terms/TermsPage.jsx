"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ChevronDown, ArrowLeft } from "lucide-react";

const sections = {
  no: [
    {
      title: "1. Avtaleparter og avtalens gjenstand",
      content: `Disse vilkårene og betingelsene («Avtalen») inngås mellom Webbly («Leverandøren») og den juridiske eller fysiske person («Kunden») som bestiller tjenester via Leverandørens nettsted eller på annen måte inngår en skriftlig eller muntlig avtale med Leverandøren.

Avtalen regulerer levering av abonnementsbaserte nettsideløsninger, herunder design, utvikling, publisering, drift, vedlikehold og tilhørende tjenester. Avtalen anses som bindende inngått idet Kunden bekrefter bestilling, foretar betaling eller på annen måte aksepterer tilbudet skriftlig.`,
    },
    {
      title: "2. Abonnementspakker og tjenestebeskrivelse",
      content: `Leverandøren tilbyr følgende abonnementspakker:

**Start – 499 kr/mnd ekskl. mva.**
Inkluderer opptil 3 sider, cookie-banner, mobiltilpasset design, kontaktskjema, publisering på Kundens domene og SSL/HTTPS-sertifikat. Pakken inkluderer ikke redaktørtimer. Eventuelle justeringer faktureres etter gjeldende timepris, jf. punkt 7.

**Vekst – 799 kr/mnd ekskl. mva.**
Inkluderer opptil 5 sider, cookie-banner, grunnleggende SEO, personvernerklæring, mobiltilpasset design, kontaktskjema, publisering på Kundens domene og SSL/HTTPS-sertifikat. Pakken inkluderer ikke redaktørtimer. Eventuelle justeringer faktureres etter gjeldende timepris, jf. punkt 7.

**Pro – 999 kr/mnd ekskl. mva.**
Inkluderer opptil 8 sider, cookie-banner, grunnleggende SEO, personvernerklæring, backend analyseside/dashboard, enkel logo, mobiltilpasset design, kontaktskjema, publisering på Kundens domene og SSL/HTTPS-sertifikat. Pakken inkluderer 2 (to) redaktørtimer per kalendermåned til bruk for justeringer og vedlikehold av nettstedet.

Ubrukte redaktørtimer i Pro-pakken akkumuleres ikke og kan ikke overføres til påfølgende måneder. Levering av den ferdige nettsiden er estimert til 3 (tre) virkedager fra mottatt godkjenning av innhold og designretning fra Kunden, med forbehold om at Kunden leverer nødvendig materiale innen avtalt frist.`,
    },
    {
      title: "3. Avtalens varighet og bindingstid",
      content: `Avtalen inngås for en fast periode på 12 (tolv) kalendermåneder fra avtaledato («Bindingsperioden»). Avtalen løper videre som en løpende avtale med 3 (tre) måneders gjensidig oppsigelsestid etter utløpet av Bindingsperioden, med mindre en av partene skriftlig varsler om oppsigelse senest 30 (tretti) dager før Bindingsperiodens utløp.

Oppsigelse i Bindingsperioden gir ikke rett til refusjon av allerede fakturerte beløp. Ved oppsigelse i bindingstiden er Kunden forpliktet til å betale resterende månedlige abonnementsavgifter for den gjenværende delen av Bindingsperioden, med mindre annet er skriftlig avtalt.`,
    },
    {
      title: "4. Betaling og betalingsbetingelser",
      content: `Det månedlige abonnementsbeløpet faktureres forskuddsvis den 1. i hver kalendermåned. Betalingsfrist er 14 (fjorten) dager fra fakturadato. Ved forsinket betaling påløper forsinkelsesrente i henhold til Lov om renter ved forsinket betaling (forsinkelsesrenteloven) av 17. desember 1976 nr. 100, med den til enhver tid gjeldende forsinkelsesrentesats.

Ved forsinket betaling utover 30 (tretti) dager forbeholder Leverandøren seg retten til å suspendere eller deaktivere Kundens nettsted inntil utestående beløp er fullt ut betalt. Leverandøren er ikke ansvarlig for tap Kunden måtte lide som følge av slik suspensjon.

Alle priser er oppgitt eksklusiv merverdiavgift (mva.) i henhold til Lov om merverdiavgift (merverdiavgiftsloven) av 19. juni 2009 nr. 58. Gjeldende mva.-sats vil bli tillagt fakturabeløpet.`,
    },
    {
      title: "5. Leverandørens forpliktelser",
      content: `Leverandøren forplikter seg til å:

(a) Levere nettstedet i samsvar med den avtalte pakken og tjenestebeskrivelsen i punkt 2.
(b) Sikre at nettstedet er teknisk tilgjengelig med en oppetid på minimum 99 % per kvartal, med unntak av planlagte vedlikeholdsvinduet og force majeure-hendelser.
(c) Implementere og vedlikeholde nødvendige sikkerhetstiltak, herunder SSL/HTTPS-sertifikat og jevnlige sikkerhetsoppdateringer.
(d) Håndtere hosting, domenepublisering og teknisk drift i samsvar med gjeldende bransjestandard.
(e) Gi Kunden skriftlig varsel om planlagte driftsavbrudd med minimum 48 timers forhåndsvarsel, der dette er praktisk gjennomførbart.`,
    },
    {
      title: "6. Kundens forpliktelser",
      content: `Kunden forplikter seg til å:

(a) Levere nødvendig innhold (tekst, bilder, logoer, branding-retningslinjer m.m.) innen avtalt frist. Forsinkelser fra Kundens side fritar Leverandøren fra leveringsfrister.
(b) Sikre at innhold som leveres til Leverandøren ikke krenker tredjeparts immaterielle rettigheter, herunder opphavsrett, varemerkebeskyttelse eller andre rettigheter.
(c) Informere Leverandøren skriftlig om endringer i kontaktinformasjon, domeneregistrering eller andre forhold av betydning for Avtalen.
(d) Ikke misbruke Leverandørens tjenester, herunder ikke publisere ulovlig innhold, spam eller innhold som strider mot norsk lov.

Kunden er ansvarlig for alt innhold som publiseres på nettstedet. Leverandøren fraskriver seg ethvert ansvar for innhold levert av Kunden.`,
    },
    {
      title: "7. Ekstraarbeid og timepris",
      content: `Arbeid utover det som er inkludert i den avtalte abonnementspakken anses som ekstraarbeid og faktureres separat. Dette inkluderer, men er ikke begrenset til: større designendringer, ekstra undersider, nettbutikkløsninger, bookingintegrasjoner, avansert SEO-arbeid, e-postoppsett, profesjonelt redaksjonsarbeid utover inkluderte timer og tekniske tilpasninger utenfor standard pakkescope.

Gjeldende timepris for ekstraarbeid er 1 199 kr per time eksklusiv mva. («Timeprisen»). Timeprisen gjelder for alle pakker, med unntak av at Pro-pakken inkluderer 2 (to) timer per måned uten tilleggskostnad, jf. punkt 2. Ekstraarbeid utover disse inkluderte timene faktureres etter Timeprisen.

Leverandøren er forpliktet til å varsle Kunden skriftlig før ekstraarbeid påbegynnes, dersom antatt omfang overstiger 30 (tretti) minutter. Kunden kan ikke holde Leverandøren ansvarlig for ekstraarbeid Kunden ikke skriftlig har godkjent på forhånd.`,
    },
    {
      title: "8. Immaterielle rettigheter",
      content: `Leverandøren beholder alle immaterielle rettigheter til design, kode, maler og tekniske løsninger utviklet i forbindelse med Kundens nettsted, inntil Avtalen er fullstendig gjort opp og alle utestående beløp er betalt.

Ved full betaling gis Kunden en ikke-eksklusiv, ikke-overdragbar bruksrett til det leverte nettstedet for dets tiltenkte formål. Kunden kan ikke videreselge, lisensierer videre eller overdra rettigheter til tredjepart uten Leverandørens skriftlige forhåndssamtykke.

Innhold og materiale levert av Kunden (tekst, bilder, logoer m.m.) forblir Kundens eiendom. Kunden gir Leverandøren en begrenset bruksrett til slikt materiale for gjennomføring av Avtalen.`,
    },
    {
      title: "9. Konfidensialitet",
      content: `Begge parter forplikter seg til å behandle konfidensielt all informasjon som mottas fra den andre part i forbindelse med Avtalen, og som er merket som konfidensiell eller etter omstendighetene må forstås som konfidensiell. Denne forpliktelsen gjelder i Avtalens løpetid og i 3 (tre) år etter Avtalens opphør.

Konfidensialitetsforpliktelsen er ikke til hinder for offentliggjøring av informasjon som: (a) er allment tilgjengelig uten at det skyldes brudd på denne Avtalen, (b) den mottakende part allerede var kjent med på tidspunktet for mottak, eller (c) må offentliggjøres i henhold til lov eller bindende myndighetspålegg.`,
    },
    {
      title: "10. Personvern og behandling av personopplysninger",
      content: `Leverandøren behandler personopplysninger i samsvar med Europaparlamentets og Rådets forordning (EU) 2016/679 («GDPR») og den norske personopplysningsloven av 15. juni 2018 nr. 38.

I den grad Leverandøren behandler personopplysninger på vegne av Kunden i forbindelse med drift og vedlikehold av nettstedet, opptrer Leverandøren som databehandler og Kunden som behandlingsansvarlig. Partene forplikter seg til å inngå en separat databehandleravtale etter behov.

Leverandørens fullstendige personvernerklæring er tilgjengelig på nettstedet.`,
    },
    {
      title: "11. Ansvarsbegrensning",
      content: `Leverandørens samlede erstatningsansvar overfor Kunden er under enhver omstendighet begrenset til et beløp tilsvarende de abonnementsavgifter Kunden har betalt de siste 3 (tre) måneder forut for skadens oppståen.

Leverandøren er ikke ansvarlig for indirekte tap, herunder tapt fortjeneste, tapte inntekter, tap av data, tap av omdømme eller andre følgeskader, uansett om slike tap er forårsaket av Leverandørens handlinger, unnlatelser, feil i leveransen eller force majeure.

Leverandøren er ikke ansvarlig for driftsavbrudd forårsaket av tredjeparts tjenesteleverandører (herunder hostingleverandører, domeneregistrarer eller nettverksleverandører), force majeure-hendelser eller handlinger fra Kundens side.`,
    },
    {
      title: "12. Oppsigelse og mislighold",
      content: `Begge parter kan si opp Avtalen med øyeblikkelig virkning ved vesentlig mislighold fra den andre parts side, dersom misligholdet ikke er utbedret innen 14 (fjorten) dager etter skriftlig varsel.

Vesentlig mislighold fra Kundens side inkluderer, men er ikke begrenset til: manglende betaling, publisering av ulovlig innhold og brudd på Kundens forpliktelser etter punkt 6.

Vesentlig mislighold fra Leverandørens side inkluderer, men er ikke begrenset til: gjentatt manglende levering av tjenester i samsvar med Avtalen.

Ved opphør av Avtalen, uansett årsak, skal Leverandøren på Kundens skriftlige anmodning bistå med overlevering av nettstedets filer og innhold innen rimelig tid. Slik bistand kan faktureres etter Timeprisen dersom den overstiger 1 (én) time.`,
    },
    {
      title: "13. Force majeure",
      content: `Ingen av partene er ansvarlige for forsinkelse eller manglende oppfyllelse av sine forpliktelser i den utstrekning dette skyldes forhold utenfor partenes rimelige kontroll, herunder naturkatastrofer, krig, terrorisme, streik, myndighetspålegg, ekstraordinære svikt i internettinfrastruktur eller andre force majeure-hendelser.

Den part som rammes av force majeure, skal uten ugrunnet opphold varsle den andre parten skriftlig. Dersom en force majeure-situasjon varer i mer enn 60 (seksti) dager, kan begge parter heve Avtalen uten erstatningsansvar.`,
    },
    {
      title: "14. Endringer i vilkårene",
      content: `Leverandøren forbeholder seg retten til å endre disse vilkårene. Kunden skal varsles skriftlig om vesentlige endringer med minimum 30 (tretti) dagers forhåndsvarsel. Fortsatt bruk av tjenestene etter at varselsfristen er utløpt, anses som aksept av de nye vilkårene.

Ved vesentlige endringer som Kunden ikke aksepterer, kan Kunden si opp Avtalen med virkning fra det tidspunktet endringene trer i kraft, uten at dette utløser krav om betaling av resterende Bindingsperiode.`,
    },
    {
      title: "15. Lovvalg og verneting",
      content: `Denne Avtalen er underlagt norsk rett. Tvister som oppstår i forbindelse med Avtalen, skal søkes løst ved forhandlinger mellom partene. Dersom forhandlinger ikke fører frem innen 30 (tretti) dager, skal tvisten bringes inn for Oslo tingrett som verneting i første instans, med mindre annet følger av ufravikelig norsk lovgivning.`,
    },
  ],
  en: [
    {
      title: "1. Parties and Subject Matter",
      content: `These terms and conditions ("Agreement") are entered into between Webbly ("Supplier") and the legal or natural person ("Customer") ordering services through the Supplier's website or otherwise entering into a written or oral agreement with the Supplier.

The Agreement governs the provision of subscription-based website solutions, including design, development, publishing, operation, maintenance and related services. The Agreement is deemed binding upon the Customer confirming an order, making payment, or otherwise accepting the offer in writing.`,
    },
    {
      title: "2. Subscription Plans and Service Description",
      content: `The Supplier offers the following subscription plans:

**Start – NOK 499/mo excl. VAT**
Includes up to 3 pages, cookie banner, mobile-optimized design, contact form, publishing on Customer's domain and SSL/HTTPS certificate. The plan does not include editorial hours. Any adjustments are billed at the applicable hourly rate, cf. clause 7.

**Growth – NOK 799/mo excl. VAT**
Includes up to 5 pages, cookie banner, basic SEO, privacy policy, mobile-optimized design, contact form, publishing on Customer's domain and SSL/HTTPS certificate. The plan does not include editorial hours. Any adjustments are billed at the applicable hourly rate, cf. clause 7.

**Pro – NOK 999/mo excl. VAT**
Includes up to 8 pages, cookie banner, basic SEO, privacy policy, backend analytics/dashboard, simple logo, mobile-optimized design, contact form, publishing on Customer's domain and SSL/HTTPS certificate. The plan includes 2 (two) editorial hours per calendar month for adjustments and website maintenance.

Unused editorial hours in the Pro plan do not accumulate and cannot be carried over to subsequent months. Delivery of the completed website is estimated at 3 (three) business days from receipt of approved content and design direction from the Customer.`,
    },
    {
      title: "3. Agreement Duration and Binding Period",
      content: `The Agreement is entered into for a fixed period of 12 (twelve) calendar months from the agreement date ("Binding Period"). The Agreement continues as a rolling agreement with 3 (three) months' mutual notice after the expiry of the Binding Period, unless one party provides written notice of termination no later than 30 (thirty) days before the end of the Binding Period.

Termination during the Binding Period does not entitle the Customer to a refund of already invoiced amounts. Upon termination during the binding period, the Customer is obligated to pay the remaining monthly subscription fees for the remainder of the Binding Period, unless otherwise agreed in writing.`,
    },
    {
      title: "4. Payment Terms",
      content: `The monthly subscription fee is invoiced in advance on the 1st of each calendar month. Payment is due within 14 (fourteen) days of the invoice date. Late payments accrue interest in accordance with applicable law.

In the event of late payment exceeding 30 (thirty) days, the Supplier reserves the right to suspend or deactivate the Customer's website until the outstanding amount has been paid in full. The Supplier shall not be liable for any loss suffered by the Customer as a result of such suspension.

All prices are stated exclusive of value added tax (VAT). Applicable VAT will be added to the invoice amount.`,
    },
    {
      title: "5. Supplier Obligations",
      content: `The Supplier undertakes to:

(a) Deliver the website in accordance with the agreed plan and service description in clause 2.
(b) Ensure the website is technically available with a minimum uptime of 99% per quarter, excluding planned maintenance windows and force majeure events.
(c) Implement and maintain necessary security measures, including SSL/HTTPS certificate and regular security updates.
(d) Handle hosting, domain publishing and technical operations in accordance with current industry standards.
(e) Provide the Customer with written notice of planned outages with a minimum of 48 hours advance notice, where practically feasible.`,
    },
    {
      title: "6. Customer Obligations",
      content: `The Customer undertakes to:

(a) Deliver necessary content (text, images, logos, branding guidelines, etc.) within agreed deadlines. Delays on the Customer's part release the Supplier from delivery deadlines.
(b) Ensure that content delivered to the Supplier does not infringe third-party intellectual property rights, including copyright, trademark protection or other rights.
(c) Inform the Supplier in writing of changes to contact information, domain registration or other matters of relevance to the Agreement.
(d) Not misuse the Supplier's services, including not publishing illegal content, spam or content contrary to applicable law.

The Customer is responsible for all content published on the website. The Supplier disclaims any liability for content provided by the Customer.`,
    },
    {
      title: "7. Additional Work and Hourly Rate",
      content: `Work beyond what is included in the agreed subscription plan is considered additional work and invoiced separately. This includes, but is not limited to: major design changes, additional sub-pages, e-commerce solutions, booking integrations, advanced SEO work, email setup, professional editorial work beyond included hours and technical customizations outside standard plan scope.

The applicable hourly rate for additional work is NOK 1,199 per hour exclusive of VAT ("Hourly Rate"). The Hourly Rate applies to all plans, except that the Pro plan includes 2 (two) hours per month at no additional charge, cf. clause 2. Additional work beyond these included hours is billed at the Hourly Rate.

The Supplier is obligated to notify the Customer in writing before commencing additional work, if the estimated scope exceeds 30 (thirty) minutes. The Customer may not hold the Supplier liable for additional work not approved in writing by the Customer in advance.`,
    },
    {
      title: "8. Intellectual Property Rights",
      content: `The Supplier retains all intellectual property rights to designs, code, templates and technical solutions developed in connection with the Customer's website, until the Agreement has been fully settled and all outstanding amounts have been paid.

Upon full payment, the Customer is granted a non-exclusive, non-transferable right to use the delivered website for its intended purpose. The Customer may not resell, sub-license or transfer rights to third parties without the Supplier's prior written consent.

Content and material provided by the Customer (text, images, logos, etc.) remains the Customer's property. The Customer grants the Supplier a limited right to use such material for the performance of the Agreement.`,
    },
    {
      title: "9. Confidentiality",
      content: `Both parties undertake to treat as confidential all information received from the other party in connection with the Agreement that is marked as confidential or that must be understood as confidential given the circumstances. This obligation applies during the term of the Agreement and for 3 (three) years after the Agreement's termination.

The confidentiality obligation does not prevent disclosure of information that: (a) is publicly available without breach of this Agreement, (b) the receiving party was already aware of at the time of receipt, or (c) must be disclosed pursuant to law or binding regulatory order.`,
    },
    {
      title: "10. Data Protection",
      content: `The Supplier processes personal data in accordance with Regulation (EU) 2016/679 ("GDPR") and applicable national data protection law.

To the extent the Supplier processes personal data on behalf of the Customer in connection with the operation and maintenance of the website, the Supplier acts as data processor and the Customer as data controller. The parties undertake to enter into a separate data processing agreement as required.

The Supplier's full privacy policy is available on the website.`,
    },
    {
      title: "11. Limitation of Liability",
      content: `The Supplier's total liability to the Customer shall in any event be limited to an amount corresponding to the subscription fees paid by the Customer in the 3 (three) months preceding the occurrence of the damage.

The Supplier shall not be liable for indirect losses, including lost profits, lost revenue, loss of data, reputational damage or other consequential damages, regardless of whether such losses are caused by the Supplier's actions, omissions, delivery failures or force majeure.

The Supplier is not liable for outages caused by third-party service providers (including hosting providers, domain registrars or network providers), force majeure events or actions by the Customer.`,
    },
    {
      title: "12. Termination and Breach",
      content: `Either party may terminate the Agreement with immediate effect in the event of material breach by the other party, provided the breach has not been remedied within 14 (fourteen) days of written notice.

Material breach by the Customer includes, but is not limited to: non-payment, publishing illegal content and breach of Customer obligations under clause 6.

Material breach by the Supplier includes, but is not limited to: repeated failure to deliver services in accordance with the Agreement.

Upon termination of the Agreement, for any reason, the Supplier shall at the Customer's written request assist with the handover of the website's files and content within a reasonable time. Such assistance may be billed at the Hourly Rate if it exceeds 1 (one) hour.`,
    },
    {
      title: "13. Force Majeure",
      content: `Neither party is liable for delay or failure to fulfil its obligations to the extent this is caused by circumstances beyond the parties' reasonable control, including natural disasters, war, terrorism, strikes, government orders, extraordinary internet infrastructure failures or other force majeure events.

The party affected by force majeure shall notify the other party in writing without undue delay. If a force majeure situation persists for more than 60 (sixty) days, either party may terminate the Agreement without liability.`,
    },
    {
      title: "14. Amendments to Terms",
      content: `The Supplier reserves the right to amend these terms. The Customer shall be notified in writing of material changes with a minimum of 30 (thirty) days' prior notice. Continued use of the services after the notice period has expired shall be deemed acceptance of the new terms.

In the event of material changes that the Customer does not accept, the Customer may terminate the Agreement with effect from the date the changes take effect, without triggering an obligation to pay for the remaining Binding Period.`,
    },
    {
      title: "15. Governing Law and Jurisdiction",
      content: `This Agreement is governed by Norwegian law. Disputes arising in connection with the Agreement shall be sought resolved through negotiation between the parties. If negotiations do not lead to a resolution within 30 (thirty) days, the dispute shall be brought before Oslo District Court as the court of first instance, unless otherwise required by mandatory Norwegian law.`,
    },
  ],
};

function AccordionItem({ title, content, index }) {
  const [open, setOpen] = useState(false);

  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-semibold text-deep-brown mt-4 mb-1">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("(")) {
        return (
          <p key={i} className="ml-4 mb-1">
            {line}
          </p>
        );
      }
      if (line === "") return <div key={i} className="h-2" />;
      return <p key={i} className="mb-1">{line}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-beige-200 rounded-2xl overflow-hidden bg-white/70"
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
          <ChevronDown className="w-4 h-4 text-warm-brown/60 flex-shrink-0 ml-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 font-body text-sm text-warm-brown/80 leading-relaxed border-t border-beige-100">
              <div className="pt-4 space-y-0.5">{renderContent(content)}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TermsPage() {
  const [lang, setLang] = useState("no");
  const t = sections[lang];

  const labels = {
    no: {
      back: "Tilbake til forsiden",
      label: "Juridiske vilkår",
      h1: "Vilkår og betingelser",
      sub: "Gjeldende fra 9. mai 2026. Disse vilkårene utgjør en bindende avtale mellom Webbly og Kunden.",
      updated: "Sist oppdatert: Mai 2026",
    },
    en: {
      back: "Back to homepage",
      label: "Legal Terms",
      h1: "Terms & Conditions",
      sub: "Effective from 9 May 2026. These terms constitute a binding agreement between Webbly and the Customer.",
      updated: "Last updated: May 2026",
    },
  }[lang];

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Top bar */}
      <div className="bg-white border-b border-beige-200 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-body text-warm-brown hover:text-deep-brown transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {labels.back}
        </a>
        <button
          onClick={() => setLang((l) => (l === "no" ? "en" : "no"))}
          className="text-xs font-body text-warm-brown/70 border border-beige-300 rounded-full px-3 py-1.5 hover:text-deep-brown transition-colors cursor-pointer"
        >
          {lang === "no" ? "English" : "Norsk"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex w-12 h-12 rounded-full bg-deep-brown items-center justify-center mb-5">
            <Scale className="w-5 h-5 text-beige-50" />
          </div>
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-3">
            {labels.label}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-4">
            {labels.h1}
          </h1>
          <p className="font-body text-warm-brown/70 text-sm leading-relaxed max-w-xl mx-auto mb-2">
            {labels.sub}
          </p>
          <p className="font-body text-xs text-beige-400">{labels.updated}</p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {t.map((section, i) => (
            <AccordionItem key={i} {...section} index={i} />
          ))}
        </div>

        <p className="font-body text-xs text-warm-brown/40 text-center mt-12">
          © 2026 Webbly —{" "}
          {lang === "no" ? "Alle rettigheter forbeholdt." : "All rights reserved."}
        </p>
      </div>
    </div>
  );
}
