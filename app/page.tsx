import { NavBar } from "@/components/nav-bar";
import { ScrollHero } from "@/components/hero/scroll-hero";
import { WorkBento } from "@/components/work-bento";
import { AIWork } from "@/components/ai-work";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ToolsMarquee } from "@/components/tools-marquee";
import { TestimonialsRow } from "@/components/testimonials-row";
import { FooterSection } from "@/components/footer-section";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative">
        <ScrollHero />
        <WorkBento />
        <AIWork />
        <ExperienceTimeline />
        <ToolsMarquee />
        <TestimonialsRow />
        <FooterSection />
      </main>
    </>
  );
}
