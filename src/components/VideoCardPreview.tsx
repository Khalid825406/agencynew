"use client";

import { motion, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import type { PointerEvent } from "react";

const SPRING = { mass: 0.1 };

// Autoplaying, muted, looping video background with a small "Play" label
// that follows the cursor — used for video-editing project cards, on top
// of which the caller layers its own category/name/result overlay.
export default function VideoCardPreview({ src }: { src: string }) {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => opacity.set(0)}
      className="absolute inset-0"
    >
      <motion.div
        style={{ x, y, opacity }}
        className="pointer-events-none absolute left-0 top-0 z-20 flex w-fit select-none items-center justify-center gap-2 whitespace-nowrap p-2 text-sm text-white mix-blend-exclusion"
      >
        <Play className="size-4 fill-white" /> Play
      </motion.div>
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={src} />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
    </div>
  );
}
