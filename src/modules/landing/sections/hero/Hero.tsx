import { HeroBackground } from "./HeroBackground";
import { HeroStats } from "./HeroStats";
import { HeroText } from "./HeroText";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <HeroBackground />
      <div className="hero-content">
        <div className="hero-left">
          <HeroText />
          <HeroStats />
        </div>
        <HeroVisual />
      </div>
      <div className="hero-bottom-violet-bar" aria-hidden />
    </section>
  );
}
