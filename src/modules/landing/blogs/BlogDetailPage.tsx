"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import type { BlogBlock, BlogPost } from "./blogData";
import styles from "./blogs.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface BlogDetailPageProps {
  post: BlogPost;
}

const ARTICLE_FLOW_PATTERN_HEIGHT = 5200;
const ARTICLE_FLOW_REPEAT_HEIGHT = 5980;
const ARTICLE_FLOW_CURVES: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [118, 230, 265, 300, 428, 394],
  [640, 516, 612, 692, 326, 790],
  [118, 862, 116, 1050, 338, 1168],
  [564, 1288, 906, 1228, 990, 1444],
  [1068, 1644, 824, 1748, 570, 1846],
  [296, 1950, 170, 2112, 330, 2310],
  [496, 2514, 870, 2456, 968, 2694],
  [1050, 2896, 812, 3022, 548, 3132],
  [278, 3244, 156, 3432, 344, 3628],
  [528, 3820, 898, 3768, 984, 4008],
  [1058, 4218, 800, 4330, 532, 4448],
  [286, 4556, 166, 4720, 328, 4920],
  [428, 5042, 594, 5116, 760, 5200],
];
const ARTICLE_FLOW_CONNECTOR_CURVES: ReadonlyArray<
  readonly [number, number, number, number, number, number]
> = [
  [1010, 5370, 964, 5690, 650, 5805],
  [420, 5890, 206, 5872, 118, ARTICLE_FLOW_REPEAT_HEIGHT],
];

function getArticleFlowSegmentCount(layerHeight: number) {
  const overflowHeight = Math.max(0, layerHeight - ARTICLE_FLOW_PATTERN_HEIGHT);
  return Math.max(1, Math.ceil(overflowHeight / ARTICLE_FLOW_REPEAT_HEIGHT) + 1);
}

function getArticleFlowPathHeight(segmentCount: number) {
  return ARTICLE_FLOW_PATTERN_HEIGHT + Math.max(0, segmentCount - 1) * ARTICLE_FLOW_REPEAT_HEIGHT;
}

function offsetCurve(
  [controlOneX, controlOneY, controlTwoX, controlTwoY, endX, endY]: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
  ],
  offsetY: number,
) {
  return `C${controlOneX} ${controlOneY + offsetY} ${controlTwoX} ${
    controlTwoY + offsetY
  } ${endX} ${endY + offsetY}`;
}

function buildArticleFlowPath(segmentCount: number) {
  const commands = ["M118 0"];

  for (let index = 0; index < segmentCount; index += 1) {
    const offsetY = index * ARTICLE_FLOW_REPEAT_HEIGHT;
    ARTICLE_FLOW_CURVES.forEach((curve) => commands.push(offsetCurve(curve, offsetY)));

    if (index < segmentCount - 1) {
      ARTICLE_FLOW_CONNECTOR_CURVES.forEach((curve) => commands.push(offsetCurve(curve, offsetY)));
    }
  }

  return commands.join(" ");
}

function ArticleFigure({
  label,
  tone,
  imageSrc,
  imageAlt,
  priority = false,
}: {
  label: string;
  tone: "violet" | "pink" | "ink";
  imageSrc?: string;
  imageAlt: string;
  priority?: boolean;
}) {
  return (
    <figure className={`${styles.articleFigure} ${styles[`articleFigure${tone}`]}`}>
      <div
        className={`${styles.figurePlane} ${imageSrc ? styles.figurePlaneLoaded : ""}`}
        aria-hidden={imageSrc ? undefined : true}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 760px) 100vw, 760px"
          />
        ) : (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ArticleFlowLine() {
  const shouldReduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [segmentCount, setSegmentCount] = useState(1);
  const flowPath = useMemo(() => buildArticleFlowPath(segmentCount), [segmentCount]);
  const flowPathHeight = getArticleFlowPathHeight(segmentCount);
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start 112%", "end 10%"],
  });
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 56,
    damping: 36,
    mass: 0.6,
  });
  const lineProgress = useTransform(
    scrollProgress,
    [0, 0.14, 0.3, 0.54, 0.78, 1],
    [0, 0.13, 0.28, 0.5, 0.74, 0.94],
  );
  const lineOpacity = useTransform(lineProgress, [0, 0.025, 1], [0, 1, 1]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const updateSegmentCount = () => {
      setSegmentCount(getArticleFlowSegmentCount(layer.offsetHeight));
    };

    updateSegmentCount();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSegmentCount);
      return () => window.removeEventListener("resize", updateSegmentCount);
    }

    const observer = new ResizeObserver(updateSegmentCount);
    observer.observe(layer);

    return () => observer.disconnect();
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div ref={layerRef} className={styles.articleFlowLine} aria-hidden>
      <svg
        className={styles.articleFlowSvg}
        viewBox={`0 0 1100 ${flowPathHeight}`}
        fill="none"
        preserveAspectRatio="xMidYMin meet"
        style={{ height: flowPathHeight }}
      >
        <motion.path
          className={`${styles.articleFlowAura} ${styles.articleFlowPath}`}
          pathLength="1"
          d={flowPath}
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
        <motion.path
          className={`${styles.articleFlowCore} ${styles.articleFlowPath}`}
          pathLength="1"
          d={flowPath}
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
      </svg>
    </div>
  );
}

