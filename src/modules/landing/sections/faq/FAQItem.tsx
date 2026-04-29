"use client";

import { useId, useState } from "react";
import styles from "./faq.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = useId();

  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.question}>{question}</span>
        <span className={`${styles.iconWrap} ${open ? styles.iconWrapOpen : ""}`} aria-hidden>
          <span className={styles.iconHorizontal} />
          <span className={`${styles.iconVertical} ${open ? styles.iconVerticalClosed : ""}`} />
        </span>
      </button>

      <div id={answerId} className={`${styles.answerShell} ${open ? styles.answerShellOpen : ""}`}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </article>
  );
}
