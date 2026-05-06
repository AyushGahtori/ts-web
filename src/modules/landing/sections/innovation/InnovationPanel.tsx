import { InnovationBlock } from "./InnovationBlock";
import { InnovationDecorations } from "./InnovationDecorations";
import { InnovationPath } from "./InnovationPath";
import { InnovationPill } from "./InnovationPill";
import { InnovationScrollSpirals } from "./InnovationScrollSpirals";
import { InnovationTable } from "./InnovationTable";
import { AnimatedList, AnimatedListItem, WordRevealText } from "./InnovationTextEffects";
import { MotionSection } from "@/components/motion/MotionSection";
import styles from "./innovation.module.css";

const frameworkBlocks = [
  {
    title: "1. SAOS (ServiceNow Autonomous Operating System)",
    description: "The flagship framework for the self-driving enterprise.",
    bullets: [
      {
        label: "Self-Healing Infrastructure",
        text: "Automated detection and remediation of IT anomalies without human intervention.",
      },
      {
        label: "Predictive AIOps",
        text: "Correlation of events using machine learning to resolve issues before users are impacted.",
      },
      {
        label: "Closed-Loop Automation",
        text: "End-to-end workflow orchestration that handles the entire lifecycle of an incident.",
      },
    ],
  },
  {
    title: "2. SNADA (ServiceNow AI Digital Assistant)",
    description: "The intelligent bridge between complex enterprise data and seamless user experience.",
    bullets: [
      {
        label: "Multi-Model Routing",
        text: "Orchestrates requests across multiple LLMs like GPT-4, Gemini, and Claude based on cost and complexity.",
      },
      {
        label: "Conversational Intelligence",
        text: "Provides 24/7 natural language support for employees and customers.",
      },
      {
        label: "Contextual RAG",
        text: "Uses Retrieval-Augmented Generation to ensure AI responses are grounded in your specific corporate data.",
      },
    ],
  },
];

const useCases = [
  "BFSI: AI-driven fraud detection and automated regulatory compliance monitoring.",
  "Manufacturing: Predictive maintenance for global assets and supply chain risk forecasting.",
  "Healthcare/Pharma: GxP-compliant automated document processing and pharmacovigilance.",
  "Retail & CX: Hyper-personalized customer journey orchestration across all digital touchpoints.",
];

export function InnovationPanel() {
  return (
    <section className={styles.panel}>
      <InnovationScrollSpirals />

      <MotionSection direction="none">
        <InnovationDecorations area="panel" />
      </MotionSection>

      <div className={styles.panelInner}>
        <MotionSection className={styles.introSection} direction="up">
          <InnovationPill className={styles.introPill}>Engineering the Future of Work</InnovationPill>
          <WordRevealText
            className={styles.introCopy}
            text="At TechSnitch, innovation is not a buzzword; it is our architectural foundation. We empower enterprises to transition from manual, reactive service management to Autonomous, Self-Healing Operations. By decoupling intelligence from vendor constraints, we ensure your organization remains at the cutting edge of the AI revolution."
          />
        </MotionSection>

        <MotionSection className={styles.frameworksSection} direction="up" stagger>
          <InnovationPill className={styles.frameworkPill}>Our Proprietary Innovation Frameworks</InnovationPill>
          <div className={styles.frameworkBody}>
            <WordRevealText
              className={styles.frameworkCopy}
              text="We accelerate digital maturity through high-performance assets designed to sit atop your existing ServiceNow and enterprise ecosystem."
            />

            <div className={styles.blockStack}>
              {frameworkBlocks.map((block) => (
                <InnovationBlock key={block.title} {...block} />
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className={styles.advantageSection} direction="up" stagger>
          <InnovationPill className={styles.advantagePill}>The AI-Agnostic Advantage</InnovationPill>
          <WordRevealText
            className={styles.advantageCopy}
            text="TechSnitch's innovation strategy is built on the principle of Strategic Flexibility. We believe your intelligence layer should never be a prisoner to a single vendor's roadmap."
          />
          <InnovationTable />
        </MotionSection>

        <MotionSection className={styles.labSection} direction="up" stagger>
          <InnovationPill className={styles.labPill}>Our Innovation Lab: Leading Industry Use Cases</InnovationPill>
          <div className={styles.labBody}>
            <WordRevealText
              className={styles.labCopy}
              text="We don't just build tools; we solve industry-specific complexities through intelligent automation."
            />
            <AnimatedList className={styles.labList}>
              {useCases.map((item) => (
                <AnimatedListItem key={item}>{item}</AnimatedListItem>
              ))}
            </AnimatedList>
          </div>
        </MotionSection>

        <MotionSection direction="up">
          <InnovationPath />
        </MotionSection>
      </div>

      <div className={styles.bottomWordmark} aria-hidden>
        INNOVATIONS
      </div>
    </section>
  );
}
