import { AcceleratorsSection } from "@/modules/landing/sections/accelerators/AcceleratorsSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { LandingPageShell } from "@/modules/landing/pages/LandingPageShell";

export default function WhyUsPage() {
  return (
    <LandingPageShell>
      <AcceleratorsSection />
      <BrandFooterSection />
    </LandingPageShell>
  );
}
