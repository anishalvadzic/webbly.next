import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webbly.no"),
  title: {
    default: "Webbly — Profesjonelt nettsidebyrå for norske bedrifter",
    template: "%s | Webbly",
  },
  description:
    "Profesjonelle nettsider for norske småbedrifter. Fast månedspris, ingen skjulte kostnader. Du er online på tre dager.",
  keywords: [
    "nettside",
    "nettside for bedrift",
    "nettsidebyrå",
    "norsk nettside",
    "profesjonell nettside",
    "Lørenskog",
    "Norge",
  ],
  authors: [{ name: "Webbly", url: "https://webbly.no" }],
  creator: "Webbly",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://webbly.no",
    siteName: "Webbly",
    title: "Webbly — Profesjonelt nettsidebyrå for norske bedrifter",
    description:
      "Profesjonelle nettsider for norske småbedrifter. Fast månedspris fra 499 kr/mnd. Du er online på tre dager.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Webbly — Nettsider for norske bedrifter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webbly — Profesjonelt nettsidebyrå for norske bedrifter",
    description:
      "Profesjonelle nettsider for norske småbedrifter. Fast månedspris fra 499 kr/mnd.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webbly",
  url: "https://webbly.no",
  logo: "https://media.base44.com/images/public/69fe226358dd1ca54cd504b6/c256e94a2_weblly_logo.svg",
  description:
    "Profesjonelle nettsider for norske småbedrifter. Fast månedspris fra 499 kr/mnd.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lørenskog",
    addressRegion: "Akershus",
    addressCountry: "NO",
  },
  areaServed: { "@type": "Country", name: "Norway" },
  serviceType: "Webdesign og nettside-utvikling",
  priceRange: "499–999 kr/mnd",
  knowsLanguage: ["nb", "en"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
