"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./lifeAt.module.css";

const bullets = [
  "Impact: Work on mission-critical transformations for global leaders in BFSI, Pharma, and Manufacturing.",
  "Flexibility: Engaging in various models, from outcome-based projects to long-term managed services.",
  "Technology: Access to a seamless integration ecosystem covering ERP, CRM, and DevOps.",
];

export function LifeAtWhySection() {
  return (
    <section className={styles.whySection} aria-label="Why join TechSnitch">
      <motion.div
        className={styles.whyPanel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className={styles.whyGhost}
          aria-hidden
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          WHY?
        </motion.span>
        <motion.h2
          className={styles.whyTitle}
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.72, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          Join US
        </motion.h2>
        <motion.ul
          className={styles.whyList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {bullet}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className={styles.whyPerson}
        aria-hidden
        initial={{ opacity: 0, x: 28, rotate: 2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src="/search-person.png" alt="" width={505} height={653} className={styles.whyPersonImage} />
      </motion.div>
    </section>
  );
}
