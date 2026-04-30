import { MotionSection } from "@/components/motion/MotionSection";
import { WhyCard } from "@/modules/landing/sections/why-techsnitch/WhyCard";
import styles from "./whyTechsnitch.module.css";

export function WhyTechsnitchSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <MotionSection direction="up">
          <h2 className={styles.sectionTitle}>
            <span>Why </span>
            <span className={styles.sectionTitleAccent}>TechSnitch</span>
            <span>?</span>
          </h2>
        </MotionSection>

        <MotionSection direction="up" stagger>
          <WhyCard />
        </MotionSection>
      </div>
    </section>
  );
}
