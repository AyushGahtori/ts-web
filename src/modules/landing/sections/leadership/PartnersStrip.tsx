import { LogoStrip } from "@/components/ui/LogoStrip";
import { partnerLogoFrames } from "@/modules/landing/sections/leadership/leadershipData";
import styles from "./leadership.module.css";

export function PartnersStrip() {
  return (
    <section className={styles.stripBlockPartners}>
      <h4 className={styles.stripTitle}>Our Partners</h4>
      <LogoStrip items={partnerLogoFrames} />
    </section>
  );
}
