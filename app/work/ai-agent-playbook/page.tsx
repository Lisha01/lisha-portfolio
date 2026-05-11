import type { Metadata } from "next";
import Image from "next/image";
import { NavBar } from "@/components/nav-bar";
import { FooterSection } from "@/components/footer-section";
import {
  CaseStudyHero,
  InsightCallout,
  MetaStrip,
  NextUpCTA,
  Section,
  SectionBody,
  SectionHeading,
} from "@/components/case-study";

export const metadata: Metadata = {
  title: "AI Agent Playbook — Case Study · Lisha Lokwani",
  description:
    "A pragmatic playbook for GTM, Marketing & CX leaders — designed to make AI agents usable in real workflows.",
};

const featuredVoices = [
  {
    name: "David Yockelson",
    role: "VP Analyst, Gartner",
    angle: "On the opportunity",
  },
  {
    name: "Nina Butler",
    role: "Chief-of-Staff · ex-Head of Marketing, regie.ai",
    angle: "On the operator's framing",
  },
  {
    name: "Seth Nesbitt",
    role: "CMO, Zuper",
    angle: "On the unstructured middle",
  },
];

export default function AIAgentPlaybookCaseStudy() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <CaseStudyHero
          eyebrow="Case Study · Playbook"
          title={
            <>
              So you want to{" "}
              <span className="accent-italic">hire</span> an AI agent?
            </>
          }
          intro={
            <>
              A pragmatic playbook for GTM, Marketing &amp; CX leaders —
              designed to show how AI agents actually work inside
              go-to-market teams. Focused on scoped use-cases,
              human-in-the-loop systems, and measurable impact.
            </>
          }
          links={[
            {
              label: "View Live Playbook",
              href: "https://www.petavue.com/resources/ai-agent-playbook/overview",
              icon: "live",
            },
          ]}
        />

        <MetaStrip
          items={[
            { label: "Role", value: "Design, content structuring, distribution" },
            { label: "Scope", value: "Marketing initiative" },
            { label: "Output", value: "Playbook · LinkedIn · leadership" },
          ]}
        />

        {/* Hero visual — wider than standard so the playbook cover carries
            the opening moment of the story. */}
        <section className="px-6 pt-16 md:px-10 md:pt-24">
          <div className="mx-auto max-w-[1200px]">
            <figure className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-sky-100 shadow-[0_40px_100px_-30px_rgba(14,23,41,0.3)]">
              <Image
                src="/work/ai-agent-playbook/hero.png"
                alt="Playbook cover artwork — 'So You Want to Hire an AI Agent? — A pragmatic playbook for GTM, Marketing & CX leaders.' Set on a soft blue field with hand-drawn doodles: a robotic hand, a magnifier, a pie chart, and a sparkle."
                width={3056}
                height={1736}
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="block h-auto w-full"
              />
            </figure>
          </div>
        </section>

        {/* Setup — frame the moment in two short paragraphs. */}
        <Section eyebrow="The setting">
          <SectionHeading>
            Every AI take sounded{" "}
            <span className="accent-italic">loud</span>. Almost none were
            useful.
          </SectionHeading>
          <SectionBody>
            By 2025, every founder had hot takes, every VC had predictions,
            every newsletter had a framework. None of it scoped down to what a
            marketer or CX lead could try this week. The playbook started from
            a different place — not by writing more about AI, but by reducing
            a stack of long-form conversations into something a GTM team could
            open on a Monday and act on by Tuesday.
          </SectionBody>
        </Section>

        <InsightCallout eyebrow="The thesis">
          This playbook focuses on one thing —{" "}
          <span className="font-light italic">
            making AI usable in real workflows.
          </span>
        </InsightCallout>

        <Section eyebrow="What this solves">
          <SectionHeading>
            Built to answer four{" "}
            <span className="accent-italic">specific</span> things.
          </SectionHeading>
          <BulletList
            items={[
              "Breaks AI agents into clear, scoped use-cases.",
              "Shows how humans and AI actually work together.",
              "Avoids abstract ideas and focuses on execution.",
              "Builds credibility through real-world context.",
            ]}
          />
        </Section>

        {/* Voices — the analysts and operators whose long-form discussions
            became the playbook's raw material. Names + roles are pulled
            directly from the published playbook's pull-quote cards. */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow text-ink-400">Source material</p>
            <h2
              className="mt-4 font-display font-normal text-ink-900"
              style={{
                fontSize: "clamp(30px, 3.6vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              The <span className="accent-italic">voices</span> that shaped
              it.
            </h2>
            <p className="mt-5 max-w-[680px] font-sans text-[17px] leading-relaxed text-ink-600">
              The playbook isn&apos;t built on hot takes — it&apos;s built on
              long-form conversations with analysts and operators who&apos;ve
              actually run GTM during AI&apos;s chaotic moment. Three of those
              voices anchor the work:
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {featuredVoices.map((voice) => (
                <div
                  key={voice.name}
                  className="rounded-2xl border border-ink-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {voice.angle}
                  </p>
                  <p className="mt-4 font-display text-[20px] font-medium leading-tight tracking-tight text-ink-900">
                    {voice.name}
                  </p>
                  <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-600">
                    {voice.role}
                  </p>
                </div>
              ))}
            </div>

            <figure className="mt-10">
              <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white">
                <Image
                  src="/work/ai-agent-playbook/quotes.png"
                  alt="Pull-quote cards from David Yockelson, Nina Butler, and Seth Nesbitt as they appear inside the playbook — each speaking to a different angle of AI adoption inside GTM teams."
                  width={1196}
                  height={1224}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                The three pull-quote cards inside the live playbook.
              </figcaption>
            </figure>
          </div>
        </section>

        <Section eyebrow="The approach">
          <SectionHeading>
            From <span className="accent-italic">raw material</span> to
            decision-focused content.
          </SectionHeading>
          <SectionBody>
            Long-form discussions weren&apos;t treated as content pieces.
            They were treated as raw material — to be mined, reduced, and
            restructured.
          </SectionBody>

          <SubLabel>Key actions</SubLabel>
          <BulletList
            items={[
              "Extracted high-signal insights.",
              "Removed noise and repetition.",
              "Structured them into usable, decision-focused content.",
            ]}
          />

          <PullNote>
            This made the playbook feel grounded — not theoretical. The
            challenge wasn&apos;t adding information — it was reducing it.
          </PullNote>

          <SubLabel>Refinements</SubLabel>
          <BulletList
            items={[
              "Simplified complex ideas into clear sections.",
              "Designed for fast scanning, not deep reading.",
              "Focused on helping users understand what to do next.",
            ]}
          />
        </Section>

        <Section eyebrow="Designing for clarity, building for distribution">
          <SectionHeading>
            A <span className="accent-italic">content system</span>, not a
            static asset.
          </SectionHeading>
          <SectionBody>
            The playbook was designed so every section could leave the page —
            picked up as a LinkedIn carousel, a screenshot in a feed, a
            chapter in someone else&apos;s reading list. Distribution
            wasn&apos;t a downstream marketing task. It was a design
            constraint from day one.
          </SectionBody>
          <BulletList
            items={[
              "Each section could stand alone.",
              "Easily converted into LinkedIn posts.",
              "Structured for repeatable distribution.",
            ]}
          />

          <figure className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white shadow-[0_30px_80px_-30px_rgba(14,23,41,0.25)]">
              <Image
                src="/work/ai-agent-playbook/site-context.png"
                alt="The playbook embedded inside the Petavue website with a chapter sub-nav (Overview, Part 1, Part 2, Part 3) above the cover artwork."
                width={1200}
                height={1224}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              In situ · chapter-based navigation makes each part of the
              playbook independently shareable.
            </figcaption>
          </figure>
        </Section>

        <Section eyebrow="What I did">
          <SectionHeading>
            The <span className="accent-italic">scope</span>, in four lines.
          </SectionHeading>
          <NumberedList
            items={[
              "Designed the overall structure and flow of the playbook.",
              "Converted raw interviews into clear, usable insights.",
              "Built a visual system for readability and hierarchy.",
              "Created LinkedIn content to extend reach.",
            ]}
          />
        </Section>

        <Section eyebrow="Impact">
          <SectionHeading>
            Engagement. Credibility.{" "}
            <span className="accent-italic">Positioning</span>.
          </SectionHeading>
          <BulletList
            items={[
              "Stronger engagement through LinkedIn distribution.",
              "Increased credibility due to real industry insights.",
              "Better traction than generic AI content.",
              "Positioned the org as a practical voice in AI adoption.",
            ]}
          />

          <figure className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white">
              <Image
                src="/work/ai-agent-playbook/social-card.png"
                alt="A teaser social card for the playbook framed like a Polaroid, with 'Launching soon!' tape across the top and bottom and the playbook cover in the center."
                width={1200}
                height={1224}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              Distribution asset · the cover, restaged for the feed.
            </figcaption>
          </figure>
        </Section>

        {/* Lessons as italic pull-quotes — varies the visual rhythm. */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow text-ink-400">What I learned</p>
            <h2
              className="mt-4 font-display font-normal text-ink-900"
              style={{
                fontSize: "clamp(30px, 3.6vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              Four lessons that{" "}
              <span className="accent-italic">stayed</span> with me.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {[
                "Good content needs structure, not just information.",
                "Distribution is part of the design.",
                "Real examples outperform generic ideas every time.",
                "Design can simplify complex systems.",
              ].map((lesson, i) => (
                <div
                  key={lesson}
                  className="flex items-start gap-4 rounded-2xl border border-ink-200/60 bg-white p-5"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-display italic text-ink-800"
                    style={{ fontSize: "17px", lineHeight: 1.4 }}
                  >
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing statement — the literal one-line summary, blown up. */}
        <section className="px-6 pb-20 md:px-10 md:pb-[120px]">
          <div className="mx-auto max-w-[1080px]">
            <p className="eyebrow text-ink-400">In one line</p>
            <h2
              className="mt-5 font-display font-normal text-ink-900"
              style={{
                fontSize: "clamp(32px, 4.4vw, 56px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
              }}
            >
              This project wasn&apos;t about explaining AI. It was about{" "}
              <span className="accent-italic">making it usable</span>.
            </h2>
          </div>
        </section>

        <NextUpCTA />
        <FooterSection />
      </main>
    </>
  );
}

/* Local helpers — used only by this page. */

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 max-w-[720px] space-y-3.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 font-sans text-[16px] leading-relaxed text-ink-700"
        >
          <span
            aria-hidden
            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="mt-7 max-w-[760px] divide-y divide-ink-200/60 overflow-hidden rounded-2xl border border-ink-200/60 bg-white">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-4 px-5 py-4 font-sans text-[16px] leading-relaxed text-ink-700"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-10 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

function PullNote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-10 max-w-[720px] border-l-2 border-accent bg-sky-100/40 px-6 py-5 font-display text-[19px] italic leading-[1.4] text-ink-800">
      {children}
    </blockquote>
  );
}
