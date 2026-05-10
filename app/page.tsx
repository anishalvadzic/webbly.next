import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Nettside for bedrift | Webbly — Nettsidebyrå for småbedrifter i Norge",
  description:
    "Få en profesjonell nettside for bedriften din fra 499 kr/mnd. Publisering på eget domene, ingen skjulte kostnader. Du er online på tre virkedager. Norsk nettsidebyrå i Lørenskog.",
  keywords: [
    "nettside",
    "nettside for bedrift",
    "nettside bedrift",
    "få nettside",
    "lage nettside",
    "nettsidebyrå",
    "norsk nettsidebyrå",
    "profesjonell nettside",
    "billig nettside",
    "nettside abonnement",
    "nettside småbedrift",
    "webdesign",
    "Lørenskog",
    "Akershus",
    "Oslo",
    "Norge",
  ],
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
  return <HomeClient />;
}
