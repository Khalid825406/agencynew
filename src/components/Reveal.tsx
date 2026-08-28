"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  // Server has no access to prefers-reduced-motion, so it always renders the
  // animated version. Defaulting to the same thing on the client's first
  // render (before this effect runs) keeps hydration consistent — the swap
  // to a plain static div only happens after mount, which React treats as a
  // normal post-hydration update rather than a mismatch. (`initial` can't be
  // changed after mount anyway, so branching the prop instead of the whole
  // element — as this used to — was never going to work safely.)
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Feature detection is only available post-mount; this one-time read
    // can't be derived during render without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
