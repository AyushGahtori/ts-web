import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { InnovationHeader } from "@/modules/landing/sections/innovation/InnovationHeader";
import { InnovationPanel } from "@/modules/landing/sections/innovation/InnovationPanel";
import styles from "@/modules/landing/sections/innovation/innovation.module.css";

export function InnovationPage() {
  return (
    <main className="landing-root">
      <section className="landing-canvas">
        <Navbar />
        <div className={styles.page}>
          <InnovationHeader />
          <InnovationPanel />
          <BrandFooterSection />
        </div>
      </section>
    </main>
  );
}
