import { FAQSection } from "@/modules/landing/sections/faq/FAQSection";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { WhyTechsnitchSection } from "@/modules/landing/sections/why-techsnitch/WhyTechsnitchSection";
import { WhyUsSection } from "@/modules/landing/sections/why-us/WhyUsSection";
import { MotionSection } from "@/components/motion/MotionSection";
import styles from "./WhyUsPage.module.css";

export function WhyUsPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <MotionSection direction="none">
          <WhyUsSection />
        </MotionSection>
        <MotionSection direction="up" stagger>
          <WhyTechsnitchSection />
        </MotionSection>
        <MotionSection direction="up">
          <FAQSection />
        </MotionSection>
        <MotionSection className={styles.footerAttach}>
          <BrandFooterSection />
        </MotionSection>
      </section>
    </main>
  );
}
