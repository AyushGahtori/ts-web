"use client";

import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const POSTER_WIDTH = 1440;
const POSTER_HEIGHT = 980;
const HERO_ASSET_SPREAD = 1.5;
const HERO_ASSET_SCALE = 1.3;
const HERO_ASSET_ORIGIN_X = 690;
const HERO_ASSET_ORIGIN_Y = 390;

type CssVars = CSSProperties & Record<`--${string}`, string>;

interface HomeObjectAsset {
  id: string;
  role: string;
  file: string;
  left: number;
  top: number;
  width: number;
  rotate: number;
  layer: number;
  outX: number;
  outY: number;
  spin: number;
  exitScale: number;
  floatX: number;
  floatY: number;
  floatRotate: number;
  floatDuration: number;
  delay: number;
  priority?: boolean;
  flipX?: boolean;
  flipY?: boolean;
}

const homeObjects: HomeObjectAsset[] = [
  {
    id: "home-asset-01",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_08_40 PM 1.webp",
    left: 450,
    top: 355,
    width: 138,
    rotate: -18,
    layer: 16,
    outX: -350,
    outY: -310,
    spin: 28,
    exitScale: 0.9,
    floatX: 4,
    floatY: -7,
    floatRotate: -1.2,
    floatDuration: 8.2,
    delay: -1.4,
    priority: true,
  },
  {
    id: "home-asset-03",
    role: "home hero object",
    file: "ChatGPT Image May 14, 2026, 05_18_28 PM 1.webp",
    left: 666,
    top: 214,
    width: 182,
    rotate: 12,
    layer: 17,
    outX: 350,
    outY: -244,
    spin: -26,
    exitScale: 0.92,
    floatX: 5,
    floatY: -5,
    floatRotate: -1,
    floatDuration: 7.8,
    delay: -0.9,
    priority: true,
  },
  {
    id: "home-asset-04",
    role: "home hero object",
    file: "/ChatGPT%20Image%20May%208,%202026,%2001_10_29%20PM%202.svg",
    left: 780,
    top: 274,
    width: 190,
    rotate: 4,
    layer: 15,
    outX: 430,
    outY: 20,
    spin: 22,
    exitScale: 0.92,
    floatX: -8,
    floatY: -4,
    floatRotate: 1,
    floatDuration: 10.1,
    delay: -4.2,
    priority: true,
  },
  {
    id: "home-asset-05",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_09_06 PM 1.webp",
    left: 688,
    top: 305,
    width: 154,
    rotate: 14,
    layer: 23,
    outX: 260,
    outY: -110,
    spin: -18,
    exitScale: 0.86,
    floatX: -4,
    floatY: 6,
    floatRotate: -1.2,
    floatDuration: 9.2,
    delay: -3.8,
  },
  {
    id: "home-asset-06",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_09_14 PM 1.webp",
    left: 784,
    top: 488,
    width: 132,
    rotate: 118,
    layer: 14,
    outX: 42,
    outY: 375,
    spin: 24,
    exitScale: 0.9,
    floatX: 5,
    floatY: 7,
    floatRotate: 1.1,
    floatDuration: 9.7,
    delay: -1.8,
  },
  {
    id: "home-asset-07",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_09_19 PM 1.webp",
    left: 654,
    top: 544,
    width: 132,
    rotate: -128,
    layer: 19,
    outX: -330,
    outY: 290,
    spin: -34,
    exitScale: 0.9,
    floatX: -4,
    floatY: 6,
    floatRotate: 2,
    floatDuration: 8.4,
    delay: -5.1,
  },
  {
    id: "home-asset-08",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_09_32 PM 1.webp",
    left: 518,
    top: 488,
    width: 132,
    rotate: -72,
    layer: 15,
    outX: -440,
    outY: 8,
    spin: -22,
    exitScale: 0.92,
    floatX: -3,
    floatY: -7,
    floatRotate: -1,
    floatDuration: 7.6,
    delay: -2.8,
    priority: true,
  },
  {
    id: "home-asset-09",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_09_51 PM 1.webp",
    left: 570,
    top: 250,
    width: 118,
    rotate: -38,
    layer: 24,
    outX: -260,
    outY: -80,
    spin: 36,
    exitScale: 0.88,
    floatX: 5,
    floatY: 5,
    floatRotate: 1.4,
    floatDuration: 8.8,
    delay: -4.9,
  },
  {
    id: "home-asset-11",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_10_05 PM 1.webp",
    left: 740,
    top: 420,
    width: 120,
    rotate: 42,
    layer: 25,
    outX: 244,
    outY: 160,
    spin: -24,
    exitScale: 0.88,
    floatX: 3,
    floatY: -8,
    floatRotate: 1.8,
    floatDuration: 10.6,
    delay: -6.4,
  },
  {
    id: "home-asset-12",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_10_13 PM 1.webp",
    left: 608,
    top: 426,
    width: 122,
    rotate: -18,
    layer: 26,
    outX: -190,
    outY: 190,
    spin: -30,
    exitScale: 0.88,
    floatX: 6,
    floatY: -5,
    floatRotate: 1.1,
    floatDuration: 8.6,
    delay: -0.5,
    priority: true,
  },
  {
    id: "home-asset-13",
    role: "home hero object",
    file: "ChatGPT Image May 8, 2026, 01_10_18 PM 1.webp",
    left: 636,
    top: 358,
    width: 112,
    rotate: 8,
    layer: 29,
    outX: 16,
    outY: 48,
    spin: 16,
    exitScale: 0.9,
    floatX: -7,
    floatY: 4,
    floatRotate: -1.8,
    floatDuration: 10.8,
    delay: -2.5,
  },
  {
    id: "home-asset-14",
    role: "home hero object",
    file: "ChatGPT Image May 14, 2026, 05_18_51 PM 1.webp",
    left: 836,
    top: 378,
    width: 154,
    rotate: 12,
    layer: 18,
    outX: 322,
    outY: 314,
    spin: -30,
    exitScale: 0.9,
    floatX: 7,
    floatY: -4,
    floatRotate: -1.5,
    floatDuration: 8.9,
    delay: -3.3,
  },
];

