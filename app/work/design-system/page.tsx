import type { Metadata } from "next";
import Image from "next/image";
import { Boxes, GitBranch, Zap } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { FooterSection } from "@/components/footer-section";
import {
  CaseStudyHero,
  DecisionGrid,
  FeatureGrid,
  HeroVisual,
  InsightCallout,
  MetaStrip,
  NextUpCTA,
  Section,
  SectionBody,
  SectionHeading,
} from "@/components/case-study";

export const metadata: Metadata = {
  title: "Design System — Case Study · Lisha Lokwani",
  description:
    "A scalable design system at Petavue — cutting screen design time by 60–70% and unifying the language between design and engineering.",
};

export default function DesignSystemCaseStudy() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <CaseStudyHero
          eyebrow="Case Study · Systems"
          title={
            <>
              A design system built for{" "}
              <span className="accent-italic">speed</span>, not just
              consistency.
            </>
          }
          intro={
            <>
              Petavue&apos;s product velocity was climbing, but the design
              infrastructure underneath it wasn&apos;t. Screens were being
              rebuilt from scratch, handoffs stalled in interpretation, and
              every new feature inherited a new set of UI decisions. The system
              we built closed that gap — and made shipping the default state.
            </>
          }
          links={[
            {
              label: "View Figma",
              href: "https://www.figma.com/design/K3qavprPzkzvLlIWUfbzPV/Petavue---Design-System--Copy-?node-id=948-93&t=MeOffMdNbAdUbLPz-1",
              icon: "figma",
            },
          ]}
        />

        <MetaStrip
          items={[
            { label: "Role", value: "Founding Designer" },
            { label: "Scope", value: "End-to-end product system" },
            { label: "Timeline", value: "15 days initial · ongoing" },
            { label: "Team", value: "Design + Engineering partnership" },
          ]}
        />

        <HeroVisual
          src="/work/design-system/hero.png"
          alt="A curated set of Petavue design-system components on a textured background: a multi-step progress bar, calendar, primary button, dropdown, tooltip, tags, and a multi-select filter modal."
          width={3476}
          height={1484}
          caption="Selected primitives from the live system — buttons, dropdowns, filters, calendars."
        />

        <Section eyebrow="The problem">
          <SectionHeading>
            Every new screen was a{" "}
            <span className="accent-italic">first draft</span>.
          </SectionHeading>
          <SectionBody>
            Features shipped fast, but the cost showed up downstream:
            inconsistent spacing across flows, three patterns for the same
            empty state, and design-to-dev handoffs that turned into
            translation work. The team didn&apos;t lack discipline — it lacked
            a shared, reusable foundation that made the right choice the easy
            choice.
          </SectionBody>
        </Section>

        <InsightCallout
          eyebrow="Key insight"
          source="Team retro · early 2025"
        >
          Consistency is a side effect.{" "}
          <span className="font-light italic">Reuse at scale</span> is the
          actual product — it&apos;s what turns a system from a style guide
          into infrastructure.
        </InsightCallout>

        <Section eyebrow="The solution">
          <SectionHeading>
            One foundation. Three things it had to{" "}
            <span className="accent-italic">earn</span>.
          </SectionHeading>
          <SectionBody>
            Rather than starting with a component library and hoping adoption
            followed, the system was scoped to the patterns that actually
            recurred across flows — and built so that picking up a component
            was always faster than re-drawing one.
          </SectionBody>

          <FeatureGrid
            items={[
              {
                icon: Boxes,
                title: "Reusable component library",
                body: "Tokens, primitives, and composed patterns covering every recurring surface — from form fields to multi-step layouts.",
              },
              {
                icon: Zap,
                title: "Plug-and-play layouts",
                body: "Predictable page templates so a new screen starts at 80% and the team only designs the interesting 20%.",
              },
              {
                icon: GitBranch,
                title: "Shared design ↔ engineering language",
                body: "Components named, propped, and documented identically across Figma and code. Handoff became a copy, not a conversation.",
              },
            ]}
          />

          <figure className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white shadow-[0_30px_80px_-30px_rgba(14,23,41,0.2)]">
              <Image
                src="/work/design-system/system-overview.png"
                alt="A wide overview of the Petavue design system: brand color tokens, table primitives, navigation, integration icons, toggles in three states, button states, a feedback row, and a dropdown — all aligned to the same grid."
                width={3176}
                height={2076}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              System overview · tokens, primitives, and composed patterns in
              one canvas.
            </figcaption>
          </figure>
        </Section>

        <Section eyebrow="Design decisions">
          <SectionHeading>
            What we chose, and{" "}
            <span className="accent-italic">why</span>.
          </SectionHeading>

          <DecisionGrid
            items={[
              {
                eyebrow: "Scope",
                title: "Ship the 80%, evolve the rest.",
                body: "We resisted the urge to model every edge case up-front. The first version covered the most-used patterns; the long tail was added as it appeared in real product work.",
              },
              {
                eyebrow: "Ownership",
                title: "Built with engineering, not for them.",
                body: "Component APIs were co-designed so the Figma layer and the React layer matched 1:1. No translation tax meant adoption stuck.",
              },
              {
                eyebrow: "Evolution",
                title: "Usage-driven, not roadmap-driven.",
                body: "New components were added when the same pattern appeared three times in product work — not because a backlog said so.",
              },
            ]}
          />
        </Section>

        <Section eyebrow="Outcomes">
          <SectionHeading>
            Faster screens. Fewer{" "}
            <span className="accent-italic">decisions</span>.
          </SectionHeading>
          <SectionBody>
            Within a quarter of rollout, design time on new screens dropped
            60–70%. Engineering handoffs shortened because there was less to
            interpret. Onboarding new designers became a one-day exercise
            instead of a one-month one. Most importantly, the product
            <em> looked </em>like one product again.
          </SectionBody>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {[
              { stat: "60–70%", label: "Reduction in new-screen design time" },
              { stat: "1 day", label: "Designer onboarding to first shipped flow" },
              { stat: "1 system", label: "Across design, engineering, and docs" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-200/60 bg-white p-7"
              >
                <p
                  className="font-display font-normal text-ink-900"
                  style={{ fontSize: "clamp(32px, 3.6vw, 44px)", lineHeight: 1 }}
                >
                  {s.stat}
                </p>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-600">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="What I took from it">
          <SectionHeading>
            A system is{" "}
            <span className="accent-italic">infrastructure</span>, not a
            style guide.
          </SectionHeading>
          <SectionBody>
            The temptation with design systems is to optimize for the system
            itself — the docs site, the token taxonomy, the contribution
            model. The work that mattered was the work that made shipping
            faster. Every decision was tested against one question: does this
            make the next screen quicker to design and easier to build?
          </SectionBody>
        </Section>

        <NextUpCTA />
        <FooterSection />
      </main>
    </>
  );
}
