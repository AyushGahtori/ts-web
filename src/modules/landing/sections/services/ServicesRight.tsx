import { CursorBlurText } from "@/components/effects/CursorBlurText";
import styles from "./services.module.css";

export function ServicesRight() {
  return (
    <div className={styles.rightColumn}>
      <CursorBlurText as="span" className={`${styles.brandGhost} blur-reveal blur-reveal--muted`} aria-hidden preservePosition spotSize={190}>
        TechSnitch:
      </CursorBlurText>
      <span className={styles.outlineGhost} aria-hidden>
        Ser
      </span>

      <div className={styles.titleWrap}>
        <div className={styles.shapeCluster} aria-hidden>
          <span className={styles.shapePill} />
          <span className={styles.shapeCurveTop} />
          <span className={styles.shapeCurveBottom} />
        </div>

        <div className={styles.titleBlock}>
          <h2>Enterprise AI Transformation Portfolio</h2>
        </div>
      </div>

      <div className={styles.figurePlaceholder} aria-hidden>
        <div className={styles.figurePlaceholderInner} />
      </div>
    </div>
  );
}
