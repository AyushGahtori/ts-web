import { ServicesDecorations } from "@/modules/landing/sections/services/ServicesDecorations";
import { ServicesLeft } from "@/modules/landing/sections/services/ServicesLeft";
import { ServicesOther } from "@/modules/landing/sections/services/ServicesOther";
import { ServicesRight } from "@/modules/landing/sections/services/ServicesRight";
import styles from "./services.module.css";

export function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.panel}>
        <ServicesDecorations />

        <div className={styles.contentGrid}>
          <ServicesLeft />
          <ServicesRight />
        </div>

        <ServicesOther />
      </div>
    </section>
  );
}
