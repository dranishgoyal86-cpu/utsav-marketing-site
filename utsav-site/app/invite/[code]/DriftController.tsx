"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./invite.module.css";

// Stops the ambient Drift petal loop after ~20s or once the guest scrolls
// past the cover, whichever comes first — per the reference spec's battery
// note (continuous animation on a low-end Android phone on 3G is exactly
// the case this product needs to work well on). Toggles .driftPaused on a
// wrapper, which pauses (not removes) the CSS animation via
// animation-play-state, so it isn't restarted awkwardly if this remounts.
export default function DriftController({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPaused(true), 20000);

    const el = ref.current;
    let observer: IntersectionObserver | null = null;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) setPaused(true);
        },
        { threshold: 0 }
      );
      observer.observe(el);
    }

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={paused ? styles.driftPaused : undefined}>
      {children}
    </div>
  );
}
