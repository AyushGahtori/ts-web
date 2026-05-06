import Image from "next/image";
import { PortfolioCards } from "@/modules/landing/sections/portfolio/PortfolioCards";
import styles from "./portfolio.module.css";

export function PortfolioSection() {
  return (
    <section className={styles.section} aria-label="Comprehensive Service Portfolio">
      <div className={styles.heroBand}>
        <div className={styles.characterArt} aria-hidden>
          <Image src="/image%2013.svg" alt="" fill sizes="(max-width: 768px) 96vw, 760px" className={styles.characterImage} loading="eager" />
        </div>
        <div className={styles.arrowLeft} aria-hidden />
        <div className={styles.arrowRight} aria-hidden />
        <blockquote className={styles.quote}>
          &ldquo;We partner with visionary organizations to architect intelligent ecosystems that transcend traditional service management - seamlessly
          orchestrating people, processes, and technology into a living, breathing enterprise.&rdquo;
        </blockquote>
      </div>

      <div className={styles.titleWrap}>
        <h2>
          Comprehensive
          <span>Service Portfolio</span>
        </h2>
      </div>

      <PortfolioCards />
    </section>
  );
}
