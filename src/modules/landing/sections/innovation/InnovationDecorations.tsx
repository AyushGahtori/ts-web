"use client";

import { motion } from "framer-motion";
import styles from "./innovation.module.css";

interface InnovationDecorationsProps {
  area: "header" | "panel";
}

export function InnovationDecorations({ area }: InnovationDecorationsProps) {
  const drawProps = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: false, amount: 0.5 },
    transition: { duration: 1.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (area === "header") {
    return (
      <svg className={styles.headerDoodles} viewBox="0 0 560 220" aria-hidden="true">
        <motion.path
          d="M180 132c16-44 44-67 67-56 19 9 14 39-8 68-22 29-39 51-24 62 14 10 36-1 55-19"
          className={styles.doodleStroke}
          {...drawProps}
        />
        <motion.path d="M247 175c8-13 16-17 31-17m-12-9 13 11-9 14" className={styles.doodleStroke} {...drawProps} />
        <motion.path
          d="M393 50c14-31 41-47 59-34 19 13 14 44-7 70-22 25-36 46-19 57 17 11 39 3 58-15"
          className={styles.doodleStroke}
          {...drawProps}
        />
        <motion.path d="M456 125c5-2 11-4 18-3m-7-8 12 9-10 13" className={styles.doodleStroke} {...drawProps} />
      </svg>
    );
  }

  return (
    <>
      <svg className={styles.frameworkArrow} viewBox="0 0 320 220" aria-hidden="true">
        <motion.path
          d="M210 22c-66 13-122 56-135 99-11 37 10 62 54 70 29 6 58-1 89-17"
          className={styles.annotationStrokeBold}
          {...drawProps}
        />
        <motion.path d="M180 171c11-2 22-2 36-1m-9-12 24 11-14 23" className={styles.annotationStrokeBold} {...drawProps} />
      </svg>

      <svg className={styles.useCasesArrow} viewBox="0 0 260 220" aria-hidden="true">
        <motion.path
          d="M69 21c-2 36 1 66 13 90 14 28 41 48 80 57"
          className={styles.annotationStrokeBold}
          {...drawProps}
        />
        <motion.path d="M123 160c14 2 26 2 38 0m-9-12 20 12-12 20" className={styles.annotationStrokeBold} {...drawProps} />
      </svg>

      <svg className={styles.bottomArcText} viewBox="0 0 900 180" aria-hidden="true">
        <defs>
          <path id="innovation-arc-path" d="M40 146C230 46 670 46 860 146" />
        </defs>
        <text>
          <textPath href="#innovation-arc-path" startOffset="50%" textAnchor="middle">
            TECHSNITCH BELIEVE IN INNOVATION
          </textPath>
        </text>
      </svg>
    </>
  );
}
