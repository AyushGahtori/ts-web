import { CursorBlurText } from "@/components/effects/CursorBlurText";
import { MotionSection } from "@/components/motion/MotionSection";
import { WhyCard } from "@/modules/landing/sections/why-techsnitch/WhyCard";
import styles from "./whyTechsnitch.module.css";

export function WhyTechsnitchSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <MotionSection direction="up">
          <CursorBlurText as="h2" className={`${styles.sectionTitle} blur-reveal`} spotSize={160}>
            <span>Why </span>
            <span className={styles.sectionTitleAccent}>TechSnitch</span>
            <span>?</span>
          </CursorBlurText>
        </MotionSection>

        <MotionSection direction="up" stagger>
          <WhyCard />
        </MotionSection>
      </div>
    </section>
  );
}
