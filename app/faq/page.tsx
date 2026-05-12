import type { Metadata } from "next";
import FAQPage from "./FAQPage";

export const metadata: Metadata = {
  title: "FAQ — Webbly",
  description:
    "Svar på de vanligste spørsmålene om Webbly sine pakker, priser, domene, design og support.",
  openGraph: {
    title: "FAQ — Webbly",
    description:
      "Svar på de vanligste spørsmålene om Webbly sine pakker, priser, domene, design og support.",
    url: "https://webbly.no/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Webbly",
    description:
      "Svar på de vanligste spørsmålene om Webbly sine pakker, priser, domene, design og support.",
  },
  alternates: {
    canonical: "https://webbly.no/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <FAQPage />;
}
