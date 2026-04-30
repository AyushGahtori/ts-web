import Image from "next/image";
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
    <article className={`${styles.card} ${styles[`card${capitalize(variant)}`]} ${className}`}>
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
            <Image
              src="/oracle.png"
              alt=""
              aria-hidden="true"
              width={1024}
              height={1536}
              sizes="(max-width: 768px) 76vw, (max-width: 1180px) 32vw, 360px"
              className={styles.erpImage}
            />
          ) : null}

          {variant === "microsoft" ? (
            <Image
              src="/copiolet.png"
              alt=""
              aria-hidden="true"
              width={297}
              height={198}
              className={styles.copilotImage}
              style={{ height: "auto" }}
            />
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
                <Image
                  src="/aws.png"
                  alt=""
                  aria-hidden="true"
                  width={233}
                  height={155}
                  sizes="(max-width: 768px) 32vw, 150px"
                  className={styles.cloudBadgeImageAws}
                />
              </div>
              <div className={styles.cloudBadgeGcp}>
                <Image
                  src="/gcc.png"
                  alt=""
                  aria-hidden="true"
                  width={293}
                  height={162}
                  sizes="(max-width: 768px) 34vw, 180px"
                  className={styles.cloudBadgeImageGcp}
                />
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
    </article>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
