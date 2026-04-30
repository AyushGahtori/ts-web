import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";
import { LandingPageShell } from "@/modules/landing/pages/LandingPageShell";

export default function IntelligenceHubPage() {
  return (
    <LandingPageShell>
      <FrameworksSection />
      <IndustryExcellence />
      <BrandFooterSection />
    </LandingPageShell>
  );
}
