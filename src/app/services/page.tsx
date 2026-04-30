import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { PortfolioSection } from "@/modules/landing/sections/portfolio/PortfolioSection";
import { LandingPageShell } from "@/modules/landing/pages/LandingPageShell";

export default function ServicesPage() {
  return (
    <LandingPageShell>
      <PortfolioSection />
      <BrandFooterSection />
    </LandingPageShell>
  );
}
