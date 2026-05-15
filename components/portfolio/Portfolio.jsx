"use client";

import { useEffect, useRef } from "react";
import "./portfolio.css";

const PROJECTS = [
  {
    slug: "rorstad",
    brand: "Rørstad VVS",
    industry: "Rørlegger · Lokal handel",
    aesthetic: "Skandinavisk · Pålitelig",
    title: "Pålitelig rørlegger i Oslo",
    blurb:
      "Trust-first lead-gen for et lokalt håndverkerbedrift. Klare priser, raskt tilbudsskjema og en transparent prosessguide.",
    url: "/work/rorstad/",
    accent: "#1267d6",
    year: "2025",
    role: "Strategi, design, kode",
  },
  {
    slug: "nordlys",
    brand: "Studio Nordlys",
    industry: "Arkitektur · Interiør",
    aesthetic: "Editorial · Magasin",
    title: "Hus skal holdes vakkert",
    blurb:
      "Redaksjonell portefølje for et arkitektkontor. Kremfarget papir, mono-sats, fullskjerm prosjekter og egen markør.",
    url: "/work/nordlys/",
    accent: "#b85432",
    year: "2025",
    role: "Identitet, nettside, presse",
  },
  {
    slug: "klang",
    brand: "Klang & Form",
    industry: "Kreativt byrå · SaaS",
    aesthetic: "WebGL · Mørkt studio",
    title: "Vi bygger nettsteder som gløder",
    blurb:
      "Awwwards-nivå studio­side med en levende WebGL-hero som følger musa, magnetiske knapper og curtain-overganger.",
    url: "/work/klang/",
    accent: "#c5fa3a",
    year: "2024",
    role: "WebGL, frontend, motion",
  },
  {
    slug: "voern",
    brand: "Atelier Vœrn",
    industry: "Mote · E-handel",
    aesthetic: "Glassmorfisme · Mørk luksus",
    title: "Stoffer som husker deg",
    blurb:
      "Direct-to-consumer luksusmote. Drivende blob-gradienter bak frostede produktkort, egen markør og gull-accenter.",
    url: "/work/voern/",
    accent: "#c9a961",
    year: "2024",
    role: "Merkevare, e-handel, motion",
  },
  {
    slug: "bjork",
    brand: "Bjørk & Brød",
    industry: "Restaurant · Kafé",
    aesthetic: "Scandi soft · Varm",
    title: "Brød fra i går, kaffe fra i dag",
    blurb:
      "Nabolagsbakeri med ekte reservasjonsflyt, organiske former og varm terrakotta + salvie-palett.",
    url: "/work/bjork/",
    accent: "#c4623e",
    year: "2024",
    role: "Identitet, nettside, foto",
  },
];

const LAPTOP_NATIVE = 1440;
const PHONE_NATIVE = 390;

