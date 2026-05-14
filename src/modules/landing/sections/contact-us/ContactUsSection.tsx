"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./contactUs.module.css";

const MANNEQUIN_SRC = "/ChatGPT%20Image%20May%208,%202026,%2012_21_54%20PM%201.svg";
const PHONE_SRC = "/Ringer%20Volume.svg";
const EMAIL_SRC = "/image%2010.svg";
const FOOT_SRC = "/image%203.svg";
const MAP_SRC = "/Screenshot%202026-05-12%20210119.png";
const NAV_LOGO_SRC = "/techsnitch%20logo.png";

const CONTACT_ASSETS = [
  MANNEQUIN_SRC,
  PHONE_SRC,
  EMAIL_SRC,
  FOOT_SRC,
  MAP_SRC,
  NAV_LOGO_SRC,
];
const CONTACT_ASSET_TIMEOUT_MS = 4000;

const MAP_LINK =
  "https://www.google.com/maps/place/TechSnitch+Private+Limited/@28.5825678,77.3117407,17z/data=!3m2!4b1!5s0x390ce45ec9dda3cd:0xd646b54c41dc923!4m6!3m5!1s0xb90a41971ed5f0f:0xb0c3dcdf8a2869c2!8m2!3d28.5825631!4d77.3143156!16s%2Fg%2F11vy5ncgyw?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D";

const CONTACT_INBOX = "info@techsnitch.co";

/* Gmail compose URL — pure client redirect, no backend. The `from` field
   isn't settable in Gmail compose (Gmail uses the logged-in sender), so it
   is stitched into the body so we still know who wrote in. */
function buildGmailComposeUrl(opts: { from: string; subject: string; message: string }) {
  const body = `From: ${opts.from}\n\n${opts.message}`;
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_INBOX,
    su: opts.subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/* Scroll phase boundaries (0 → 1 over the sticky scroll runway). */
const PHASE = {
  heroIn: 0,
  heroHold: 0.08,
  heroOut: 0.18,
  phoneIn: 0.22,
  phoneHold: 0.32,
  phoneOut: 0.42,
  emailIn: 0.46,
  emailHold: 0.56,
  emailOut: 0.66,
  trailIn: 0.66,
  trailMid: 0.78,
  mapIn: 0.84,
  mapHold: 0.94,
};

/* Footprint trail — natural curving descent toward bottom-right where the map
   sits. x/y are percentages of the stage; rotate is the heading. Each step
   staggers in on scroll, and older steps fade as later ones walk past. */
const FOOTPRINTS: Array<{
  x: number;
  y: number;
  rotate: number;
  enter: number;
}> = [
  { x: 12, y: 88, rotate: 18, enter: 0.66 },
  { x: 16, y: 76, rotate: 24, enter: 0.685 },
  { x: 22, y: 64, rotate: 32, enter: 0.71 },
  { x: 30, y: 54, rotate: 44, enter: 0.735 },
  { x: 39, y: 48, rotate: 60, enter: 0.76 },
  { x: 49, y: 46, rotate: 78, enter: 0.785 },
  { x: 58, y: 49, rotate: 96, enter: 0.81 },
  { x: 66, y: 55, rotate: 110, enter: 0.835 },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function preloadImageAsset(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    let settled = false;
    let timeout = 0;

    const complete = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    timeout = window.setTimeout(complete, CONTACT_ASSET_TIMEOUT_MS);

    const finish = () => {
      if (typeof image.decode !== "function") {
        complete();
        return;
      }

      image.decode().then(complete).catch(complete);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
    }
  });
}

function useContactAssetsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(CONTACT_ASSETS.map(preloadImageAsset)).then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>, enabled = true) {
  const value = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const travel = Math.max(1, node.offsetHeight - window.innerHeight);
      value.set(clamp01((window.scrollY - start) / travel));
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [enabled, ref, value]);

  return value;
}

/* Single staggered footprint with a fading trail. The outer anchor handles
   point-centering + rotation (static CSS), the inner motion.div animates only
   transforms Motion controls — no CSS-vs-Motion transform fight. */
