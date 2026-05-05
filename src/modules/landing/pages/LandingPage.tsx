import { AboutSection } from "@/modules/landing/sections/about/AboutSection";
import { AboutSection as AboutVisualSection } from "@/modules/landing/sections/about-visual/AboutSection";
import { AcceleratorsSection } from "@/modules/landing/sections/accelerators/AcceleratorsSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { CareerSection } from "@/modules/landing/sections/career/CareerSection";
import { CareersInfoSection } from "@/modules/landing/sections/careers-info/CareersInfoSection";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { Hero } from "@/modules/landing/sections/hero/Hero";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { PortfolioSection } from "@/modules/landing/sections/portfolio/PortfolioSection";
import { MotionSection } from "@/components/motion/MotionSection";
import { RouteSectionScroller } from "./RouteSectionScroller";

interface LandingPageProps {
  initialSectionId?: string;
}

export function LandingPage({ initialSectionId }: LandingPageProps) {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        {initialSectionId ? <RouteSectionScroller sectionId={initialSectionId} /> : null}
        <Navbar />
        <MotionSection id="home" direction="none">
          <Hero />
        </MotionSection>
        <div id="about">
          <AboutSection />
        </div>
        <div id="why-us">
          <AcceleratorsSection />
        </div>
        <div id="services">
          <PortfolioSection />
        </div>
        <div id="intelligence-hub">
          <FrameworksSection />
          <IndustryExcellence />
        </div>
        <div id="innovations">
          <AboutVisualSection />
          <CareerSection />
          <CareersInfoSection />
          <BrandFooterSection />
        </div>
      </section>
    </main>
  );
}
