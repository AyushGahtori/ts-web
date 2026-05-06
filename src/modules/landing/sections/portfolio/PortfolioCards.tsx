"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./portfolio.module.css";

type PortfolioCard = {
  number: string;
  tag: string;
  title: string;
  copy: string;
  image: string;
  tone: "delivery" | "intelligence" | "advisory" | "operations";
  rotate?: number;
  showCursor?: boolean;
};

const cards: PortfolioCard[] = [
  {
    number: "01",
    tag: "Delivery",
    title: "Precision Delivery",
    copy:
      "Precision execution across the full ServiceNow ecosystem, powered by pre-configured accelerators that dramatically reduce project timelines and implementation risk.",
    image: "/image%2014.svg",
    tone: "delivery",
    rotate: -11.99,
    showCursor: true,
  },
  {
    number: "02",
    tag: "Intelligence",
    title: "AI & GenAI Enablement",
    copy:
      "We move AI from pilot to production at scale, with governance, and without locking you into a single vendor. From multi-model orchestration to GenAI copilots, we operationalize intelligence.",
    image: "/image%2015.svg",
    tone: "intelligence",
  },
  {
    number: "03",
    tag: "Operations",
    title: "White-Glove Operations",
    copy:
      "Our managed services are a strategic operational extension of your enterprise - proactive, predictive, and perpetually optimizing your platform.",
    image: "/image%2016.svg",
    tone: "operations",
  },
  {
    number: "04",
    tag: "Advisory",
    title: "Strategic Advisory",
    copy:
      "We co-create transformation strategies grounded in platform intelligence, industry benchmarks, and your organizational context.",
    image: "/image%2017.svg",
    tone: "advisory",
  },
];

export function PortfolioCards() {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <motion.article
          key={card.number}
          className={styles.card}
          data-tone={card.tone}
          tabIndex={0}
          initial={{ opacity: 0, y: 56, rotate: (card.rotate ?? 0) * 0.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: card.rotate ?? 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -8, scale: 1.018, rotate: card.rotate ?? 0 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.figureWrap}>
            <Image src={card.image} alt="" fill sizes="(max-width: 768px) 76vw, 296px" className={styles.figure} loading="eager" />
            <span className={styles.number} aria-hidden>
              {card.number.slice(1)}
            </span>
            <h3>{card.tag}</h3>
            {card.showCursor ? (
              <Image src="/Hand%20Cursor.svg" alt="" width={96} height={96} className={styles.cursor} loading="eager" aria-hidden />
            ) : null}
          </div>
          <div className={styles.copyPanel}>
            <h4>{card.title}</h4>
            <p>{card.copy}</p>
            <button type="button">
              <span>Learn More</span>
              <span aria-hidden>{">"}</span>
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
