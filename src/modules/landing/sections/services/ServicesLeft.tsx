import Image from "next/image";
import styles from "./services.module.css";

const slogan = ["Create.", "Edit.", "Deliver.", "Dominate."];

export function ServicesLeft() {
  return (
    <div className={styles.leftColumn}>
      <div className={styles.leftGrid} aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <Image
        src="/image 50.png"
        alt=""
        aria-hidden="true"
        width={297}
        height={198}
        className={styles.laptopImage}
        priority
      />

      <div className={styles.wordStack}>
        {slogan.map((word) => (
          <span key={word} className={styles.stackWord}>
            {word}
          </span>
        ))}
      </div>

      <span className={`${styles.pill} ${styles.pillTop}`}>Automate Everything</span>
      <span className={`${styles.pill} ${styles.pillMiddle}`}>Customer First</span>
      <span className={`${styles.pill} ${styles.pillBottom}`}>AI-Driven Workflows</span>

      <Image
        src="/image 49.png"
        alt=""
        aria-hidden="true"
        width={146}
        height={146}
        className={styles.cupImage}
      />

      <span className={styles.baseAccent} aria-hidden />
    </div>
  );
}
