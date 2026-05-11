"use client";

import { useEffect } from "react";

interface RouteSectionScrollerProps {
  sectionId?: string;
}

export function RouteSectionScroller({ sectionId }: RouteSectionScrollerProps) {
  useEffect(() => {
    const getTargetId = () => {
      if (sectionId) {
        return sectionId;
      }

      return window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
    };

    const scrollToTarget = () => {
      const targetId = getTargetId();
      if (!targetId) {
        return;
      }

      const element = document.getElementById(targetId);
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: "auto", block: "start" });
    };

    const frame = window.requestAnimationFrame(scrollToTarget);
    const timers = [120, 360, 720].map((delay) => window.setTimeout(scrollToTarget, delay));

    window.addEventListener("hashchange", scrollToTarget);

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scrollToTarget);
    };
  }, [sectionId]);

  return null;
}
