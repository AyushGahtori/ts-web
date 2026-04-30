import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { WhyUsContent } from "@/modules/landing/sections/why-us/WhyUsContent";
import styles from "./whyUs.module.css";

export function WhyUsSection() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.panel}>
        <span className={styles.backgroundWhy} aria-hidden>
          WHY
        </span>

        <div className={styles.layout}>
          <MotionSection className={styles.visualColumn} direction="left">
            <div className={styles.visualStage}>
              <Image
                src="/image 45.png"
                alt=""
                aria-hidden="true"
                width={726}
                height={987}
                className={styles.visualImage}
                priority
              />
            </div>
          </MotionSection>

          <WhyUsContent />
        </div>
      </div>
    </section>
  );
}
