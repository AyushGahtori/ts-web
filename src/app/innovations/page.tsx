import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { CareerSection } from "@/modules/landing/sections/career/CareerSection";
import { CareersInfoSection } from "@/modules/landing/sections/careers-info/CareersInfoSection";
import { LeadershipSection } from "@/modules/landing/sections/leadership/LeadershipSection";
import { LandingPageShell } from "@/modules/landing/pages/LandingPageShell";

export default function InnovationsPage() {
  return (
    <LandingPageShell>
      <CareerSection />
      <CareersInfoSection />
      <LeadershipSection />
      <BrandFooterSection />
    </LandingPageShell>
  );
}
