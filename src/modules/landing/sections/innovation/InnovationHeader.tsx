import { InnovationDecorations } from "./InnovationDecorations";
import styles from "./innovation.module.css";

export function InnovationHeader() {
  return (
    <section className={styles.header}>
      <div className={styles.headerGrid} aria-hidden />
      <InnovationDecorations area="header" />

      <div className={styles.headerInner}>
        <h1 className={styles.headerTitle}>
          <span className={styles.headerHash}>#</span> Innovation at TechSnitch:
          <br />
          The Autonomous Frontier
        </h1>
      </div>
    </section>
  );
}
