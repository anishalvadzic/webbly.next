import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hva inkluderer Start-pakken (499 kr/mnd)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start-pakken inkluderer opptil 3 sider, cookie-banner, mobiltilpasset design, kontaktskjema, publisering på eget domene og SSL/HTTPS-sertifikat.",
      },
    },
    {
      "@type": "Question",
      name: "Hva inkluderer Vekst-pakken (799 kr/mnd)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vekst-pakken inkluderer opptil 5 sider, cookie-banner, grunnleggende SEO, personvernerklæring, mobiltilpasset design, kontaktskjema, publisering på eget domene og SSL/HTTPS-sertifikat.",
      },
    },
    {
      "@type": "Question",
      name: "Hva inkluderer Pro-pakken (999 kr/mnd)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro-pakken inkluderer opptil 8 sider, cookie-banner, grunnleggende SEO, personvernerklæring, backend analyseside, enkel logo, mobiltilpasset design, kontaktskjema, publisering på eget domene, SSL/HTTPS-sertifikat og 2 redaktørtimer per måned.",
      },
    },
    {
      "@type": "Question",
      name: "Hva er ikke inkludert i standardpakkene?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Større designendringer, ekstra undersider, nettbutikk, bookingløsninger, annonsering, profesjonell fotografering, avansert SEO og e-postoppsett er ikke inkludert i standardpakkene. Dette kan leveres som tillegg.",
      },
    },
    {
      "@type": "Question",
      name: "Hvor lang er bindingstiden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avtalen inngås for en fast periode på 12 måneder. Etter bindingsperioden løper avtalen videre med 3 måneders gjensidig oppsigelsestid.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Nettside for bedrift | Webbly — Nettsidebyrå for småbedrifter i Norge",
  description:
    "Få en profesjonell nettside for bedriften din fra 499 kr/mnd. Publisering på eget domene, ingen skjulte kostnader. Du er online på tre virkedager. Norsk nettsidebyrå i Lørenskog.",
  openGraph: {
    title: "Nettside for bedrift | Profesjonelt nettsidebyrå i Norge",
    description:
      "Få en profesjonell nettside for bedriften din fra 499 kr/mnd. Ingen skjulte kostnader, ingen binding. Du er online på tre dager.",
    url: "https://webbly.no",
  },
  alternates: {
    canonical: "https://webbly.no",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
