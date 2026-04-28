import styles from "./AboutSection.module.css";

const coreValues = ["Excellence", "Innovation", "Integrity", "Customer Success", "Agility"];

export function CoreValues() {
  return (
    <div className={styles.valuesSection}>
      <h4 className={styles.valuesTitle}>Core Values</h4>
      <div className={styles.valuesGrid}>
        {coreValues.map((value) => (
          <span key={value} className={styles.valuePill}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
