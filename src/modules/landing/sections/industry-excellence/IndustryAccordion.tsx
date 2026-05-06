"use client";

import { useState } from "react";
import { IndustryAccordionItem } from "@/modules/landing/sections/industry-excellence/IndustryAccordionItem";
import { IndustryTable } from "@/modules/landing/sections/industry-excellence/IndustryTable";
import type { IndustryAccordionItemData } from "@/modules/landing/sections/industry-excellence/industryData";
import styles from "./IndustryExcellence.module.css";

interface IndustryAccordionProps {
  items: IndustryAccordionItemData[];
}

export function IndustryAccordion({ items }: IndustryAccordionProps) {
  const [openId, setOpenId] = useState(items[0]?.id ?? "");

  return (
    <div className={styles.accordionStack}>
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <IndustryAccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            isOpen={isOpen}
            onToggle={() => setOpenId(item.id)}
            description={item.description}
            decorative
          >
            {item.rows && item.columns ? <IndustryTable columns={item.columns} rows={item.rows} /> : <div className={styles.emptyPanel} aria-hidden />}
          </IndustryAccordionItem>
        );
      })}
    </div>
  );
}
