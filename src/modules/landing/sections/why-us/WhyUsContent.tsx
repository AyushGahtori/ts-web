import { CursorBlurText } from "@/components/effects/CursorBlurText";
import { MotionSection } from "@/components/motion/MotionSection";
import { ValueMetrics } from "@/modules/landing/sections/why-us/ValueMetrics";
import styles from "./whyUs.module.css";

export function WhyUsContent() {
  return (
    <MotionSection className={styles.contentColumn} direction="up" stagger>
      <header className={styles.headerBlock}>
        <CursorBlurText as="h2" className={`${styles.heading} blur-reveal`} spotSize={175}>
          <span className={styles.headingLine}>Why Choose</span>
          <span className={styles.headingAccentRow}>
            <span className={styles.arrowBadge} aria-hidden>
              <span className={styles.arrowGlyph} />
            </span>
            <span className={styles.usText}>US</span>
            <span className={styles.questionMark}>?</span>
          </span>
        </CursorBlurText>

        <p className={styles.subheading}>
          <span>Let&apos;s</span>
          <span>Create the</span>
          <span>Extraordinary</span>
        </p>

        <p className={styles.description}>
          TechSnitch stands apart as a strategic transformation partner, delivering measurable business outcomes through
          deep ServiceNow expertise, AI-agnostic innovation, and proprietary accelerators. We enable enterprises to
          transition from traditional service management to autonomous, intelligent operations.
        </p>
      </header>

      <ValueMetrics />
    </MotionSection>
  );
}
