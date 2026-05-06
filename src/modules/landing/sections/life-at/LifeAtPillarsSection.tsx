"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./lifeAt.module.css";

const itemTransition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };
const blockTransition = { duration: 0.86, ease: [0.16, 1, 0.3, 1] as const };

export function LifeAtPillarsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.18 });

  return (
    <section
      ref={sectionRef}
      className={styles.pillarsSection}
      data-paused={!isInView}
      aria-label="Employee experience pillars"
    >
      <motion.div
        className={styles.pillarsPanel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className={styles.pillarsTitle}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={itemTransition}
        >
          The Pillars of Our Employee Experience
        </motion.h2>

        <div className={styles.pillarStack}>
          <motion.article
            className={`${styles.pillarItem} ${styles.pillarItemOne}`}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.36 }}
            transition={blockTransition}
          >
            <motion.div
              className={styles.pillarCloudArt}
              initial={{ opacity: 0, y: 26, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...itemTransition, delay: 0.06 }}
              aria-hidden
            >
              <span className={styles.cloudPuffLarge} />
              <span className={styles.cloudPuffMedium} />
              <span className={styles.cloudPuffSmall} />
              <Image src="/image 45.png" alt="" width={746} height={1018} className={styles.pillarThinker} />
            </motion.div>
            <motion.div
              className={styles.pillarBand}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...itemTransition, delay: 0.12 }}
            >
              <h3>Innovation Without Borders</h3>
              <p>
                We encourage our teams to experiment across the entire AI ecosystem. You won&apos;t be locked into one
                vendor; you will work with Azure OpenAI, Google Gemini, AWS Bedrock, and the latest open-source models to
                build what&apos;s next.
              </p>
            </motion.div>
            <motion.span
              className={styles.pillarNumber}
              aria-hidden
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.34 }}
              transition={{ ...itemTransition, delay: 0.18 }}
            >
              1.
            </motion.span>
          </motion.article>

          <motion.article
            className={`${styles.pillarItem} ${styles.pillarItemTwo}`}
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.36 }}
            transition={{ ...blockTransition, delay: 0.06 }}
          >
            <motion.span
              className={styles.pillarNumber}
              aria-hidden
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.36 }}
              transition={{ ...itemTransition, delay: 0.04 }}
            >
              2.
            </motion.span>
            <motion.div
              className={styles.pillarBand}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...itemTransition, delay: 0.1 }}
            >
              <h3>Continuous Growth &amp; Mastery</h3>
              <p>As an Elite Talent Pool, we invest heavily in our people.</p>
              <ul>
                <li>Certified Excellence: Support for advanced certifications in ServiceNow, Cloud Architecture, and AI Engineering.</li>
                <li>Proprietary Learning: Gain deep expertise in our exclusive accelerators like SNADA and SAOS.</li>
                <li>Leadership Labs: Mentorship from visionaries who are redefining digital transformation.</li>
              </ul>
            </motion.div>
            <motion.div
              className={styles.pillarLadderArt}
              initial={{ opacity: 0, y: 24, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...itemTransition, delay: 0.16 }}
              aria-hidden
            >
              <Image src="/ladder-step.png" alt="" width={567} height={567} className={styles.pillarLadderImage} />
            </motion.div>
          </motion.article>

          <motion.article
            className={`${styles.pillarItem} ${styles.pillarItemThree}`}
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.36 }}
            transition={{ ...blockTransition, delay: 0.1 }}
          >
            <motion.div
              className={styles.pillarGlobeArt}
              initial={{ opacity: 0, y: 28, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...itemTransition, delay: 0.04 }}
              aria-hidden
            >
              <Image src="/global-person.png" alt="" width={541} height={447} className={styles.pillarGlobeImage} />
            </motion.div>
            <motion.div
              className={styles.pillarBand}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...itemTransition, delay: 0.1 }}
            >
              <h3>Global Impact, Local Connection</h3>
              <p>
                With a global delivery model, our teams collaborate across borders to deliver excellence. Whether working
                from our high-tech delivery centers or remotely, you are part of a unified mission to enable the
                autonomous enterprise.
              </p>
            </motion.div>
            <motion.span
              className={styles.pillarNumber}
              aria-hidden
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.36 }}
              transition={{ ...itemTransition, delay: 0.16 }}
            >
              3.
            </motion.span>
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}
