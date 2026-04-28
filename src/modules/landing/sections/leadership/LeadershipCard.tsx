import { PhotoFrame } from "@/components/ui/PhotoFrame";
import styles from "./leadership.module.css";

export function LeadershipCard() {
  return (
    <article className={styles.heroCard}>
      <div className={styles.heroGradient} aria-hidden />
      <div className={styles.nameBlock}>
        <span className={styles.accentBarLong} aria-hidden />
        <span className={styles.accentBarShort} aria-hidden />
        <h3 className={styles.name}>Prashant Sharma</h3>
        <p className={styles.role}>Director</p>
      </div>

      <div className={styles.portraitWrap}>
        <PhotoFrame emphasis="hero" className={styles.portraitFrame} label="Portrait Slot" />
      </div>
    </article>
  );
}
