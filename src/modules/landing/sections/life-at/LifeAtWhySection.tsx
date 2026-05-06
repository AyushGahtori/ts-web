"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./lifeAt.module.css";

const bullets = [
  "Impact: Work on mission-critical transformations for global leaders in BFSI, Pharma, and Manufacturing.",
  "Flexibility: Engaging in various models, from outcome-based projects to long-term managed services.",
  "Technology: Access to a seamless integration ecosystem covering ERP, CRM, and DevOps.",
];

export function LifeAtWhySection() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isPanelInView = useInView(panelRef, { amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start 82%", "end 42%"],
  });
  const spiralProgress = useSpring(scrollYProgress, { stiffness: 86, damping: 24, mass: 0.45 });
  const spiralOpacity = useTransform(spiralProgress, [0, 0.08, 1], [0, 1, 1]);

  return (
    <section className={styles.whySection} data-paused={!isPanelInView} aria-label="Why join TechSnitch">
      <motion.div
        ref={panelRef}
        className={styles.whyPanel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
      >
        <motion.svg className={styles.whySpiralSvg} viewBox="0 0 1040 360" aria-hidden="true">
          <motion.path
            d="M-24 206 C28 148 68 150 86 206 C103 260 46 278 42 221 C36 132 181 80 264 94 C349 109 314 214 262 185 C214 158 244 75 329 54 C415 33 487 71 466 129 C447 184 374 167 386 102 C402 18 536 -19 574 58 C611 132 544 183 511 130 C477 75 547 36 619 55 C692 74 662 154 614 142 C573 132 585 76 642 88 C706 101 694 174 801 178 C889 181 936 156 998 104"
            className={styles.whySpiralPath}
            style={{ pathLength: spiralProgress, opacity: spiralOpacity }}
          />
        </motion.svg>
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
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
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
