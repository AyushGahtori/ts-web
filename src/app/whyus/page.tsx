import { StandalonePageShell } from "@/modules/landing/pages/StandalonePageShell";
import { AcceleratorsSection } from "@/modules/landing/sections/accelerators/AcceleratorsSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";

export default function WhyUsPage() {
  return (
    <StandalonePageShell>
      <AcceleratorsSection />
      <BrandFooterSection />
    </StandalonePageShell>
  );
}
