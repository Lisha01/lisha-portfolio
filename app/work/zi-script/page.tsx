import type { Metadata } from "next";
import Image from "next/image";
import { Code2, Combine, UserCog } from "lucide-react";
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
  title: "ZI Script — Case Study · Lisha Lokwani",
  description:
    "Unifying four ZoomInfo product scripts into one platform-level installation — and handing marketers control of the workflow.",
};

export default function ZIScriptCaseStudy() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <CaseStudyHero
          eyebrow="Case Study · Integrations"
          title={
            <>
              Four scripts became{" "}
              <span className="accent-italic">one</span>. Marketers got their
              workflow back.
            </>
          }
          intro={
            <>
              ZoomInfo&apos;s four growth products — FormComplete, Chat,
              Schedule, and WebSights — each shipped their own website script.
              Every new form meant a new deploy, a new developer ticket, a new
              week. We rebuilt the installation layer as a single platform
              script so marketers could move on their own.
            </>
          }
          links={[
            {
              label: "View Figma",
              href: "https://www.figma.com/design/ffyzqPNtUGti5r8hAp2IpS/ZIScript_ConnectingProducts?node-id=14-49589&t=cFzxjh11jGXmaBan-1",
              icon: "figma",
            },
          ]}
        />

        <MetaStrip
          items={[
            { label: "Role", value: "UX/UI Designer III" },
            { label: "Scope", value: "Cross-product platform layer" },
            { label: "Timeline", value: "Multi-quarter initiative" },
            { label: "Stakeholders", value: "4 product teams · marketing ops" },
          ]}
        />

        <HeroVisual
          src="/work/zi-script/hero.png"
          alt="The ZoomInfo Admin Portal with the new unified ZI Script settings page open: a single Install Script panel with a copy button, a 'Send Script to Your Webmaster' email form, and a 'Turn On/Off Product Connections' section below."
          width={2884}
          height={1738}
          caption="ZI Script lives inside Company Settings · one install, four products, marketer-controlled."
        />

        <Section eyebrow="The problem">
          <SectionHeading>
            Fragmentation looked like four{" "}
            <span className="accent-italic">small</span> problems. It was
            one big one.
          </SectionHeading>
          <SectionBody>
            FormComplete demanded a fresh script for every form. Chat,
            Schedule, and WebSights each shipped their own installation flow.
            Each on its own felt manageable; together they meant marketers
            couldn&apos;t launch anything without a developer in the loop —
            and engineering teams couldn&apos;t evolve the platform without
            breaking four implementations at once.
          </SectionBody>
        </Section>

        <InsightCallout
          eyebrow="Key insight"
          source="Cross-team discovery · 2024"
        >
          Fixing the parts wouldn&apos;t close the gap. The work had to move
          up a layer — from{" "}
          <span className="font-light italic">products</span> to a{" "}
          <span className="font-light italic">platform</span>.
        </InsightCallout>

        <Section eyebrow="The solution">
          <SectionHeading>
            One install. One source of{" "}
            <span className="accent-italic">truth</span>.
          </SectionHeading>
          <SectionBody>
            The redesign replaced four scripts with a single unified one,
            installed once on the customer&apos;s site. From there, marketers
            could turn products on, configure forms, and ship campaigns
            without re-engaging engineering. The architecture shift was
            invisible to end-users — the workflow shift was not.
          </SectionBody>

          <FeatureGrid
            items={[
              {
                icon: Combine,
                title: "Single unified script",
                body: "One install powers FormComplete, Chat, Schedule, and WebSights. Future products plug in without a new deploy.",
              },
              {
                icon: UserCog,
                title: "Marketer-owned workflow",
                body: "After the one-time setup, marketers create and update forms independently — no developer ticket, no waiting room.",
              },
              {
                icon: Code2,
                title: "Consistent UX across products",
                body: "Configuration, installation, and management share one interaction language — so learning one product means knowing them all.",
              },
            ]}
          />

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            <figure>
              <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white">
                <Image
                  src="/work/zi-script/install-panel.png"
                  alt="The Install Script panel: an instruction line ('Click on Copy Script and paste the script at the end of the <head> tag on each page of your domain(s)'), a link to the installation guide, and a code block showing the single ZoomInfo script snippet with a 'Copy Script' button."
                  width={1200}
                  height={1224}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 540px"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                One snippet · one install · all four products.
              </figcaption>
            </figure>
            <figure>
              <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white">
                <Image
                  src="/work/zi-script/product-toggles.png"
                  alt="The Turn On/Off Product Connections panel with toggles for FormComplete, WebSights, Schedule, and Chat — all currently enabled."
                  width={1200}
                  height={1224}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 540px"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                Marketers turn products on and off without re-deploying.
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section eyebrow="Design decisions">
          <SectionHeading>
            Trade-offs that{" "}
            <span className="accent-italic">made</span> it ship.
          </SectionHeading>

          <DecisionGrid
            items={[
              {
                eyebrow: "Migration",
                title: "Existing customers couldn't notice.",
                body: "The cutover had to be invisible to live implementations. The new flow ran behind the old surface until parity was proven, then swapped without re-onboarding anyone.",
              },
              {
                eyebrow: "Surface",
                title: "Unify the install, not the products.",
                body: "Each product kept its own configuration depth. The shared layer was installation and management — the parts marketers touched every day.",
              },
              {
                eyebrow: "Ownership",
                title: "Default to marketer-controllable.",
                body: "When a decision could be made by either a marketer or a developer, marketers won. Cutting handoffs was the whole point.",
              },
            ]}
          />

          <figure className="mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200/60 bg-white shadow-[0_30px_80px_-30px_rgba(14,23,41,0.2)]">
              <Image
                src="/work/zi-script/intro-modal.png"
                alt="A first-run modal inside the admin portal headed 'Increase your website speed using the new ZoomInfo Script,' with a diagram of one script powering forms, WebSights, Chat, and Schedule, and a body line: 'With this one script, you can manage all your forms and it makes it easier when using other ZoomInfo products such as WebSights, Chat, and Schedule. Just set it, and forget it!'"
                width={1200}
                height={1224}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1080px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Migration moment · the first-run modal explains the unified
              model without forcing anyone to reread docs.
            </figcaption>
          </figure>
        </Section>

        <Section eyebrow="Outcomes">
          <SectionHeading>
            Faster launches.{" "}
            <span className="accent-italic">Fewer</span> tickets.
          </SectionHeading>
          <SectionBody>
            Marketers ship campaigns without a developer dependency.
            Engineering teams ship platform changes without breaking four
            implementations. New customers install one script instead of
            four, and any future ZoomInfo product gets distribution for free.
          </SectionBody>
        </Section>

        <Section eyebrow="What I took from it">
          <SectionHeading>
            Good UX reduces reliance on{" "}
            <span className="accent-italic">other</span> teams.
          </SectionHeading>
          <SectionBody>
            The clearest measure of this redesign wasn&apos;t aesthetics or
            even efficiency — it was who needed to be in the room to ship a
            campaign. When the answer dropped from &quot;marketer + developer
            + ops&quot; to just &quot;marketer,&quot; the design had done its
            job.
          </SectionBody>
        </Section>

        <NextUpCTA />
        <FooterSection />
      </main>
    </>
  );
}
