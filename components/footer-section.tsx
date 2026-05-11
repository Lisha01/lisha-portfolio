import { Mail } from "lucide-react";

const socials = [
  { label: "Dribbble", href: "https://dribbble.com/lisha01" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lisha-lokwani-39b01518b/",
  },
  { label: "Medium", href: "https://medium.com/@lishalokwani444" },
];

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="bg-ink-900 px-6 py-20 text-white md:px-10 md:py-[120px]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
        <h2
          className="max-w-[900px] font-display font-normal leading-[1.05]"
          style={{
            fontSize: "clamp(40px, 5.6vw, 80px)",
            letterSpacing: "-0.025em",
          }}
        >
          Let&apos;s build something <span className="accent-italic">clear</span>{" "}
          together.
        </h2>

        <p className="mt-6 max-w-[620px] font-sans text-[16px] leading-relaxed text-white/70">
          My favourite conversations start with{" "}
          <span className="italic text-white/85">
            &ldquo;this might be a strange question.&rdquo;
          </span>{" "}
          Whether you&apos;re hiring, building, or just thinking something
          out loud — I&apos;d love to hear it.
        </p>

        <a
          href="mailto:Lishalokwani444@gmail.com"
          className="mt-10 inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full bg-white px-6 py-3 font-sans text-[14px] font-medium text-ink-900 transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[15px]"
        >
          <Mail size={16} className="shrink-0" />
          <span className="sm:hidden">Email me</span>
          <span className="hidden truncate sm:inline">
            Email me — Lishalokwani444@gmail.com
          </span>
        </a>

        <p className="mt-8 font-sans text-[14px] text-white/60">
          Or find me on{" "}
          {socials.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {s.label}
              </a>
              {i < socials.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>

        <div className="mt-16 h-px w-full max-w-[1280px] bg-white/10" />

        <div className="mt-6 flex w-full max-w-[1280px] flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 md:flex-row md:justify-between">
          <span>© 2026 Lisha Lokwani</span>
          <span>Built with Claude · Designed in Figma</span>
        </div>
      </div>
    </footer>
  );
}
