"use client";

import { useEffect, useRef } from "react";
import styles from "./career.module.css";

const FORWARD_VIDEO_SRC = "/animate_this_202605040051.mp4";
const REVERSE_VIDEO_SRC = "/animate_this_202605040051_reverse.mp4";
const POSTER_SRC = "/3d%20sculptors.png";
const ACTIVATION_RANGE_RATIO = 0.1;
const MIN_ACTIVATION_RANGE = 90;
const MAX_ACTIVATION_RANGE = 150;
const RESUME_DELAY_MS = 300;
const PAUSE_AFTER_INPUT_MS = 500;
const FAST_INPUT_SPEED = 420;
const FAST_INPUT_DELTA = 24;
const EDGE_TIME = 0.05;

type Direction = -1 | 1;

export function CareerIllustration() {
  const shellRef = useRef<HTMLDivElement>(null);
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const forwardVideo = forwardVideoRef.current;
    const reverseVideo = reverseVideoRef.current;

    if (!shell || !forwardVideo || !reverseVideo) {
      return;
    }

    const canRestoreScroll = "scrollRestoration" in window.history;
    const previousScrollRestoration = canRestoreScroll
      ? window.history.scrollRestoration
      : "auto";
    const navigation = window.performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    let desiredDirection: Direction = 1;
    let visibleDirection: Direction = 1;
    let playbackRate = 1;
    let isLoaded = false;
    let isActive = false;
    let isMoving = false;
    let isResettingInitialScroll = navigation?.type === "reload";
    let lastInputAt = 0;
    let smoothedSpeed = 0;
    let touchY: number | null = null;
    let pauseTimer: number | undefined;
    let resumeTimer: number | undefined;

    const resetWindowScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    if (canRestoreScroll) {
      window.history.scrollRestoration = "manual";
    }

    if (isResettingInitialScroll) {
      resetWindowScroll();
      window.requestAnimationFrame(() => {
        resetWindowScroll();
        isResettingInitialScroll = false;
      });
    }

    const getActivationTarget = () => shell.parentElement ?? shell;

    const loadVideos = () => {
      if (isLoaded) {
        return;
      }

      forwardVideo.src = FORWARD_VIDEO_SRC;
      reverseVideo.src = REVERSE_VIDEO_SRC;
      forwardVideo.load();
      reverseVideo.load();
      isLoaded = true;
    };

    const getDuration = () => {
      if (Number.isFinite(forwardVideo.duration) && forwardVideo.duration > 0) {
        return forwardVideo.duration;
      }

      if (Number.isFinite(reverseVideo.duration) && reverseVideo.duration > 0) {
        return reverseVideo.duration;
      }

      return 0;
    };

    const hasDuration = () => getDuration() > 0;

    const getForwardTime = () => {
      const duration = getDuration();

      if (visibleDirection === -1 && duration > 0) {
        return Math.max(duration - reverseVideo.currentTime, 0);
      }

      return forwardVideo.currentTime;
    };

    const setForwardTime = (time: number) => {
      const duration = getDuration();
      const nextTime = duration > 0 ? Math.min(Math.max(time, 0), duration) : 0;

      if (Number.isFinite(forwardVideo.duration) && forwardVideo.duration > 0) {
        forwardVideo.currentTime = nextTime;
      }

      if (Number.isFinite(reverseVideo.duration) && reverseVideo.duration > 0) {
        reverseVideo.currentTime = Math.max(duration - nextTime, 0);
      }
    };

    const showDirection = (nextDirection: Direction) => {
      if (visibleDirection === nextDirection) {
        return;
      }

      const currentTime = getForwardTime();
      forwardVideo.pause();
      reverseVideo.pause();
      visibleDirection = nextDirection;
      setForwardTime(currentTime);
      shell.dataset.videoDirection = nextDirection === 1 ? "forward" : "reverse";
    };

    const resetInput = () => {
      lastInputAt = 0;
      smoothedSpeed = 0;
    };

    const resetVideoToStart = () => {
      visibleDirection = 1;
      shell.dataset.videoDirection = "forward";
      setForwardTime(0);
      resetInput();
    };

    const isCenteredEnough = () => {
      const target = getActivationTarget();
      const rect = target.getBoundingClientRect();
      const targetCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const activationRange = Math.min(
        MAX_ACTIVATION_RANGE,
        Math.max(
          MIN_ACTIVATION_RANGE,
          window.innerHeight * ACTIVATION_RANGE_RATIO,
        ),
      );

      return Math.abs(targetCenter - viewportCenter) <= activationRange;
    };

    const clearResumeTimer = () => {
      if (resumeTimer !== undefined) {
        window.clearTimeout(resumeTimer);
        resumeTimer = undefined;
      }
    };

    const clearPauseTimer = () => {
      if (pauseTimer !== undefined) {
        window.clearTimeout(pauseTimer);
        pauseTimer = undefined;
      }
    };

    const pauseMotion = () => {
      clearResumeTimer();
      clearPauseTimer();
      isMoving = false;
      touchY = null;
      forwardVideo.pause();
      reverseVideo.pause();
    };

    const releaseLock = () => {
      isActive = false;
      pauseMotion();
      resetInput();
    };

    const releaseAtEnd = () => {
      const duration = getDuration();

      if (duration > 0) {
        setForwardTime(duration);
      }

      releaseLock();
    };

    const releaseAtStart = () => {
      setForwardTime(0);
      releaseLock();
    };

    const isAtBlockedEdge = (scrollDelta: number) => {
      const duration = getDuration();
      const currentTime = getForwardTime();

      if (scrollDelta < 0 && currentTime <= EDGE_TIME) {
        return true;
      }

      return duration > 0 && scrollDelta > 0 && currentTime >= duration - EDGE_TIME;
    };

    const playInDirection = () => {
      if (!isActive || !hasDuration()) {
        return;
      }

      isMoving = true;

      if (desiredDirection === 1) {
        showDirection(1);
        forwardVideo.playbackRate = playbackRate;
        reverseVideo.pause();
        void forwardVideo.play().catch(() => {
          forwardVideo.pause();
        });
        return;
      }

      showDirection(-1);
      reverseVideo.playbackRate = playbackRate;
      forwardVideo.pause();
      void reverseVideo.play().catch(() => {
        reverseVideo.pause();
      });
    };

    const lockToVideo = (scrollDelta: number) => {
      if (isResettingInitialScroll || isActive || !isCenteredEnough()) {
        return false;
      }

      if (isAtBlockedEdge(scrollDelta)) {
        return false;
      }

      isActive = true;
      loadVideos();
      forwardVideo.pause();
      reverseVideo.pause();
      return true;
    };

    const getPlaybackRate = (scrollDelta: number) => {
      const now = window.performance.now();
      const elapsed = lastInputAt > 0 ? Math.max(now - lastInputAt, 16) : 120;
      const speed = (Math.abs(scrollDelta) / elapsed) * 1000;
      lastInputAt = now;
      smoothedSpeed = smoothedSpeed * 0.55 + speed * 0.45;

      return speed > FAST_INPUT_SPEED ||
        smoothedSpeed > FAST_INPUT_SPEED ||
        Math.abs(scrollDelta) > FAST_INPUT_DELTA
        ? 2
        : 1;
    };

    const schedulePause = () => {
      clearPauseTimer();
      pauseTimer = window.setTimeout(pauseMotion, PAUSE_AFTER_INPUT_MS);
    };

    const schedulePlayback = () => {
      if (isMoving) {
        playInDirection();
        schedulePause();
        return;
      }

      if (resumeTimer === undefined) {
        resumeTimer = window.setTimeout(() => {
          resumeTimer = undefined;
          playInDirection();
        }, RESUME_DELAY_MS);
      }

      schedulePause();
    };

    const handleScrollIntent = (scrollDelta: number) => {
      if (isActive && isAtBlockedEdge(scrollDelta)) {
        if (scrollDelta < 0) {
          releaseAtStart();
        } else {
          releaseAtEnd();
        }

        return false;
      }

      lockToVideo(scrollDelta);

      if (!isActive) {
        return false;
      }

      loadVideos();
      desiredDirection = scrollDelta >= 0 ? 1 : -1;
      playbackRate = getPlaybackRate(scrollDelta);
      schedulePlayback();

      return true;
    };

    const normalizeWheelDelta = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return event.deltaY * 16;
      }

      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * window.innerHeight;
      }

      return event.deltaY;
    };

    const onLoadedMetadata = () => {
      if (forwardVideo.readyState > 0 && reverseVideo.readyState > 0) {
        resetVideoToStart();

        if (isActive && pauseTimer !== undefined) {
          playInDirection();
        }
      }
    };

    const onForwardEnded = () => {
      releaseAtEnd();
    };

    const onReverseEnded = () => {
      releaseAtStart();
    };

    const onBeforeUnload = () => {
      resetVideoToStart();
      resetWindowScroll();
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted && navigation?.type !== "reload") {
        return;
      }

      isResettingInitialScroll = true;
      resetVideoToStart();
      resetWindowScroll();
      window.requestAnimationFrame(() => {
        resetWindowScroll();
        isResettingInitialScroll = false;
      });
    };

    const onWheel = (event: WheelEvent) => {
      const didHandle = handleScrollIntent(normalizeWheelDelta(event));

      if (didHandle) {
        event.preventDefault();
      }
    };

    const onScroll = () => {
      if (isActive && !isCenteredEnough()) {
        releaseLock();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null) {
        return;
      }

      const nextY = event.touches[0]?.clientY ?? touchY;
      const didHandle = handleScrollIntent(touchY - nextY);
      touchY = nextY;

      if (didHandle) {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keyScrollDelta: Record<string, number> = {
        ArrowDown: 120,
        PageDown: 360,
        Space: 360,
        ArrowUp: -120,
        PageUp: -360,
      };
      const delta = keyScrollDelta[event.code];

      if (delta === undefined) {
        return;
      }

      const didHandle = handleScrollIntent(delta);

      if (didHandle) {
        event.preventDefault();
      }
    };

    const lazyLoader = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadVideos();
          lazyLoader.disconnect();
        }
      },
      { rootMargin: "420px 0px", threshold: 0.01 },
    );

    shell.dataset.videoDirection = "forward";
    lazyLoader.observe(shell);
    forwardVideo.addEventListener("loadedmetadata", onLoadedMetadata);
    reverseVideo.addEventListener("loadedmetadata", onLoadedMetadata);
    forwardVideo.addEventListener("ended", onForwardEnded);
    reverseVideo.addEventListener("ended", onReverseEnded);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lazyLoader.disconnect();
      releaseLock();
      forwardVideo.removeEventListener("loadedmetadata", onLoadedMetadata);
      reverseVideo.removeEventListener("loadedmetadata", onLoadedMetadata);
      forwardVideo.removeEventListener("ended", onForwardEnded);
      reverseVideo.removeEventListener("ended", onReverseEnded);

      if (canRestoreScroll) {
        window.history.scrollRestoration = previousScrollRestoration;
      }

      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={styles.illustrationShell} ref={shellRef}>
      <div className={styles.illustrationInner}>
        <video
          ref={forwardVideoRef}
          className={`${styles.illustrationVideo} ${styles.forwardVideo}`}
          poster={POSTER_SRC}
          preload="none"
          muted
          playsInline
          aria-label="Team collaborating across desks and dashboards"
        />
        <video
          ref={reverseVideoRef}
          className={`${styles.illustrationVideo} ${styles.reverseVideo}`}
          poster={POSTER_SRC}
          preload="none"
          muted
          playsInline
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
