import { CareerCard } from "@/modules/landing/sections/career/CareerCard";
import { CareerIllustration } from "@/modules/landing/sections/career/CareerIllustration";
import styles from "./career.module.css";

export function CareerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <CareerCard />
        <CareerIllustration />
      </div>
    </section>
  );
}
