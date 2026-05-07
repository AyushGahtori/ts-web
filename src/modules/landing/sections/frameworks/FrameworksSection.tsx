import Image from "next/image";
import Link from "next/link";
import { MotionSection } from "@/components/motion/MotionSection";

const snadaCapabilities = [
  "Persona-Based Intelligence",
  "Rapid Deployment",
  "Knowledge Generation & Synthesis",
  "Multi-Model AI Orchestration",
  "Enterprise Security & Governance",
];

const saosCapabilities = [
  "Self-Healing IT Operations",
  "Predictive Intelligence",
  "Intelligent Workflow Orchestration",
  "Continuous Compliance & Governance",
];

export function FrameworksSection() {
  return (
    <section className="frameworks-section">
      <div className="frameworks-wave-bg" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <Image src="/Purple%20stream.png" alt="" fill sizes="100vw" loading="eager" className="frameworks-wave-image" />
      </div>

      <header className="frameworks-title-wrap">
        <span className="frameworks-pill frameworks-pill--small" aria-hidden />
        <span className="frameworks-pill frameworks-pill--long" aria-hidden />
        <span className="frameworks-pill frameworks-pill--dot" aria-hidden />
        <MotionSection className="frameworks-title-banner" direction="up">
          <h2>Proprietary Frameworks: SNADA &amp; SAOS</h2>
        </MotionSection>
      </header>

      <div className="frameworks-content">
        <article className="frameworks-snada-row">
          <MotionSection className="frameworks-snada-logo" direction="up" delay={0.08}>
            <Link
              href="https://snadaagent.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SNADA agent"
              className="frameworks-snada-link"
            >
              <Image src="/snada.png" alt="" fill sizes="(max-width: 1120px) 88vw, 46vw" className="frameworks-snada-logo-image" />
            </Link>
          </MotionSection>

          <MotionSection className="frameworks-panel frameworks-panel--snada" direction="up" delay={0.12} stagger>
            <h3>SNADA &mdash; ServiceNow AI Digital Assistant</h3>
            <p>
              SNADA is not a chatbot. It is an enterprise-grade, AI-agnostic conversational intelligence layer that transforms how
              employees, customers, and systems interact with ServiceNow. Built for the realities of regulated, complex enterprises
              &mdash; SNADA adapts, learns, and delivers.
            </p>
            <h4>Core Capabilities</h4>
            <div className="frameworks-chip-grid">
              {snadaCapabilities.map((cap) => (
                <span key={cap} className="frameworks-chip">
                  {cap}
                </span>
              ))}
            </div>
          </MotionSection>
        </article>

        <article className="frameworks-saos-row">
          <MotionSection className="frameworks-panel frameworks-panel--saos" direction="up" stagger>
            <h3>SAOS &mdash; ServiceNow Autonomous Operating System</h3>
            <p>
              SAOS is TechSnitch&apos;s most transformative offering. It is the architectural framework that powers the autonomous
              enterprise &mdash; enabling organizations to move beyond digitization and automation into true operational intelligence:
              systems that predict, heal, orchestrate, and continuously optimize themselves.
            </p>
            <h4>Core Capabilities</h4>
            <div className="frameworks-chip-grid frameworks-chip-grid--saos">
              {saosCapabilities.map((cap) => (
                <span key={cap} className="frameworks-chip">
                  {cap}
                </span>
              ))}
            </div>
          </MotionSection>
        </article>

        <MotionSection className="frameworks-saos-logo" direction="up" delay={0.1}>
          <Link
            href="https://snadaagent.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open SNADA agent"
            className="frameworks-saos-link"
          >
            <Image src="/saos-cropped.png" alt="" fill sizes="(max-width: 1120px) 85vw, 41vw" className="frameworks-saos-logo-image" />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
