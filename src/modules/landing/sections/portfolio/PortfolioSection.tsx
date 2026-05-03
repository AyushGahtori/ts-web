import Image from "next/image";
import { MotionSection } from "@/components/motion/MotionSection";
import { PortfolioCards } from "@/modules/landing/sections/portfolio/PortfolioCards";

export function PortfolioSection() {
  return (
    <section className="portfolio-section">
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
