"use client";

import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const POSTER_WIDTH = 1440;
const POSTER_HEIGHT = 980;

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
    id: "rgb-memory",
    role: "RGB memory module",
    file: "image 20.svg",
    left: 486,
    top: 359,
    width: 249,
    rotate: 13.11,
    layer: 18,
    outX: -460,
    outY: -360,
    spin: 33.94,
    exitScale: 0.92,
    floatX: 4,
    floatY: -7,
    floatRotate: -1.2,
    floatDuration: 8.2,
    delay: -1.4,
    priority: true,
  },
  {
    id: "graphics-card",
    role: "dual-fan graphics card",
    file: "image 21.svg",
    left: 641,
    top: 226,
    width: 292,
    rotate: 66.36,
    layer: 29,
    outX: 293,
    outY: 254,
    spin: 0,
    exitScale: 0.94,
    floatX: -5,
    floatY: 6,
    floatRotate: 1.6,
    floatDuration: 9.4,
    delay: -2.1,
    priority: true,
  },
  {
    id: "triple-fan-rig",
    role: "triple RGB cooling fan rig",
    file: "image 22.svg",
    left: 880,
    top: 206,
    width: 249,
    rotate: 0,
    layer: 22,
    outX: 390,
    outY: 42,
    spin: -7,
    exitScale: 1,
    floatX: 5,
    floatY: -5,
    floatRotate: -1,
    floatDuration: 7.8,
    delay: -0.9,
    priority: true,
    flipY: true,
  },
  {
    id: "upper-glass-ribbon",
    role: "wide translucent ribbon",
    file: "image 23.svg",
    left: 645,
    top: 175,
    width: 360,
    rotate: 0,
    layer: 24,
    outX: 402,
    outY: -6,
    spin: 10.32,
    exitScale: 1.06,
    floatX: -8,
    floatY: -4,
    floatRotate: 1,
    floatDuration: 10.1,
    delay: -4.2,
    priority: true,
  },
  {
    id: "crossing-glass-ribbon",
    role: "flipped translucent ribbon",
    file: "image 24.svg",
    left: 574,
    top: 419,
    width: 221,
    rotate: 0,
    layer: 21,
    outX: -239,
    outY: -408,
    spin: -34,
    exitScale: 0.98,
    floatX: 7,
    floatY: -4,
    floatRotate: -1.5,
    floatDuration: 8.9,
    delay: -3.3,
    flipX: true,
  },
  {
    id: "lower-glass-ribbon",
    role: "small translucent ribbon",
    file: "image 25.svg",
    left: 479,
    top: 567,
    width: 255,
    rotate: 137.44,
    layer: 16,
    outX: -238,
    outY: 307,
    spin: 14.33,
    exitScale: 0.9,
    floatX: 5,
    floatY: 7,
    floatRotate: 1.1,
    floatDuration: 9.7,
    delay: -1.8,
  },
  {
    id: "pink-torus",
    role: "pink torus aperture",
    file: "image 26.svg",
    left: 932,
    top: 476,
    width: 173,
    rotate: 0,
    layer: 19,
    outX: 141,
    outY: 283,
    spin: -42.09,
    exitScale: 0.96,
    floatX: -4,
    floatY: 6,
    floatRotate: 2,
    floatDuration: 8.4,
    delay: -5.1,
  },
  {
    id: "blue-core-cube",
    role: "blue processor cube",
    file: "image 27.svg",
    left: 567,
    top: 391,
    width: 244,
    rotate: 24.63,
    layer: 17,
    outX: -326,
    outY: 277,
    spin: -27.26,
    exitScale: 1.12,
    floatX: -3,
    floatY: -7,
    floatRotate: -1,
    floatDuration: 7.6,
    delay: -2.8,
    priority: true,
  },
  {
    id: "front-silver-cube",
    role: "front perforated metal cube",
    file: "image 28.svg",
    left: 441,
    top: 501,
    width: 236,
    rotate: -31.92,
    layer: 23,
    outX: -470,
    outY: 179,
    spin: 58.97,
    exitScale: 0.84,
    floatX: 5,
    floatY: 5,
    floatRotate: 1.4,
    floatDuration: 8.8,
    delay: -4.9,
  },
  {
    id: "rear-silver-cube",
    role: "rear perforated metal cube",
    file: "image 29.svg",
    left: 342,
    top: 391,
    width: 236,
    rotate: -31.92,
    layer: 13,
    outX: -308,
    outY: -169,
    spin: 0,
    exitScale: 0.88,
    floatX: -4,
    floatY: 6,
    floatRotate: -1.2,
    floatDuration: 9.2,
    delay: -3.8,
  },
  {
    id: "orange-lamp",
    role: "orange lamp",
    file: "image 30.svg",
    left: 190,
    top: 176,
    width: 296,
    rotate: 20.62,
    layer: 9,
    outX: -362,
    outY: -87,
    spin: -20.53,
    exitScale: 0.94,
    floatX: 3,
    floatY: -8,
    floatRotate: 1.8,
    floatDuration: 10.6,
    delay: -6.4,
  },
  {
    id: "motherboard",
    role: "angled motherboard",
    file: "image 31.svg",
    left: 402,
    top: 148,
    width: 438,
    rotate: -35.88,
    layer: 17,
    outX: -480,
    outY: -290,
    spin: -31,
    exitScale: 0.9,
    floatX: 6,
    floatY: -5,
    floatRotate: 1.1,
    floatDuration: 8.6,
    delay: -0.5,
    priority: true,
  },
  {
    id: "teal-x",
    role: "soft teal X form",
    file: "image 32.svg",
    left: 802,
    top: 99,
    width: 265,
    rotate: 0,
    layer: 10,
    outX: 183,
    outY: -286,
    spin: 15.03,
    exitScale: 1.06,
    floatX: -7,
    floatY: 4,
    floatRotate: -1.8,
    floatDuration: 10.8,
    delay: -2.5,
  },
  {
    id: "microchip",
    role: "small processor chip",
    file: "image 33.svg",
    left: 771,
    top: 305,
    width: 245,
    rotate: 102.69,
    layer: 26,
    outX: 391,
    outY: 162,
    spin: 0,
    exitScale: 1,
    floatX: 4,
    floatY: 5,
    floatRotate: 1.5,
    floatDuration: 9.5,
    delay: -5.6,
  },
  {
    id: "upper-heat-sink",
    role: "silver teal heat sink",
    file: "image 34.svg",
    left: 363,
    top: 73,
    width: 259,
    rotate: 46.27,
    layer: 15,
    outX: -321,
    outY: -291,
    spin: 11.04,
    exitScale: 0.88,
    floatX: -5,
    floatY: -5,
    floatRotate: -1.3,
    floatDuration: 9.8,
    delay: -1.1,
  },
  {
    id: "right-glass-ribbon",
    role: "right translucent ribbon",
    file: "image 35.svg",
    left: 873,
    top: 345,
    width: 255,
    rotate: 40.62,
    layer: 18,
    outX: 133,
    outY: 39,
    spin: 0,
    exitScale: 0.96,
    floatX: 5,
    floatY: -6,
    floatRotate: 1,
    floatDuration: 7.9,
    delay: -3.1,
  },
  {
    id: "teal-bubble-array",
    role: "teal bubble array",
    file: "image 36.svg",
    left: 379,
    top: 559,
    width: 116,
    rotate: -50.66,
    layer: 21,
    outX: -470,
    outY: 260,
    spin: -39,
    exitScale: 0.86,
    floatX: -4,
    floatY: 6,
    floatRotate: 2.1,
    floatDuration: 8.3,
    delay: -4.1,
  },
  {
    id: "lower-heat-sink",
    role: "lower silver teal heat sink",
    file: "image 37.svg",
    left: 693,
    top: 589,
    width: 259,
    rotate: 178.27,
    layer: 20,
    outX: 65,
    outY: 357,
    spin: 0,
    exitScale: 0.88,
    floatX: 4,
    floatY: 7,
    floatRotate: -1,
    floatDuration: 10.2,
    delay: -6.2,
  },
  {
    id: "memory-stick",
    role: "black memory stick",
    file: "image 38.svg",
    left: 817,
    top: 489,
    width: 157,
    rotate: 36.56,
    layer: 27,
    outX: 48,
    outY: 183,
    spin: 0,
    exitScale: 0.92,
    floatX: -3,
    floatY: -5,
    floatRotate: 1.2,
    floatDuration: 8,
    delay: -2.2,
  },
  {
    id: "abstract-stack",
    role: "abstract colorful stack",
    file: "image 39.svg",
    left: 552,
    top: 56,
    width: 354,
    rotate: 0,
    layer: 12,
    outX: 39,
    outY: -207,
    spin: -11.49,
    exitScale: 0.9,
    floatX: 7,
    floatY: 5,
    floatRotate: 1.7,
    floatDuration: 11,
    delay: -5,
  },
  {
    id: "blue-frame",
    role: "blue metal frame",
    file: "image 40.svg",
    left: 676,
    top: 527,
    width: 235,
    rotate: 56.59,
    layer: 11,
    outX: 396,
    outY: 347,
    spin: 14.7,
    exitScale: 0.92,
    floatX: -5,
    floatY: 6,
    floatRotate: -1.4,
    floatDuration: 9.1,
    delay: -1.6,
  },
  {
    id: "lower-fan-rig",
    role: "lower RGB cooling fan rig",
    file: "image 41.svg",
    left: 458,
    top: 599,
    width: 249,
    rotate: 16.8,
    layer: 14,
    outX: -580,
    outY: 264,
    spin: 49,
    exitScale: 0.88,
    floatX: 5,
    floatY: -6,
    floatRotate: 1.4,
    floatDuration: 9.9,
    delay: -3.6,
    flipY: true,
  },
];

