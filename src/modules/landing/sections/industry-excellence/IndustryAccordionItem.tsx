"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import styles from "./IndustryExcellence.module.css";

interface IndustryAccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  description?: string;
  decorative?: boolean;
  children: React.ReactNode;
}

export function IndustryAccordionItem({
  id,
  title,
  isOpen,
  onToggle,
  description,
  decorative = false,
  children,
}: IndustryAccordionItemProps) {
  return (
    <article className={cn(styles.item, isOpen && styles.itemOpen)}>
      <button
        type="button"
        id={`${id}-button`}
        aria-controls={`${id}-panel`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className={styles.itemButton}
      >
        <span className={styles.itemTitle}>{title}</span>
        <span className={cn(styles.itemChevron, isOpen && styles.itemChevronOpen)} aria-hidden>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.25 7.75L10 12.5L14.75 7.75" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={styles.panelViewport}
        data-open={isOpen}
      >
        <div className={styles.panelInner}>
          {description ? <p className={styles.description}>{description}</p> : null}

          <div className={styles.panelSurface}>
            {decorative && isOpen ? (
              <div className={styles.spiralWrap} aria-hidden>
                <Image src="/purple%20spiral%202.png" alt="" fill sizes="(max-width: 768px) 75vw, 42vw" className={styles.spiralImage} />
              </div>
            ) : null}

            <div className={styles.panelContent}>{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
