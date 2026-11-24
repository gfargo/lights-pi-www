"use client";

import { useEffect, useRef } from "react";

/**
 * The real rig changing scenes: a muted loop with a poster frame. With
 * reduced motion the poster stays and the clip never plays.
 */
export function RigVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src="/video/rig-scenes.mp4"
      poster="/video/rig-scenes-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Three fixtures on a ceiling truss changing colour as scenes are recalled from Lights Pi."
    />
  );
}
