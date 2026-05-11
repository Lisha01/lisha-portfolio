import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { FigmaIcon } from "./tool-icons";

export type MetaItem = { label: string; value: string };

export type CaseStudyLink = {
  label: string;
  href: string;
  icon?: "figma" | "live";
};

export function CaseStudyHero({
  eyebrow,
  title,
  intro,
  links,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  links?: CaseStudyLink[];
}) {
  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-[1080px]">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-600 transition-colors hover:text-accent"
        >
          <ArrowLeft
            size={12}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          <span>Back to work</span>
        </Link>

        <p className="eyebrow mt-10 text-accent">{eyebrow}</p>
        <h1
          className="mt-5 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(40px, 5.6vw, 80px)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </h1>
        <p className="mt-8 max-w-[680px] font-sans text-[16px] leading-relaxed text-ink-600 md:text-[18px] lg:text-[19px]">
          {intro}
        </p>

        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 font-sans text-[14px] font-medium text-ink-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-ink-400"
              >
                {link.icon === "figma" ? (
                  <FigmaIcon size={14} />
                ) : link.icon === "live" ? (
                  <ExternalLink size={14} className="text-ink-600" />
                ) : null}
                <span>{link.label}</span>
                <ArrowUpRight
                  size={14}
                  className="text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function MetaStrip({ items }: { items: MetaItem[] }) {
  const cols =
    items.length === 4
      ? "grid-cols-2 md:grid-cols-4"
      : items.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";
  return (
    <section className="border-y border-ink-200/60 bg-white px-6 py-10 md:px-10">
      <div className={`mx-auto grid max-w-[1080px] gap-6 sm:gap-8 ${cols}`}>
        {items.map((m) => (
          <div key={m.label}>
            <p className="eyebrow text-ink-400">{m.label}</p>
            <p className="mt-3 font-sans text-[15px] font-medium text-ink-900">
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HeroVisual({
  src,
  alt,
  width,
  height,
  caption,
  placeholderLabel,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  placeholderLabel?: string;
}) {
  return (
    <section className="px-6 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1080px]">
        <figure className="relative overflow-hidden rounded-2xl border border-ink-200/60 bg-sky-100 shadow-[0_30px_80px_-30px_rgba(14,23,41,0.25)] md:rounded-3xl">
          {src && width && height && alt ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
              className="block h-auto w-full"
            />
          ) : (
            <div className="relative aspect-[16/9]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[40px] font-normal italic text-sky-700/60 sm:text-[64px] md:text-[96px]">
                  {placeholderLabel}
                </span>
              </div>
              <div className="grain-overlay absolute inset-0 opacity-20" />
            </div>
          )}
        </figure>
        {caption && (
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            {caption}
          </figcaption>
        )}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <p className="eyebrow text-ink-400">{eyebrow}</p>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-normal text-ink-900"
      style={{
        fontSize: "clamp(30px, 3.6vw, 48px)",
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h2>
  );
}

export function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 max-w-[680px] font-sans text-[16px] leading-relaxed text-ink-600 md:text-[17px]">
      {children}
    </p>
  );
}

export function InsightCallout({
  eyebrow,
  children,
  source,
}: {
  eyebrow: string;
  children: React.ReactNode;
  source?: string;
}) {
  return (
    <section className="px-6 pb-16 md:px-10">
      <div className="mx-auto max-w-[1080px]">
        <figure className="relative overflow-hidden rounded-3xl bg-accent p-10 text-white md:p-14">
          <p className="eyebrow text-white/60">{eyebrow}</p>
          <blockquote
            className="mt-6 font-display font-normal leading-[1.15]"
            style={{
              fontSize: "clamp(28px, 3.4vw, 44px)",
              letterSpacing: "-0.015em",
            }}
          >
            {children}
          </blockquote>
          {source && (
            <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              {source}
            </figcaption>
          )}
          <div className="grain-overlay pointer-events-none absolute inset-0 opacity-15" />
        </figure>
      </div>
    </section>
  );
}

export type FeatureItem = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  body: string;
};

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {items.map((f) => (
        <article
          key={f.title}
          className="rounded-2xl border border-ink-200/60 bg-white p-7"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-accent">
            <f.icon size={18} />
          </div>
          <h3 className="mt-6 font-display text-[20px] font-medium leading-tight tracking-tight text-ink-900 md:text-[22px]">
            {f.title}
          </h3>
          <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-600">
            {f.body}
          </p>
        </article>
      ))}
    </div>
  );
}

export type DecisionItem = { eyebrow: string; title: string; body: string };

export function DecisionGrid({ items }: { items: DecisionItem[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-200/60 bg-ink-200/60 md:grid-cols-3">
      {items.map((d) => (
        <div key={d.eyebrow} className="bg-white p-7 md:p-8">
          <p className="eyebrow text-accent">{d.eyebrow}</p>
          <h3 className="mt-5 font-display text-[20px] font-medium leading-tight tracking-tight text-ink-900 md:text-[22px]">
            {d.title}
          </h3>
          <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-600">
            {d.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NextUpCTA() {
  return (
    <section className="border-t border-ink-200/60 bg-white px-6 py-20 md:px-10 md:py-[120px]">
      <div className="mx-auto flex max-w-[1080px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-ink-400">Up next</p>
          <h2
            className="mt-4 font-display font-normal text-ink-900"
            style={{
              fontSize: "clamp(32px, 3.6vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            More <span className="accent-italic">case studies</span>{" "}
            in progress.
          </h2>
        </div>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream px-5 py-3 font-sans text-[14px] font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:border-ink-400"
        >
          <span>See all work</span>
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
