import { LogoStrip } from "@/components/ui/LogoStrip";
import { customerLogoFrames } from "@/modules/landing/sections/leadership/leadershipData";
import styles from "./leadership.module.css";

export function CustomersStrip() {
  return (
    <section className={styles.stripBlock}>
      <h4 className={styles.stripTitle}>Our Customers</h4>
      <LogoStrip items={customerLogoFrames} />
    </section>
  );
}
