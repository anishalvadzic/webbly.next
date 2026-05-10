import type { Metadata } from "next";
import TermsPage from "./TermsPage";

export const metadata: Metadata = {
  title: "Vilkår og betingelser",
  description:
    "Les Webbly sine vilkår og betingelser for abonnementsbaserte nettsideløsninger for norske bedrifter.",
  openGraph: {
    url: "https://webbly.no/terms",
  },
  alternates: {
    canonical: "https://webbly.no/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <TermsPage />;
}
