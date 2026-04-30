import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { ServicesSection } from "@/modules/landing/sections/services/ServicesSection";
import { ServicesGrid } from "@/modules/landing/sections/servicesGrid/ServicesGrid";
import { WallOfLove } from "@/modules/landing/sections/testimonials/WallOfLove";

export function ServicesPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <ServicesSection />
        <ServicesGrid />
        <WallOfLove />
        <BrandFooterSection />
      </section>
    </main>
  );
}
