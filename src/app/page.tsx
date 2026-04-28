import { AboutSection } from "@/modules/landing/sections/about/AboutSection";
import { AboutSection as AboutVisualSection } from "@/modules/landing/sections/about-visual/AboutSection";
import { AcceleratorsSection } from "@/modules/landing/sections/accelerators/AcceleratorsSection";
import { Hero } from "@/modules/landing/sections/hero/Hero";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { PortfolioSection } from "@/modules/landing/sections/portfolio/PortfolioSection";

export default function Home() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <Hero />
        <AboutSection />
        <AcceleratorsSection />
        <PortfolioSection />
        <FrameworksSection />
        <IndustryExcellence />
        <AboutVisualSection />
      </section>
    </main>
  );
}
