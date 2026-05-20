import styles from "@/modules/landing/blogs/blogs.module.css";

export default function BlogPostLoading() {
  return (
    <main className={`landing-root ${styles.root}`}>
      <section className={`landing-canvas ${styles.canvas}`}>
        <div className={styles.page} />
      </section>
    </main>
  );
}
