import styles from "./wallOfLove.module.css";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  className?: string;
}

export function TestimonialCard({ name, role, quote, className = "" }: TestimonialCardProps) {
  return (
    <article className={`${styles.item} ${className}`}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <span className={styles.divider} aria-hidden />
      <p className={styles.quote}>{quote}</p>
    </article>
  );
}
