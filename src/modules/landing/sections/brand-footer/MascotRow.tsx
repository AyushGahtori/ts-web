import Image from "next/image";
import styles from "./brandFooter.module.css";

export function MascotRow() {
  return (
    <div className={styles.mascotZone}>
      <div className={styles.mascotGlow} aria-hidden />
      <div className={styles.mascotImageWrap}>
        <Image
          src="/Footer.png"
          alt=""
          fill
          sizes="(max-width: 768px) 88vw, (max-width: 1200px) 68vw, 980px"
          className={styles.mascotImage}
        />
      </div>
      <div className={styles.groundLine} aria-hidden />
    </div>
  );
}
