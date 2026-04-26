import { GlowFrame } from "@/components/ui/GlowFrame";
import { IndustryAccordion } from "@/modules/landing/sections/industry-excellence/IndustryAccordion";
import { industryAccordionItems } from "@/modules/landing/sections/industry-excellence/industryData";
import styles from "./IndustryExcellence.module.css";

export function IndustryExcellence() {
  return (
    <section className={styles.section}>
      <GlowFrame className={styles.frame}>
        <div className={styles.frameGlow} aria-hidden />
        <IndustryAccordion items={industryAccordionItems} />
      </GlowFrame>
    </section>
  );
}
