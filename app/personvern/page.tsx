import type { Metadata } from "next";
import PersonvernPage from "./PersonvernPage";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Les Webbly sin personvernerklæring. Her finner du informasjon om hvordan vi samler inn, bruker og beskytter dine personopplysninger.",
  openGraph: {
    url: "https://webbly.no/personvern",
  },
  alternates: {
    canonical: "https://webbly.no/personvern",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PersonvernPage />;
}
