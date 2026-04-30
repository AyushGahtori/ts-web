"use client";

import { motion } from "framer-motion";
import styles from "./servicesGrid.module.css";

type CardVariant = "salesforce" | "erp" | "microsoft" | "llm" | "cloud" | "itsm";

interface ServiceCardProps {
  title: string;
  description: string;
  bullets?: string[];
  variant: CardVariant;
  className?: string;
}

export function ServiceCard({ title, description, bullets, variant, className = "" }: ServiceCardProps) {
  return (
    <motion.article
      className={`${styles.card} ${styles[`card${capitalize(variant)}`]} ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -5, scale: 1.012 }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cardBody}>
        <div className={styles.copy}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>

          {bullets ? (
            <ul className={styles.bulletList}>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}

          <a href="#wall-of-love" className={styles.learnMore}>
            <span>Learn More</span>
            <span className={styles.learnArrow} aria-hidden />
          </a>
        </div>

        <div className={styles.visual} aria-hidden>
          {variant === "salesforce" ? (
            <div className={styles.salesforceStar} />
          ) : null}

          {variant === "erp" ? (
            <div className={styles.erpImage}>ERP</div>
          ) : null}

          {variant === "microsoft" ? (
            <div className={styles.copilotImage}>Copilot</div>
          ) : null}

          {variant === "llm" ? (
            <div className={styles.codeWindow}>
              <span className={styles.windowDotRed} />
              <span className={styles.windowDotGreen} />
              <span className={styles.codeGlyph} />
            </div>
          ) : null}

          {variant === "cloud" ? (
            <>
              <div className={styles.cloudBadgeAws}>
                <span className={styles.cloudBadgeImageAws}>AWS</span>
              </div>
              <div className={styles.cloudBadgeGcp}>
                <span className={styles.cloudBadgeImageGcp}>GCP</span>
              </div>
            </>
          ) : null}

          {variant === "itsm" ? (
            <div className={styles.supportAvatar}>
              <span className={styles.supportHead} />
              <span className={styles.supportEarLeft} />
              <span className={styles.supportEarRight} />
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
