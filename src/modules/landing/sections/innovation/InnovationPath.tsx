import { InnovationPill } from "./InnovationPill";
import { AnimatedList, AnimatedListItem, WordRevealText } from "./InnovationTextEffects";
import styles from "./innovation.module.css";

const steps = [
  "Discover: Identifying manual bottlenecks and AI-readiness.",
  "Architect: Designing an AI-agnostic, secure environment.",
  "Accelerate: Deploying SAOS and SNADA for immediate impact.",
  "Evolve: Continuous optimization through AI-driven process mining.",
];

export function InnovationPath() {
  return (
    <section className={styles.pathSection}>
      <InnovationPill className={styles.pathPill}>The Path to Autonomy</InnovationPill>

      <WordRevealText
        className={styles.pathDescription}
        text="Innovation is a journey, not a destination. TechSnitch partners with you through every phase of the evolution."
      />

      <AnimatedList as="ol" className={styles.pathList}>
        {steps.map((step) => (
          <AnimatedListItem key={step}>{step}</AnimatedListItem>
        ))}
      </AnimatedList>
    </section>
  );
}
