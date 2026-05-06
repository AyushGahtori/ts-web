import { CursorBlurText } from "@/components/effects/CursorBlurText";
import { MotionSection } from "@/components/motion/MotionSection";
import styles from "./innovation.module.css";

export function InnovationHeader() {
  return (
    <section className={styles.header}>
      <div className={styles.headerGrid} aria-hidden />

      <div className={styles.headerInner}>
        <MotionSection direction="up">
          <CursorBlurText as="h1" className={`${styles.headerTitle} blur-reveal blur-reveal--violet`} spotSize={210}>
            <span className={styles.headerHash}>#</span> Innovation at TechSnitch:
            <br />
            The Autonomous Frontier
          </CursorBlurText>
        </MotionSection>
      </div>
    </section>
  );
}
