import { InnovationPill } from "./InnovationPill";
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

      <p className={styles.pathDescription}>
        Innovation is a journey, not a destination. TechSnitch partners with you through every phase of the
        evolution.
      </p>

      <ol className={styles.pathList}>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
