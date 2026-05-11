"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Kudo = {
  kind: "kudo";
  src: string;
  width: number;
  height: number;
  source: string;
  alt: string;
};

type Quote = {
  kind: "quote";
  quote: string;
  attribution: string;
};

type Tile = Kudo | Quote;

/* Span chosen so each piece slots into the bento like a puzzle.
   - wide      → col-span-2 row-span-1   (landscape pieces)
   - tall      → col-span-1 row-span-2   (portrait pieces)
   - square    → col-span-1 row-span-1   (small piece)
   Ordered so `grid-flow: dense` packs them without holes. */
/* Masonry layout (CSS columns) — every card sizes to the image's natural
   aspect ratio, eliminating letterbox. 8 kudos + 3 quotes total; quotes
   interleaved so each column has at least one. CSS columns balance
   automatically with column-fill: balance (default). */
const tiles: Tile[] = [
  {
    kind: "kudo",
    src: "/kudos/kudo-1.png",
    width: 1932,
    height: 999,
    source: "ZoomInfo · MVP wall",
    alt: "ZoomInfo MVP wall calling out Lisha for connecting design, engineering, and product on a complex initiative.",
  },
  {
    kind: "quote",
    quote:
      "Grateful for the engineers who flagged the edge case I never sketched.",
    attribution: "Lisha · gratitude",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-2.png",
    width: 929,
    height: 1444,
    source: "Slack · #product",
    alt: "Tony Tom announcing Lisha's special mention in the product all-hands — congrats from the team.",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-6.png",
    width: 1810,
    height: 1151,
    source: "Slack · Playbook launch",
    alt: "Rohit celebrating the AI Agent playbook launch — 75 reads in a day, calling out Lisha's wacky web ideas.",
  },
  {
    kind: "quote",
    quote:
      "Thankful for every PM who let me sit with the problem before sketching.",
    attribution: "Lisha · gratitude",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-3.png",
    width: 905,
    height: 1077,
    source: "Slack · Q4 chat demo",
    alt: "Hila Nir praising the Q4 chat demo for Lisha and team — 'looking very sharp'.",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-4.png",
    width: 847,
    height: 1373,
    source: "Slack · ZI Script handoff",
    alt: "Lisha posting the ZI Script handoff, with replies from Ayelet Reuben and Arjun Pillai applauding the work.",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-5.png",
    width: 847,
    height: 890,
    source: "Slack · ROI dashboard",
    alt: "Prasanna Venkatesan praising the ROI dashboard and the Slack integration UX in two separate messages.",
  },
  {
    kind: "quote",
    quote:
      "Grateful for the founders who treated design as a question — not a deliverable.",
    attribution: "Lisha · gratitude",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-7.png",
    width: 1805,
    height: 908,
    source: "Slack · BrandMuscle deck",
    alt: "Prasanna Venkatesan recognising Lisha for the BrandMuscle deck and the front-end + design coordination.",
  },
  {
    kind: "kudo",
    src: "/kudos/kudo-8.png",
    width: 2042,
    height: 898,
    source: "Slack · DM",
    alt: "Samuel Sunderaraj sending Lisha a DM saying the deck design looks great. Nice work.",
  },
];

export function TestimonialsRow() {
  return (
    <section
      id="people"
      className="relative overflow-hidden bg-cream py-20 md:py-[120px]"
    >
      {/* Soft accent halo behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,124,183,0.30), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <header className="relative mx-auto mb-10 max-w-[1200px] px-6 md:mb-12 md:px-10">
        <p className="eyebrow text-ink-400">People · Kind Words</p>
        <h2
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(36px, 4.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          From the people I&apos;ve{" "}
          <span className="accent-italic">built with.</span>
        </h2>
        <p className="mt-5 max-w-[600px] font-sans text-[15px] leading-relaxed text-ink-600">
          Slack notes, shout-outs, and quiet wins from teammates and partners
          I&apos;ve shipped beside.
        </p>
      </header>

      <PeopleMarquee />

      {/* Masonry — CSS columns let every card size to its natural aspect
          ratio, so there's no letterbox inside any tile. */}
      <div className="relative mx-auto max-w-[1200px] columns-1 gap-5 px-6 sm:columns-2 md:px-10 lg:columns-3">
        {tiles.map((t, i) =>
          t.kind === "kudo" ? (
            <KudoTile key={t.src} kudo={t} index={i} />
          ) : (
            <QuoteTile key={`q-${i}`} quote={t} index={i} />
          )
        )}
      </div>
    </section>
  );
}

