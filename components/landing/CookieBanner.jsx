"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function CookieBanner({ lang, forceOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("webbly_cookie_consent");
    if (!consent) setTimeout(() => setVisible(true), 1500);
  }, []);

  useEffect(() => {
    if (forceOpen) setVisible(true);
  }, [forceOpen]);

  const updateConsent = (granted) => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("consent", granted ? "grant" : "revoke");
    }
  };

  const accept = () => {
    setVisible(false);
    onClose?.();
    setTimeout(() => localStorage.setItem("webbly_cookie_consent", "accepted"), 0);
    updateConsent(true);
  };
  const decline = () => {
    setVisible(false);
    onClose?.();
    setTimeout(() => localStorage.setItem("webbly_cookie_consent", "declined"), 0);
    updateConsent(false);
  };

  const t = {
    no: {
      text: "Vi bruker informasjonskapsler (cookies) for å gi deg den beste opplevelsen på nettstedet vårt. Les vår",
      link: "personvernserklæring",
      accept: "Godta alle",
      decline: "Avslå",
    },
    en: {
      text: "We use cookies to give you the best experience on our website. Read our",
      link: "privacy policy",
      accept: "Accept all",
      decline: "Decline",
    },
  }[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 w-full px-4 pb-4 sm:pb-6 sm:px-6"
        >
          <div className="bg-deep-brown text-beige-50 rounded-2xl px-5 py-4 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-2xl mx-auto">
            <Cookie className="w-5 h-5 text-beige-300 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="font-body text-sm text-beige-200 flex-1 leading-relaxed">
              {t.text}{" "}
              <button
                onClick={() =>
                  document
                    .getElementById("privacy-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-beige-50 underline underline-offset-2 cursor-pointer hover:text-beige-100"
              >
                {t.link}
              </button>
              .
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="font-body text-xs text-beige-400 hover:text-beige-200 px-3 py-2 rounded-full border border-beige-600 hover:border-beige-400 transition-colors cursor-pointer"
              >
                {t.decline}
              </button>
              <button
                onClick={accept}
                className="font-body text-xs bg-beige-50 text-deep-brown font-medium px-4 py-2 rounded-xl hover:bg-beige-100 hover:shadow-md hover:shadow-beige-200/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
