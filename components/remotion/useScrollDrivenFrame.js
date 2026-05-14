"use client";

import { useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function useScrollDrivenFrame(durationInFrames, playerRef, enabled = true) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const frame = useTransform(scrollYProgress, [0, 1], [0, durationInFrames - 1]);

  useMotionValueEvent(frame, "change", (latest) => {
    if (!enabled) return;
    playerRef.current?.seekTo(Math.round(latest));
  });

  return { targetRef, scrollYProgress };
}
