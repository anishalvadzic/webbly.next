import type { Metadata } from "next";
import TermsPage from "./TermsPage";

export const metadata: Metadata = {
  title: "Vilkår og betingelser | Webbly",
  description:
    "Les Webbly sine vilkår og betingelser for abonnementsbaserte nettsideløsninger.",
};

export default function Page() {
  return <TermsPage />;
}
