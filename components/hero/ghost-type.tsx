"use client";

import { motion, type MotionValue } from "motion/react";

type Props = {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

export function GhostType({ opacity, y }: Props) {
  return (
    <motion.div
      aria-hidden
      style={{ opacity, y, willChange: "transform, opacity" }}
      className="pointer-events-none absolute inset-0 z-[3] hidden md:flex items-center justify-between px-[6vw]"
    >
      <span
        className="font-display font-bold text-white/10 leading-[0.85] tracking-[-0.04em] uppercase"
        style={{ fontSize: "clamp(70px, 10vw, 160px)" }}
      >
        Senior
        <br />
        Designer
      </span>
      <span
        className="font-display font-bold text-white/10 leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: "clamp(70px, 10vw, 160px)" }}
      >
        0→1
      </span>
    </motion.div>
  );
}
