"use client";

import { FAQItem } from "@/modules/landing/sections/faq/FAQItem";
import { useState } from "react";
import styles from "./faq.module.css";

const faqs = [
  {
    id: "q1",
    question: "Q1. What does AI-agnostic mean?",
    answer: "It refers to the ability to integrate with multiple AI platforms without dependency on a single vendor.",
    defaultOpen: true,
  },
  {
    id: "q2",
    question: "Q2. How does SNADA enhance ServiceNow?",
    answer: "SNADA provides conversational AI and multi-model orchestration, improving automation and user experience.",
  },
  {
    id: "q3",
    question: "Q3. What is SAOS?",
    answer:
      "SAOS is an advanced operating system layer designed to enable autonomous enterprise workflows and continuous optimization.",
  },
  {
    id: "q4",
    question: "Q4. How long does a typical implementation take?",
    answer:
      "Implementation timelines vary depending on complexity, but most enterprise deployments are completed within a structured multi-phase rollout.",
  },
  {
    id: "q5",
    question: "Q5. Which industries does TechSnitch serve?",
    answer:
      "TechSnitch serves industries including BFSI, healthcare, telecom, manufacturing, and other regulated enterprise sectors.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | undefined>(faqs.find((item) => item.defaultOpen)?.id ?? faqs[0]?.id);

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden />
            <span>FAQs</span>
          </div>

          <h2 className={styles.heading}>Frequently Asked Questions</h2>
        </header>

        <div className={styles.grid}>
          {faqs.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              open={openId === item.id}
              onToggle={() => setOpenId((current) => (current === item.id ? undefined : item.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
