import Image from "next/image";
import { CursorBlurText } from "@/components/effects/CursorBlurText";
import styles from "./lifeAt.module.css";

export function LifeAtHero() {
  return (
    <section className={styles.hero} aria-label="Life at Techsnitch">
      <p className={styles.backgroundWord} aria-hidden>
        Life at
      </p>
      <div className={styles.content}>
        <CursorBlurText as="h1" className={`${styles.title} blur-reveal`} spotSize={190}>
          <span className={styles.titleTop}>Life at</span>
          <span className={styles.titleBottom}>Techsnitch</span>
        </CursorBlurText>
        <CursorBlurText as="p" className={`${styles.subtitle} blur-reveal blur-reveal--muted blur-reveal--delay-1`} spotSize={145}>
          Empowering the Visionaries
        </CursorBlurText>
      </div>
      <div className={styles.peopleWrap} aria-hidden>
        <Image
          src="/5 persons.png"
          alt=""
          width={1410}
          height={768}
          className={styles.peopleImage}
          priority
        />
      </div>
    </section>
  );
}
