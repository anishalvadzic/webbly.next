"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => {
      if (!moreRef.current?.contains(e.target)) setMoreOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const t = {
    no: {
      services: "Tjenester",
      pricing: "Priser",
      process: "Prosess",
      about: "Om oss",
      contact: "Kontakt",
      terms: "Vilkår",
      blog: "Blogg",
      faq: "FAQ",
      examples: "Eksempler",
      more: "Mer",
      cta: "Kom i gang",
    },
    en: {
      services: "Services",
      pricing: "Pricing",
      process: "Process",
      about: "About",
      contact: "Contact",
      terms: "Terms",
      blog: "Blog",
      faq: "FAQ",
      examples: "Examples",
      more: "More",
      cta: "Get Started",
    },
  }[lang];

  // Visible inline on desktop
  const primaryLinks = [
    { label: t.services, href: "#services" },
    { label: t.pricing, href: "#pricing" },
    { label: t.process, href: "#process" },
    { label: t.contact, href: "#contact" },
  ];

  // Behind the "Mer" dropdown on desktop
  const secondaryLinks = [
    { label: t.about, href: "/about", external: true },
    { label: t.examples, href: "/examples", external: true },
    { label: t.blog, href: "/blog", external: true },
    { label: t.faq, href: "/faq", external: true },
    { label: t.terms, href: "/terms", external: true },
  ];

  // Mobile menu shows everything
  const allLinks = [...primaryLinks, ...secondaryLinks];

  const scrollTo = (href, external) => {
    if (external) {
      window.location.href = href;
    } else if (href.startsWith("#")) {
      if (window.location.pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/" + href;
      }
    }
    setMobileOpen(false);
    setMoreOpen(false);
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
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Webbly" className="h-14 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href, link.external);
              }}
              className="text-sm font-body text-warm-brown/80 hover:text-deep-brown transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          {/* "Mer" dropdown */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className="flex items-center gap-1 text-sm font-body text-warm-brown/80 hover:text-deep-brown transition-colors duration-200 cursor-pointer"
            >
              {t.more}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                  role="menu"
                  className="absolute right-0 mt-3 w-48 bg-beige-50 border border-beige-200 rounded-xl shadow-lg shadow-deep-brown/10 py-1.5 overflow-hidden"
                >
                  {secondaryLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href, link.external);
                      }}
                      role="menuitem"
                      className="block px-4 py-2 text-sm font-body text-warm-brown/85 hover:text-deep-brown hover:bg-beige-100 cursor-pointer transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

          <a
            href="/#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#pricing");
            }}
            className="hidden md:block text-sm font-body bg-deep-brown text-beige-50 px-5 py-2 rounded-xl hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            {t.cta}
          </a>

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
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-beige-50 z-10"
              style={{ top: 64 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="md:hidden fixed left-0 right-0 z-10 bg-beige-50 border-t border-beige-200 px-6 pb-6 pt-4 flex flex-col gap-4"
              style={{ top: 64 }}
            >
              {allLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.external ? link.href : `/${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href, link.external);
                  }}
                  className="text-left text-base font-body text-warm-brown hover:text-deep-brown cursor-pointer py-2 border-b border-beige-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#pricing");
                }}
                className="text-sm font-body bg-deep-brown text-beige-50 px-5 py-3 rounded-xl w-full cursor-pointer hover:shadow-lg hover:shadow-deep-brown/25 transition-all duration-200 mt-2 text-center block"
              >
                {t.cta}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