const foregroundHomeObjects = homeObjects.filter((item) => item.layer >= 23);

function assetSrc(file: string) {
  if (file.startsWith("/")) {
    return file;
  }

  return `/home/${file.replaceAll(" ", "%20")}`;
}

function settleToNearestHeroState(section: HTMLElement, direction: number) {
  const start = section.getBoundingClientRect().top + window.scrollY;
  const travel = section.offsetHeight - window.innerHeight;

  if (travel <= 0) {
    return;
  }

  const heroEnd = start + travel;

  // Cross-section magnet: if scrollY is just inside Qualities but user scrolls up,
  // snap back to the clean hero-end position so the transition re-seals.
  const overrun = window.scrollY - heroEnd;
  if (overrun > 0) {
    if (direction < 0 && overrun < window.innerHeight * 0.32) {
      window.scrollTo({ top: heroEnd, behavior: "smooth" });
    }
    return;
  }

  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / travel));

  if (progress < 0.08) {
    return;
  }

  let targetProgress: number;

  if (direction > 0) {
    // Scrolling down: past 76 % → magnet all the way to hero end (Qualities entry).
    targetProgress =
      progress >= 0.76
        ? 1
        : [0, 0.3, 0.56, 0.78].reduce((nearest, point) =>
            Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
          );
  } else {
    // Scrolling up: if already close to hero end, hold at 1 rather than
    // jumping back to 0.78, which felt jarring.
    targetProgress =
      progress >= 0.88
        ? 1
        : [0, 0.3, 0.56, 0.78].reduce((nearest, point) =>
            Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
          );
  }

  if (Math.abs(targetProgress - progress) < 0.02) {
    return;
  }

  const targetTop = start + travel * targetProgress;

  if (Math.abs(window.scrollY - targetTop) < 8) {
    return;
  }

  window.scrollTo({ top: targetTop, behavior: "smooth" });
}

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value));
}

function useCinematicScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const rawProgress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const start = section.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      rawProgress.set(clampProgress((window.scrollY - start) / travel));
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [rawProgress, sectionRef]);

  return rawProgress;
}

function useMagneticScrollSettle(sectionRef: RefObject<HTMLElement | null>) {
  const settleTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const nextDirection = Math.sign(nextScrollY - lastScrollY.current);
      lastScrollY.current = nextScrollY;

      if (nextDirection !== 0) {
        lastDirection.current = nextDirection;
      }

      const bounds = section.getBoundingClientRect();
      // Active while hero is the sticky section, OR while in the shallow
      // Qualities-entry zone so the cross-section reverse magnet can fire.
      const heroEndY = bounds.top + window.scrollY + section.offsetHeight - window.innerHeight;
      const overrun  = nextScrollY - heroEndY;
      const isActive =
        (bounds.top <= 4 && bounds.bottom >= window.innerHeight - 4) ||
        (overrun > 0 && overrun < window.innerHeight * 0.32);

      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
      }

      if (!isActive) {
        return;
      }

      settleTimer.current = window.setTimeout(() => {
        settleToNearestHeroState(section, lastDirection.current);
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
      }
    };
  }, [sectionRef]);
}

