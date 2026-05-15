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
      "Slik kan vi bygge for ditt håndverkerbedrift: klare priser, raskt tilbudsskjema og en transparent prosessguide som bygger tillit fra første klikk.",
    url: "/work/rorstad/",
    accent: "#1267d6",
    type: "Lead-gen · Håndverk",
    includes: "Tilbudsskjema, priser, Google Maps",
  },
  {
    slug: "nordlys",
    brand: "Studio Nordlys",
    industry: "Arkitektur · Interiør",
    aesthetic: "Editorial · Magasin",
    title: "Hus skal holdes vakkert",
    blurb:
      "En redaksjonell portefølje for arkitekter og designere — kremfarget papir, mono-typografi og fullskjerm prosjektvisninger som lar arbeidet snakke.",
    url: "/work/nordlys/",
    accent: "#b85432",
    type: "Editorial portefølje",
    includes: "Prosjekt-galleri, fullskjerm, presse",
  },
  {
    slug: "klang",
    brand: "Klang & Form",
    industry: "Kreativt byrå · SaaS",
    aesthetic: "WebGL · Mørkt studio",
    title: "Vi bygger nettsteder som gløder",
    blurb:
      "Awwwards-nivå studioside med levende WebGL-hero som følger musa, magnetiske knapper og curtain-overganger — for deg som vil skille deg ut.",
    url: "/work/klang/",
    accent: "#c5fa3a",
    type: "Studio · WebGL",
    includes: "WebGL-hero, magnetiske knapper, motion",
  },
  {
    slug: "voern",
    brand: "Atelier Vœrn",
    industry: "Mote · E-handel",
    aesthetic: "Glassmorfisme · Mørk luksus",
    title: "Stoffer som husker deg",
    blurb:
      "For luksusvaremerker og direct-to-consumer mote: drivende blob-gradienter bak frostede produktkort, egen markør og gull-accenter.",
    url: "/work/voern/",
    accent: "#c9a961",
    type: "E-handel · Luksus",
    includes: "Produktkort, glassmorfisme, gull",
  },
  {
    slug: "bjork",
    brand: "Bjørk & Brød",
    industry: "Restaurant · Kafé",
    aesthetic: "Scandi soft · Varm",
    title: "Brød fra i går, kaffe fra i dag",
    blurb:
      "For restauranter og kaféer: organiske former, varm terrakotta-palett og ekte reservasjonsflyt som faktisk konverterer.",
    url: "/work/bjork/",
    accent: "#c4623e",
    type: "Restaurant · Bordbestilling",
    includes: "Reservasjon, meny, åpningstider",
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

    function unmountIframes(article) {
      if (article.dataset.wbMounted !== "1") return;
      try {
        const slots = article.querySelectorAll(
          "[data-wb-laptop-slot], [data-wb-phone-slot]"
        );
        slots.forEach((slot) => {
          const f = slot.querySelector("iframe");
          if (f) {
            try {
              f.src = "about:blank";
            } catch (_) {}
            f.remove();
          }
        });
        article.classList.remove("is-loaded");
        article.dataset.wbMounted = "0";
      } catch (_) {
        /* never let unmount errors propagate */
      }
    }

    // Queue so only one iframe set boots at a time — prevents the burst on
    // fast scroll that crashes iOS Chrome (5 iframes + Three.js WebGL +
    // rAF cursor loops all booting simultaneously).
    const mountQueue = [];
    let mountInFlight = false;

    function processQueue() {
      if (mountInFlight) return;
      const next = mountQueue.shift();
      if (!next) return;
      if (!next.isConnected || next.dataset.wbMounted === "1") {
        processQueue();
        return;
      }
      mountInFlight = true;

      try {
        next.dataset.wbMounted = "1";
        const slug = next.dataset.wbSlug;
        const p = PROJECTS.find((x) => x.slug === slug);
        if (!p) {
          mountInFlight = false;
          processQueue();
          return;
        }

        const laptopSlot = next.querySelector("[data-wb-laptop-slot]");
        const phoneSlot = next.querySelector("[data-wb-phone-slot]");
        if (!laptopSlot || !phoneSlot) {
          mountInFlight = false;
          processQueue();
          return;
        }

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

        let released = false;
        const release = () => {
          if (released) return;
          released = true;
          mountInFlight = false;
          processQueue();
        };

        laptopFrame.addEventListener("load", () => {
          try {
            hideScrollbar(laptopFrame);
            fitIframe(laptopFrame, LAPTOP_NATIVE);
          } catch (_) {}
        });
        phoneFrame.addEventListener("load", () => {
          try {
            hideScrollbar(phoneFrame);
            fitIframe(phoneFrame, PHONE_NATIVE);
            next.classList.add("is-loaded");
          } catch (_) {}
          // Release the queue once the second iframe is on screen.
          release();
        });

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            try {
              fitIframe(laptopFrame, LAPTOP_NATIVE);
              fitIframe(phoneFrame, PHONE_NATIVE);
              next.classList.add("is-loaded");
            } catch (_) {}
          })
        );

        // Failsafe: even if loads never fire (network hang) release queue
        // after 4s so the rest can keep mounting.
        setTimeout(release, 4000);
      } catch (_) {
        mountInFlight = false;
        processQueue();
      }
    }

    function queueMount(article) {
      if (article.dataset.wbMounted === "1") return;
      if (mountQueue.includes(article)) return;
      mountQueue.push(article);
      processQueue();
    }

    // Mount when card is reasonably close to viewport — not aggressively
    // pre-loading.
    const mountIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            queueMount(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -120px 0px" }
    );
    cards.forEach((c) => mountIO.observe(c));

    // Unmount iframes that are 2 viewports away — frees memory on long pages
    // and prevents the WebGL/rAF loads from staying live forever.
    const unmountIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.target.dataset.wbMounted === "1") {
            unmountIframes(entry.target);
          }
        });
      },
      { rootMargin: "200% 0px 200% 0px" }
    );
    cards.forEach((c) => unmountIO.observe(c));

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
      mountIO.disconnect();
      unmountIO.disconnect();
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
          Eksempler · Inspirasjon
        </span>
        <h2 className="wb-portfolio__title">
          Se hva vi kan <em>bygge</em><br />
          for deg.
        </h2>
        <p className="wb-portfolio__lede">
          Fem ekte, kjørbare eksempler — for å vise hva vi kan bygge for ulike
          bransjer. Trykk på dem for å se hvordan vi tenker form, kode og merke.
          Alt kan tilpasses din bedrift.
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
                    <span className="l">Type</span>
                    <span className="v">{p.type}</span>
                  </div>
                  <div className="wb-case__meta-item">
                    <span className="l">Inkluderer</span>
                    <span className="v">{p.includes}</span>
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
