"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/* Hashes are prefixed with `/` so the links work from any page —
   on the home route they scroll to the section; from a case study
   page they navigate home and then scroll. */
const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Tools", href: "/#tools" },
  { label: "People", href: "/#people" },
];

const socials: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
}[] = [
  {
    label: "Dribbble",
    href: "https://dribbble.com/lisha01",
    Icon: DribbbleIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lisha-lokwani-39b01518b/",
    Icon: LinkedInIcon,
  },
  {
    label: "Medium",
    href: "https://medium.com/@lishalokwani444",
    Icon: MediumIcon,
  },
];

function DribbbleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.4 2.6c2.4 2.9 4.6 8.4 5.2 17.2" />
      <path d="M21.6 9.4c-7.2 0-15.5.8-18.4 7.2" />
      <path d="M17.8 19.8c-1.2-5.7-3.6-10.4-7.6-13.6" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 17.4H5.5v-7H8v7Zm-1.25-8.1a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM18.5 17.4H16V13.7c0-.95-.02-2.18-1.33-2.18-1.34 0-1.54 1.04-1.54 2.11v3.77H10.6v-7h2.42v.96h.03a2.65 2.65 0 0 1 2.39-1.31c2.55 0 3.02 1.68 3.02 3.86v3.49Z" />
    </svg>
  );
}

function MediumIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <ellipse cx="6.5" cy="12" rx="5.5" ry="6" />
      <ellipse cx="16.5" cy="12" rx="2.2" ry="6" />
      <ellipse cx="22" cy="12" rx="1" ry="6" />
    </svg>
  );
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open and listen for Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the panel on open; return on close.
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      "a, button"
    );
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        "backdrop-blur-md bg-white/55",
        scrolled && "border-b border-ink-200/40"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
        {/* Wordmark — always returns to home */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="block h-3 w-3 rounded-full bg-gradient-to-br from-sky-600 to-accent-deep shadow-[0_0_0_1px_rgba(255,255,255,0.6)_inset]"
          />
          <span className="font-display text-[18px] tracking-tight text-ink-900">
            <span className="font-medium">Lisha</span>{" "}
            <span className="font-normal italic text-ink-600">Lokwani</span>
          </span>
        </Link>

        {/* Center links — each navigates to home + scrolls to its section */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => track("Nav Link Click", { label: l.label, href: l.href, location: "header" })}
              className="group relative text-[13px] font-medium text-ink-800"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink-900 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right group — socials + status pill */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Résumé (desktop) */}
          <a
            href="https://lisharesume.tiiny.site/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Resume Click", { location: "header" })}
            className="hidden min-h-9 items-center rounded-full px-3 text-[13px] font-medium text-ink-800 transition-colors hover:bg-ink-900/5 md:inline-flex"
          >
            Résumé
          </a>

          {/* Socials (desktop) */}
          <div className="hidden items-center gap-1 lg:flex">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onClick={() => track("Social Link Click", { label: s.label, href: s.href, location: "header" })}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900 transition-all hover:bg-ink-900/5 hover:text-accent"
              >
                <s.Icon size={20} />
              </a>
            ))}
            <span aria-hidden className="mx-2 h-4 w-px bg-ink-300" />
          </div>

          {/* Open to work pill */}
          <Link
            href="/#contact"
            onClick={() => track("Open To Work Click", { location: "header" })}
            className="group relative inline-flex min-h-9 items-center gap-2 rounded-full bg-ink-900 px-3.5 py-1.5 text-[12px] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-[#4ADE80]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
            </span>
            <span className="hidden sm:inline">Open to work</span>
            <span className="sm:hidden">Open</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 md:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile drawer — slides in below md. Rendered OUTSIDE the header so
        the header's backdrop-filter doesn't create a containing block that
        clips the drawer's `position: fixed inset-0` to the header height. */}
      <div
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Panel */}
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-200/60 px-6 py-4">
            <span className="font-display text-[18px] tracking-tight text-ink-900">
              <span className="font-medium">Lisha</span>{" "}
              <span className="font-normal italic text-ink-600">Lokwani</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => {
                  setMenuOpen(false);
                  track("Nav Link Click", { label: l.label, href: l.href, location: "mobile-drawer" });
                }}
                className="flex min-h-11 items-center rounded-lg px-3 font-display text-[20px] tracking-tight text-ink-900 transition-colors hover:bg-ink-900/5"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://lisharesume.tiiny.site/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMenuOpen(false);
                track("Resume Click", { location: "mobile-drawer" });
              }}
              className="flex min-h-11 items-center rounded-lg px-3 font-display text-[20px] tracking-tight text-ink-900 transition-colors hover:bg-ink-900/5"
            >
              Résumé
            </a>
          </nav>

          <div className="mt-auto border-t border-ink-200/60 px-6 py-5">
            <p className="eyebrow text-ink-400">Find me on</p>
            <div className="mt-3 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onClick={() => track("Social Link Click", { label: s.label, href: s.href, location: "mobile-drawer" })}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-all hover:bg-ink-900/5 hover:text-accent"
                >
                  <s.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
