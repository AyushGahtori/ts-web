"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HomeAssetGateProps {
  children: ReactNode;
  assetSources: string[];
}

const PRELOAD_TIMEOUT_MS = 900;
const PREPAINT_TIMEOUT_MS = 700;

let homeAssetsKey: string | null = null;
let homeAssetsPromise: Promise<void> | null = null;

function withTimeout(promise: Promise<void>, timeoutMs: number) {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    }),
  ]);
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve();
        return;
      }

      image.decode().then(resolve, resolve);
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

function waitForImageElement(image: HTMLImageElement) {
  return new Promise<void>((resolve) => {
    const finish = () => {
      if (typeof image.decode !== "function") {
        resolve();
        return;
      }

      image.decode().then(resolve, resolve);
    };

    if (image.complete && image.naturalWidth > 0) {
      finish();
      return;
    }

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function preloadHomeAssets(assetSources: string[]) {
  const nextKey = assetSources.join("\n");

  if (homeAssetsPromise === null || homeAssetsKey !== nextKey) {
    homeAssetsKey = nextKey;
    homeAssetsPromise = Promise.all(assetSources.map(preloadImage)).then(() => undefined);
  }

  return homeAssetsPromise;
}

export function HomeAssetGate({ assetSources, children }: HomeAssetGateProps) {
  const assetSourcesKey = assetSources.join("\n");
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [preloadedKey, setPreloadedKey] = useState<string | null>(null);
  const [paintedKey, setPaintedKey] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    withTimeout(preloadHomeAssets(assetSources), PRELOAD_TIMEOUT_MS).then(() => {
      if (isMounted) {
        setPreloadedKey(assetSourcesKey);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [assetSources, assetSourcesKey]);

  useEffect(() => {
    if (preloadedKey !== assetSourcesKey) {
      return undefined;
    }

    let isMounted = true;

    const waitForHeroPaint = async () => {
      const stage = stageRef.current;
      const heroImages = Array.from(stage?.querySelectorAll<HTMLImageElement>(".cinematic-object__media") ?? []);

      await withTimeout(Promise.all(heroImages.map(waitForImageElement)).then(() => undefined), PREPAINT_TIMEOUT_MS);
      await waitForNextPaint();

      if (isMounted) {
        setPaintedKey(assetSourcesKey);
      }
    };

    void waitForHeroPaint();

    return () => {
      isMounted = false;
    };
  }, [assetSourcesKey, preloadedKey]);

  if (paintedKey !== assetSourcesKey) {
    if (preloadedKey === assetSourcesKey) {
      return (
        <>
          <div ref={stageRef} className="home-asset-prepaint" aria-hidden>
            {children}
          </div>
          <div className="home-asset-gate" aria-hidden />
        </>
      );
    }

    return <div className="home-asset-gate" aria-hidden />;
  }

  return children;
}
