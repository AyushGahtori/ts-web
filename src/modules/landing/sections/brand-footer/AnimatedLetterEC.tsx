import { useId } from "react";
import styles from "./brandFooter.module.css";

interface AnimatedLetterECProps {
  letter: "E" | "C";
  className?: string;
}

export function AnimatedLetterEC({ letter, className }: AnimatedLetterECProps) {
  const baseId = useId().replace(/:/g, "");
  const maskId = `${baseId}-mask`;
  const filterId = `${baseId}-blur`;
  const viewBox = letter === "E" ? "0 0 240 242" : "0 0 220 242";
  const width = letter === "E" ? 240 : 220;

  return (
    <div className={`${styles.animatedLetterWrap} ${className ?? ""}`} aria-hidden>
      <svg viewBox={viewBox} className={styles.animatedLetterSvg} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height="242">
            <rect width={width} height="242" fill="black" />
            <text
              x="50%"
              y="79%"
              textAnchor="middle"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight="800"
              fontSize="242"
              fill="white"
            >
              {letter}
            </text>
          </mask>
        </defs>

        <text
          x="50%"
          y="79%"
          textAnchor="middle"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="800"
          fontSize="242"
          fill="#353333"
        >
          {letter}
        </text>

        <g mask={`url(#${maskId})`} filter={`url(#${filterId})`}>
          <circle className={styles.orbPrimary} cx={letter === "E" ? "78" : "86"} cy="110" r="42" />
          <circle className={styles.orbSecondary} cx={letter === "E" ? "126" : "122"} cy="144" r="36" />
          <circle className={styles.orbTertiary} cx={letter === "E" ? "162" : "70"} cy="126" r="30" />
          <circle className={styles.orbQuaternary} cx={letter === "E" ? "108" : "136"} cy="94" r="30" />
          <circle className={styles.orbQuinary} cx={letter === "E" ? "58" : "102"} cy="156" r="38" />
        </g>
      </svg>
    </div>
  );
}
