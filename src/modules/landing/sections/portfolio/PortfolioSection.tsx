import Image from "next/image";
import { PortfolioCards } from "@/modules/landing/sections/portfolio/PortfolioCards";

export function PortfolioSection() {
  return (
    <section id="service-portfolio" className="portfolio-section">
      <div className="portfolio-intro-row">
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
      </div>

      <div className="portfolio-shell">
        <div className="portfolio-label-card">
          <span className="portfolio-label-dot" aria-hidden />
          <span className="portfolio-label-pill" aria-hidden />
          <p className="portfolio-label-text">Comprehensive Service Portfolio</p>
        </div>

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
