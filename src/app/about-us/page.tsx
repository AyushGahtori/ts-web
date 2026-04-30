import { AboutSection } from "@/modules/landing/sections/about/AboutSection";
import { AboutSection as AboutVisualSection } from "@/modules/landing/sections/about-visual/AboutSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { LandingPageShell } from "@/modules/landing/pages/LandingPageShell";

export default function AboutUsPage() {
  return (
    <LandingPageShell>
      <AboutSection />
      <AboutVisualSection />
      <BrandFooterSection />
    </LandingPageShell>
  );
}
