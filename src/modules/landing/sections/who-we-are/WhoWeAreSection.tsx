"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./whoWeAre.module.css";

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 64%", "center center"],
  });
  const ribbonProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.55 });
  const ribbonOpacity = useTransform(ribbonProgress, [0, 0.08, 1], [0, 1, 1]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Who we are">
      <motion.svg
        className={styles.ribbon}
        aria-hidden
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        style={{ opacity: ribbonOpacity }}
      >
        <defs>
          <linearGradient id="whoRibbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7431da" />
            <stop offset="42%" stopColor="#8f17d1" />
            <stop offset="72%" stopColor="#df26db" />
            <stop offset="100%" stopColor="#7816bf" />
          </linearGradient>
        </defs>
        <motion.path
          className={styles.ribbonPath}
          d="M-120 120 C170 170 290 -30 372 92 C500 282 234 402 226 174 C212 -226 910 -198 820 258 C760 566 430 676 562 888 C704 1116 1106 1008 926 684 C794 446 1158 248 1422 312 C1710 382 1620 712 1318 690"
          style={{ pathLength: ribbonProgress }}
        />
      </motion.svg>

      <span className={`${styles.quote} ${styles.quoteStart}`} aria-hidden>
        &ldquo;
      </span>
      <span className={`${styles.quote} ${styles.quoteEnd}`} aria-hidden>
        &rdquo;
      </span>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        Who we are?
      </motion.h2>

      <motion.article
        className={`${styles.block} ${styles.blockTop}`}
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.72, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3>Where ServiceNow Excellence Meets AI Freedom</h3>
        <p>
          TechSnitch stands at the forefront of enterprise transformation, an elite partner that fuses deep ServiceNow platform mastery with a truly
          AI-agnostic philosophy.
          <br />
          We don&apos;t just implement; we architect resilient, self-optimizing digital ecosystems that scale with your ambitions and adapt to any AI
          landscape you choose to adopt.
        </p>
      </motion.article>

      <motion.article
        className={`${styles.block} ${styles.blockBottom}`}
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>
          Our proprietary accelerators - <strong>SNADA (ServiceNow AI Digital Assistant)</strong> and{" "}
          <strong>SAOS (ServiceNow Autonomous Operating System)</strong> - are not afterthoughts.
          <br />
          They are precision instruments engineered to compress time-to-value, eliminate operational drag, and permanently shift enterprises from
          reactive firefighting to autonomous, intelligence-led operations.
        </p>
      </motion.article>
    </section>
  );
}
