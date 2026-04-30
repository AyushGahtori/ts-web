import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { InnovationHeader } from "@/modules/landing/sections/innovation/InnovationHeader";
import { InnovationPanel } from "@/modules/landing/sections/innovation/InnovationPanel";
import { MotionSection } from "@/components/motion/MotionSection";
import styles from "@/modules/landing/sections/innovation/innovation.module.css";

export function InnovationPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <div className={styles.page}>
          <MotionSection direction="none">
            <InnovationHeader />
          </MotionSection>
          <MotionSection stagger>
            <InnovationPanel />
          </MotionSection>
          <MotionSection>
            <BrandFooterSection />
          </MotionSection>
        </div>
      </section>
    </main>
  );
}
