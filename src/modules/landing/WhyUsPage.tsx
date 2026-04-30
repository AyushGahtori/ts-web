import { FAQSection } from "@/modules/landing/sections/faq/FAQSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { WhyTechsnitchSection } from "@/modules/landing/sections/why-techsnitch/WhyTechsnitchSection";
import { WhyUsSection } from "@/modules/landing/sections/why-us/WhyUsSection";

export function WhyUsPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <WhyUsSection />
        <WhyTechsnitchSection />
        <FAQSection />
        <BrandFooterSection />
      </section>
    </main>
  );
}
