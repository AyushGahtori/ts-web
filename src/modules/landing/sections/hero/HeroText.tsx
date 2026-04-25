import { Button } from "@/components/ui/Button";

const specialties = ["AI-AGNOSTIC", "AUTONOMOUS", "OUTCOME-DRIVEN"];

export function HeroText() {
  return (
    <div className="hero-text">
      <p className="hero-eyebrow">ELITE AI-AGNOSTIC SERVICENOW PARTNER</p>
      <h1 className="hero-title">
        Engineering the
        <span className="hero-title-accent">
          Autonomous <span className="hero-title-enterpr">Enterpr</span>
          <span className="hero-title-ise-wrap">
            <span className="hero-title-orb" />
            <span className="hero-title-ise">ise</span>
          </span>
        </span>
      </h1>
      <p className="hero-description">
        Transforming global enterprises through AI-agnostic ServiceNow intelligence, delivering measurable outcomes, operational autonomy, and
        future-proof resilience without vendor lock-in.
      </p>

      <section className="specialities-shell" aria-label="Our Specialities">
        <h2 className="specialities-title">Our Specialities</h2>
        <div className="specialities-pills">
          {specialties.map((specialty) => (
            <Button key={specialty} variant="pill">
              {specialty}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
