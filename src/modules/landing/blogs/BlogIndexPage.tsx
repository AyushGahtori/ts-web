"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { BrandFooterSection } from "@/modules/landing/sections/brand-footer/BrandFooterSection";
import { BLOG_CATEGORIES, categoryToSlug, type BlogCategory, type BlogPost } from "./blogData";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import styles from "./blogs.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PAGE_SIZE = 6;

interface BlogIndexPageProps {
  posts: BlogPost[];
  activeCategory?: BlogCategory;
}

function EmptyCategoryState({ category }: { category: BlogCategory }) {
  return (
    <section className={styles.emptyState} aria-label={`${category} articles coming soon`}>
      <div className={styles.emptyGlyph} aria-hidden>
        <svg viewBox="0 0 220 160">
          <path d="M28 98 L64 62 L96 84 L130 42 L164 74 L194 50" />
          <circle cx="64" cy="62" r="5" />
          <circle cx="130" cy="42" r="5" />
          <circle cx="194" cy="50" r="5" />
        </svg>
      </div>
      <p>{category}</p>
      <h2>Articles coming soon</h2>
      <span>New thinking is being shaped for this signal category.</span>
    </section>
  );
}

export function BlogIndexPage({ posts, activeCategory }: BlogIndexPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);
  const hasMore = visibleCount < posts.length;
  const featuredPost = posts[0];
  const categoryTitle = activeCategory ? `${activeCategory} articles` : "Ideas for the autonomous enterprise";
  const categoryDeck = activeCategory
    ? `A focused editorial stream for ${activeCategory.toLowerCase()} signals, systems, and enterprise decisions.`
    : "A clean editorial system for AI, ServiceNow, CRM, and the operating models behind modern enterprise transformation.";

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(`.${styles.reveal}, .${styles.contentReveal}`, { y: 0 });
        return;
      }

      gsap.fromTo(
        `.${styles.hero} .${styles.reveal}`,
        { y: 24 },
        { y: 0, duration: 0.82, stagger: 0.08, ease: "power3.out" },
      );

      gsap.fromTo(
        `.${styles.contentReveal}`,
        { y: 28 },
        {
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.blogLayout}`,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        `.${styles.sidebarLine}`,
        { scaleY: 0.2, opacity: 0.32 },
        {
          scaleY: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.45,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <main className={`landing-root ${styles.root}`}>
      <section className={`landing-canvas ${styles.canvas}`}>
        <Navbar />
        <div ref={rootRef} className={styles.page}>
          <div className={styles.ambientViolet} aria-hidden />
          <div className={styles.ambientPink} aria-hidden />

          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.reveal}>TechSnitch Blogs</p>
              <h1 className={styles.reveal}>{categoryTitle}</h1>
              <span className={styles.reveal}>{categoryDeck}</span>
            </div>
            {featuredPost ? (
              <Link className={`${styles.featured} ${styles.reveal}`} href={`/blogs/${featuredPost.slug}`}>
                <div className={`${styles.mediaFrame} ${styles.mediaFrameviolet}`} aria-hidden>
                  <span />
                  <span />
                </div>
                <div>
                  <p>{featuredPost.featuredLabel}</p>
                  <h2>{featuredPost.title}</h2>
                  <span>{featuredPost.deck}</span>
                </div>
              </Link>
            ) : (
              <div className={`${styles.featuredEmpty} ${styles.reveal}`} aria-hidden>
                <div className={styles.mediaFrame}>
                  <span />
                  <span />
                </div>
              </div>
            )}
          </section>

          <section className={styles.blogLayout}>
            <BlogSidebar activeCategory={activeCategory} />
            <div className={styles.blogMain}>
              <div className={`${styles.sectionHeader} ${styles.contentReveal}`}>
                <p>{activeCategory ?? "Latest"}</p>
                <h2>{posts.length > 0 ? "Editorial briefings" : "Quiet for now"}</h2>
              </div>

              {posts.length > 0 ? (
                <>
                  <div className={`${styles.grid} ${styles.contentReveal}`}>
                    {visiblePosts.map((post, index) => (
                      <BlogCard key={post.slug} post={post} featured={index === 0 && !activeCategory} />
                    ))}
                  </div>
                  <div className={`${styles.pagination} ${styles.contentReveal}`}>
                    <span>
                      {Math.max(1, Math.ceil(visiblePosts.length / PAGE_SIZE))} / {Math.max(1, Math.ceil(posts.length / PAGE_SIZE))}
                    </span>
                    <button type="button" onClick={() => setVisibleCount((value) => value + PAGE_SIZE)} disabled={!hasMore}>
                      {hasMore ? "Load more" : "Index complete"}
                    </button>
                  </div>
                </>
              ) : activeCategory ? (
                <div className={styles.contentReveal}>
                  <EmptyCategoryState category={activeCategory} />
                </div>
              ) : null}

              {!activeCategory ? (
                <div className={`${styles.categoryStrip} ${styles.contentReveal}`} aria-label="All category links">
                  {BLOG_CATEGORIES.map((category) => (
                    <Link key={category} href={`/blogs/category/${categoryToSlug(category)}`}>
                      {category}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </div>
        <BrandFooterSection />
      </section>
    </main>
  );
}
