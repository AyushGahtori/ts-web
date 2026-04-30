"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";
import styles from "./faq.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
  open?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ question, answer, open = false, onToggle }: FAQItemProps) {
  const answerId = useId();

  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={answerId}
        onClick={onToggle}
      >
        <span className={styles.question}>{question}</span>
        <motion.span
          className={`${styles.iconWrap} ${open ? styles.iconWrapOpen : ""}`}
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.iconHorizontal} />
          <span className={`${styles.iconVertical} ${open ? styles.iconVerticalClosed : ""}`} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={answerId}
            className={`${styles.answerShell} ${styles.answerShellOpen}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.answerInner}>
              <p className={styles.answer}>{answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
