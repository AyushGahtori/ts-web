"use client";

import { useEffect } from "react";

interface RouteSectionScrollerProps {
  sectionId: string;
}

export function RouteSectionScroller({ sectionId }: RouteSectionScrollerProps) {
  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [sectionId]);

  return null;
}
