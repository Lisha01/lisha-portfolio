"use client";

import { ChevronRight } from "lucide-react";

const articles = [
  {
    title: "How AI changed the brief",
    excerpt: "The way teams write specs is shifting under our feet.",
    author: "Lisha Lokwani",
    color: "from-accent to-accent-deep",
  },
  {
    title: "Designing for the next 10x",
    excerpt: "Scaling systems without losing the hand that made them.",
    author: "Tony Tom",
    color: "from-sky-700 to-accent",
  },
  {
    title: "Less is still less",
    excerpt: "Restraint as a measurable design discipline.",
    author: "Rohit Srivastav",
    color: "from-accent to-sky-700",
    flipped: true,
  },
  {
    title: "Onboarding, reconsidered",
    excerpt: "Stop trying to teach. Start removing friction.",
    author: "Hila Nir",
    color: "from-sky-600 to-accent",
  },
  {
    title: "Quiet UX wins",
    excerpt: "Why the wins worth keeping rarely make screenshots.",
    author: "Arjun Pillai",
    color: "from-accent-deep to-accent",
  },
  {
    title: "Notes on speed",
    excerpt: "Speed isn't a feature — it's the entire reason.",
    author: "Samuel Sun",
    color: "from-accent to-sky-600",
  },
];

function ArticlesMockup() {
  return (
    <div className="p-6 sm:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-ink-400">Today</p>
          <h1 className="mt-2 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
            Daily reads
          </h1>
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 font-sans text-[12px] font-medium text-ink-700"
        >
          All articles
          <ChevronRight size={12} className="text-ink-400" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => {
          const isFlaw = !!a.flipped;
          return (
            <article
              key={i}
              data-flaw={isFlaw ? "true" : undefined}
              className="overflow-hidden rounded-xl border border-ink-200/60 bg-white"
            >
              {/*
                THE FLAW — every other card leads with the image and ends
                with the meta. This one inverts that order: title first,
                image last. The structural rhythm of a grid is the system;
                breaking it reads as "wrong" before you can articulate why.
              */}
              {!isFlaw && (
                <div
                  aria-hidden
                  className={`aspect-[16/9] bg-gradient-to-br ${a.color}`}
                />
              )}
              <div className="p-4">
                <p className="font-sans text-[13px] font-medium text-ink-900">
                  {a.title}
                </p>
                <p className="mt-1.5 line-clamp-2 font-sans text-[12px] leading-relaxed text-ink-500">
                  {a.excerpt}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                  {a.author} · Today
                </p>
              </div>
              {isFlaw && (
                <div
                  aria-hidden
                  className={`aspect-[16/9] bg-gradient-to-br ${a.color}`}
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export const challenge = {
  id: "articles-card-flipped",
  title: "Daily Reads",
  sin: "One card's layout is upside-down",
  explanation:
    "Every other article card leads with the image and ends with the meta. The third card inverts that order — title first, image last. In a uniform grid the structural rhythm is the system itself; one card breaking it reads as 'this was assembled differently' before you can name what's off.",
  url: "read.compass.io",
  Component: ArticlesMockup,
};
