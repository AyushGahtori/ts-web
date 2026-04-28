import { AnimatedLetterEC } from "@/modules/landing/sections/brand-footer/AnimatedLetterEC";
import styles from "./brandFooter.module.css";

export function BrandWordmark() {
  return (
    <div className={styles.wordmarkBlock}>
      <div className={styles.wordmark} aria-label="TECHSNITCH">
        <span className={styles.wordmarkStaticT}>T</span>
        <AnimatedLetterEC letter="E" className={styles.wordmarkAnimatedE} />
        <AnimatedLetterEC letter="C" className={styles.wordmarkAnimatedC} />
        <span className={styles.wordmarkStaticRest}>HSNITCH</span>
      </div>

      <p className={styles.tagline}>/A place for tech</p>
    </div>
  );
}
