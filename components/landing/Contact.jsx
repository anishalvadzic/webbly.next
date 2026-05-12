"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Check } from "lucide-react";

export default function Contact({ lang }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = {
    no: {
      label: "Kontakt",
      h2: "La oss snakke.",
      sub: "Har du spørsmål? Skriv til oss. Vi svarer innen én virkedag.",
      name: "Ditt navn",
      email: "E-post",
      phone: "Telefonnummer",
      message: "Din melding",
      cta: "Send melding",
      sent: "Melding sendt!",
      sentSub: "Vi tar kontakt snart.",
    },
    en: {
      label: "Contact",
      h2: "Let's talk.",
      sub: "Have questions? Write to us. We reply within one business day.",
      name: "Your name",
      email: "Email address",
      phone: "Phone number",
      message: "Your message",
      cta: "Send Message",
      sent: "Message sent!",
      sentSub: "We'll be in touch soon.",
    },
  }[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server");
      setSent(true);
    } catch {
      setError(lang === "no" ? "Noe gikk galt. Prøv igjen." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-beige-100/60">
      <div className="max-w-xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4"
          >
            {t.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-4"
          >
            {t.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-warm-brown/70"
          >
            {t.sub}
          </motion.p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center bg-white rounded-3xl p-10 border border-beige-200"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-deep-brown mb-2">
              {t.sent}
            </h3>
            <p className="font-body text-sm text-warm-brown/70">{t.sentSub}</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 border border-beige-200 space-y-5 shadow-sm"
          >
            {[
              { key: "name", label: t.name, type: "text" },
              { key: "email", label: t.email, type: "email" },
              { key: "phone", label: t.phone, type: "tel" },
            ].map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`contact-${field.key}`}
                  className="block font-body text-xs font-medium text-warm-brown mb-1.5"
                >
                  {field.label}
                </label>
                <input
                  id={`contact-${field.key}`}
                  type={field.type}
                  required
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.key]: e.target.value }))
                  }
                  className="w-full bg-beige-50 border border-beige-200 rounded-xl px-4 py-3 font-body text-sm text-deep-brown focus:outline-none focus:ring-2 focus:ring-beige-300 transition-shadow"
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="contact-message"
                className="block font-body text-xs font-medium text-warm-brown mb-1.5"
              >
                {t.message}
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full bg-beige-50 border border-beige-200 rounded-xl px-4 py-3 font-body text-sm text-deep-brown resize-none focus:outline-none focus:ring-2 focus:ring-beige-300 transition-shadow"
              />
            </div>
            {error && (
              <p className="text-sm font-body text-red-600 text-center">{error}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-deep-brown text-beige-50 font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-beige-300 border-t-beige-50 rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.cta}
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
