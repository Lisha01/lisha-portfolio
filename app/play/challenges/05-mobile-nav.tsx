"use client";

import { ChevronRight, MoreVertical, ShoppingBag, Star } from "lucide-react";

function MobileNavMockup() {
  return (
    <div className="bg-cream/40 p-6 sm:p-10">
      <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] border border-ink-200/70 bg-white shadow-[0_18px_40px_-18px_rgba(14,23,41,0.35)]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-2 font-mono text-[10px] text-ink-600">
          <span>9:41</span>
          <span aria-hidden>•••</span>
        </div>

        {/* Top nav */}
        <div className="flex items-center justify-between border-b border-ink-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <span aria-hidden className="block h-5 w-5 rounded-md bg-ink-900" />
            <span className="font-display text-[15px] font-medium text-ink-900">
              Parallax
            </span>
          </div>
          {/*
            THE FLAW — ambiguous menu trigger.
            A vertical kebab (three stacked dots) is the universal mobile
            convention for "more actions on this item." Used as the
            primary navigation, users either ignore it or expect
            contextual options, not a site menu.
          */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Menu"
            data-flaw="true"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Hero */}
        <div className="px-5 pt-5">
          <p className="eyebrow text-ink-400">New arrivals</p>
          <h1 className="mt-2 font-display text-[22px] font-normal leading-tight tracking-tight text-ink-900">
            Soft tailoring for spring.
          </h1>
        </div>

        {/* Product grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 px-5 pb-5">
          {[
            { name: "Linen blazer", price: "$148", rating: "4.8" },
            { name: "Cropped trouser", price: "$96", rating: "4.6" },
          ].map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-xl border border-ink-200/60 bg-white"
            >
              <div className="aspect-square bg-sky-100" />
              <div className="p-3">
                <p className="font-sans text-[12px] font-medium text-ink-900">
                  {p.name}
                </p>
                <p className="mt-0.5 font-sans text-[12px] text-ink-500">
                  {p.price}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] text-ink-400">
                  <Star size={10} className="text-accent" /> {p.rating}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-ink-200/60 px-5 py-3">
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-ink-900"
          >
            <ShoppingBag size={14} />
            View bag
          </button>
          <ChevronRight size={16} className="text-ink-400" />
        </div>
      </div>
    </div>
  );
}

export const challenge = {
  id: "mobile-nav-ambiguous-icon",
  title: "Mobile Shop",
  sin: "Ambiguous menu icon",
  explanation:
    "A vertical kebab (three stacked dots) is the standard mobile convention for 'more actions on this item.' Promoting it to the primary site-menu trigger breaks user habit — most people will scroll past it expecting contextual options, not the main navigation.",
  url: "shop.parallax.app",
  Component: MobileNavMockup,
};