function Footprint({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof FOOTPRINTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const stride = (PHASE.mapIn - PHASE.trailIn) / Math.max(1, total - 1);
  const enter = step.enter;
  const settled = enter + stride * 0.6;
  const fadeStart = enter + stride * 1.2;
  const fadeEnd = Math.min(0.99, enter + stride * (total - index) * 0.9);

  const opacity = useTransform(
    progress,
    [enter, settled, fadeStart, fadeEnd],
    [0, 1, 1, Math.max(0, 1 - index * 0.15)],
  );
  const y = useTransform(progress, [enter, settled], [14, 0]);
  const scale = useTransform(progress, [enter, settled], [0.82, 1]);

  return (
    <div
      className={styles.footprintAnchor}
      style={{
        left: `${step.x}%`,
        top: `${step.y}%`,
        ["--rot" as string]: `${step.rotate}deg`,
      }}
      aria-hidden
    >
      <motion.div className={styles.footprint} style={{ opacity, y, scale }}>
        <img src={FOOT_SRC} alt="" loading="lazy" />
      </motion.div>
    </div>
  );
}

/* Email compose form. State is local — Send opens Gmail compose with the
   user's input pre-filled and Reset clears the inputs. No backend, no PII
   leaves the browser unless the user actually hits Send in Gmail. */
function ContactForm() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = buildGmailComposeUrl({ from, subject, message });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleReset = () => {
    setFrom("");
    setSubject("");
    setMessage("");
  };

  return (
    <form className={styles.emailForm} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.emailFormTitle}>EMAIL US</h3>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>To</span>
        <input
          type="email"
          value={CONTACT_INBOX}
          readOnly
          className={`${styles.input} ${styles.inputReadonly}`}
          tabIndex={-1}
          aria-readonly
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>From</span>
        <input
          type="email"
          required
          value={from}
          onChange={(event) => setFrom(event.target.value)}
          placeholder="you@example.com"
          className={styles.input}
          autoComplete="email"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Subject</span>
        <input
          type="text"
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="How can we help?"
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Message</span>
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us what you need…"
          rows={4}
          className={`${styles.input} ${styles.textarea}`}
        />
      </label>

      <div className={styles.emailFormActions}>
        <button type="button" className={styles.btnGhost} onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className={styles.btnPrimary}>
          Send
        </button>
      </div>
    </form>
  );
}

interface ContactUsSectionProps {
  standalone?: boolean;
}

