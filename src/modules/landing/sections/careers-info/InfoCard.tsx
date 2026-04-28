import type { ReactNode } from "react";
import styles from "./careersInfo.module.css";

interface InfoCardProps {
  title?: string;
  children?: ReactNode;
  items?: string[];
  variant?: "intro" | "list";
}

export function InfoCard({ title, children, items, variant = "list" }: InfoCardProps) {
  return (
    <article className={variant === "intro" ? styles.infoCardIntro : styles.infoCard}>
      <div className={styles.infoCardGlow} aria-hidden />

      {title ? <h3 className={styles.infoCardTitle}>{title}</h3> : null}

      {children ? <div className={styles.infoCardCopy}>{children}</div> : null}

      {items?.length ? (
        <ul className={styles.infoList}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
