"use client";

import Image from "next/image";
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
            <Image src="/image 64.png" alt="" aria-hidden="true" width={459} height={264} className={styles.erpImage} />
          ) : null}

          {variant === "microsoft" ? (
            <Image src="/image 65.png" alt="" aria-hidden="true" width={469} height={394} className={styles.copilotImage} />
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
              <Image src="/image 69.png" alt="" aria-hidden="true" width={233} height={155} className={styles.cloudBadgeAws} />
              <Image src="/image 68.png" alt="" aria-hidden="true" width={293} height={162} className={styles.cloudBadgeGcp} />
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
