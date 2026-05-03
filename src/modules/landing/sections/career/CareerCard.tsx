import { CursorBlurText } from "@/components/effects/CursorBlurText";
import styles from "./career.module.css";

export function CareerCard() {
  return (
    <article className={styles.card}>
      <div className={styles.cardGlow} aria-hidden />
      <div className={styles.cardContent}>
        <h3 className={styles.heading}>
          <span>Career</span>
          <span>shape the</span>
          <span>future</span>
        </h3>

        <CursorBlurText as="p" className={`${styles.quote} blur-reveal blur-reveal--pink blur-reveal--delay-1`} spotSize={170}>
          <span>“Build What Has</span>
          <span>Never Been</span>
          <span>Built”</span>
        </CursorBlurText>
      </div>

      <div className={styles.barCluster} aria-hidden>
        <span className={styles.barShort} />
        <span className={styles.barLong} />
        <span className={styles.barTiny} />
      </div>
    </article>
  );
}
