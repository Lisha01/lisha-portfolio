"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AIAgentPlaybookThumb,
  DesignSystemThumb,
  WorkbookThumb,
  ZIScriptThumb,
} from "./work-thumbnails";
import { track } from "@/lib/analytics";

type Project = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  span: string;
  href?: string;
  Thumb?: React.ComponentType;
};

const projects: Project[] = [
  {
    slug: "workbook",
    tag: "AI · DATA",
    title: "Workbook",
    description:
      "At Petavue, Workbook replaces chat as the core experience — shifting users from asking isolated questions to creating structured, evolving analysis that drives decisions.",
    span: "lg:col-span-4 lg:row-span-2",
    href: "/work/workbook",
    Thumb: WorkbookThumb,
  },
  {
    slug: "design-system",
    tag: "SYSTEMS",
    title: "Design System",
    description:
      "A scalable system that reduced design time, improved consistency, and enabled faster product iteration across teams.",
    span: "lg:col-span-2",
    href: "/work/design-system",
    Thumb: DesignSystemThumb,
  },
  {
    slug: "ai-agent-playbook",
    tag: "PLAYBOOK",
    title: "AI Agent Playbook",
    description:
      "A real-world guide to designing and deploying AI agents in GTM workflows — focused on scoped use-cases, human-in-the-loop systems, and measurable impact.",
    span: "lg:col-span-2",
    href: "/work/ai-agent-playbook",
    Thumb: AIAgentPlaybookThumb,
  },
  {
    slug: "zi-script",
    tag: "INTEGRATIONS",
    title: "ZI Script",
    description:
      "Led a multi-team initiative at ZoomInfo to unify fragmented scripts across FormComplete, Chat, Schedule, and WebSights — reducing developer dependency and giving marketers direct control.",
    span: "lg:col-span-6",
    href: "/work/zi-script",
    Thumb: ZIScriptThumb,
  },
];

export function WorkBento() {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-[120px]"
    >
      {/* Header */}
      <header className="mb-12 max-w-[680px] md:mb-16">
        <p className="eyebrow text-ink-400">Work · Case Studies</p>
        <h2
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(36px, 4.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Selected <span className="accent-italic">projects.</span>
        </h2>
        <p className="mt-5 max-w-[600px] font-sans text-[16px] leading-relaxed text-ink-600">
          A small set of problems I&apos;ve worked on closely.
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6 lg:auto-rows-[minmax(220px,_auto)]">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isTall = project.span.includes("row-span-2");
  const className = `group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200/60 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400 hover:bg-sky-100 ${project.span}`;
  const inner = <CardInner project={project} isTall={isTall} />;

  if (project.href) {
    return (
      <Link
        href={project.href}
        onClick={() =>
          track("Case Study Click", {
            slug: project.slug,
            title: project.title,
            tag: project.tag,
            href: project.href,
          })
        }
        className={className}
      >
        {inner}
      </Link>
    );
  }
  return (
    <a
      href="#contact"
      onClick={() =>
        track("Case Study Click", {
          slug: project.slug,
          title: project.title,
          tag: project.tag,
          href: "#contact",
        })
      }
      className={className}
    >
      {inner}
    </a>
  );
}

function CardInner({
  project,
  isTall,
}: {
  project: Project;
  isTall: boolean;
}) {
  return (
    <>
      {/* Thumbnail — custom illustrated banner */}
      <div
        className={`relative mb-6 overflow-hidden rounded-xl ${
          isTall
            ? "aspect-[4/5] lg:aspect-auto lg:mb-6 lg:h-auto lg:flex-1"
            : "h-36 md:h-44"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          {project.Thumb ? (
            <project.Thumb />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sky-100">
              <span className="font-display text-[28px] font-normal italic text-sky-700/70">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tag + title + description */}
      <div className={`flex flex-col ${isTall ? "" : "flex-1"}`}>
        <p className="eyebrow text-accent">{project.tag}</p>
        <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-tight text-ink-900 md:text-[24px] lg:text-[28px]">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 font-sans text-[14px] leading-relaxed text-ink-600">
          {project.description}
        </p>

        <div className="mt-6 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-accent">
          <span>View case study</span>
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </>
  );
}
