"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type RevealDirection = "up" | "left" | "right" | "none";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: RevealDirection;
  delay?: number;
  stagger?: boolean;
}

const offsetByDirection: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  left: { x: -38, y: 0 },
  right: { x: 38, y: 0 },
  none: { x: 0, y: 0 },
};

export function MotionSection({ children, className, id, direction = "up", delay = 0, stagger = false }: MotionSectionProps) {
  const offset = offsetByDirection[direction];
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: stagger ? 0.08 : 0,
      },
    },
  };

  return (
    <motion.div
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}
