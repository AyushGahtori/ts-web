"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./lifeAt.module.css";

const rows = [
  ["Philosophy", "AI-Agnostic & Outcome-Driven."],
  ["Tools", "SNADA, SAOS, and the full Cloud/AI Stack."],
  ["Community", "A diverse, global team of elite talent."],
  ["Governance", "Ethical AI and strong compliance frameworks."],
];

const dotTones = [
  "light",
  "mid",
  "dark",
  "light",
  "mid",
  "mid",
  "deep",
  "dark",
  "mid",
  "light",
  "mid",
  "deep",
  "light",
  "mid",
  "mid",
  "deep",
];

function DotGrid({ className }: { className: string }) {
  return (
    <motion.div
      className={`${styles.dotGrid} ${className}`}
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.025 } },
      }}
    >
      {dotTones.map((tone, index) => (
        <motion.span
          key={`${tone}-${index}`}
          className={styles[`dot${tone[0].toUpperCase()}${tone.slice(1)}` as keyof typeof styles]}
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
          }}
        />
      ))}
    </motion.div>
  );
}

export function LifeAtGlanceSection() {
  return (
    <section className={styles.glanceSection} aria-label="Inside TechSnitch at a glance">
      <DotGrid className={styles.dotGridLeft} />
      <DotGrid className={styles.dotGridRight} />

      <motion.h2
        className={styles.glanceTitle}
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        Inside TechSnitch: At a Glance
      </motion.h2>

      <motion.div
        className={styles.glanceTable}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.44 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <div className={styles.glanceTableHeader}>Feature</div>
        <div className={styles.glanceTableHeader}>What we Offer</div>
        {rows.map(([feature, offer]) => (
          <motion.div
            className={styles.glanceRow}
            key={feature}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span>{feature}</span>
            <span>{offer}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={styles.glanceArrow}
        aria-hidden
        initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src="/image 14.png" alt="" width={360} height={360} className={styles.glanceArrowImage} />
      </motion.div>
    </section>
  );
}
