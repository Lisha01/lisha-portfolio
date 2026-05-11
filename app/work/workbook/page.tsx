import type { Metadata } from "next";
import Image from "next/image";
import { Layers, RotateCcw, Save } from "lucide-react";
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
  title: "Workbook — Case Study · Lisha Lokwani",
  description:
    "Reimagining Petavue's core experience by replacing chat with a structured, workflow-driven workbook for data analysts.",
};

export default function WorkbookCaseStudy() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <CaseStudyHero
          eyebrow="Case Study · AI · Data"
          title={
            <>
              Replacing chat with a{" "}
              <span className="accent-italic">workbook</span> for serious
              analysis.
            </>
          }
          intro={
            <>
              At Petavue, the chat-first model worked for exploration but
              collapsed at decision time. Each query was isolated; insights had
              to be stitched together by hand. Workbook reframed the core
              experience around how analysts actually think — in flows, not
              questions.
            </>
          }
          links={[
            {
              label: "View Figma",
              href: "https://www.figma.com/design/DDCW2WJ3RlAJJioqm6yUvS/Workbooks--Q4-2025-26---Copy-?node-id=642-37395&t=b6Ltbz0QXGu3VeDl-1",
              icon: "figma",
            },
          ]}
        />

        <MetaStrip
          items={[
            { label: "Role", value: "Founding Designer" },
            { label: "Scope", value: "Core product redesign" },
            { label: "Timeline", value: "2025 — 2026" },
            { label: "Team", value: "1 designer · 4 engineers · 1 PM" },
          ]}
        />

        <HeroVisual
          src="/work/workbook/workbook-pipeline.png"
          alt="Workbook canvas showing a Q1 Pipeline Review plan with five analysis steps on the left and a Segment Activity Effectiveness data table on the right."
          width={2672}
          height={1736}
          caption="Workbook · multi-sheet analysis flow with persistent context"
        />

        <Section eyebrow="The problem">
          <SectionHeading>
            Chat is great for{" "}
            <span className="accent-italic">asking</span>, terrible for{" "}
            <span className="accent-italic">deciding</span>.
          </SectionHeading>
          <SectionBody>
            Analysts came to Petavue to make calls — pricing changes, retention
            interventions, churn forecasts. The chat surface answered each
            question well in isolation, but every decision required a chain of
            twelve. Context evaporated between prompts. Edits meant
            re-prompting. The transcript became a flat record of attempts, not
            a record of thinking.
          </SectionBody>

          <figure className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white">
              <Image
                src="/work/workbook/mental-model.png"
                alt="Hand-drawn sketch comparing the current Q→A chat experience, which stops at answers, with the analyst's real mental model: data scope, overview, breakdown, drivers, details, and actions — a flow that builds understanding."
                width={3280}
                height={1710}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Field-note sketch · chat gives answers; the analyst&apos;s mental
              model builds understanding.
            </figcaption>
          </figure>
        </Section>

        <InsightCallout
          eyebrow="Key insight"
          source="From eight weeks of analyst interviews · 2025"
        >
          Data analysts don&apos;t think in{" "}
          <span className="font-light italic">questions</span>. They think in{" "}
          <span className="font-light italic">flows</span> — a goal, broken
          into steps, built incrementally, refined until the insight is clear.
        </InsightCallout>

        <Section eyebrow="The solution">
          <SectionHeading>
            A surface built around{" "}
            <span className="accent-italic">workflows</span>, not turns.
          </SectionHeading>
          <SectionBody>
            Workbook replaces the chat thread with a multi-sheet canvas. Each
            sheet is a discrete step in the analyst&apos;s reasoning, fully
            editable and re-runnable. Three product moves carry most of the
            weight:
          </SectionBody>

          <FeatureGrid
            items={[
              {
                icon: Layers,
                title: "Multi-sheet workflow",
                body: "Sheets become explicit thinking steps — break a goal into stages, organize them spatially, and keep each step inspectable.",
              },
              {
                icon: Save,
                title: "Persistent context",
                body: "Every prompt, output and edit lives inside the workbook. Pick up where you left off, branch a step, or hand work to a teammate.",
              },
              {
                icon: RotateCcw,
                title: "Iterative building",
                body: "Modify any earlier step and downstream blocks recompute. Iteration replaces the chat-style restart-from-scratch loop.",
              },
            ]}
          />

          <figure className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-sky-100 shadow-[0_30px_80px_-30px_rgba(14,23,41,0.2)]">
              <Image
                src="/work/workbook/workbook-memo.png"
                alt="Workbook memo view rendering a Sales Activity Effectiveness analysis with key findings, ranked patterns, and a contextual action menu for turning the analysis into a chart, quick analysis, or saved definition."
                width={3180}
                height={2066}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              From analysis to artifact · the same workbook turns into a
              shareable memo, chart, or saved definition.
            </figcaption>
          </figure>
        </Section>

        <Section eyebrow="Design decisions">
          <SectionHeading>
            Three calls that shaped the{" "}
            <span className="accent-italic">whole</span> product.
          </SectionHeading>

          <DecisionGrid
            items={[
              {
                eyebrow: "Structure",
                title: "Structure as a feature, not a constraint.",
                body: "Chat looks lightweight but pushes every cognitive burden onto the user. The workbook trades a heavier first impression for far lower load during the actual work.",
              },
              {
                eyebrow: "Iteration",
                title: "Design for the second pass, not the first prompt.",
                body: "The most valuable analysis happens on iteration three, not query one. Every interaction was tuned for editing, branching, and re-running — not just authoring.",
              },
              {
                eyebrow: "Adoption",
                title: "Behavior change is the real shipping risk.",
                body: "Users had built muscle memory around chat. We staged the rollout so existing prompts opened inside a workbook, letting people migrate without learning a new mental model upfront.",
              },
            ]}
          />
        </Section>

        <Section eyebrow="What I took from it">
          <SectionHeading>
            Designing for{" "}
            <span className="accent-italic">iteration</span> beats designing
            for output.
          </SectionHeading>
          <SectionBody>
            Workbook reframed how the team measured success: not the quality of
            a single answer, but the speed at which an analyst could refine
            toward a defensible decision. Behavior change carried more risk
            than UI change — the rollout had to teach a new mental model
            without asking anyone to abandon a familiar one.
          </SectionBody>

          <div className="mt-10 flex flex-col gap-3 font-mono text-[13px] uppercase tracking-[0.16em] text-ink-600 md:flex-row md:gap-8">
            <span>· Workflow, not query</span>
            <span>· Editable, not append-only</span>
            <span>· Persistent, not ephemeral</span>
          </div>
        </Section>

        <NextUpCTA />
        <FooterSection />
      </main>
    </>
  );
}
