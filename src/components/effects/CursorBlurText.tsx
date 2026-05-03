"use client";

import { type CSSProperties, type HTMLAttributes, type ReactNode, useCallback, useEffect, useRef } from "react";

type CursorBlurTextTag = "h1" | "h2" | "p" | "span";

interface CursorBlurTextProps extends HTMLAttributes<HTMLElement> {
  as?: CursorBlurTextTag;
  children: ReactNode;
  className?: string;
  influenceRadius?: number;
  preservePosition?: boolean;
  spotSize?: number;
}

export function CursorBlurText({
  as = "span",
  children,
  className,
  influenceRadius = 280,
  preservePosition = false,
  spotSize = 150,
  style,
  ...rest
}: CursorBlurTextProps) {
  const textRef = useRef<HTMLElement | null>(null);
  const setTextRef = useCallback((node: HTMLElement | null) => {
    textRef.current = node;
  }, []);

  useEffect(() => {
    const element = textRef.current;

    if (!element || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const updateBlurSpot = () => {
      frame = 0;

      const rect = element.getBoundingClientRect();
      const localX = pointerX - rect.left;
      const localY = pointerY - rect.top;
      const distanceX = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
      const distanceY = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
      const distance = Math.hypot(distanceX, distanceY);
      const strength = Math.max(0, 1 - distance / influenceRadius);

      element.style.setProperty("--cursor-blur-x", `${localX}px`);
      element.style.setProperty("--cursor-blur-y", `${localY}px`);
      element.style.setProperty("--cursor-blur-strength", strength.toFixed(3));
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(updateBlurSpot);
      }
    };

    const clearBlurSpot = () => {
      element.style.setProperty("--cursor-blur-strength", "0");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", clearBlurSpot);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearBlurSpot);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [influenceRadius]);

  const rootStyle = {
    ...style,
    ...(preservePosition ? {} : { position: "relative" }),
    "--cursor-blur-bleed": `${Math.ceil(spotSize * 0.75)}px`,
    "--cursor-blur-radius": `${spotSize}px`,
  } as CSSProperties;

  const rootProps = {
    ...rest,
    className: ["cursor-blur-text", className].filter(Boolean).join(" "),
    style: rootStyle,
  };

  const content = (
    <>
      <span className="cursor-blur-text__base">{children}</span>
      <span className="cursor-blur-text__overlay" aria-hidden="true">
        {children}
      </span>
    </>
  );

  if (as === "h1") {
    return (
      <h1 {...rootProps} ref={setTextRef}>
        {content}
      </h1>
    );
  }

  if (as === "h2") {
    return (
      <h2 {...rootProps} ref={setTextRef}>
        {content}
      </h2>
    );
  }

  if (as === "p") {
    return (
      <p {...rootProps} ref={setTextRef}>
        {content}
      </p>
    );
  }

  return (
    <span {...rootProps} ref={setTextRef}>
      {content}
    </span>
  );
}
