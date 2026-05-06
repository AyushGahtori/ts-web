"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./innovation.module.css";

interface InnovationPillProps {
  children: React.ReactNode;
  className?: string;
}

export function InnovationPill({ children, className }: InnovationPillProps) {
  return (
    <motion.div
      className={cn(styles.pill, styles.motionPill, className)}
      initial={{ opacity: 0, y: 18, scaleX: 0.72 }}
      whileInView={{ opacity: 1, y: 0, scaleX: 1 }}
      viewport={{ once: true, amount: 0.45, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={styles.motionPillText}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.48, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className={styles.motionPillSheen}
        aria-hidden
        initial={{ x: "-130%" }}
        whileInView={{ x: "145%" }}
        viewport={{ once: true, amount: 0.45, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
