import { BrandWordmark } from "@/modules/landing/sections/brand-footer/BrandWordmark";
import { FooterLinks } from "@/modules/landing/sections/brand-footer/FooterLinks";
import { MascotRow } from "@/modules/landing/sections/brand-footer/MascotRow";
import styles from "./brandFooter.module.css";

export function BrandFooterSection() {
  return (
    <section className={styles.section}>
      <div className={styles.transitionBand} aria-hidden />
      <div className={styles.panel}>
        <BrandWordmark />
        <MascotRow />
        <FooterLinks />
      </div>
    </section>
  );
}
