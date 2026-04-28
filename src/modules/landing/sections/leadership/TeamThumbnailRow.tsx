"use client";

import { useEffect, useState } from "react";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { centerTeamFrame, sideTeamFrames, type TeamFrame } from "@/modules/landing/sections/leadership/leadershipData";
import styles from "./leadership.module.css";

function shuffleFrames(frames: TeamFrame[]) {
  const copy = [...frames];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function TeamThumbnailRow() {
  const [frames, setFrames] = useState<TeamFrame[]>(sideTeamFrames);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFrames(shuffleFrames(sideTeamFrames));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const leftFrames = frames.slice(0, 3);
  const rightFrames = frames.slice(3);

  return (
    <div className={styles.thumbSection}>
      <div className={styles.thumbRail}>
        {leftFrames.map((frame) => (
          <PhotoFrame
            key={frame.id}
            emphasis="side"
            label={frame.label}
            className={frame.size === "medium" ? styles.thumbMedium : styles.thumbSmall}
          />
        ))}

        <PhotoFrame emphasis="center" label={centerTeamFrame.label} className={styles.thumbCenter} />

        {rightFrames.map((frame) => (
          <PhotoFrame
            key={frame.id}
            emphasis="side"
            label={frame.label}
            className={frame.size === "medium" ? styles.thumbMedium : styles.thumbSmall}
          />
        ))}
      </div>

      <div className={styles.thumbControls} aria-hidden>
        <button className={styles.miniArrow}>‹</button>
        <div className={styles.miniTrack}>
          <span className={styles.miniTrackFill} />
        </div>
        <button className={styles.miniArrow}>›</button>
      </div>
    </div>
  );
}
