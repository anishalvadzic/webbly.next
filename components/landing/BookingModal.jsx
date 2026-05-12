"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
} from "lucide-react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
  getDay,
  addDays,
} from "date-fns";
import { nb, enGB } from "date-fns/locale";

const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const TODAY = startOfDay(new Date());

const BOOKED = [
  { date: addDays(TODAY, 1), time: "09:00" },
  { date: addDays(TODAY, 2), time: "14:00" },
  { date: addDays(TODAY, 3), time: "11:00" },
];

function isBooked(date, time) {
  return BOOKED.some((b) => isSameDay(b.date, date) && b.time === time);
}

function isWeekend(date) {
  const d = getDay(date);
  return d === 0 || d === 6;
}

export default function BookingModal({ plan, lang, onClose, onConfirm }) {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState("calendar");
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locale = lang === "no" ? nb : enGB;

  const t = {
    no: {
      title: "Book intromøte",
      plan: "Valgt pakke",
      pickDate: "Velg dato",
      pickTime: "Velg tidspunkt",
      next: "Neste",
      back: "Tilbake",
      confirm: "Bekreft bestilling",
      name: "Ditt navn",
      email: "E-post",
      company: "Bedriftsnavn",
      doneTitle: "Bestilling mottatt!",
      doneDesc:
        "Vi sender deg en bekreftelse på e-post og gleder oss til å snakke med deg.",
      close: "Lukk",
    },
    en: {
      title: "Book Intro Meeting",
      plan: "Selected plan",
      pickDate: "Pick a date",
      pickTime: "Pick a time slot",
      next: "Next",
      back: "Back",
      confirm: "Confirm Booking",
      name: "Your name",
      email: "Email address",
      company: "Company name",
      doneTitle: "Booking received!",
      doneDesc:
        "We'll send you a confirmation email and look forward to speaking with you.",
      close: "Close",
    },
  }[lang];

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });
  const startPad = (getDay(startOfMonth(month)) + 6) % 7;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          plan,
          date: selectedDate.toLocaleDateString("sv-SE"),
          time: selectedTime,
        }),
      });
      if (!res.ok) throw new Error("server");
      setStep("done");
    } catch {
      setError(lang === "no" ? "Noe gikk galt. Prøv igjen." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-deep-brown/30 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-beige-50 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-beige-200">
            <div>
              <h2 className="font-display text-xl font-semibold text-deep-brown">
                {t.title}
              </h2>
              <p className="font-body text-xs text-warm-brown/60 mt-0.5">
                {t.plan}: <strong>{plan}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-beige-200 flex items-center justify-center hover:bg-beige-300 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-warm-brown" />
            </button>
          </div>

          <div className="px-7 py-6">
            {step === "calendar" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                {/* Month nav */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => setMonth((m) => addMonths(m, -1))}
                    className="p-1.5 rounded-full hover:bg-beige-200 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-warm-brown" />
                  </button>
                  <span className="font-body text-sm font-medium text-deep-brown capitalize">
                    {format(month, "MMMM yyyy", { locale })}
                  </span>
                  <button
                    onClick={() => setMonth((m) => addMonths(m, 1))}
                    className="p-1.5 rounded-full hover:bg-beige-200 cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-warm-brown" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-xs font-body text-warm-brown/50 pb-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startPad }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                  {days.map((day) => {
                    const past = isBefore(day, TODAY);
                    const weekend = isWeekend(day);
                    const disabled = past || weekend;
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    return (
                      <button
                        key={day.toString()}
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedTime(null);
                        }}
                        className={`aspect-square rounded-full text-xs font-body transition-colors duration-150 cursor-pointer flex items-center justify-center ${
                          disabled
                            ? "text-beige-300 cursor-not-allowed"
                            : selected
                            ? "bg-deep-brown text-beige-50"
                            : "hover:bg-beige-200 text-warm-brown"
                        }`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-6"
                  >
                    <p className="font-body text-xs font-medium text-warm-brown/60 uppercase tracking-wider mb-3">
                      <Clock className="w-3 h-3 inline mr-1.5" />
                      {t.pickTime}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((slot) => {
                        const booked = isBooked(selectedDate, slot);
                        const sel = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            disabled={booked}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 rounded-xl text-xs font-body transition-colors cursor-pointer ${
                              booked
                                ? "bg-beige-200 text-beige-400 cursor-not-allowed line-through"
                                : sel
                                ? "bg-deep-brown text-beige-50"
                                : "bg-white border border-beige-200 text-warm-brown hover:border-beige-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep("form")}
                  className="w-full mt-6 py-3.5 rounded-xl bg-deep-brown text-beige-50 font-body text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {t.next}
                </button>
              </motion.div>
            )}

            {step === "form" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="bg-beige-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-warm-brown flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium text-deep-brown">
                      {format(selectedDate, "PPPP", { locale })}
                    </p>
                    <p className="font-body text-xs text-warm-brown/60">
                      {selectedTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "name", label: t.name, type: "text" },
                    { key: "email", label: t.email, type: "email" },
                    { key: "company", label: t.company, type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={field.key}
                        className="block font-body text-xs font-medium text-warm-brown mb-1.5"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.key}
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [field.key]: e.target.value }))
                        }
                        className="w-full bg-white border border-beige-200 rounded-xl px-4 py-3 font-body text-sm text-deep-brown placeholder-beige-400 focus:outline-none focus:ring-2 focus:ring-beige-300 transition-shadow"
                        placeholder={field.label}
                      />
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="text-sm font-body text-red-600 text-center mt-2">{error}</p>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep("calendar")}
                    className="flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-beige-200 font-body text-sm text-warm-brown hover:bg-beige-100 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t.back}
                  </button>
                  <button
                    disabled={!form.name || !form.email || loading}
                    onClick={handleSubmit}
                    className="flex-1 py-3.5 rounded-xl bg-deep-brown text-beige-50 font-body text-sm font-medium disabled:opacity-40 hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-beige-300 border-t-beige-50 rounded-full animate-spin" />
                        {lang === "no" ? "Sender…" : "Sending…"}
                      </span>
                    ) : (
                      t.confirm
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5"
                >
                  <Check className="w-8 h-8 text-emerald-600" />
                </motion.div>
                <h3 className="font-display text-2xl font-semibold text-deep-brown mb-3">
                  {t.doneTitle}
                </h3>
                <p className="font-body text-sm text-warm-brown/70 leading-relaxed mb-6">
                  {t.doneDesc}
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 rounded-xl bg-deep-brown text-beige-50 font-body text-sm font-medium hover:bg-warm-brown hover:shadow-lg hover:shadow-deep-brown/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {t.close}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
