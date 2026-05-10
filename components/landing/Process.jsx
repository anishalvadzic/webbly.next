"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Palette, Rocket } from "lucide-react";

const steps = (t) => [
  { icon: CalendarCheck, num: "01", title: t.s1title, desc: t.s1desc },
  { icon: Palette, num: "02", title: t.s2title, desc: t.s2desc },
  { icon: Rocket, num: "03", title: t.s3title, desc: t.s3desc },
];

export default function Process({ lang }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const t = {
    no: {
      label: "Slik fungerer det",
      h2: "Online på tre dager. Enkelt og tydelig.",
      s1title: "Velg pakke og book møte",
      s1desc:
        "Velg det abonnementet som passer og book et gratis intromøte rett i kalenderen. Vi setter opp en plan for nettsiden din.",
      s2title: "Vi bygger nettsiden",
      s2desc:
        "Skreddersydd design og innhold basert på din bedrift. Du godkjenner, vi justerer. Ferdig på tre virkedager.",
      s3title: "Du er live. Vi tar oss av resten.",
      s3desc:
        "Nettsiden er oppe og synlig. Vi håndterer sikkerhet, oppdateringer og justeringer månedlig.",
    },
    en: {
      label: "How it works",
      h2: "Online in three days. Simple and clear.",
      s1title: "Choose Plan and Book Meeting",
      s1desc:
        "Pick the subscription that fits and book a free intro meeting right in the calendar. We will map out your website.",
      s2title: "We Build Your Website",
      s2desc:
        "Tailored design and content based on your business. You approve, we adjust. Done in three business days.",
      s3title: "You're Live. We Handle the Rest.",
      s3desc:
        "Your site is up and visible. We manage security, updates, and monthly adjustments.",
    },
  }[lang];

  const stepsData = steps(t);

  return (
    <section id="process" className="py-28 bg-beige-100/60">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={ref} className="text-center mb-20">
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
            transition={{ delay: 0.15 }}
            className="font-display text-4xl md:text-5xl font-semibold text-deep-brown"
            style={{ textWrap: "balance" }}
          >
            {t.h2}
          </motion.h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-beige-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stepsData.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-beige-200 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-warm-brown" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-deep-brown text-beige-50 text-[10px] font-body font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-deep-brown mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-warm-brown/75 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
