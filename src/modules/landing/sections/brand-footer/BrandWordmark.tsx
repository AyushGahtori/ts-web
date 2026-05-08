import styles from "./brandFooter.module.css";
import { TechsnitchShader } from "@/modules/landing/sections/brand-footer/TechsnitchShader";

export function BrandWordmark() {
  return (
    <div className={styles.wordmarkBlock}>
      <div className={styles.wordmarkContainer}>
        <span className={styles.wordmarkText} aria-label="TECHSNITCH">
          TECHSNITCH
        </span>
        <TechsnitchShader />
      </div>

      <p className={styles.tagline}>/A place for tech</p>
    </div>
  );
}
