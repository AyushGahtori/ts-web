import { StandalonePageShell } from "@/modules/landing/pages/StandalonePageShell";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";

export default function IntelligenceHubPage() {
  return (
    <StandalonePageShell>
      <FrameworksSection />
      <IndustryExcellence />
      <BrandFooterSection />
    </StandalonePageShell>
  );
}
