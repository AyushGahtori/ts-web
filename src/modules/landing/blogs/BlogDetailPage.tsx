"use client";

import Link from "next/link";
import { useRef } from "react";
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

const ARTICLE_ZIG_ZAG_PATH =
  "M118 0 C118 230 265 300 428 394 C640 516 612 692 326 790 C118 862 116 1050 338 1168 C564 1288 906 1228 990 1444 C1068 1644 824 1748 570 1846 C296 1950 170 2112 330 2310 C496 2514 870 2456 968 2694 C1050 2896 812 3022 548 3132 C278 3244 156 3432 344 3628 C528 3820 898 3768 984 4008 C1058 4218 800 4330 532 4448 C286 4556 166 4720 328 4920 C428 5042 594 5116 760 5200";

function ArticleFigure({ label, tone }: { label: string; tone: "violet" | "pink" | "ink" }) {
  return (
    <figure className={`${styles.articleFigure} ${styles[`articleFigure${tone}`]}`}>
      <div className={styles.figurePlane} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ArticleFlowLine() {
  const shouldReduceMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);
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

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div ref={layerRef} className={styles.articleFlowLine} aria-hidden>
      <svg
        className={styles.articleFlowSvg}
        viewBox="0 0 1100 5200"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          className={`${styles.articleFlowAura} ${styles.articleFlowPath}`}
          pathLength="1"
          d={ARTICLE_ZIG_ZAG_PATH}
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
        <motion.path
          className={`${styles.articleFlowCore} ${styles.articleFlowPath}`}
          pathLength="1"
          d={ARTICLE_ZIG_ZAG_PATH}
          style={{ pathLength: lineProgress, opacity: lineOpacity }}
        />
      </svg>
    </div>
  );
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return (
      <section className={`${styles.articleSection} ${styles.articleReveal}`}>
        {block.kicker ? <p className={styles.sectionKicker}>{block.kicker}</p> : null}
        <h2>{block.title}</h2>
      </section>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className={`${styles.articleParagraph} ${styles.articleReveal}`}>
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
        <h3>{block.title}</h3>
        <div>
          {block.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </aside>
    );
  }

  if (block.type === "table") {
    return (
      <div className={`${styles.tableWrap} ${styles.articleReveal}`}>
        <table>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
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
      <ArticleFigure label={block.label} tone={block.tone} />
    </div>
  );
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

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
            <p className={`${styles.articleCategory} ${styles.articleReveal}`}>{post.category}</p>
            <h1 className={styles.articleReveal}>{post.title}</h1>
            <p className={`${styles.articleDeck} ${styles.articleReveal}`}>{post.deck}</p>
            <div className={styles.articleReveal}>
              <ArticleFigure label="Hero media frame" tone={post.accent} />
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
              <section className={styles.articleLead}>
                {post.lead.map((paragraph) => (
                  <p className={styles.articleReveal} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </section>
              {post.blocks.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}
            </div>
          </div>
        </article>
        <BrandFooterSection />
      </section>
    </main>
  );
}
