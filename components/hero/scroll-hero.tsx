"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { PointerLabel } from "./pointer-label";
import { IntroVoiceButton } from "./intro-voice-button";

const SKY_GRADIENT =
  "linear-gradient(180deg, #1E3A6B 0%, #335C99 12%, #4A7CB7 28%, #77A9DA 50%, #BECFE1 75%, #EEEFF3 100%)";

export function ScrollHero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        scrollYProgress.set(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      scrollYProgress.set(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  /* Reduced motion: collapse outputs so backdrop/headline don't drift
     and every reveal target snaps to its end state. */
  const revealed: [number, number] = reduced ? [1, 1] : [0, 1];
  const liftedFlat: [number, number] = reduced ? [0, 0] : [10, 0];
  const subjLifted: [number, number] = reduced ? [0, 0] : [24, 0];
  const subjGrown: [number, number] = reduced ? [1, 1] : [0.96, 1];
  const drawDone: [number, number] = reduced ? [0, 0] : [1, 0];
  const driftStill: [number, number] = reduced ? [0, 0] : [0, -30];
  const zoomStill: [number, number] = reduced ? [1, 1] : [1, 1.04];

  /* Headline: drift up, fade slightly at the very end */
  const headlineY = useTransform(scrollYProgress, [0, 1], driftStill);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [1, 1, reduced ? 1 : 0.85]
  );

  /* Sky backdrop: subtle zoom-in */
  const backdropScale = useTransform(scrollYProgress, [0, 1], zoomStill);

  /* Continuous reveal sequence:
     Phase 1 (0    → 0.20) Photo fades in  +  top-left label
     Phase 2 (0.22 → 0.45) Top-right label
     Phase 3 (0.47 → 0.70) Bottom-left label
     Phase 4 (0.72 → 0.95) Bottom-right label
  */
  const subjectOpacity = useTransform(scrollYProgress, [0, 0.2], revealed);
  const subjectY = useTransform(scrollYProgress, [0, 0.2], subjLifted);
  const subjectScale = useTransform(scrollYProgress, [0, 0.2], subjGrown);

  const a1Op = useTransform(scrollYProgress, [0, 0.2], revealed);
  const a1Y = useTransform(scrollYProgress, [0, 0.2], liftedFlat);
  const l1 = useTransform(scrollYProgress, [0, 0.24], drawDone);

  const a2Op = useTransform(scrollYProgress, [0.22, 0.45], revealed);
  const a2Y = useTransform(scrollYProgress, [0.22, 0.45], liftedFlat);
  const l2 = useTransform(scrollYProgress, [0.22, 0.5], drawDone);

  const a3Op = useTransform(scrollYProgress, [0.47, 0.7], revealed);
  const a3Y = useTransform(scrollYProgress, [0.47, 0.7], liftedFlat);
  const l3 = useTransform(scrollYProgress, [0.47, 0.74], drawDone);

  const a4Op = useTransform(scrollYProgress, [0.72, 0.95], revealed);
  const a4Y = useTransform(scrollYProgress, [0.72, 0.95], liftedFlat);
  const l4 = useTransform(scrollYProgress, [0.72, 0.98], drawDone);

  /* Scroll hint: only visible at the very top */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[200vh] md:h-[280vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1 — Sky rectangle backdrop */}
        <motion.div
          aria-hidden
          style={{ scale: backdropScale, background: SKY_GRADIENT }}
          className="absolute inset-4 z-[1] rounded-3xl"
        >
          <div className="grain-overlay absolute inset-0 rounded-3xl opacity-25" />
        </motion.div>

        {/* Layer 6 — Subject (Lisha portrait): centered below the CTA */}
        <motion.div
          style={{
            y: subjectY,
            scale: subjectScale,
            opacity: subjectOpacity,
            willChange: "transform, opacity",
          }}
          className="absolute inset-x-0 top-[calc(40vh+48px)] z-[5] flex justify-center"
        >
          <Image
            src="/lisha-portrait.png"
            alt="Lisha Lokwani"
            width={1999}
            height={1333}
            priority
            sizes="(max-width: 768px) 80vw, 60vw"
            className="h-auto w-[78vw] max-w-[520px] select-none md:h-[calc(54vh+40px)] md:w-auto md:max-w-none"
            style={{ filter: "drop-shadow(0 30px 60px rgba(14,23,41,0.45))" }}
            draggable={false}
          />
        </motion.div>

        {/* Layer 5 — Pointer labels at the four corners around the photo.
            Each leader line bends once and ends in an arrow pointing into the figure. */}

        {/* P1 — top-left: drops down, runs right with ▶ pointing at figure */}
        <PointerLabel
          lines={["7+", "YEARS OF", "EXPERIENCE"]}
          className="top-[calc(36vh-2px)] left-[calc(7%-2px)]"
          align="left"
          svgPoints="4,0 4,40 270,40"
          svgWidth={290}
          svgHeight={60}
          svgPosition="absolute top-full left-0 mt-3"
          arrow="right"
          opacity={a1Op}
          y={a1Y}
          draw={l1}
        />

        {/* P2 — top-right: drops down, runs left with ◀ */}
        <PointerLabel
          lines={["18+", "0→1 PRODUCTS", "BUILT"]}
          className="top-[calc(36vh-2px)] right-[calc(7%-2px)]"
          align="right"
          svgPoints="286,0 286,40 20,40"
          svgWidth={290}
          svgHeight={60}
          svgPosition="absolute top-full right-0 mt-3"
          arrow="left"
          opacity={a2Op}
          y={a2Y}
          draw={l2}
        />

        {/* P3 — bottom-left: runs up, then right with ▶ */}
        <PointerLabel
          lines={["2+", "YEARS IN AI", "PRODUCTS"]}
          className="top-[calc(86vh+2px)] left-[calc(7%-2px)]"
          align="left"
          svgPoints="4,56 4,16 270,16"
          svgWidth={290}
          svgHeight={60}
          svgPosition="absolute bottom-full left-0 mb-3"
          arrow="right"
          color="#65A0DA"
          noShadow
          opacity={a3Op}
          y={a3Y}
          draw={l3}
        />

        {/* P4 — bottom-right: runs up, then left with ◀ */}
        <PointerLabel
          lines={["∞", "ITERATIONS", "(& COUNTING) 😉"]}
          className="top-[calc(86vh+2px)] right-[calc(7%-2px)]"
          align="right"
          svgPoints="286,56 286,16 20,16"
          svgWidth={290}
          svgHeight={60}
          svgPosition="absolute bottom-full right-0 mb-3"
          arrow="left"
          color="#65A0DA"
          noShadow
          opacity={a4Op}
          y={a4Y}
          draw={l4}
        />

        {/* Layer 7 — Grain overlay over everything */}
        <div
          aria-hidden
          className="grain-overlay pointer-events-none absolute inset-4 z-[9] rounded-3xl opacity-30"
        />

        {/* Layer 2 — Headline + CTA, top of stack */}
        <motion.div
          style={{
            y: headlineY,
            opacity: headlineOpacity,
            willChange: "transform, opacity",
          }}
          className="absolute inset-x-0 top-[calc(7vh+48px)] z-10 flex flex-col items-center px-6 text-center md:top-[calc(8vh+48px)]"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/85">
              Senior Product Designer · AI &amp; Data
            </span>
          </div>

          {/* H1 */}
          <h1
            className="mt-5 max-w-[14ch] font-display font-normal text-white leading-[1.0]"
            style={{
              fontSize: "clamp(34px, 4.6vw, 64px)",
              letterSpacing: "-0.035em",
              textShadow: "0 2px 30px rgba(14,23,41,0.25)",
            }}
          >
            Designing{" "}
            <span className="accent-italic" style={{ color: "#A8C4DE" }}>
              clarity
            </span>{" "}
            into complex products.
          </h1>

          {/* CTA — audio intro */}
          <IntroVoiceButton />
        </motion.div>

        {/* Scroll hint — uses the same sky tone as the bottom pointer pills
            so it stays legible over the lower light area of the gradient. */}
        <motion.div
          style={{ opacity: hintOpacity, color: "#65A0DA" }}
          className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em]">
            Scroll to reveal
          </span>
          <span
            className="animate-bob block h-5 w-px"
            style={{ background: "#65A0DA" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
