import { GlowPill } from "@/components/ui/GlowPill";

export function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden>
      <div className="hero-welcome">
        <span className="hero-word hero-word--wel">WEL</span>
        <span className="hero-word hero-word--c">C</span>
        <span className="hero-word hero-word--o">O</span>
        <span className="hero-word hero-word--me">ME</span>
      </div>
      <div className="hero-purple-node" />
      <div className="hero-white-node" />
      <GlowPill className="hero-glow-pill--short" />
      <GlowPill className="hero-glow-pill--long" />
    </div>
  );
}