export default function Portfolio() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".wb-case"));
    const modal = root.querySelector("[data-wb-modal]");
    const modalFrame = modal?.querySelector("[data-wb-modal-frame]");
    const modalBrand = modal?.querySelector("[data-wb-modal-brand]");
    const modalOpen = modal?.querySelector("[data-wb-modal-open]");

    function fitIframe(iframe, nativeWidth) {
      const slot = iframe.parentElement;
      if (!slot) return;
      const slotW = slot.clientWidth;
      const slotH = slot.clientHeight;
      if (!slotW || !slotH) return;
      const scale = slotW / nativeWidth;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.width = nativeWidth + "px";
      iframe.style.height = slotH / scale + "px";
    }

    function hideScrollbar(iframe) {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const s = doc.createElement("style");
        s.textContent =
          "html,body{scrollbar-width:none!important;}" +
          "html::-webkit-scrollbar,body::-webkit-scrollbar,*::-webkit-scrollbar" +
          "{display:none!important;width:0!important;height:0!important;}";
        doc.head.appendChild(s);
      } catch (e) {
        /* cross-origin — ignore */
      }
    }

    function mountIframes(article) {
      if (article.dataset.wbMounted === "1") return;
      article.dataset.wbMounted = "1";
      const slug = article.dataset.wbSlug;
      const p = PROJECTS.find((x) => x.slug === slug);
      if (!p) return;

      const laptopSlot = article.querySelector("[data-wb-laptop-slot]");
      const phoneSlot = article.querySelector("[data-wb-phone-slot]");
      if (!laptopSlot || !phoneSlot) return;

      const laptopFrame = document.createElement("iframe");
      laptopFrame.src = p.url;
      laptopFrame.title = p.brand + " — desktop preview";
      laptopFrame.loading = "lazy";
      laptopFrame.setAttribute("tabindex", "-1");
      laptopSlot.appendChild(laptopFrame);

      const phoneFrame = document.createElement("iframe");
      phoneFrame.src = p.url;
      phoneFrame.title = p.brand + " — mobile preview";
      phoneFrame.loading = "lazy";
      phoneFrame.setAttribute("tabindex", "-1");
      phoneSlot.appendChild(phoneFrame);

      laptopFrame.addEventListener("load", () => {
        hideScrollbar(laptopFrame);
        fitIframe(laptopFrame, LAPTOP_NATIVE);
      });
      phoneFrame.addEventListener("load", () => {
        hideScrollbar(phoneFrame);
        fitIframe(phoneFrame, PHONE_NATIVE);
        article.classList.add("is-loaded");
      });

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          fitIframe(laptopFrame, LAPTOP_NATIVE);
          fitIframe(phoneFrame, PHONE_NATIVE);
          article.classList.add("is-loaded");
        })
      );
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            mountIframes(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    cards.forEach((c) => io.observe(c));

    const prefetchHandlers = cards.map((article) => {
      let prefetched = false;
      const handler = () => {
        if (prefetched) return;
        prefetched = true;
        const p = PROJECTS.find((x) => x.slug === article.dataset.wbSlug);
        if (!p) return;
        const l = document.createElement("link");
        l.rel = "prefetch";
        l.href = p.url;
        document.head.appendChild(l);
      };
      article.addEventListener("mouseenter", handler);
      return { article, handler };
    });

    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        root.querySelectorAll(".wb-case iframe").forEach((f) => {
          const native = f.parentElement.matches("[data-wb-phone-slot]")
            ? PHONE_NATIVE
            : LAPTOP_NATIVE;
          fitIframe(f, native);
        });
      }, 80);
    };
    window.addEventListener("resize", onResize);

    function openModal(slug) {
      const p = PROJECTS.find((x) => x.slug === slug);
      if (!p || !modal || !modalFrame || !modalBrand || !modalOpen) return;
      modalFrame.src = p.url;
      modalBrand.textContent = p.brand;
      modalOpen.setAttribute("href", p.url);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      modalFrame.addEventListener(
        "load",
        () => hideScrollbar(modalFrame),
        { once: true }
      );
    }
    function closeModal() {
      if (!modal || !modalFrame) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      window.setTimeout(() => {
        modalFrame.src = "about:blank";
      }, 400);
    }

    const onClick = (e) => {
      const openBtn = e.target.closest("[data-wb-open]");
      if (openBtn && root.contains(openBtn)) {
        openModal(openBtn.dataset.wbOpen);
        return;
      }
      const closeBtn = e.target.closest("[data-wb-close]");
      if (closeBtn && modal?.contains(closeBtn)) closeModal();
    };
    const onKey = (e) => {
      if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      prefetchHandlers.forEach(({ article, handler }) =>
        article.removeEventListener("mouseenter", handler)
      );
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="wb-portfolio" id="arbeid" ref={rootRef}>
      <header className="wb-portfolio__head">
        <span className="wb-eyebrow">
          <span className="wb-eyebrow__dot" />
          Levende arbeid · 2024–2026
        </span>
        <h2 className="wb-portfolio__title">
          Nettsteder vi har <em>bygget</em>.<br />
          Trykk på dem.
        </h2>
        <p className="wb-portfolio__lede">
          Fem ekte, kjørbare nettsider — laget for å vise hvordan vi tenker form,
          kode og merke for ulike bransjer. Hver enkelt er ferdig kodet og kan
          kjøres fritt i ny fane.
        </p>
      </header>

      <div className="wb-portfolio__grid">
        {PROJECTS.map((p, i) => {
          const idx = String(i + 1).padStart(2, "0");
          const total = String(PROJECTS.length).padStart(2, "0");
          return (
            <article
              key={p.slug}
              className="wb-case"
              data-wb-slug={p.slug}
              style={{ "--wb-case-accent": p.accent }}
            >
              <div className="wb-case__text">
                <div className="wb-case__num">
                  N° {idx} / {total}
                </div>
                <span className="wb-case__industry">● {p.industry}</span>
                <h3 className="wb-case__title">{p.title}</h3>
                <p className="wb-case__blurb">{p.blurb}</p>
                <div className="wb-case__meta">
                  <div className="wb-case__meta-item">
                    <span className="l">År</span>
                    <span className="v">{p.year}</span>
                  </div>
                  <div className="wb-case__meta-item">
                    <span className="l">Rolle</span>
                    <span className="v">{p.role}</span>
                  </div>
                  <div className="wb-case__meta-item">
                    <span className="l">Stil</span>
                    <span className="v">{p.aesthetic}</span>
                  </div>
                </div>
                <div className="wb-case__actions">
                  <button
                    type="button"
                    className="wb-btn wb-btn--primary"
                    data-wb-open={p.slug}
                  >
                    Se live ↗
                  </button>
                  <a
                    className="wb-btn wb-btn--ghost"
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                  >
                    Åpne i ny fane
                  </a>
                </div>
              </div>
              <div className="wb-case__devices">
                <div className="wb-laptop">
                  <div className="wb-laptop__body">
                    <div className="wb-laptop__screen" data-wb-laptop-slot />
                  </div>
                  <div className="wb-laptop__hinge" />
                </div>
                <div className="wb-phone">
                  <div className="wb-phone__screen" data-wb-phone-slot />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="wb-modal" data-wb-modal aria-hidden="true">
        <div className="wb-modal__backdrop" data-wb-close />
        <div className="wb-modal__shell">
          <div className="wb-modal__bar">
            <span className="wb-modal__brand" data-wb-modal-brand />
            <div className="wb-modal__actions">
              <a
                className="wb-modal__open"
                data-wb-modal-open
                target="_blank"
                rel="noopener"
              >
                Åpne i ny fane ↗
              </a>
              <button
                type="button"
                className="wb-modal__close"
                data-wb-close
                aria-label="Lukk"
              >
                ✕
              </button>
            </div>
          </div>
          <iframe
            className="wb-modal__frame"
            data-wb-modal-frame
            title="Live prototype"
          />
        </div>
      </div>
    </section>
  );
}
