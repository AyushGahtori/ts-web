"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ServicesDecorations } from "@/modules/landing/sections/services/ServicesDecorations";
import { ServicesLeft } from "@/modules/landing/sections/services/ServicesLeft";
import { ServicesOther } from "@/modules/landing/sections/services/ServicesOther";
import { ServicesRight } from "@/modules/landing/sections/services/ServicesRight";
import styles from "./services.module.css";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.12 });

  return (
    <section ref={sectionRef} id="services" className={styles.section} data-paused={!isInView}>
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
