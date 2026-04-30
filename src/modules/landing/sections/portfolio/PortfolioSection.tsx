import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { PortfolioCards } from "@/modules/landing/sections/portfolio/PortfolioCards";

export function PortfolioSection() {
  return (
    <section className="portfolio-section">
      <MotionSection className="portfolio-intro-row" direction="up">
        <div className="portfolio-handshake-wrap" style={{ position: "relative" }} aria-hidden>
          <Image src="/handshake.png" alt="" fill sizes="(max-width: 768px) 108px, (max-width: 1120px) 170px, 272px" className="portfolio-handshake-image" />
        </div>
        <div className="portfolio-intro-copy-wrap">
          <div className="portfolio-intro-orbs" aria-hidden>
            <span className="portfolio-orb portfolio-orb--deep" />
            <span className="portfolio-orb portfolio-orb--bright" />
          </div>
          <p className="portfolio-intro-copy">
            &quot;We partner with visionary organizations to architect intelligent ecosystems that transcend traditional service management,
            seamlessly orchestrating people, processes, and technology into a living, breathing enterprise.&quot;
          </p>
        </div>
      </MotionSection>

      <div className="portfolio-shell">
        <MotionSection className="portfolio-label-card" direction="left">
          <span className="portfolio-label-dot" aria-hidden />
          <span className="portfolio-label-pill" aria-hidden />
          <p className="portfolio-label-text">Comprehensive Service Portfolio</p>
        </MotionSection>

        <article className="portfolio-main-card">
          <div className="portfolio-main-bg" style={{ position: "absolute" }} aria-hidden>
            <Image src="/purple%20spiral%202.png" alt="" fill sizes="100vw" className="portfolio-main-bg-image" />
          </div>
          <PortfolioCards />
        </article>
      </div>
    </section>
  );
}
