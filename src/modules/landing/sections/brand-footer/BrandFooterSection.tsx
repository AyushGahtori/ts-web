"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { BrandWordmark } from "@/modules/landing/sections/brand-footer/BrandWordmark";
import { FooterLinks } from "@/modules/landing/sections/brand-footer/FooterLinks";
import { MascotRow } from "@/modules/landing/sections/brand-footer/MascotRow";
import styles from "./brandFooter.module.css";

export function BrandFooterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.12 });

  return (
    <section ref={sectionRef} className={styles.section} data-paused={!isInView ? "true" : undefined}>
      <div className={styles.transitionBand} aria-hidden />
      <div className={styles.panel}>
        <BrandWordmark />
        <MascotRow />
        <FooterLinks />
      </div>
    </section>
  );
}
