"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      aria-hidden
      animate={{ y: [0, -8, 0], rotate: [-20.55, -20.1, -20.55] }}
      whileHover={{ y: -16, scale: 1.015 }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src="/Hands.png" alt="" fill preload className="object-cover" />
    </motion.div>
  );
}