function assetSrc(file: string) {
  return `/home/${file.replaceAll(" ", "%20")}`;
}

function settleToNearestHeroState(section: HTMLElement) {
  const start = section.getBoundingClientRect().top + window.scrollY;
  const travel = section.offsetHeight - window.innerHeight;

  if (travel <= 0) {
    return;
  }

  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / travel));

  if (progress < 0.1 || progress > 0.82) {
    return;
  }

  const settlePoints = [0, 0.3, 0.56, 0.78];
  const targetProgress = settlePoints.reduce((nearest, point) =>
    Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
  );

  if (Math.abs(targetProgress - progress) < 0.025) {
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

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const onScroll = () => {
      const bounds = section.getBoundingClientRect();
      const isActive = bounds.top <= 4 && bounds.bottom >= window.innerHeight - 4;

      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
      }

      if (!isActive) {
        return;
      }

      settleTimer.current = window.setTimeout(() => {
        settleToNearestHeroState(section);
      }, 180);
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

  const introOpacity = useTransform(progress, [0, 0.72, 0.9], [1, 0.86, 0]);
  const introScale = useTransform(progress, [0, 0.86], [1, 1.028]);
  const typeOpacity = useTransform(progress, [0, 0.5, 0.82], [0.82, 0.58, 0.03]);
  const typeY = useTransform(progress, [0, 0.82], [0, -64]);
  const foregroundOpacity = useTransform(progress, [0, 0.24, 0.52, 0.74], [1, 0.82, 0.18, 0.015]);
  const foregroundY = useTransform(progress, [0, 0.24, 0.55, 0.84], [0, -82, -360, -760]);
  const foregroundZ = useTransform(progress, [0, 0.22, 0.26], [96, 96, 6]);
  const waveOpacity = useTransform(progress, [0.66, 0.78, 0.91, 0.98], [0, 0.86, 0.96, 0]);
  const waveScale = useTransform(progress, [0.66, 0.86, 0.98], [0.08, 3.05, 4.45]);
  const veilOpacity = useTransform(progress, [0.72, 0.84, 0.94, 1], [0, 0.86, 1, 0]);
  const veilY = useTransform(progress, [0.88, 1], [0, -90]);

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

          <motion.div
            className="home-intro-copy home-intro-copy--left"
            style={{ opacity: foregroundOpacity, y: foregroundY, zIndex: foregroundZ }}
          >
            <p>ELITE AI-AGNOSTIC SERVICENOW PARTNER</p>
            <h1>
              Engineering the
              <span>Autonomous Enterprise</span>
            </h1>
          </motion.div>

          <motion.p
            className="home-intro-copy home-intro-copy--right"
            style={{ opacity: foregroundOpacity, y: foregroundY, zIndex: foregroundZ }}
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
