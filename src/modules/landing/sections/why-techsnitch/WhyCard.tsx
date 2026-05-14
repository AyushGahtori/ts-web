"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, type TargetAndTransition } from "framer-motion";
import Image from "next/image";
import styles from "./whyTechsnitch.module.css";

const CARD_ROTATION_MS = 10000;
const FAN_VISIBLE_SLOTS = 5;

interface CardSection {
  heading: string;
  items: string[];
}

interface ShowcaseCard {
  number: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  sections: CardSection[];
}

type CardTransform = TargetAndTransition;

const cards: ShowcaseCard[] = [
  {
    number: 1,
    title: "Why TechSnitch",
    subtitle: "The Elite Advantage in AI-Agnostic ServiceNow Transformation",
    imageSrc: "/why-techsnitch/card-01-ai-agnostic.webp",
    sections: [
      {
        heading: "Key Differentiators",
        items: [
          "AI-agnostic architecture",
          "Proprietary SNADA and SAOS accelerators",
          "Outcome-driven engagements",
          "Elite certified talent pool",
          "White-glove managed services",
        ],
      },
      {
        heading: "Value Metrics",
        items: [
          "40-60% faster incident resolution",
          "30-50% operational efficiency lift",
          "3x faster ServiceNow deployments",
          "25-35% operational cost reduction",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "AI-Agnostic Architecture",
    subtitle: "Freedom to Innovate Without Vendor Lock-In",
    imageSrc: "/why-techsnitch/card-07-delivery.webp",
    sections: [
      {
        heading: "Supported AI Ecosystems",
        items: ["Microsoft Azure OpenAI", "Google Gemini", "AWS Bedrock", "Open-source LLMs", "Proprietary enterprise AI"],
      },
      {
        heading: "Business Benefits",
        items: ["Vendor independence", "Optimized performance and cost", "Enhanced governance", "Future-proof transformation"],
      },
    ],
  },
  {
    number: 3,
    title: "Solutions",
    subtitle: "Purpose-Built Solutions for Enterprise Transformation",
    imageSrc: "/why-techsnitch/card-03-solutions.webp",
    sections: [
      {
        heading: "Key Solution Offerings",
        items: ["Autonomous IT operations", "Unified employee experience", "Intelligent customer service", "Risk and compliance automation"],
      },
      {
        heading: "Operational Focus",
        items: ["Predictive event management", "Self-healing workflows", "Case deflection", "Real-time command centers"],
      },
    ],
  },
  {
    number: 4,
    title: "Accelerators",
    subtitle: "Accelerating Time-to-Value with Proven Frameworks",
    imageSrc: "/why-techsnitch/card-04-accelerators.webp",
    sections: [
      {
        heading: "Key Accelerators",
        items: ["SNADA digital assistant", "SAOS autonomous framework", "Rapid ITSM templates", "Integration Hub+"],
      },
      {
        heading: "Benefits",
        items: ["Deployment within weeks", "Faster integrations", "Audit readiness", "Higher automation impact"],
      },
    ],
  },
  {
    number: 5,
    title: "Customer Success Stories",
    subtitle: "Proof Through Measurable Business Outcomes",
    imageSrc: "/why-techsnitch/card-05-customer-success.webp",
    sections: [
      {
        heading: "Story Themes",
        items: ["Operational resilience", "ServiceNow modernization", "AI-led productivity", "Regulated enterprise delivery"],
      },
      {
        heading: "What We Prove",
        items: ["Clear before-and-after metrics", "Industry-specific execution", "Reduced manual effort", "Faster value realization"],
      },
    ],
  },
  {
    number: 6,
    title: "Partnerships & Alliances",
    subtitle: "Collaborating with Industry Leaders",
    imageSrc: "/why-techsnitch/card-06-partnerships.webp",
    sections: [
      {
        heading: "Strategic Partners",
        items: ["ServiceNow", "Microsoft Azure", "Google Cloud", "Amazon Web Services", "Freshworks and Salesforce"],
      },
      {
        heading: "Partner Benefits",
        items: ["Early innovation access", "Joint solution development", "Enhanced customer value", "Global scalability"],
      },
    ],
  },
  {
    number: 7,
    title: "Delivery & Engagement Model",
    subtitle: "From Vision to Value",
    imageSrc: "/why-techsnitch/card-02-ai-architecture.webp",
    sections: [
      {
        heading: "Delivery Framework",
        items: ["Discover", "Design", "Deploy", "Operate", "Optimize"],
      },
      {
        heading: "Governance Structure",
        items: ["Executive steering", "Program management", "Architecture review", "Value realization"],
      },
    ],
  },
  {
    number: 8,
    title: "Resource Center",
    subtitle: "Knowledge Hub for Digital Transformation",
    imageSrc: "/why-techsnitch/card-08-resource-center.webp",
    sections: [
      {
        heading: "Content Categories",
        items: ["Whitepapers", "eBooks", "Solution briefs", "Webinars", "Analyst reports"],
      },
      {
        heading: "Featured Resources",
        items: ["Autonomous Enterprise Blueprint", "AI-agnostic ServiceNow strategy", "ROI with SNADA and SAOS"],
      },
    ],
  },
  {
    number: 9,
    title: "Events & Webinars",
    subtitle: "Engage with TechSnitch Experts",
    imageSrc: "/why-techsnitch/card-09-events.webp",
    sections: [
      {
        heading: "Page Sections",
        items: ["Upcoming events", "On-demand webinars", "Conference sessions", "Workshop registrations"],
      },
      {
        heading: "Sample Event",
        items: ["Autonomous enterprise webinar", "CIO and CTO audience", "Virtual format", "Expert-led discussion"],
      },
    ],
  },
  {
    number: 10,
    title: "ESG & Corporate Responsibility",
    subtitle: "Driving Sustainable and Responsible Innovation",
    imageSrc: "/why-techsnitch/card-10-esg.webp",
    sections: [
      {
        heading: "Responsible Innovation",
        items: ["Paperless digital workflows", "Energy-efficient cloud solutions", "Ethical AI practices", "Strong compliance"],
      },
      {
        heading: "People & Governance",
        items: ["Diversity and inclusion", "Employee well-being", "Community engagement", "Risk management frameworks"],
      },
    ],
  },
  {
    number: 11,
    title: "Leadership Team",
    subtitle: "Visionaries Behind TechSnitch",
    imageSrc: "/why-techsnitch/card-11-leadership.webp",
    sections: [
      {
        heading: "Profile Structure",
        items: ["Executive profiles", "Professional biographies", "Areas of expertise", "Vision statements"],
      },
      {
        heading: "Leadership Focus",
        items: ["ServiceNow transformation", "AI-driven enterprise solutions", "Autonomous operations mission"],
      },
    ],
  },
  {
    number: 12,
    title: "Technology & Integration Ecosystem",
    subtitle: "Seamless Integration Across the Enterprise",
    imageSrc: "/why-techsnitch/card-12-ecosystem.webp",
    sections: [
      {
        heading: "Integration Capabilities",
        items: ["ERP: SAP, Oracle", "CRM: Salesforce, Microsoft Dynamics", "Collaboration: Microsoft Teams, Slack", "DevOps: Jira, GitHub, Azure DevOps", "Security: SIEM and IAM platforms"],
      },
      {
        heading: "Key Benefits",
        items: ["Unified digital ecosystem", "Real-time data synchronization", "Enhanced operational visibility", "Scalable and secure integrations"],
      },
    ],
  },
];

function CardFace({ card, isActive, isPreview }: { card: ShowcaseCard; isActive: boolean; isPreview?: boolean }) {
  if (isPreview) {
    return (
      <div className={styles.middleLayer}>
        <article className={`${styles.innerLayer} ${styles.previewInnerLayer}`} />
      </div>
    );
  }

  return (
    <div className={styles.middleLayer}>
      <article className={styles.innerLayer}>
        <div className={styles.backgroundNumber} aria-hidden>
          {card.number}.
        </div>
        {isActive ? <span className={styles.activeCardIndicator} aria-hidden /> : null}

        <div className={styles.contentGrid}>
          <div className={styles.copyColumn}>
            <header className={styles.header}>
              <h3 className={styles.cardTitle}>
                {card.number}. {card.title}
              </h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
            </header>

            {card.sections.map((section) => (
              <section className={styles.textBlock} key={section.heading}>
                <h4 className={styles.blockHeading}>{section.heading}</h4>
                <ul className={styles.list}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualGlow} aria-hidden />
            <div className={styles.yellowCircle} aria-hidden />
            <Image
              src="/stary%20heart.png"
              alt=""
              aria-hidden="true"
              width={241}
              height={168}
              sizes="(max-width: 768px) 64px, 92px"
              className={styles.heartAccent}
            />
            <Image
              src={card.imageSrc}
              alt=""
              aria-hidden="true"
              width={1024}
              height={1536}
              sizes="(max-width: 768px) 84vw, (max-width: 1260px) 42vw, 520px"
              className={styles.visualImage}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              unoptimized
            />
          </div>
        </div>
      </article>
    </div>
  );
}

function getSignedDistance(index: number, activeIndex: number, totalCards: number) {
  let signedDistance = (index - activeIndex + totalCards) % totalCards;

  if (signedDistance > totalCards / 2) {
    signedDistance -= totalCards;
  }

  return signedDistance;
}

function getCardTransform(signedDistance: number, isPreviewOpen: boolean, isHovered: boolean): CardTransform {
  const absoluteDistance = Math.abs(signedDistance);

  if (!isPreviewOpen) {
    return {
      x: signedDistance * 2,
      y: absoluteDistance * 4,
      rotate: 0,
      scale: 1 - absoluteDistance * 0.002,
      opacity: 1,
    };
  }

  if (signedDistance === 0) {
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
    };
  }

  if (absoluteDistance > FAN_VISIBLE_SLOTS) {
    return {
      x: 0,
      y: 42,
      rotate: 0,
      scale: 0.93,
      opacity: 0.18,
    };
  }

  const side = Math.sign(signedDistance);
  const fanSlot = absoluteDistance;
  const hoverLift = isHovered ? -42 : 0;

  return {
    x: side * (fanSlot * 46 + fanSlot * fanSlot * 5),
    y: 34 + fanSlot * 13 + hoverLift,
    rotate: side * (fanSlot * 4.4 + fanSlot * fanSlot * 0.28),
    scale: 0.972 - fanSlot * 0.008 + (isHovered ? 0.035 : 0),
    opacity: isHovered ? 1 : 0.96,
  };
}

export function WhyCard() {
  const deckRegionRef = useRef<HTMLDivElement | null>(null);
  const warmedImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const isDeckInView = useInView(deckRegionRef, { amount: 0.28 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const totalCards = cards.length;

  const warmCardImage = useCallback((src: string, decode = false) => {
    if (typeof window === "undefined" || warmedImagesRef.current.has(src)) {
      return;
    }

    const image = new window.Image();
    image.decoding = "async";
    image.loading = "eager";
    image.src = src;
    warmedImagesRef.current.set(src, image);

    if (decode && typeof image.decode === "function") {
      void image.decode().catch(() => undefined);
    }
  }, []);

  const selectCard = useCallback(
    (index: number) => {
      setIsAutoPaused(true);
      setActiveIndex(((index % totalCards) + totalCards) % totalCards);
    },
    [totalCards],
  );

  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
    setHoveredIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setIsAutoPaused(true);
    setActiveIndex((current) => (current + 1) % totalCards);
  }, [totalCards]);

  const showPrevious = useCallback(() => {
    setIsAutoPaused(true);
    setActiveIndex((current) => (current - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const advanceCard = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalCards);
  }, [totalCards]);

  useEffect(() => {
    if (!isDeckInView || isPreviewOpen || isAutoPaused) {
      return;
    }

    const interval = window.setInterval(advanceCard, CARD_ROTATION_MS);
    return () => window.clearInterval(interval);
  }, [advanceCard, isAutoPaused, isDeckInView, isPreviewOpen]);

  useEffect(() => {
    if (!isDeckInView) {
      return;
    }

    const adjacentCardIndexes = [activeIndex, (activeIndex + 1) % totalCards, (activeIndex - 1 + totalCards) % totalCards];
    adjacentCardIndexes.forEach((index) => warmCardImage(cards[index].imageSrc, true));

    const timers = cards.map((card, index) => window.setTimeout(() => warmCardImage(card.imageSrc), 360 + index * 70));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeIndex, isDeckInView, totalCards, warmCardImage]);

  return (
    <div ref={deckRegionRef} className={styles.deckRegion}>
      <div
        className={styles.cardDeck}
        onMouseEnter={() => setIsPreviewOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            closePreview();
          }
        }}
      >
        {cards.map((card, index) => {
          const signedDistance = getSignedDistance(index, activeIndex, totalCards);
          const absoluteDistance = Math.abs(signedDistance);
          const isActive = signedDistance === 0;
          const isHovered = hoveredIndex === index;
          const cardTransform = getCardTransform(signedDistance, isPreviewOpen, isHovered);
          const zIndex = isActive ? 100 : isHovered ? 82 : 18 + (FAN_VISIBLE_SLOTS - Math.min(absoluteDistance, FAN_VISIBLE_SLOTS));
          const pointerEvents = isActive ? "auto" : isPreviewOpen ? "auto" : "none";

          return (
            <motion.div
              key={card.number}
              className={`${styles.outerLayer} ${styles.deckCard} ${!isActive ? styles.previewDeckCard : styles.activeDeckCard}`}
              role={!isActive ? "button" : undefined}
              aria-hidden={!isActive && !isPreviewOpen}
              aria-label={!isActive ? `Show card ${card.number}: ${card.title}` : undefined}
              animate={cardTransform}
              initial={false}
              onClick={
                !isActive
                  ? () => {
                      selectCard(index);
                      setIsPreviewOpen(true);
                      setHoveredIndex(null);
                    }
                  : undefined
              }
              onFocus={
                !isActive
                  ? () => {
                      setIsPreviewOpen(true);
                      setHoveredIndex(index);
                    }
                  : undefined
              }
              onBlur={!isActive ? () => setHoveredIndex(null) : undefined}
              onKeyDown={
                !isActive
                  ? (event) => {
                      if (event.key !== "Enter" && event.key !== " ") {
                        return;
                      }

                      event.preventDefault();
                      selectCard(index);
                      setIsPreviewOpen(true);
                      setHoveredIndex(null);
                    }
                  : undefined
              }
              onMouseEnter={!isActive ? () => setHoveredIndex(index) : undefined}
              onMouseLeave={!isActive ? () => setHoveredIndex(null) : undefined}
              style={{ zIndex, pointerEvents }}
              tabIndex={isActive ? -1 : 0}
              transition={{ duration: isHovered ? 0.28 : 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardFace card={card} isActive={isActive} isPreview={!isActive} />
            </motion.div>
          );
        })}
      </div>

      <div className={styles.deckControls} aria-label="Why TechSnitch card controls">
        <button
          type="button"
          className={`${styles.deckButton} ${styles.deckButtonPrevious}`}
          onClick={showPrevious}
          aria-label="Show previous card"
        >
          &lt;
        </button>

        <label className={styles.deckRangeWrap}>
          <span className={styles.srOnly}>Select a Why TechSnitch card</span>
          <input
            className={styles.deckRange}
            type="range"
            min="0"
            max={totalCards - 1}
            value={activeIndex}
            onChange={(event) => selectCard(Number(event.target.value))}
          />
        </label>

        <button
          type="button"
          className={`${styles.deckButton} ${styles.deckButtonNext}`}
          onClick={showNext}
          aria-label="Show next card"
        >
          &gt;
        </button>

        <div className={styles.deckDots} aria-label="Card selector">
          {cards.map((card, index) => (
            <button
              key={card.number}
              type="button"
              className={`${styles.deckDot} ${activeIndex === index ? styles.deckDotActive : ""}`}
              onClick={() => selectCard(index)}
              aria-label={`Show card ${card.number}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
