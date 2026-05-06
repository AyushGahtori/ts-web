"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./innovation.module.css";

const mainSpiralPath =
  "M548 196 C584 96 704 118 664 230 C632 320 514 292 532 188 C552 70 748 70 874 142 C1000 214 982 328 826 354 C666 382 498 360 304 396 C148 425 64 500 62 640 C60 792 190 908 364 982 C514 1046 552 1172 456 1242 C354 1316 190 1300 154 1204 C126 1128 214 1070 302 1108 C402 1154 368 1286 244 1354 C122 1421 126 1562 252 1624 C394 1693 508 1588 416 1510 C326 1433 180 1514 198 1668 C212 1796 356 1848 358 1992 C360 2182 170 2262 188 2450 C206 2650 408 2742 568 2830 C734 2922 714 3076 558 3168 C430 3244 230 3232 134 3340 C110 3367 104 3400 112 3434";

const exitSpiralPath =
  "M792 96 C844 -22 960 32 916 156 C884 246 782 212 812 126 C846 28 1010 94 1064 194 C1104 268 1198 272 1318 218 C1390 186 1458 142 1510 100";

const engulfPath =
  "M62 3370 C246 3302 454 3312 612 3346 C804 3388 1016 3360 1324 3304";

export function InnovationScrollSpirals() {
  const shouldReduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start start", "end end"],
  });
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 28, mass: 0.48 });
  const mainProgress = useTransform(
    scrollProgress,
    [0, 0.05, 0.12, 0.28, 0.5, 0.7, 0.88, 1],
    [0, 0.2, 0.36, 0.5, 0.64, 0.78, 0.94, 1],
  );
  const mainOpacity = useTransform(mainProgress, [0, 0.025, 1], [0, 1, 1]);
  const exitProgress = useTransform(scrollProgress, [0, 0.12], [0, 1]);
  const exitOpacity = useTransform(scrollProgress, [0, 0.025, 0.2, 0.28], [0, 1, 1, 0]);
  const engulfProgress = useTransform(scrollProgress, [0.84, 0.96], [0, 1]);
  const engulfOpacity = useTransform(scrollProgress, [0.8, 0.86, 1], [0, 1, 1]);
  const engulfStrokeWidth = useTransform(scrollProgress, [0.84, 0.9, 0.98, 1], [12, 96, 420, 420]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div ref={layerRef} className={styles.scrollSpiralLayer} aria-hidden="true">
      <motion.svg className={styles.scrollSpiralSvg} viewBox="0 0 1388 3600" preserveAspectRatio="none">
        <motion.path
          d={mainSpiralPath}
          className={styles.scrollSpiralPath}
          style={{ pathLength: mainProgress, opacity: mainOpacity }}
        />
        <motion.path
          d={exitSpiralPath}
          className={styles.scrollSpiralPath}
          style={{ pathLength: exitProgress, opacity: exitOpacity }}
        />
        <motion.path
          d={engulfPath}
          className={styles.scrollSpiralEngulfPath}
          style={{ pathLength: engulfProgress, opacity: engulfOpacity, strokeWidth: engulfStrokeWidth }}
        />
      </motion.svg>
    </div>
  );
}
