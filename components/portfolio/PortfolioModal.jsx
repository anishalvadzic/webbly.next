"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

const EASE = [0.32, 0.72, 0, 1];

export default function PortfolioModal({ data, onClose }) {
  useEffect(() => {
    if (!data) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
        >
          <button
            type="button"
            aria-label="Lukk"
            onClick={onClose}
            className="absolute inset-0 bg-deep-brown/80 backdrop-blur-xl cursor-default"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-[1400px] h-full max-h-[92vh] rounded-2xl bg-beige-50 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-deep-brown/10 bg-beige-100/80 backdrop-blur-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: data.accent }}
                />
                <span className="font-display text-base md:text-lg text-deep-brown truncate">
                  {data.brand}
                </span>
                <span className="hidden md:inline text-xs text-warm-brown/55 truncate">
                  · {data.industry}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener"
                  className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-deep-brown bg-white border border-deep-brown/10 px-3 py-1.5 rounded-full hover:bg-beige-50 transition-colors duration-200"
                >
                  Åpne i ny fane
                  <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Lukk"
                  className="w-8 h-8 rounded-full bg-white border border-deep-brown/10 text-deep-brown hover:bg-beige-100 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
            <iframe
              src={data.url}
              title={`${data.brand} — live prototype`}
              className="flex-1 w-full bg-white"
              loading="eager"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
