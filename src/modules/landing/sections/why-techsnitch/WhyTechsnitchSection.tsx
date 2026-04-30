import { WhyCard } from "@/modules/landing/sections/why-techsnitch/WhyCard";
import styles from "./whyTechsnitch.module.css";

export function WhyTechsnitchSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span>Why </span>
          <span className={styles.sectionTitleAccent}>TechSnitch</span>
          <span>?</span>
        </h2>

        <WhyCard />
      </div>
    </section>
  );
}
