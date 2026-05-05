"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import styles from "./lifeAt.module.css";

const cultureEase = [0.18, 1, 0.32, 1] as const;
const cultureParagraph =
  "At TechSnitch, we don't just build AI; we foster an environment where the world's most curious minds can solve the enterprise's toughest challenges. Life here is defined by a passion for AI-agnostic innovation, a commitment to outcome-driven excellence, and a belief that the future of work is autonomous.";
const slotCharacters = ["+", "0", "#", "/", "*", "•", "1"];

const cultureWordVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 92, filter: "blur(12px)" }),
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: cultureEase },
  },
};

function SlotMachineParagraph() {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(paragraphRef, { amount: 0.45 });
  const characters = useMemo(() => Array.from(cultureParagraph), []);
  const letterIndexes = useMemo(
    () => characters.map((character, index) => (/[a-z]/i.test(character) ? index : -1)).filter((index) => index >= 0),
    [characters],
  );
  const [overrides, setOverrides] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!isInView) {
      const clearTimer = window.setTimeout(() => setOverrides({}), 0);
      return () => window.clearTimeout(clearTimer);
    }

    const timers: number[] = [];

    const rollLetters = () => {
      const shuffled = [...letterIndexes].sort(() => Math.random() - 0.5);
      const selection = shuffled.slice(0, Math.max(4, Math.floor(letterIndexes.length * 0.1)));

      selection.forEach((letterIndex, selectionIndex) => {
        const original = characters[letterIndex];

        for (let step = 0; step < 4; step += 1) {
          timers.push(
            window.setTimeout(
              () => {
                setOverrides((current) => ({
                  ...current,
                  [letterIndex]: step === 3 ? original : slotCharacters[(letterIndex + step + selectionIndex) % slotCharacters.length],
                }));
              },
              selectionIndex * 10 + step * 68,
            ),
          );
        }

        timers.push(
          window.setTimeout(() => {
            setOverrides((current) => {
              const next = { ...current };
              delete next[letterIndex];
              return next;
            });
          }, selectionIndex * 10 + 320),
        );
      });
    };

    timers.push(window.setTimeout(rollLetters, 850));
    const intervalId = window.setInterval(rollLetters, 5000);

    return () => {
      window.clearInterval(intervalId);
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [characters, isInView, letterIndexes]);

  return (
    <p ref={paragraphRef} className={styles.cultureBody}>
      {characters.map((character, index) => (
        <span key={`${character}-${index}`} className={overrides[index] ? styles.slotLetterActive : undefined}>
          {overrides[index] ?? character}
        </span>
      ))}
    </p>
  );
}

export function LifeAtCultureSection() {
  return (
    <section className={styles.cultureSection} aria-label="Our culture">
      <div className={styles.cultureArt} aria-hidden>
        <Image
          src="/coffee-person and-yoga.png"
          alt=""
          width={1800}
          height={900}
          className={styles.cultureArtImage}
          priority
        />
      </div>
      <div className={styles.cultureArrow} aria-hidden>
        <span />
      </div>
      <div className={styles.cultureContent}>
        <motion.h2
          className={`${styles.cultureTitle} ${styles.cultureTitleAnimated}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.64, margin: "0px 0px -12% 0px" }}
        >
          <motion.span variants={cultureWordVariants} custom={-1} className={styles.cultureWord}>
            Our
          </motion.span>{" "}
          <motion.span variants={cultureWordVariants} custom={1} className={styles.cultureWord}>
            Culture:
          </motion.span>{" "}
          <span className={styles.cultureWord}>Where</span>{" "}
          <span className={styles.cultureWord}>Intelligence</span>{" "}
          <motion.span variants={cultureWordVariants} custom={-1} className={styles.cultureWord}>
            Meets
          </motion.span>{" "}
          <motion.span variants={cultureWordVariants} custom={1} className={styles.cultureWord}>
            Purpose
          </motion.span>
        </motion.h2>
        <SlotMachineParagraph />
      </div>
    </section>
  );
}
