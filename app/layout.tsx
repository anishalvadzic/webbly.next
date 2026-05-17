import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const GA_ID = "G-B98GRHFQR0";

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
    "Profesjonelle nettsider for norske bedrifter. Fast månedspris, ingen skjulte kostnader. Du er online på tre dager.",
  authors: [{ name: "Webbly", url: "https://webbly.no" }],
  creator: "Webbly",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
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
      "Profesjonelle nettsider for norske bedrifter. Fast månedspris fra 499 kr/mnd. Du er online på tre dager.",
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
      "Profesjonelle nettsider for norske bedrifter. Fast månedspris fra 499 kr/mnd.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webbly",
  url: "https://webbly.no",
  logo: "https://webbly.no/logo.svg",
  telephone: "+4798136928",
  description:
    "Profesjonelle nettsider for norske bedrifter. Fast månedspris fra 499 kr/mnd.",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nettsidepakker",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Start",
        description: "Opptil 3 sider, mobiltilpasset design, kontaktskjema, SSL og publisering på eget domene.",
        price: "499",
        priceCurrency: "NOK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "499",
          priceCurrency: "NOK",
          unitText: "månedlig",
        },
        url: "https://webbly.no/#pricing",
      },
      {
        "@type": "Offer",
        name: "Vekst",
        description: "Opptil 5 sider, grunnleggende SEO, personvernerklæring, mobiltilpasset design og SSL.",
        price: "799",
        priceCurrency: "NOK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "799",
          priceCurrency: "NOK",
          unitText: "månedlig",
        },
        url: "https://webbly.no/#pricing",
      },
      {
        "@type": "Offer",
        name: "Pro",
        description: "Opptil 8 sider, SEO, analysedashboard, logo, 2 redaktørtimer/mnd og SSL.",
        price: "999",
        priceCurrency: "NOK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "999",
          priceCurrency: "NOK",
          unitText: "månedlig",
        },
        url: "https://webbly.no/#pricing",
      },
    ],
  },
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

        {/* Google Analytics — Consent Mode v2. Default to denied; the cookie
            banner pushes a `consent update` to granted when the user accepts. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            try {
              if (localStorage.getItem('webbly_cookie_consent') === 'accepted') {
                gtag('consent', 'update', { analytics_storage: 'granted' });
              }
            } catch (e) {}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
