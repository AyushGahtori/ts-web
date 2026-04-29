import styles from "./innovation.module.css";

interface InnovationBullet {
  label: string;
  text: string;
}

interface InnovationBlockProps {
  title: string;
  description: string;
  bullets: InnovationBullet[];
}

export function InnovationBlock({ title, description, bullets }: InnovationBlockProps) {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>{title}</h3>
      <p className={styles.blockDescription}>{description}</p>

      <ul className={styles.blockList}>
        {bullets.map((bullet) => (
          <li key={bullet.label}>
            <span>{bullet.label}:</span> {bullet.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
