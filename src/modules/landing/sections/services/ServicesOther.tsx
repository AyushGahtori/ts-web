import styles from "./services.module.css";

export function ServicesOther() {
  return (
    <div className={styles.otherWrap}>
      <a href="#services-grid" className={styles.otherLink}>
        <span className={styles.otherLabel}>Other Services</span>
        <span className={styles.otherButton} aria-hidden>
          <span className={styles.otherArrow} />
        </span>
      </a>
    </div>
  );
}
