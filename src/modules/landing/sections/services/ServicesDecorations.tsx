import styles from "./services.module.css";

export function ServicesDecorations() {
  return (
    <>
      <span className={styles.edgeMaskLeft} aria-hidden />
      <span className={styles.edgeMaskRight} aria-hidden />
    </>
  );
}
