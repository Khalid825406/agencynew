"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ScrollExpandProps {
  src: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  /** Present for API-compatibility with the reference — this implementation
   * always tracks the page's own scroll (there's no separate local-scroll
   * container mode). */
  useWindowScroll?: boolean;
  mediaZoom?: number;
  /** Starting frame size, as a percentage of the stage. */
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  /** How much scroll (in viewport-heights) drives the expand. */
  scrollDistance?: number;
  /** Extra scroll (in viewport-heights) the fully-expanded frame holds for
   * before releasing, so the reveal doesn't fly straight past. */
  holdDistance?: number;
  overlayScrim?: number;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export default function ScrollExpand({
  src,
  alt = "",
  title,
  scrollHint,
  mediaZoom = 1,
  startWidth = 60,
  startHeight = 60,
  startRadius = 24,
  endRadius = 0,
  scrollDistance = 1,
  holdDistance = 0.3,
  overlayScrim = 0.4,
  enabled = true,
  children,
  className = "",
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The frame finishes growing partway through the tracked range — the
  // remaining fraction (holdDistance) is scroll the user spends with it
  // already fully expanded, before the section releases.
  const growEnd = clamp01(scrollDistance / (scrollDistance + holdDistance));

  const width = useTransform(scrollYProgress, [0, growEnd], [`${startWidth}%`, "100%"]);
  const height = useTransform(scrollYProgress, [0, growEnd], [`${startHeight}%`, "100%"]);
  const radius = useTransform(scrollYProgress, [0, growEnd], [startRadius, endRadius]);
  const mediaScale = useTransform(scrollYProgress, [0, growEnd], [mediaZoom, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [growEnd * 0.75, Math.min(growEnd * 0.75 + 0.1, 1)],
    [0, 1]
  );

  if (!enabled) return null;

  const isVideo = /\.(mp4|webm|mov)$/i.test(src);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${(scrollDistance + holdDistance) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0A0E14]">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative overflow-hidden"
        >
          <motion.div style={{ scale: mediaScale }} className="absolute inset-0 h-full w-full">
            {isVideo ? (
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary caller-supplied media, not a static site asset next/image can optimise ahead of time.
              <img src={src} alt={alt} className="h-full w-full object-cover" />
            )}
          </motion.div>

          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayScrim }}
            aria-hidden="true"
          />

          {title && (
            <motion.span
              style={{ opacity: hintOpacity }}
              className="absolute left-6 top-6 text-xs uppercase tracking-[0.25em] text-white/70 sm:left-8 sm:top-8"
            >
              {title}
            </motion.span>
          )}

          {scrollHint && (
            <motion.span
              style={{ opacity: hintOpacity }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/50"
            >
              {scrollHint}
            </motion.span>
          )}

          {children && (
            <motion.div
              style={{ opacity: contentOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
