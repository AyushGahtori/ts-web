import { AboutSection } from "@/modules/landing/sections/about/AboutSection";
import { AboutSection as AboutVisualSection } from "@/modules/landing/sections/about-visual/AboutSection";
import { AcceleratorsSection } from "@/modules/landing/sections/accelerators/AcceleratorsSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { CareerSection } from "@/modules/landing/sections/career/CareerSection";
import { CareersInfoSection } from "@/modules/landing/sections/careers-info/CareersInfoSection";
import { Hero } from "@/modules/landing/sections/hero/Hero";
import { LeadershipSection } from "@/modules/landing/sections/leadership/LeadershipSection";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { PortfolioSection } from "@/modules/landing/sections/portfolio/PortfolioSection";

export function HomePage() {
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
        <CareerSection />
        <CareersInfoSection />
        <LeadershipSection />
        <BrandFooterSection />
      </section>
    </main>
  );
}