function KudoTile({ kudo, index }: { kudo: Kudo; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.015 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative mb-5 break-inside-avoid"
    >
      <div
        className="relative overflow-hidden rounded-xl border border-ink-200/70 bg-white transition-shadow duration-500 ease-out group-hover:border-ink-400"
        style={{
          boxShadow:
            "0 14px 36px -16px rgba(14,23,41,0.32), 0 2px 6px -2px rgba(14,23,41,0.08)",
        }}
      >
        <Image
          src={kudo.src}
          alt={kudo.alt}
          width={kudo.width}
          height={kudo.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="block h-auto w-full"
        />
      </div>

      <figcaption className="mt-2.5 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
        {kudo.source}
      </figcaption>
    </motion.figure>
  );
}

function QuoteTile({
  quote,
  index,
}: {
  quote: Quote;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.015 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative mb-5 break-inside-avoid"
    >
      <div
        className="relative flex flex-col gap-6 overflow-hidden rounded-xl border border-ink-200/70 bg-white p-7 transition-shadow duration-500 ease-out group-hover:border-ink-400 md:p-8"
        style={{
          boxShadow:
            "0 14px 36px -16px rgba(14,23,41,0.32), 0 2px 6px -2px rgba(14,23,41,0.08)",
        }}
      >
        <span
          aria-hidden
          className="font-display text-[40px] font-bold leading-[0.4] text-accent md:text-[52px]"
        >
          &ldquo;
        </span>
        <blockquote
          className="font-display text-[18px] italic text-ink-800 md:text-[22px]"
          style={{
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {quote.quote}
        </blockquote>
        <figcaption className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
          {quote.attribution}
        </figcaption>
      </div>
    </motion.figure>
  );
}

/* ──────────────── People marquee ──────────────── */

type Person = { name: string; role: string; href: string };

const people: Person[] = [
  {
    name: "Tal Raz",
    role: "CMO · ZoomInfo",
    href: "https://il.linkedin.com/in/tal-raz-46529620",
  },
  {
    name: "Hila Nir",
    role: "Software & Data Leader",
    href: "https://www.linkedin.com/in/hila-nir-226851b",
  },
  {
    name: "Prasanna Venkatesan",
    role: "CEO · Petavue",
    href: "https://www.linkedin.com/in/prasannatl",
  },
  {
    name: "Arjun Pillai",
    role: "CEO · Docket",
    href: "https://www.linkedin.com/in/rarjunpillai",
  },
  {
    name: "Tony Tom",
    role: "CEO · Orca AI",
    href: "https://www.linkedin.com/in/tonytom",
  },
  {
    name: "Rohit Srivastav",
    role: "Head of Marketing · Petavue",
    href: "https://in.linkedin.com/in/rohitsrivastav",
  },
  {
    name: "Vickson Dasan",
    role: "Product Design Lead · Docket",
    href: "https://in.linkedin.com/in/vicksonds",
  },
  {
    name: "Samuel Sunderaraj",
    role: "Petavue",
    href: "https://www.linkedin.com/in/vsamuelsun",
  },
  {
    name: "Ayelet Reuben",
    role: "Global-e",
    href: "https://il.linkedin.com/in/ayelet-reuben-b105817",
  },
];

function PeopleMarquee() {
  // Render the list twice so the loop is seamless.
  const items = [...people, ...people];
  return (
    <div
      className="relative mx-auto mb-12 w-full overflow-hidden md:mb-16"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max gap-3"
        style={{ animation: "scroll-x 60s linear infinite" }}
      >
        {items.map((p, i) => (
          <PersonChip key={`${p.name}-${i}`} person={p} />
        ))}
      </div>
    </div>
  );
}

function PersonChip({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <a
      href={person.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-ink-200/70 bg-white py-2 pl-2 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400"
    >
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-accent"
        style={{ background: "rgba(74,124,183,0.12)" }}
      >
        {initials}
      </span>
      <span className="flex flex-col">
        <span className="whitespace-nowrap font-sans text-[13px] font-medium leading-tight text-ink-900">
          {person.name}
        </span>
        <span className="mt-0.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] leading-tight text-ink-500">
          {person.role}
        </span>
      </span>
    </a>
  );
}
