"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";

const CYCLE = 5;

function EyesCover() {
  const reduce = useReducedMotion();

  // Look-around cycle: center → left → center → right → center → (blink) → center
  const pupilAnim = reduce
    ? {}
    : { x: ["0%", "-55%", "0%", "55%", "0%", "0%"] };

  const pupilTransition = {
    duration: CYCLE,
    repeat: Infinity,
    times: [0, 0.18, 0.36, 0.54, 0.72, 1],
    ease: [0.32, 0.72, 0, 1],
  };

  // Eyelid wipes shut for ~0.25s near the end
  const lidAnim = reduce ? {} : { scaleY: [0, 0, 1, 0, 0] };
  const lidTransition = {
    duration: CYCLE,
    repeat: Infinity,
    times: [0, 0.82, 0.88, 0.94, 1],
    ease: "easeInOut",
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-beige-100 to-beige-200 flex items-center justify-center gap-6 sm:gap-10 md:gap-12">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-beige-50 border-[4px] sm:border-[5px] md:border-[6px] border-deep-brown overflow-hidden flex items-center justify-center"
        >
          <motion.div
            className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-deep-brown"
            animate={pupilAnim}
            transition={pupilTransition}
          />
          <motion.div
            className="absolute inset-0 bg-deep-brown origin-top"
            initial={{ scaleY: 0 }}
            animate={lidAnim}
            transition={lidTransition}
          />
        </div>
      ))}
    </div>
  );
}

function DomainsCover() {
  const reduce = useReducedMotion();

  // Slot-machine: .no → .com → .net → loop
  const stackAnim = reduce ? {} : { y: ["0rem", "-2rem", "-4rem", "0rem"] };
  const stackTransition = {
    duration: 6,
    repeat: Infinity,
    times: [0, 0.34, 0.67, 1],
    ease: [0.32, 0.72, 0, 1],
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-beige-100 to-beige-200 flex items-center justify-center px-4">
      <div className="bg-beige-50 border border-beige-200 rounded-2xl shadow-sm px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 flex items-center gap-1.5 sm:gap-2 font-mono text-deep-brown text-sm sm:text-base md:text-lg">
        <span className="text-warm-brown/45 hidden sm:inline">https://</span>
        <span>minbedrift</span>

        {/* Rotating suffix */}
        <div className="relative h-8 overflow-hidden" style={{ width: "3.25rem" }}>
          <motion.div animate={stackAnim} transition={stackTransition}>
            <div className="h-8 flex items-center">.no</div>
            <div className="h-8 flex items-center">.com</div>
            <div className="h-8 flex items-center">.net</div>
          </motion.div>
        </div>

        {/* Rotating indicator (✓ for .no, ✗ for .com/.net) */}
        <div className="relative h-8 overflow-hidden w-6">
          <motion.div animate={stackAnim} transition={stackTransition}>
            <div className="h-8 flex items-center justify-center text-emerald-600">
              <Check className="w-5 h-5" strokeWidth={2.6} />
            </div>
            <div className="h-8 flex items-center justify-center text-rose-500">
              <X className="w-5 h-5" strokeWidth={2.6} />
            </div>
            <div className="h-8 flex items-center justify-center text-rose-500">
              <X className="w-5 h-5" strokeWidth={2.6} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BlogCoverAnimation({ variant }) {
  switch (variant) {
    case "eyes":
      return <EyesCover />;
    case "domains":
      return <DomainsCover />;
    default:
      return null;
  }
}
