"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Portfolio from "@/components/portfolio/Portfolio";
import Pricing from "@/components/landing/Pricing";
import Contact from "@/components/landing/Contact";
import PackageQuiz from "@/components/landing/PackageQuiz";
import PrivacySection from "@/components/landing/PrivacySection";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";
import CookieBanner from "@/components/landing/CookieBanner";

export default function HomeClient() {
  const [lang, setLang] = useState("no");
  const [bookingPlan, setBookingPlan] = useState(null);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Process lang={lang} />
      <Portfolio />
      <Pricing lang={lang} onSelectPlan={(name) => setBookingPlan(name)} />
      <PackageQuiz lang={lang} onSelectPlan={(name) => setBookingPlan(name)} />
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
