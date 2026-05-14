import type { Metadata } from "next";
import ExamplesPage from "./ExamplesPage";

export const metadata: Metadata = {
  title: "Eksempler | Webbly",
  description:
    "Se hva Webbly kan bygge for din bedrift — animerte eksempler på nettsider for restaurant, nettbutikk, håndverk og mer.",
  openGraph: {
    title: "Eksempler | Webbly",
    description: "Alt som er mulig — se eksempler på nettsider fra Webbly.",
  },
};

export default function Page() {
  return <ExamplesPage />;
}
