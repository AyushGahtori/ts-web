import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { FrameworksSection } from "@/modules/landing/sections/frameworks/FrameworksSection";
import { IndustryExcellence } from "@/modules/landing/sections/industry-excellence/IndustryExcellence";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import styles from "./IntelligenceHubPage.module.css";

export function IntelligenceHubPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <section className={styles.pageIntro}>
          <div className={styles.introPanel}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} aria-hidden />
              Intelligence Hub
            </p>
            <h1 className={styles.title}>Enterprise Intelligence Systems Built for Scale</h1>
            <p className={styles.copy}>
              Explore TechSnitch&apos;s AI-agnostic frameworks, operational blueprints, and industry-specific execution models designed to move
              enterprises from reactive service management to autonomous intelligence-led operations.
            </p>
          </div>
        </section>
        <FrameworksSection />
        <IndustryExcellence />
        <BrandFooterSection />
      </section>
    </main>
  );
}