export function ContactUsSection({ standalone = false }: ContactUsSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const assetsReady = useContactAssetsReady();
  const raw = useScrollProgress(scrollRef, assetsReady);
  const progress = useSpring(raw, {
    stiffness: 70,
    damping: 24,
    mass: 0.55,
    restDelta: 0.0004,
  });

  /* — Mannequin pan: full-body SVG (1024×1536) is sized 200vh tall, so the
     stage shows a 100vh window into the figure. Formula: to center body
     fraction B at stage middle, Y = (0.5 − B) · 200vh.
       hero    → B≈15%   → Y≈+70vh (face + upper chest)
       phone   → B≈ 8%   → Y≈+85vh (FACE — mannequin holds phone here)
       email   → B≈63%   → Y≈−25vh (hip / upper-right thigh)
       trail   → B≈80%   → Y≈−60vh (lower legs)
       map     → B≈92%   → Y≈−85vh (feet) */
  const mannequinY = useTransform(
    progress,
    [
      0,
      PHASE.heroOut,
      PHASE.phoneIn,
      PHASE.phoneHold,
      PHASE.phoneOut,
      PHASE.emailIn,
      PHASE.emailHold,
      PHASE.emailOut,
      PHASE.trailMid,
      PHASE.mapIn,
      1,
    ],
    [
      "70vh",
      "62vh",
      "78vh",
      "85vh",
      "60vh",
      "10vh",
      "-25vh",
      "-45vh",
      "-65vh",
      "-82vh",
      "-90vh",
    ],
  );
  /* Email phase pulls the figure to the LEFT half of the stage so the
     right half can host the contact form, then the figure smoothly
     drifts back to centre as the trail/map phases take over. */
  const mannequinX = useTransform(
    progress,
    [
      0,
      PHASE.phoneHold,
      PHASE.emailIn,
      PHASE.emailHold,
      PHASE.emailOut,
      PHASE.trailIn,
      PHASE.mapIn,
      1,
    ],
    ["0vh", "0vh", "-12vh", "-26vh", "-12vh", "0vh", "5vh", "4vh"],
  );
  const mannequinScale = useTransform(
    progress,
    [0, PHASE.emailHold, 1],
    [1.04, 1.02, 1.0],
  );
  const mannequinFilter = useTransform(
    progress,
    [PHASE.mapIn, 1],
    ["blur(0px)", "blur(2px)"],
  );

  /* — Right-rail thumb scroll indicator (Figma rectangles 5/6). */
  const railThumbTop = useTransform(progress, [0, 1], ["0%", "86%"]);

  /* — Hero phase. */
  const titleOpacity = useTransform(
    progress,
    [PHASE.heroIn, PHASE.heroHold, PHASE.heroOut],
    [1, 1, 0],
  );
  const titleY = useTransform(progress, [PHASE.heroIn, PHASE.heroOut], [0, -80]);
  const cardsOpacity = useTransform(
    progress,
    [PHASE.heroIn, PHASE.heroHold, PHASE.heroOut],
    [1, 1, 0],
  );
  const cardsY = useTransform(progress, [PHASE.heroIn, PHASE.heroOut], [0, 60]);

  /* — Phone phase: red blob pops elastically, ringer SVG scales in,
       contact numbers stagger upward into place. */
  const phoneBlobScale = useTransform(
    progress,
    [
      PHASE.phoneIn,
      PHASE.phoneIn + 0.025,
      PHASE.phoneIn + 0.05,
      PHASE.phoneHold,
      PHASE.phoneOut,
    ],
    [0, 1.15, 0.95, 1, 0.96],
  );
  const phoneBlobOpacity = useTransform(
    progress,
    [PHASE.phoneIn, PHASE.phoneIn + 0.02, PHASE.phoneHold, PHASE.phoneOut],
    [0, 1, 1, 0],
  );
  const phoneIconScale = useTransform(
    progress,
    [PHASE.phoneIn + 0.04, PHASE.phoneIn + 0.07, PHASE.phoneHold],
    [0.6, 1.08, 1],
  );
  const phoneIconOpacity = useTransform(
    progress,
    [PHASE.phoneIn + 0.04, PHASE.phoneIn + 0.07, PHASE.phoneHold, PHASE.phoneOut],
    [0, 1, 1, 0],
  );
  const callBlockOpacity = useTransform(
    progress,
    [PHASE.phoneIn + 0.06, PHASE.phoneHold - 0.02, PHASE.phoneOut],
    [0, 1, 0],
  );
  const callBlockPointerEvents = useTransform(
    progress,
    [0, PHASE.phoneIn + 0.06, PHASE.phoneHold, PHASE.phoneOut],
    ["none", "auto", "auto", "none"],
  );
  /* `top: 50%` on the call/email/map elements is centered via Motion's `y`
     using calc() so the element's own −50% offset rides along with the
     animated entry distance. */
  const callBlockY = useTransform(
    progress,
    [PHASE.phoneIn + 0.06, PHASE.phoneHold],
    ["calc(-50% + 40px)", "-50%"],
  );

  /* — Email phase. */
  const emailBlobScale = useTransform(
    progress,
    [
      PHASE.emailIn,
      PHASE.emailIn + 0.025,
      PHASE.emailIn + 0.05,
      PHASE.emailHold,
      PHASE.emailOut,
    ],
    [0, 1.15, 0.95, 1, 0.96],
  );
  const emailBlobOpacity = useTransform(
    progress,
    [PHASE.emailIn, PHASE.emailIn + 0.02, PHASE.emailHold, PHASE.emailOut],
    [0, 1, 1, 0],
  );
  const emailIconScale = useTransform(
    progress,
    [PHASE.emailIn + 0.04, PHASE.emailIn + 0.07, PHASE.emailHold],
    [0.6, 1.08, 1],
  );
  const emailIconOpacity = useTransform(
    progress,
    [PHASE.emailIn + 0.04, PHASE.emailIn + 0.07, PHASE.emailHold, PHASE.emailOut],
    [0, 1, 1, 0],
  );
  const emailBlockOpacity = useTransform(
    progress,
    [PHASE.emailIn + 0.06, PHASE.emailHold - 0.02, PHASE.emailOut],
    [0, 1, 0],
  );
  const emailBlockPointerEvents = useTransform(
    progress,
    [0, PHASE.emailIn + 0.06, PHASE.emailHold, PHASE.emailOut],
    ["none", "auto", "auto", "none"],
  );
  const emailBlockY = useTransform(
    progress,
    [PHASE.emailIn + 0.06, PHASE.emailHold],
    ["calc(-50% + 40px)", "-50%"],
  );

  /* — Follow / Reach labels. */
  const followOpacity = useTransform(
    progress,
    [PHASE.trailIn - 0.02, PHASE.trailIn + 0.04, PHASE.mapHold],
    [0, 1, 1],
  );
  const followY = useTransform(
    progress,
    [PHASE.trailIn - 0.02, PHASE.trailIn + 0.04],
    [30, 0],
  );
  const reachOpacity = useTransform(
    progress,
    [PHASE.trailMid, PHASE.trailMid + 0.04, PHASE.mapHold],
    [0, 1, 1],
  );
  const reachY = useTransform(
    progress,
    [PHASE.trailMid, PHASE.trailMid + 0.04],
    [30, 0],
  );

  /* — Map card. */
  const mapOpacity = useTransform(
    progress,
    [PHASE.mapIn - 0.04, PHASE.mapIn + 0.04, 1],
    [0, 1, 1],
  );
  const mapScale = useTransform(
    progress,
    [PHASE.mapIn - 0.04, PHASE.mapIn + 0.06],
    [0.92, 1],
  );
  const mapY = useTransform(
    progress,
    [PHASE.mapIn - 0.04, PHASE.mapIn + 0.06],
    ["calc(-50% + 40px)", "-50%"],
  );
  const mapPointerEvents = useTransform(
    progress,
    [0, PHASE.mapIn, PHASE.mapIn + 0.04, 1],
    ["none", "none", "auto", "auto"],
  );

  if (!assetsReady) {
    return (
      <section
        className={`${styles.section} ${styles.assetGate} ${standalone ? `${styles.standalone} contact-cinematic-experience` : ""}`}
        aria-label="Loading contact page"
      >
        <div className={styles.assetGateInner} aria-live="polite">
          <span className={styles.assetGatePulse} aria-hidden />
          <span className={styles.srOnly}>Loading contact page assets</span>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${styles.section} ${standalone ? `${styles.standalone} contact-cinematic-experience` : ""}`}
      aria-label="Contact Techsnitch"
    >
      <div ref={scrollRef} className={styles.scroll}>
        <div className={styles.stage}>
          {/* MANNEQUIN — full body, panned across the stage by scroll. */}
          <div className={styles.mannequinFrame} aria-hidden>
            <motion.div
              className={styles.mannequin}
              style={{
                x: mannequinX,
                y: mannequinY,
                scale: mannequinScale,
                filter: mannequinFilter,
              }}
            >
              <img src={MANNEQUIN_SRC} alt="" />
            </motion.div>
          </div>

          {/* RAIL — right-side scroll indicator (Figma D1+). */}
          <div className={styles.rail} aria-hidden>
            <motion.div className={styles.railThumb} style={{ top: railThumbTop }} />
          </div>

          {/* HERO — title + glass cards. */}
          <motion.div className={styles.heroLayer} style={{ opacity: titleOpacity }}>
            <motion.h2 className={styles.title} style={{ y: titleY }}>
              CONTACT US
            </motion.h2>
          </motion.div>

          <motion.div
            className={styles.glassRow}
            style={{ opacity: cardsOpacity, y: cardsY }}
          >
            <div className={styles.glassCard}>
              We have world-class, flexible support via email and phone.
            </div>
            <div className={styles.glassCard}>
              We guarantee that you&rsquo;ll be able to have any issue resolved within 24 hours.
            </div>
          </motion.div>

          {/* PHONE — red blob, ringer SVG, contact numbers. Centered in CSS
              via inset+margin:auto. Phone phase pans the mannequin up so the
              face sits at stage centre, so the blob lives near the face,
              slightly upper-right of dead-centre. */}
          <motion.div
            className={`${styles.iconBlob} ${styles.phoneIconBlob}`}
            style={{
              x: "2vh",
              y: "-2vh",
              scale: phoneBlobScale,
              opacity: phoneBlobOpacity,
            }}
            aria-hidden
          />
          <motion.div
            className={`${styles.iconArt} ${styles.phoneIconArt}`}
            style={{
              x: "2vh",
              y: "-2vh",
              scale: phoneIconScale,
              opacity: phoneIconOpacity,
            }}
            aria-hidden
          >
            <img src={PHONE_SRC} alt="" />
          </motion.div>

          <motion.div
            className={styles.callBlock}
            style={{ opacity: callBlockOpacity, y: callBlockY, pointerEvents: callBlockPointerEvents }}
          >
            <h3>CALL US</h3>
            <a href="tel:+919310266326">+91 9310266326</a>
            <a href="tel:+918766207465">+91 8766207465</a>
            <a href="tel:+15055001244">+1 5055001244</a>
          </motion.div>

          {/* EMAIL — Email phase centres the mannequin's hip / right-side
              body at the stage middle. Blob/icon hover slightly left+below
              centre, sitting against the right thigh. */}
          <motion.div
            className={`${styles.iconBlob} ${styles.emailIconBlob}`}
            style={{
              x: "-22vh",
              y: "4vh",
              scale: emailBlobScale,
              opacity: emailBlobOpacity,
            }}
            aria-hidden
          />
          <motion.div
            className={`${styles.iconArt} ${styles.emailIconArt}`}
            style={{
              x: "-22vh",
              y: "4vh",
              scale: emailIconScale,
              opacity: emailIconOpacity,
            }}
            aria-hidden
          >
            <img src={EMAIL_SRC} alt="" />
          </motion.div>

          <motion.div
            className={styles.emailFormWrap}
            style={{ opacity: emailBlockOpacity, y: emailBlockY, pointerEvents: emailBlockPointerEvents }}
          >
            <ContactForm />
          </motion.div>

          {/* FOOTPRINT TRAIL — guides toward the map. */}
          <div className={styles.footprintLayer} aria-hidden>
            {FOOTPRINTS.map((step, index) => (
              <Footprint
                key={index}
                step={step}
                index={index}
                total={FOOTPRINTS.length}
                progress={progress}
              />
            ))}
          </div>

          {/* FOLLOW / REACH labels. */}
          <motion.div
            className={styles.followLabel}
            style={{ opacity: followOpacity, y: followY }}
          >
            Follow us on
          </motion.div>
          <motion.div
            className={styles.reachLabel}
            style={{ opacity: reachOpacity, y: reachY }}
          >
            Reach us
          </motion.div>

          {/* MAP — clickable, fades + scales in late. */}
          <motion.a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapCard}
            style={{ opacity: mapOpacity, scale: mapScale, y: mapY, pointerEvents: mapPointerEvents }}
            aria-label="Open Techsnitch on Google Maps"
          >
            <img src={MAP_SRC} alt="Techsnitch Private Limited on the map" />
          </motion.a>

          <div className={styles.groundShadow} aria-hidden />
        </div>
      </div>

      {/* CINEMATIC ENDING. */}
      <div className={styles.endBlock}>
        <h2 className={styles.endText}>THE END</h2>
      </div>
    </section>
  );
}
