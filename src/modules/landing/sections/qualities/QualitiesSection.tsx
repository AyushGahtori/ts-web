"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./qualities.module.css";

const metrics = [
  { value: "100+", label: "Enterprise Deployments" },
  { value: "24*7", label: "WhiteCollar Support" },
  { value: "5+", label: "Regulated Industries" },
  { value: "100%", label: "Outcome-Driven SLAs" },
];

export function QualitiesSection() {
  return (
    <section className={styles.section} aria-label="Our qualities">
      <div className={styles.grid} aria-hidden />
      <div className={styles.wave} aria-hidden />
      <div className={styles.craftWrap} aria-hidden>
        <Image src="/image%202.svg" alt="" fill sizes="(max-width: 768px) 92vw, 58vw" className={styles.craftImage} />
      </div>

      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: -90 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.q}>Q</span>
        <span className={styles.our}>OUR</span>
        <span className={styles.ualities}>ualities</span>
      </motion.div>

      <motion.div
        className={styles.cards}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.28 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {metrics.map((metric) => (
          <motion.article
            className={styles.card}
            key={metric.label}
            variants={{
              hidden: { opacity: 0, y: 52 },
              show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <div className={styles.metricPanel}>
              <span>{metric.value}</span>
            </div>
            <div className={styles.controls} aria-hidden>
              <span className={styles.pill} />
              <span className={styles.dots}>
                <span />
                <span />
                <span />
                <span />
              </span>
            </div>
            <p>{metric.label}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
