import Image from "next/image";
import styles from "./AboutSection.module.css";

export function AboutPhonePlaceholder() {
  return (
    <div className={styles.phoneStage} aria-hidden>
      <div className={styles.phoneGlowBarPrimary} />
      <div className={styles.phoneGlowBarSecondary} />
      <div className={styles.phoneGlowBarTertiary} />

      <div className={styles.phoneShell}>
        <Image
          src="/phone.png"
          alt=""
          fill
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 504px"
          className={styles.phoneImage}
        />
      </div>
    </div>
  );
}
