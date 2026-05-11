import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "Om oss — Norsk nettsidebyrå i Lørenskog",
  description:
    "Webbly er et norsk nettsidebyrå fra Lørenskog som hjelper norske småbedrifter med moderne nettsider, SEO og digital synlighet. Møt teamet.",
  openGraph: {
    title: "Om Webbly — Norsk nettsidebyrå i Lørenskog",
    description:
      "Webbly hjelper norske småbedrifter med moderne nettsider og digital synlighet.",
    url: "https://webbly.no/about",
  },
  alternates: {
    canonical: "https://webbly.no/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
