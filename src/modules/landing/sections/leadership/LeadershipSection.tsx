import { CustomersStrip } from "@/modules/landing/sections/leadership/CustomersStrip";
import { LeadershipCard } from "@/modules/landing/sections/leadership/LeadershipCard";
import { PartnersStrip } from "@/modules/landing/sections/leadership/PartnersStrip";
import { TeamThumbnailRow } from "@/modules/landing/sections/leadership/TeamThumbnailRow";
import styles from "./leadership.module.css";

export function LeadershipSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.backdropImage} aria-hidden />
        <div className={styles.backdropFade} aria-hidden />

        <LeadershipCard />
        <TeamThumbnailRow />
        <CustomersStrip />
        <PartnersStrip />
      </div>
    </section>
  );
}
