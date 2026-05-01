import { LifeAtHero } from "./LifeAtHero";
import { LifeAtCultureSection } from "./LifeAtCultureSection";
import { LifeAtPillarsSection } from "./LifeAtPillarsSection";
import { LifeAtWhySection } from "./LifeAtWhySection";
import { LifeAtGlanceSection } from "./LifeAtGlanceSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";

export function LifeAtSection() {
  return (
    <>
      <LifeAtHero />
      <LifeAtCultureSection />
      <LifeAtPillarsSection />
      <LifeAtWhySection />
      <LifeAtGlanceSection />
      <BrandFooterSection />
    </>
  );
}
