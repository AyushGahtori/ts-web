"use client";

import { useEffect, useState, type ReactNode } from "react";

interface HomeAssetGateProps {
  children: ReactNode;
  assetSources: string[];
}

let homeAssetsKey: string | null = null;
let homeAssetsPromise: Promise<void> | null = null;

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

function preloadHomeAssets(assetSources: string[]) {
  const nextKey = assetSources.join("\n");

  if (homeAssetsPromise === null || homeAssetsKey !== nextKey) {
    homeAssetsKey = nextKey;
    homeAssetsPromise = Promise.all(assetSources.map(preloadImage)).then(() => undefined);
  }

  return homeAssetsPromise;
}

export function HomeAssetGate({ assetSources, children }: HomeAssetGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    preloadHomeAssets(assetSources).then(() => {
      if (isMounted) {
        setReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [assetSources]);

  if (!ready) {
    return <div className="home-asset-gate" aria-hidden />;
  }

  return children;
}
