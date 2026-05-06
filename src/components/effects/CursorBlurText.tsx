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

interface CursorBlurSubscriber {
  element: HTMLElement;
  influenceRadius: number;
  visible: boolean;
}

const cursorBlurSubscribers = new Set<CursorBlurSubscriber>();
let cursorBlurPointerX = -9999;
let cursorBlurPointerY = -9999;
let cursorBlurFrame = 0;
let cursorBlurListening = false;

function updateCursorBlurSubscribers() {
  cursorBlurFrame = 0;

  cursorBlurSubscribers.forEach((subscriber) => {
    const { element, influenceRadius, visible } = subscriber;

    if (!visible) {
      element.style.setProperty("--cursor-blur-strength", "0");
      return;
    }

    const rect = element.getBoundingClientRect();
    const localX = cursorBlurPointerX - rect.left;
    const localY = cursorBlurPointerY - rect.top;
    const distanceX = Math.max(rect.left - cursorBlurPointerX, 0, cursorBlurPointerX - rect.right);
    const distanceY = Math.max(rect.top - cursorBlurPointerY, 0, cursorBlurPointerY - rect.bottom);
    const distance = Math.hypot(distanceX, distanceY);
    const strength = Math.max(0, 1 - distance / influenceRadius);

    element.style.setProperty("--cursor-blur-x", `${localX}px`);
    element.style.setProperty("--cursor-blur-y", `${localY}px`);
    element.style.setProperty("--cursor-blur-strength", strength.toFixed(3));
  });
}

function queueCursorBlurUpdate() {
  if (!cursorBlurFrame) {
    cursorBlurFrame = window.requestAnimationFrame(updateCursorBlurSubscribers);
  }
}

function handleSharedPointerMove(event: PointerEvent) {
  cursorBlurPointerX = event.clientX;
  cursorBlurPointerY = event.clientY;
  queueCursorBlurUpdate();
}

function handleSharedPointerLeave() {
  cursorBlurSubscribers.forEach(({ element }) => {
    element.style.setProperty("--cursor-blur-strength", "0");
  });
}

function ensureCursorBlurListeners() {
  if (cursorBlurListening) {
    return;
  }

  window.addEventListener("pointermove", handleSharedPointerMove, { passive: true });
  window.addEventListener("pointerleave", handleSharedPointerLeave);
  cursorBlurListening = true;
}

function teardownCursorBlurListenersIfIdle() {
  if (!cursorBlurListening || cursorBlurSubscribers.size > 0) {
    return;
  }

  window.removeEventListener("pointermove", handleSharedPointerMove);
  window.removeEventListener("pointerleave", handleSharedPointerLeave);
  cursorBlurListening = false;

  if (cursorBlurFrame) {
    window.cancelAnimationFrame(cursorBlurFrame);
    cursorBlurFrame = 0;
  }
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

    if (!element || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const subscriber: CursorBlurSubscriber = {
      element,
      influenceRadius,
      visible: false,
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        subscriber.visible = Boolean(entry?.isIntersecting);

        if (!subscriber.visible) {
          element.style.setProperty("--cursor-blur-strength", "0");
        } else {
          queueCursorBlurUpdate();
        }
      },
      { rootMargin: `${Math.ceil(influenceRadius)}px` },
    );

    observer.observe(element);
    cursorBlurSubscribers.add(subscriber);
    ensureCursorBlurListeners();

    return () => {
      observer.disconnect();
      cursorBlurSubscribers.delete(subscriber);
      element.style.setProperty("--cursor-blur-strength", "0");
      teardownCursorBlurListenersIfIdle();
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
