import { CoreValues } from "@/modules/landing/sections/about-visual/CoreValues";
import styles from "./AboutSection.module.css";

export function AboutCard() {
  return (
    <article className={styles.aboutCard}>
      <div className={styles.cardGlow} aria-hidden />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Engineered for the Enterprises Others Cannot Serve</h3>

        <p className={styles.cardCopy}>
          TechSnitch was founded on a single conviction: that the most complex, regulated, and ambitious enterprises deserve a ServiceNow
          partner that matches their scale of ambition. We are not a generalist integrator. We are a precision transformation partner
          combining elite ServiceNow delivery with genuine AI innovation and proprietary tooling that no competitor can replicate.
        </p>

        <div className={styles.splitSection}>
          <div className={styles.splitBlock}>
            <h4 className={styles.splitTitle}>Our Vision</h4>
            <p className={styles.splitCopy}>
              To become the world&apos;s most trusted partner for building autonomous, intelligence-led enterprises on the ServiceNow
              platform.
            </p>
          </div>

          <div className={styles.splitDivider} aria-hidden />

          <div className={styles.splitBlock}>
            <h4 className={styles.splitTitle}>Our Mission</h4>
            <p className={styles.splitCopy}>
              To deliver transformative business outcomes through relentless innovation, strategic advisory, and elite execution every
              engagement, every time.
            </p>
          </div>
        </div>

        <CoreValues />
      </div>
    </article>
  );
}
