"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./lifeAt.module.css";

const titleEase = [0.16, 1, 0.3, 1] as const;

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
    filter: "blur(12px)",
  },
  show: (index: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.024,
      duration: 0.36,
      ease: titleEase,
    },
  }),
};

function RevealLetters({ className, startIndex = 0, text }: { className: string; startIndex?: number; text: string }) {
  return (
    <span className={className}>
      {Array.from(text).map((letter, index) => (
        <motion.span
          // The text is static, so the index key keeps the reveal deterministic.
          key={`${letter}-${index}`}
          className={styles.heroRevealLetter}
          custom={startIndex + index}
          variants={letterVariants}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export function LifeAtHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      const scrollY = window.scrollY;
      const direction = scrollY >= lastScrollY.current ? "down" : "up";
      const rect = hero.getBoundingClientRect();
      const heroIsReadable = rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.22;

      if (direction === "down" && scrollY > 8 && heroIsReadable) {
        setIsRevealed(true);
      }

      if (direction === "up" && rect.top > -80) {
        setIsRevealed(false);
      }

      if (scrollY <= 4) {
        setIsRevealed(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Life at Techsnitch">
      <p className={styles.backgroundWord} aria-hidden>
        Life at
      </p>
      <motion.span
        className={styles.heroRevealDot}
        aria-hidden
        variants={{
          hidden: { opacity: 0, x: 0, scale: 0.25 },
          show: {
            opacity: [0, 1, 1, 0],
            x: ["0vw", "12vw", "28vw", "42vw"],
            y: [0, -7, 6, 0],
            scale: [0.25, 1.35, 1.05, 0.32],
            transition: { duration: 1.05, ease: titleEase, times: [0, 0.18, 0.78, 1] },
          },
        }}
        initial="hidden"
        animate={isRevealed ? "show" : "hidden"}
      />
      <motion.div
        className={styles.content}
        initial="hidden"
        animate={isRevealed ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.018 },
          },
        }}
      >
        <h1 className={styles.title}>
          <RevealLetters className={styles.titleTop} text="Life at" />
          <RevealLetters className={styles.titleBottom} startIndex={9} text="Techsnitch" />
        </h1>
        <motion.p
          className={styles.subtitle}
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay: 0.58, duration: 0.42, ease: titleEase },
            },
          }}
        >
          Empowering the Visionaries
        </motion.p>
      </motion.div>
      <div className={styles.peopleWrap} aria-hidden>
        <Image
          src="/5 persons.png"
          alt=""
          width={1410}
          height={768}
          className={styles.peopleImage}
          priority
        />
      </div>
    </section>
  );
}
