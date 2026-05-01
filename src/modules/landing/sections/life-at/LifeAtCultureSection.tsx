import Image from "next/image";
import styles from "./lifeAt.module.css";

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
        <h2 className={styles.cultureTitle}>Our Culture: Where Intelligence Meets Purpose</h2>
        <p className={styles.cultureBody}>
          At TechSnitch, we don&apos;t just build AI; we foster an environment where the world&apos;s most curious minds can
          solve the enterprise&apos;s toughest challenges. Life here is defined by a passion for AI-agnostic innovation, a
          commitment to outcome-driven excellence, and a belief that the future of work is autonomous.
        </p>
      </div>
    </section>
  );
}
