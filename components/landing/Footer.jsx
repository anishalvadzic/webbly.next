"use client";

export default function Footer({ lang, onOpenCookieSettings }) {
  const t = {
    no: {
      tagline: "Nettsider for norske bedrifter. Levert på tre dager.",
      rights: "© 2026 Webbly. Alle rettigheter forbeholdt.",
      cookieSettings: "Cookie-innstillinger",
      links: [
        { label: "Om oss", href: "/about", external: true },
        { label: "Personvern", href: "#privacy-section" },
        { label: "Kontakt", href: "#contact" },
      ],
    },
    en: {
      tagline: "Websites for Norwegian businesses. Delivered in three days.",
      rights: "© 2026 Webbly. All rights reserved.",
      cookieSettings: "Cookie settings",
      links: [
        { label: "About", href: "/about", external: true },
        { label: "Privacy", href: "#privacy-section" },
        { label: "Contact", href: "#contact" },
      ],
    },
  }[lang];

  const scrollTo = (href) => {
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-deep-brown text-beige-200 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <img
            src="https://media.base44.com/images/public/69fe226358dd1ca54cd504b6/c256e94a2_weblly_logo.svg"
            alt="Webbly"
            className="h-14 w-auto mb-2 brightness-0 invert opacity-80"
          />
          <p className="font-body text-sm text-beige-300">{t.tagline}</p>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {t.links.map((link) => (
            <button
              key={link.label}
              onClick={() =>
                link.external
                  ? (window.location.href = link.href)
                  : scrollTo(link.href)
              }
              className="font-body text-xs text-beige-300 hover:text-beige-50 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onOpenCookieSettings}
            className="font-body text-xs text-beige-400 hover:text-beige-200 border border-beige-600 hover:border-beige-400 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            🍪 {t.cookieSettings}
          </button>
        </div>
        <p className="font-body text-xs text-beige-400">{t.rights}</p>
      </div>
    </footer>
  );
}
