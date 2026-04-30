import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";

export function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-pill" aria-hidden />
      <MotionSection className="about-panel-motion" direction="right">
        <article className="about-panel">
          <div className="about-copy-wrap">
            <span className="about-quotes" aria-hidden>
              &ldquo;
            </span>
            <div className="about-content">
              <h2 className="about-title">
                Who we <span>are?</span>
              </h2>
              <p className="about-subtitle">Where ServiceNow Excellence Meets AI Freedom</p>
              <p className="about-description">
                TechSnitch stands at the forefront of enterprise transformation, an elite partner that fuses deep ServiceNow platform mastery with a
                truly AI-agnostic philosophy.
                <br />
                We don&apos;t just implement; we architect resilient, self-optimizing digital ecosystems that scale with your ambitions and adapt to any
                AI landscape you choose to adopt.
              </p>
            </div>
          </div>
          <div className="about-dim-logo" style={{ position: "absolute" }} aria-hidden>
            <Image src="/techsnitch%20logo.png" alt="" fill sizes="(max-width: 768px) 560px, (max-width: 1280px) 1020px, 1260px" className="object-contain" />
          </div>
        </article>
      </MotionSection>
    </section>
  );
}
