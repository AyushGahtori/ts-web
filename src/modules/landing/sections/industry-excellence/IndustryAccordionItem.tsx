"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AccordionButton } from "@/components/ui/AccordionButton";
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
  const innerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const element = innerRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.scrollHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <article className={cn(styles.item, isOpen && styles.itemOpen)}>
      <AccordionButton
        id={`${id}-button`}
        title={title}
        isOpen={isOpen}
        onClick={onToggle}
        aria-controls={`${id}-panel`}
        className={styles.itemButton}
      />

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={styles.panelViewport}
        data-open={isOpen}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div ref={innerRef} className={styles.panelInner}>
          {description ? <p className={styles.description}>{description}</p> : null}

          <div className={styles.panelSurface}>
            {decorative ? (
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