function HomeObject({ item, progress }: { item: HomeObjectAsset; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.24, 0.5, 0.74, 0.94], [0, item.outX * 0.07, item.outX * 0.28, item.outX * 0.72, item.outX * 1.08]);
  const y = useTransform(progress, [0, 0.24, 0.5, 0.74, 0.94], [0, item.outY * 0.07, item.outY * 0.26, item.outY * 0.7, item.outY * 1.06]);
  const rotate = useTransform(progress, [0, 0.34, 0.68, 0.94], [item.rotate, item.rotate + item.spin * 0.08, item.rotate + item.spin * 0.46, item.rotate + item.spin]);
  const scale = useTransform(progress, [0, 0.38, 0.74, 0.96], [1, 1.015, item.exitScale, item.exitScale * 0.9]);
  const opacity = useTransform(progress, [0, 0.58, 0.84, 0.96], [1, 0.94, 0.28, 0.04]);

  const objectStyle: CssVars = {
    "--object-left": `${((HERO_ASSET_ORIGIN_X + (item.left - HERO_ASSET_ORIGIN_X) * HERO_ASSET_SPREAD) / POSTER_WIDTH) * 100}%`,
    "--object-top": `${((HERO_ASSET_ORIGIN_Y + (item.top - HERO_ASSET_ORIGIN_Y) * HERO_ASSET_SPREAD) / POSTER_HEIGHT) * 100}%`,
    "--object-width": `${((item.width * HERO_ASSET_SCALE) / POSTER_WIDTH) * 100}%`,
    "--float-x": `${item.floatX}px`,
    "--float-y": `${item.floatY}px`,
    "--float-rotate": `${item.floatRotate}deg`,
    "--float-duration": `${item.floatDuration}s`,
    "--float-delay": `${item.delay}s`,
  };

  const flipStyle: CSSProperties = {
    transform: `scale3d(${item.flipX ? -1 : 1}, ${item.flipY ? -1 : 1}, 1)`,
  };

  return (
    <motion.div
      className="cinematic-object"
      data-object-id={item.id}
      data-object-role={item.role}
      style={{ ...objectStyle, x, y, rotateZ: rotate, scale, opacity, zIndex: item.layer }}
      aria-hidden
    >
      <div className="cinematic-object__flip" style={flipStyle}>
        <img
          className="cinematic-object__media"
          src={assetSrc(item.file)}
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rawProgress = useCinematicScrollProgress(sectionRef);
  const progress = useSpring(rawProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.55,
    restDelta: 0.0004,
  });

  useMagneticScrollSettle(sectionRef);

  const introOpacity = useTransform(progress, [0, 0.72, 0.9], [1, 0.86, 0]);
  const introScale = useTransform(progress, [0, 0.86], [1, 1.028]);
  const typeOpacity = useTransform(progress, [0, 0.5, 0.82], [0.96, 0.68, 0.03]);
  const typeY = useTransform(progress, [0, 0.82], [0, -64]);
  const foregroundOpacity = useTransform(progress, [0, 0.24, 0.52, 0.76], [1, 0.88, 0.22, 0.02]);
  const foregroundY = useTransform(progress, [0, 0.24, 0.55, 0.84], [0, -78, -330, -720]);
  const foregroundZ = useTransform(progress, [0, 0.84], [260, 420]);
  const waveOpacity = useTransform(rawProgress, [0.6, 0.74, 0.88, 0.98, 1], [0, 0.9, 1, 0.36, 0]);
  const waveScale = useTransform(rawProgress, [0.6, 0.82, 0.94, 1], [0.08, 3.05, 4.72, 0.08]);
  const veilOpacity = useTransform(rawProgress, [0.68, 0.82, 0.92, 0.985, 1], [0, 0.94, 1, 0.18, 0]);
  const veilY = useTransform(rawProgress, [0.86, 0.96, 1], [0, -24, -92]);

  return (
    <section ref={sectionRef} className="home-cinematic-experience" aria-label="TechSnitch home introduction">
      <div className="home-cinematic-sticky">
        <motion.div className="home-intro-scene" style={{ opacity: introOpacity, scale: introScale }} aria-hidden>
          <motion.div className="home-techsnitch-type" style={{ opacity: typeOpacity, y: typeY }}>
            TECHSNITCH
          </motion.div>

          <div className="cinematic-poster" aria-hidden>
            {homeObjects.map((item) => (
              <HomeObject key={item.id} item={item} progress={progress} />
            ))}
          </div>

          <div className="cinematic-poster cinematic-poster--front" aria-hidden>
            {foregroundHomeObjects.map((item) => (
              <HomeObject key={`front-${item.id}`} item={item} progress={progress} />
            ))}
          </div>

          <motion.div
            className="home-intro-copy home-intro-copy--left"
            style={{ opacity: foregroundOpacity, y: foregroundY, z: foregroundZ }}
          >
            <p>AI-AGNOSTIC SERVICENOW PARTNER</p>
            <h1>
              Engineering the
              <span>Autonomous Enterprise</span>
            </h1>
          </motion.div>

          <motion.p
            className="home-intro-copy home-intro-copy--right"
            style={{ opacity: foregroundOpacity, y: foregroundY, z: foregroundZ }}
          >
            Transforming global enterprises through AI-agnostic ServiceNow intelligence, delivering measurable outcomes, operational autonomy, and
            future-proof resilience without vendor lock-in.
          </motion.p>
        </motion.div>

        <motion.div className="home-gradient-wave" style={{ opacity: waveOpacity, scale: waveScale }} aria-hidden />
        <motion.div className="home-gradient-veil" style={{ opacity: veilOpacity, y: veilY }} aria-hidden />
      </div>
    </section>
  );
}
