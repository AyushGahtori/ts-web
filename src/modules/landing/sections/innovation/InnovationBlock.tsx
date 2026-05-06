import { AnimatedList, AnimatedListItem, KineticHeading, WordRevealText } from "./InnovationTextEffects";
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
      <KineticHeading className={styles.blockTitle}>{title}</KineticHeading>
      <WordRevealText className={styles.blockDescription} text={description} />

      <AnimatedList className={styles.blockList}>
        {bullets.map((bullet) => (
          <AnimatedListItem key={bullet.label}>
            <span>{bullet.label}:</span> {bullet.text}
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </section>
  );
}
