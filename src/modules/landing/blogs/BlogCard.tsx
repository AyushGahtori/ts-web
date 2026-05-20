"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { BlogPost } from "./blogData";
import styles from "./blogs.module.css";

gsap.registerPlugin(useGSAP);

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    },
    { scope: cardRef },
  );

  const play = () => {
    const card = cardRef.current;
    const path = pathRef.current;
    if (!card || !path || prefersReducedMotion()) return;

    const length = path.getTotalLength();
    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .to(card, { y: -8, duration: 0.36, ease: "power3.out" }, 0)
      .to(path, { opacity: 0.42, duration: 0.12, ease: "power1.out" }, 0.04)
      .fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.62, ease: "power3.out" },
        0.04,
      );
  };

  const reset = () => {
    const card = cardRef.current;
    const path = pathRef.current;
    if (!card || !path || prefersReducedMotion()) return;

    const length = path.getTotalLength();
    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .to(card, { y: 0, duration: 0.32, ease: "power3.out" }, 0)
      .to(path, { strokeDashoffset: length, opacity: 0, duration: 0.26, ease: "power2.inOut" }, 0);
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
    >
      <Link href={`/blogs/${post.slug}`} className={styles.cardLink}>
        <div className={`${styles.mediaFrame} ${styles[`mediaFrame${post.accent}`]}`} aria-hidden>
          <span />
          <span />
        </div>
        <div className={styles.cardBody}>
          <svg className={styles.zigZag} viewBox="0 0 360 130" aria-hidden>
            <path
              ref={pathRef}
              d="M8 92 L56 48 L96 72 L144 26 L190 68 L236 38 L286 76 L352 32"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className={styles.cardCategory}>{post.category}</p>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      </Link>
    </article>
  );
}
