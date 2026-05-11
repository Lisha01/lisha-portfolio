"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Entry = {
  company: string;
  sub?: string;
  url?: string;
  dates: string;
  summary: string;
};

const experience: Entry[] = [
  {
    company: "Petavue",
    url: "https://petavue.com",
    dates: "Jan 2024 — Present",
    summary:
      "Founding team member and first product team hire. Led 0→1 design, planning, and prototyping (architecture, systems, UX) while partnering closely with founders to transform ambiguous challenges into clear, scalable product solutions. Built and led a high-performing product team alongside co-founders and PMs, driving subsequent releases with enhanced features and scalability.",
  },
  {
    company: "ZoomInfo",
    sub: "(after acquisition of Insent)",
    url: "https://www.zoominfo.com",
    dates: "Dec 2020 — Dec 2023",
    summary:
      "Core team member shaping product design vision pre- and post-acquisition. Led the redesign of Insent's platform, MS Teams, and Slack integrations to align with ZoomInfo's multi-vertical, persona-driven use cases. Improved Ringlead Routing UX. Worked with US and Israel teams on FormComplete UX while leading Chat design. Designed the ZoomInfo Script — an admin setting that streamlined management of FormComplete, Website, and Chat features.",
  },
  {
    company: "Eleve Media",
    url: "https://www.eleve.co",
    dates: "Oct 2019 — Nov 2020",
    summary:
      "Designed end-to-end product experiences for brand-influencer collaboration across web and mobile. Created a web solution for brands to define campaigns, budgets, and target audiences; built a mobile experience for influencers to discover opportunities and manage collaboration decisions.",
  },
  {
    company: "BharatAgri",
    dates: "Mar 2019 — Sept 2019",
    summary:
      "Designed a localized mobile app for farmers, supporting multiple regional languages to boost accessibility and usability. Collaborated with ground teams to assess digital literacy levels and translate real-world insights into simple, intuitive user experiences.",
  },
];

export function ExperienceTimeline() {
  const olRef = useRef<HTMLOListElement>(null);
  const firstDotRef = useRef<HTMLSpanElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);

  const [bounds, setBounds] = useState({ top: 0, height: 0 });

  // Measure the rail's start (first dot center) and total height (to last dot center).
  useEffect(() => {
    const measure = () => {
      const ol = olRef.current;
      const first = firstDotRef.current;
      const last = lastDotRef.current;
      if (!ol || !first || !last) return;

      const olRect = ol.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const top = firstRect.top - olRect.top + firstRect.height / 2;
      const bottom = lastRect.top - olRect.top + lastRect.height / 2;

      setBounds({ top, height: bottom - top });
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (olRef.current) observer.observe(olRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const reduced = useReducedMotion();

  // Scroll progress through the timeline — starts as the section enters the
  // bottom of the viewport, completes as it leaves the top.
  const { scrollYProgress } = useScroll({
    target: olRef,
    offset: ["start 80%", "end 40%"],
  });

  const scrollFill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const staticFill = useMotionValue(1);
  const fillScaleY = reduced ? staticFill : scrollFill;

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-[120px]"
    >
      <header className="mb-12 max-w-[680px] md:mb-16">
        <p className="eyebrow text-ink-400">Experience · Beyond Titles</p>
        <h2
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(36px, 4.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Where I&apos;ve <span className="accent-italic">built.</span>
        </h2>
      </header>

      <ol
        ref={olRef}
        className="relative [--rail-x:3.5px] md:[--rail-x:calc(160px+40px+4px-0.5px)]"
      >
        {experience.map((e, i) => (
          <li key={e.company} className="relative flex gap-6 pb-12 md:gap-10">
            {/* Date rail (desktop only) */}
            <div className="relative hidden w-[160px] flex-shrink-0 pt-1 md:block">
              <p className="eyebrow text-ink-400">{e.dates}</p>
            </div>

            {/* Dot + continuous connector rail */}
            <div className="relative flex w-2 flex-shrink-0 flex-col items-center">
              {/* Top segment — from row top up to the dot's center */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink-200"
                />
              )}
              {/* Bottom segment — from dot center through this row's pb-12 */}
              {i < experience.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-3 w-px -translate-x-1/2 bg-ink-200"
                  style={{ bottom: "-3rem" }}
                />
              )}
              {/* Dot — masks the rail behind via its cream ring */}
              <span
                ref={
                  i === 0
                    ? firstDotRef
                    : i === experience.length - 1
                    ? lastDotRef
                    : undefined
                }
                className="relative z-10 mt-2 block h-2 w-2 rounded-full bg-accent ring-4 ring-cream"
              />
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              {/* Date for mobile */}
              <p className="eyebrow mb-2 text-ink-400 md:hidden">{e.dates}</p>

              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2"
                >
                  <h3 className="font-display text-[20px] font-medium tracking-tight text-ink-900 transition-colors group-hover:text-accent md:text-[24px]">
                    {e.company}
                  </h3>
                  {e.sub && (
                    <span className="font-sans text-[13px] italic text-ink-400">
                      {e.sub}
                    </span>
                  )}
                  <ArrowUpRight
                    size={14}
                    className="text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              ) : (
                <div className="inline-flex items-baseline gap-2">
                  <h3 className="font-display text-[20px] font-medium tracking-tight text-ink-900 md:text-[24px]">
                    {e.company}
                  </h3>
                  {e.sub && (
                    <span className="font-sans text-[13px] italic text-ink-400">
                      {e.sub}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-3 max-w-[760px] font-sans text-[15px] leading-relaxed text-ink-600">
                {e.summary}
              </p>
            </div>
          </li>
        ))}

        {/* Animated accent rail — rendered last so it stacks above the
            static gray segments. The dots (z-10) still sit on top and
            their cream ring masks the rail cleanly at each station. */}
        <motion.span
          aria-hidden
          className="absolute w-px origin-top bg-accent"
          style={{
            left: "var(--rail-x)",
            top: bounds.top,
            height: bounds.height,
            scaleY: fillScaleY,
            zIndex: 5,
          }}
        />
      </ol>
    </section>
  );
}
