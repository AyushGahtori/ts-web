"use client";

import Link from "next/link";
import { useState } from "react";
import {
  INDUSTRY_CATEGORIES,
  PRIMARY_BLOG_CATEGORIES,
  type BlogCategory,
  categoryToSlug,
} from "./blogData";
import styles from "./blogs.module.css";

interface BlogSidebarProps {
  activeCategory?: BlogCategory;
}

export function BlogSidebar({ activeCategory }: BlogSidebarProps) {
  const activeIndustry = activeCategory ? INDUSTRY_CATEGORIES.includes(activeCategory) : false;
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesVisible = industriesOpen || activeIndustry;

  return (
    <aside className={styles.sidebar} aria-label="Blog categories">
      <div className={styles.sidebarIntro}>
        <p>Signal Index</p>
        <span>Editorial systems for enterprise AI.</span>
      </div>
      <nav className={styles.categoryNav}>
        <Link className={!activeCategory ? styles.categoryActive : undefined} href="/blogs">
          Latest
        </Link>
        {PRIMARY_BLOG_CATEGORIES.map((category) => (
          <Link
            key={category}
            className={activeCategory === category ? styles.categoryActive : undefined}
            href={`/blogs/category/${categoryToSlug(category)}`}
          >
            {category}
          </Link>
        ))}
        <div
          className={`${styles.industryGroup} ${industriesVisible ? styles.industryGroupOpen : ""} ${activeIndustry ? styles.industryGroupActive : ""}`}
        >
          <button
            type="button"
            className={styles.industryToggle}
            aria-expanded={industriesVisible}
            aria-controls="blog-industry-tree"
            onClick={() => setIndustriesOpen((value) => !value)}
          >
            <span>Industries</span>
            <span className={styles.industryCaret} aria-hidden>
              ^
            </span>
          </button>
          <div id="blog-industry-tree" className={styles.industryTree} aria-hidden={!industriesVisible}>
            <div>
              {INDUSTRY_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  className={activeCategory === category ? styles.categoryActive : undefined}
                  href={`/blogs/category/${categoryToSlug(category)}`}
                  tabIndex={industriesVisible ? undefined : -1}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.sidebarLine} aria-hidden />
    </aside>
  );
}