function normalizeLeadText(text: string) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function ArticleBlock({
  block,
  imageSrc,
  imageAlt,
}: {
  block: BlogBlock;
  imageSrc?: string;
  imageAlt: string;
}) {
  if (block.type === "heading") {
    const headingLevel = block.level ?? 1;
    const sectionClassName = `${styles.articleSection} ${
      headingLevel === 2
        ? styles.articleSectionLevel2
        : headingLevel === 3
          ? styles.articleSectionLevel3
          : ""
    } ${styles.articleReveal}`;
    const headingContent = <span className={styles.editorialUnderlineText}>{block.title}</span>;

    return (
      <section className={sectionClassName}>
        {block.kicker ? <p className={styles.sectionKicker}>{block.kicker}</p> : null}
        {headingLevel === 3 ? <h4>{headingContent}</h4> : null}
        {headingLevel === 2 ? <h3>{headingContent}</h3> : null}
        {headingLevel === 1 ? <h2>{headingContent}</h2> : null}
      </section>
    );
  }

  if (block.type === "paragraph") {
    const paragraphClassName = block.tableIntro
      ? `${styles.articleParagraph} ${styles.tableIntroParagraph} ${styles.articleReveal}`
      : `${styles.articleParagraph} ${styles.articleReveal}`;

    return (
      <p className={paragraphClassName}>
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul className={`${styles.articleList} ${styles.articleReveal}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "callout") {
    return (
      <aside className={`${styles.articleCallout} ${styles.articleReveal}`}>
        <p>{block.eyebrow}</p>
        <h3>
          <span className={styles.editorialUnderlineText}>{block.title}</span>
        </h3>
        <div>
          {block.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </aside>
    );
  }

  if (block.type === "outcomes") {
    return (
      <section className={`${styles.outcomesPanel} ${styles.articleReveal}`} aria-label="Outcomes">
        <p>Outcomes</p>
        <div>
          {block.items.map((item, index) => (
            <article key={`${index}-${item.value}-${item.label}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              {item.detail ? <small>{item.detail}</small> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "table") {
    return (
      <div className={`${styles.tableWrap} ${styles.articleReveal}`}>
        <table>
          <thead>
            <tr>
              {block.headers.map((header, headerIndex) => (
                <th key={`${headerIndex}-${header}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${row.join("|")}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.articleReveal}>
      <ArticleFigure label={block.label} tone={block.tone} imageSrc={imageSrc} imageAlt={imageAlt} />
    </div>
  );
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const articleLead = useMemo(() => {
    const seen = new Set<string>();
    const deckText = normalizeLeadText(post.deck);

    return post.lead.filter((paragraph) => {
      const normalizedParagraph = normalizeLeadText(paragraph);

      if (!normalizedParagraph || normalizedParagraph === deckText || seen.has(normalizedParagraph)) {
        return false;
      }

      seen.add(normalizedParagraph);
      return true;
    });
  }, [post.deck, post.lead]);
  let figureIndex = 0;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(`.${styles.articleReveal}`, { y: 0 });
        return;
      }

      gsap.fromTo(
        `.${styles.articleHero} .${styles.articleReveal}`,
        { y: 28 },
        { y: 0, duration: 0.82, stagger: 0.08, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>(`.${styles.articleReveal}`).forEach((element) => {
        if (element.closest(`.${styles.articleHero}`)) return;

        gsap.fromTo(
          element,
          { y: 26 },
          {
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(`.${styles.figurePlane}`).forEach((figure) => {
        gsap.to(figure, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: figure,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

    },
    { scope: rootRef },
  );

  return (
    <main className={`landing-root ${styles.root}`}>
      <section className={`landing-canvas ${styles.canvas}`}>
        <Navbar />
        <article ref={rootRef} className={styles.articlePage}>
          <div className={styles.ambientViolet} aria-hidden />
          <div className={styles.ambientPink} aria-hidden />

          <header className={styles.articleHero}>
            <Link className={`${styles.backLink} ${styles.articleReveal}`} href="/blogs">
              Back to blogs
            </Link>
            <div className={styles.articleHeroGrid}>
              <div className={styles.articleHeroCopy}>
                <p className={`${styles.articleCategory} ${styles.articleReveal}`}>{post.category}</p>
                <h1 className={styles.articleReveal}>
                  <span className={styles.editorialUnderlineText}>{post.title}</span>
                </h1>
                <p className={`${styles.articleDeck} ${styles.articleReveal}`}>{post.deck}</p>
              </div>
              <div className={`${styles.articleHeroMedia} ${styles.articleReveal}`}>
                <ArticleFigure
                  label="Hero media frame"
                  tone={post.accent}
                  imageSrc={post.media?.hero}
                  imageAlt={`${post.title} hero image`}
                  priority
                />
              </div>
            </div>
          </header>

          <div className={styles.articleShell}>
            <ArticleFlowLine />
            <aside className={styles.articleRail}>
              <p>{post.category}</p>
              <span>TechSnitch editorial system</span>
              <div className={styles.articleRailLine} aria-hidden />
            </aside>

            <div className={styles.articleContent}>
              {articleLead.length > 0 ? (
                <section className={styles.articleLead}>
                  {articleLead.map((paragraph) => (
                    <p className={styles.articleReveal} key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ) : null}
              {post.blocks.map((block, index) => {
                const imageSrc = block.type === "figure" ? post.media?.figures[figureIndex++] : undefined;

                return (
                  <ArticleBlock
                    key={`${block.type}-${index}`}
                    block={block}
                    imageSrc={imageSrc}
                    imageAlt={`${post.title} ${block.type === "figure" ? block.label : "article image"}`}
                  />
                );
              })}
            </div>
          </div>
        </article>
        <BrandFooterSection />
      </section>
    </main>
  );
}
