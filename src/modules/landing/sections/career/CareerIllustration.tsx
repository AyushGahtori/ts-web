import Image from "next/image";
import styles from "./career.module.css";

export function CareerIllustration() {
  return (
    <div className={styles.illustrationShell}>
      <div className={styles.illustrationInner}>
        <Image
          src="/3d%20sculptors.png"
          alt="Team collaborating across desks and dashboards"
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 60vw, 900px"
          className={styles.illustrationImage}
        />
      </div>
    </div>
  );
}
