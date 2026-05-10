"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = {
    no: {
      services: "Tjenester",
      pricing: "Priser",
      process: "Prosess",
      about: "Om oss",
      contact: "Kontakt",
      cta: "Kom i gang",
    },
    en: {
      services: "Services",
      pricing: "Pricing",
      process: "Process",
      about: "About",
      contact: "Contact",
      cta: "Get Started",
    },
  }[lang];

  const links = [
    { label: t.services, href: "#services" },
    { label: t.pricing, href: "#pricing" },
    { label: t.process, href: "#process" },
    { label: t.about, href: "/about", external: true },
    { label: t.contact, href: "#contact" },
  ];

  const scrollTo = (href, external) => {
    if (external) {
      window.location.href = href;
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-beige-50/95 backdrop-blur-md shadow-sm border-b border-beige-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://media.base44.com/images/public/69fe226358dd1ca54cd504b6/c256e94a2_weblly_logo.svg"
            alt="Webbly"
            className="h-14 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href, link.external)}
              className="text-sm font-body text-warm-brown/80 hover:text-deep-brown transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "no" ? "en" : "no")}
            className="flex items-center gap-1.5 text-xs font-body text-warm-brown/70 hover:text-deep-brown border border-beige-300 rounded-full px-3 py-1.5 transition-colors duration-200 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "no" ? "EN" : "NO"}
          </button>

          <button
            onClick={() => scrollTo("#pricing")}
            className="hidden md:block text-sm font-body bg-deep-brown text-beige-50 px-5 py-2 rounded-xl hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            {t.cta}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 cursor-pointer text-deep-brown"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-beige-50 z-10"
              style={{ top: 64 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed left-0 right-0 z-10 bg-beige-50 border-t border-beige-200 px-6 pb-6 pt-4 flex flex-col gap-4"
              style={{ top: 64 }}
            >
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href, link.external)}
                  className="text-left text-base font-body text-warm-brown hover:text-deep-brown cursor-pointer py-2 border-b border-beige-100"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#pricing")}
                className="text-sm font-body bg-deep-brown text-beige-50 px-5 py-3 rounded-xl w-full cursor-pointer hover:shadow-lg hover:shadow-deep-brown/25 transition-all duration-200 mt-2"
              >
                {t.cta}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
