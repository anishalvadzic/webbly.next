"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PrivacySection from "@/components/landing/PrivacySection";

export default function PersonvernPage() {
  const [lang, setLang] = useState("no");

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="bg-white border-b border-beige-200 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-body text-warm-brown hover:text-deep-brown transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "no" ? "Tilbake til forsiden" : "Back to homepage"}
        </a>
        <button
          onClick={() => setLang((l) => (l === "no" ? "en" : "no"))}
          className="text-xs font-body text-warm-brown/70 border border-beige-300 rounded-full px-3 py-1.5 hover:text-deep-brown transition-colors cursor-pointer"
        >
          {lang === "no" ? "English" : "Norsk"}
        </button>
      </div>
      <PrivacySection lang={lang} />
    </div>
  );
}
