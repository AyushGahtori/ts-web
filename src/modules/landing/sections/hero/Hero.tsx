"use client";

import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const POSTER_WIDTH = 1600;
const POSTER_HEIGHT = 900;

type CssVars = CSSProperties & Record<`--${string}`, string>;

interface ArcLogo {
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

// Nine logos arranged on a symmetric top-half arc.
// These are top-left coordinates derived from center points on a centered arc.
const arcLogos: ArcLogo[] = [
  {
    id: "home-asset-01",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_08_40 PM 1.webp",
    left: 181,
    top: 357,
    width: 168,
    rotate: -24,
    layer: 16,
    outX: -640,
    outY: -360,
    spin: 22,
    exitScale: 0.92,
    floatX: 5,
    floatY: -6,
    floatRotate: -1.2,
    floatDuration: 8.2,
    delay: -1.4,
    priority: true,
  },
  {
    id: "home-asset-12",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_10_13 PM 1.webp",
    left: 279,
    top: 242,
    width: 138,
    rotate: -10,
    layer: 18,
    outX: -540,
    outY: -460,
    spin: -20,
    exitScale: 0.9,
    floatX: -5,
    floatY: -5,
    floatRotate: 1.1,
    floatDuration: 8.6,
    delay: -0.5,
    priority: true,
  },
  {
    id: "home-asset-09",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_09_51 PM 1.webp",
    left: 400,
    top: 144,
    width: 124,
    rotate: -4,
    layer: 20,
    outX: -360,
    outY: -520,
    spin: 28,
    exitScale: 0.9,
    floatX: 5,
    floatY: 5,
    floatRotate: 1.4,
    floatDuration: 8.8,
    delay: -4.9,
    priority: true,
  },
  {
    id: "home-asset-03",
    role: "home arc logo",
    file: "ChatGPT Image May 14, 2026, 05_18_28 PM 1.webp",
    left: 514,
    top: 51,
    width: 168,
    rotate: 6,
    layer: 22,
    outX: -180,
    outY: -540,
    spin: -16,
    exitScale: 0.92,
    floatX: 5,
    floatY: -5,
    floatRotate: -1,
    floatDuration: 7.8,
    delay: -0.9,
    priority: true,
  },
  {
    id: "home-asset-05",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_09_06 PM 1.webp",
    left: 719,
    top: 19,
    width: 162,
    rotate: 0,
    layer: 24,
    outX: 0,
    outY: -600,
    spin: -8,
    exitScale: 0.9,
    floatX: -4,
    floatY: 6,
    floatRotate: -1.2,
    floatDuration: 9.2,
    delay: -3.8,
    priority: true,
  },
  {
    id: "home-asset-04",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_09_01 PM 1.webp",
    left: 933,
    top: 66,
    width: 138,
    rotate: 22,
    layer: 22,
    outX: 220,
    outY: -540,
    spin: 24,
    exitScale: 0.92,
    floatX: -8,
    floatY: -4,
    floatRotate: 1,
    floatDuration: 10.1,
    delay: -4.2,
    priority: true,
  },
  {
    id: "home-asset-14",
    role: "home arc logo",
    file: "ChatGPT Image May 14, 2026, 05_18_51 PM 1.webp",
    left: 1066,
    top: 134,
    width: 144,
    rotate: 4,
    layer: 20,
    outX: 380,
    outY: -520,
    spin: -24,
    exitScale: 0.9,
    floatX: 7,
    floatY: -4,
    floatRotate: -1.5,
    floatDuration: 8.9,
    delay: -3.3,
    priority: true,
  },
  {
    id: "home-asset-11",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_10_05 PM 1.webp",
    left: 1183,
    top: 242,
    width: 138,
    rotate: 12,
    layer: 18,
    outX: 540,
    outY: -460,
    spin: 22,
    exitScale: 0.9,
    floatX: 3,
    floatY: -8,
    floatRotate: 1.8,
    floatDuration: 10.6,
    delay: -6.4,
    priority: true,
  },
  {
    id: "home-asset-06",
    role: "home arc logo",
    file: "ChatGPT Image May 8, 2026, 01_09_14 PM 1.webp",
    left: 1251,
    top: 357,
    width: 168,
    rotate: 22,
    layer: 16,
    outX: 640,
    outY: -360,
    spin: -26,
    exitScale: 0.92,
    floatX: 5,
    floatY: 7,
    floatRotate: 1.1,
    floatDuration: 9.7,
    delay: -1.8,
    priority: true,
  },
];

function assetSrc(file: string) {
  return `/home/${file.replaceAll(" ", "%20")}`;
}

function settleToNearestHeroState(section: HTMLElement, direction: number) {
  const start = section.getBoundingClientRect().top + window.scrollY;
  const travel = section.offsetHeight - window.innerHeight;

  if (travel <= 0) {
    return;
  }

  const heroEnd = start + travel;

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
    targetProgress =
      progress >= 0.76
        ? 1
        : [0, 0.3, 0.56, 0.78].reduce((nearest, point) =>
            Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
          );
  } else {
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
      const heroEndY = bounds.top + window.scrollY + section.offsetHeight - window.innerHeight;
      const overrun = nextScrollY - heroEndY;
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

function HomeObject({ item, progress }: { item: ArcLogo; progress: MotionValue<number> }) {
  const x = useTransform(
    progress,
    [0, 0.24, 0.5, 0.74, 0.94],
    [0, item.outX * 0.07, item.outX * 0.28, item.outX * 0.72, item.outX * 1.08],
  );
  const y = useTransform(
    progress,
    [0, 0.24, 0.5, 0.74, 0.94],
    [0, item.outY * 0.07, item.outY * 0.26, item.outY * 0.7, item.outY * 1.06],
  );
  const rotate = useTransform(
    progress,
    [0, 0.34, 0.68, 0.94],
    [item.rotate, item.rotate + item.spin * 0.08, item.rotate + item.spin * 0.46, item.rotate + item.spin],
  );
  const scale = useTransform(progress, [0, 0.38, 0.74, 0.96], [1, 1.02, item.exitScale, item.exitScale * 0.9]);
  const opacity = useTransform(progress, [0, 0.58, 0.84, 0.96], [1, 0.94, 0.28, 0.04]);

  const objectStyle: CssVars = {
    "--object-left": `${(item.left / POSTER_WIDTH) * 100}%`,
    "--object-top": `${(item.top / POSTER_HEIGHT) * 100}%`,
    "--object-width": `${(item.width / POSTER_WIDTH) * 100}%`,
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

  const sceneOpacity = useTransform(progress, [0, 0.7, 0.92], [1, 0.82, 0]);
  const sceneScale = useTransform(progress, [0, 0.9], [1, 1.04]);

  const wordmarkOpacity = useTransform(progress, [0, 0.45, 0.78], [1, 0.7, 0]);
  const wordmarkY = useTransform(progress, [0, 0.82], [0, -56]);

  const headlineOpacity = useTransform(progress, [0, 0.5, 0.82], [1, 0.74, 0.04]);
  const headlineY = useTransform(progress, [0, 0.82], [0, -86]);

  const ctaOpacity = useTransform(progress, [0, 0.45, 0.74], [1, 0.7, 0]);
  const ctaY = useTransform(progress, [0, 0.82], [0, -120]);

  const waveLeftY = useTransform(progress, [0, 1], [0, 60]);
  const waveRightY = useTransform(progress, [0, 1], [0, 60]);

  const veilOpacity = useTransform(rawProgress, [0.68, 0.82, 0.92, 0.985, 1], [0, 0.94, 1, 0.18, 0]);
  const veilY = useTransform(rawProgress, [0.86, 0.96, 1], [0, -24, -92]);

  return (
    <section
      ref={sectionRef}
      className="home-cinematic-experience"
      aria-label="TechSnitch home introduction"
    >
      <div className="home-cinematic-sticky">
        <div className="home-hero-backdrop" aria-hidden>
          <div className="home-hero-grid" />
          <div className="home-hero-stars" />
          <motion.div className="home-hero-wave home-hero-wave--left" style={{ y: waveLeftY }} />
          <motion.div className="home-hero-wave home-hero-wave--right" style={{ y: waveRightY }} />
          <div className="home-hero-haze" />
        </div>

        <motion.div
          className="home-hero-scene"
          style={{ opacity: sceneOpacity, scale: sceneScale }}
        >
          <div className="cinematic-poster home-hero-arc" aria-hidden>
            {arcLogos.map((item) => (
              <HomeObject key={item.id} item={item} progress={progress} />
            ))}
          </div>

          <div className="home-hero-content">
            <motion.div
              className="home-hero-wordmark"
              style={{ opacity: wordmarkOpacity, y: wordmarkY }}
            >
              <span className="home-hero-wordmark__tech">TECH</span>
              <span className="home-hero-wordmark__divider" aria-hidden />
              <span className="home-hero-wordmark__snitch">SNITCH</span>
            </motion.div>

            <motion.p
              className="home-hero-tagline"
              style={{ opacity: wordmarkOpacity, y: wordmarkY }}
            >
              AI-AGNOSTIC SERVICENOW PARTNER
            </motion.p>

            <motion.h1
              className="home-hero-headline"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              Engineering the
              <span>Autonomous Enterprise</span>
            </motion.h1>

            <motion.p
              className="home-hero-copy"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              Transforming global enterprises through AI-agnostic ServiceNow intelligence,
              delivering measurable outcomes, operational autonomy, and future-proof
              resilience without vendor lock-in.
            </motion.p>

            <motion.div
              className="home-hero-cta-row"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <a className="home-hero-cta home-hero-cta--primary" href="#contact-us">
                <span>Get Started Now</span>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="home-hero-cta home-hero-cta--secondary" href="#services">
                <span>See Projects</span>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="home-gradient-veil" style={{ opacity: veilOpacity, y: veilY }} aria-hidden />
      </div>
    </section>
  );
}
