import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "Om Webbly | Norsk nettsidebyrå i Lørenskog",
  description:
    "Webbly er et norsk selskap fra Lørenskog som hjelper små og mellomstore bedrifter med moderne, profesjonelle nettsider, SEO og digital synlighet.",
};

export default function Page() {
  return <AboutPage />;
}
