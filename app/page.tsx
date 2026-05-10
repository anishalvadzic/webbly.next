"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import MockupCarousel from "@/components/landing/MockupCarousel";
import Process from "@/components/landing/Process";
import Pricing from "@/components/landing/Pricing";
import Contact from "@/components/landing/Contact";
import PrivacySection from "@/components/landing/PrivacySection";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";
import CookieBanner from "@/components/landing/CookieBanner";

export default function Home() {
  const [lang, setLang] = useState("no");
  const [bookingPlan, setBookingPlan] = useState<string | null>(null);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <MockupCarousel lang={lang} />
      <Process lang={lang} />
      <Pricing lang={lang} onSelectPlan={(name: string) => setBookingPlan(name)} />
      <Contact lang={lang} />
      <PrivacySection lang={lang} />
      <Footer lang={lang} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      <CookieBanner
        lang={lang}
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
      {bookingPlan && (
        <BookingModal
          plan={bookingPlan}
          lang={lang}
          onClose={() => setBookingPlan(null)}
          onConfirm={() => setBookingPlan(null)}
        />
      )}
    </div>
  );
}
