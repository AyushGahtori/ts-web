import { GlowFrame } from "@/components/ui/GlowFrame";
import { AboutCard } from "@/modules/landing/sections/about-visual/AboutCard";
import { AboutPhonePlaceholder } from "@/modules/landing/sections/about-visual/AboutPhonePlaceholder";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section className={styles.section}>
      <GlowFrame className={styles.shell}>
        <div className={styles.backgroundCurve} aria-hidden />
        <div className={styles.backgroundCurveSecondary} aria-hidden />

        <div className={styles.verticalRail} aria-hidden>
          <span className={styles.railText}>About Us</span>
          <span className={styles.railBarLongTop} />
          <span className={styles.railBarShortTop} />
          <span className={styles.railBarLongBottom} />
          <span className={styles.railBarShortBottom} />
        </div>

        <div className={styles.layout}>
          <AboutPhonePlaceholder />
          <AboutCard />
        </div>
      </GlowFrame>
    </section>
  );
}
