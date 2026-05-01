import Image from "next/image";
import styles from "./lifeAt.module.css";

export function LifeAtHero() {
  return (
    <section className={styles.hero} aria-label="Life at Techsnitch">
      <p className={styles.backgroundWord} aria-hidden>
        Life at
      </p>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleTop}>Life at</span>
          <span className={styles.titleBottom}>Techsnitch</span>
        </h1>
        <p className={styles.subtitle}>Empowering the Visionaries</p>
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
