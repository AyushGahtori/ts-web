type PortfolioCard = {
  number: string;
  tag: string;
  title: string;
  tone: "delivery" | "intelligence" | "advisory" | "operations";
  featured?: boolean;
};

const cards: PortfolioCard[] = [
  {
    number: "01",
    tag: "Delivery",
    title: "Implementation & Transformation Accelerated, Risk-Mitigated",
    tone: "delivery",
  },
  {
    number: "02",
    tag: "Intelligence",
    title: "AI & GenAI Enablement - Intelligence at Enterprise Scale",
    tone: "intelligence",
  },
  {
    number: "03",
    tag: "Advisory",
    title: "Strategic Advisory & Consulting",
    tone: "advisory",
    featured: true,
  },
  {
    number: "04",
    tag: "Operations",
    title: "Managed Services - White-Glove, Intelligence-Led",
    tone: "operations",
  },
];

export function PortfolioCards() {
  return (
    <div className="portfolio-cards-grid">
      {cards.map((card) => (
        <article
          key={card.number}
          className={`portfolio-service-card ${card.featured ? "is-featured" : ""}`}
          data-tone={card.tone}
          tabIndex={0}
        >
          <span className="portfolio-service-pattern" aria-hidden />
          <span className="portfolio-service-chip">{card.tag}</span>
          <p className="portfolio-service-number">{card.number}</p>
          <p className="portfolio-service-title">{card.title}</p>
          <span className="portfolio-service-icon" aria-hidden />
          <button className="portfolio-service-cta" type="button">
            <span>Learn More</span>
            <span className="portfolio-service-cta-arrow" aria-hidden>
              {">"}
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}
