import { Navbar } from "@/modules/landing/sections/navbar/Navbar";
import { LifeAtSection } from "@/modules/landing/sections/life-at/LifeAtSection";
import styles from "@/modules/landing/sections/life-at/lifeAt.module.css";

export function LifeAtPage() {
  return (
    <main className={`landing-root ${styles.page}`}>
      <section className={`landing-canvas ${styles.canvas}`}>
        <Navbar />
        <LifeAtSection />
      </section>
    </main>
  );
}
