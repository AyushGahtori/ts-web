import Link from "next/link";
import { BLOG_CATEGORIES, type BlogCategory, categoryToSlug } from "./blogData";
import styles from "./blogs.module.css";

interface BlogSidebarProps {
  activeCategory?: BlogCategory;
}

export function BlogSidebar({ activeCategory }: BlogSidebarProps) {
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
        {BLOG_CATEGORIES.map((category) => (
          <Link
            key={category}
            className={activeCategory === category ? styles.categoryActive : undefined}
            href={`/blogs/category/${categoryToSlug(category)}`}
          >
            {category}
          </Link>
        ))}
      </nav>
      <div className={styles.sidebarLine} aria-hidden />
    </aside>
  );
}
