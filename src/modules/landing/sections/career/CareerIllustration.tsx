import Image from "next/image";
import styles from "./career.module.css";

export function CareerIllustration() {
  return (
    <div className={styles.illustrationShell}>
      <div className={styles.illustrationInner}>
        <Image
          src="/3d-sculptors.png"
          alt="3D team sculpture showing people working across desks and dashboards"
          fill
          sizes="(max-width: 900px) 96vw, 760px"
          className={styles.illustrationImage}
        />
      </div>
    </div>
  );
}
