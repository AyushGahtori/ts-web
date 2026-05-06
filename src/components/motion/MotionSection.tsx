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

const easeOut = [0.22, 1, 0.36, 1] as const;

const offsetByDirection: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  left: { x: -38, y: 0 },
  right: { x: 38, y: 0 },
  none: { x: 0, y: 0 },
};

const motionSectionVariants: Variants = {
  hidden: ({ direction }: { direction: RevealDirection }) => {
    const offset = offsetByDirection[direction];

    return {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    };
  },
  show: ({ delay, stagger }: { delay: number; stagger: boolean }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay,
      duration: 0.72,
      ease: easeOut,
      staggerChildren: stagger ? 0.08 : 0,
    },
  }),
};

export function MotionSection({ children, className, id, direction = "up", delay = 0, stagger = false }: MotionSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={motionSectionVariants}
      custom={{ direction, delay, stagger }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.34, margin: "0px 0px -4% 0px" }}
    >
      {children}
    </motion.div>
  );
}
