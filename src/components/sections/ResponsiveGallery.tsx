"use client";

import { useEffect, useState } from "react";
import ClaySphereGallery from "@/components/sections/ClaySphereGallery";
import MobileDriftGallery from "@/components/sections/MobileDriftGallery";

// Server has no access to viewport width, so it always renders the desktop
// sphere gallery. Defaulting to the same thing on the client's first render
// (before this effect runs) keeps hydration consistent — the swap to the
// mobile drift gallery only happens after mount, which React treats as a
// normal post-hydration update rather than a mismatch (same pattern as the
// prefers-reduced-motion swaps already used in Journey.tsx / KineticText.tsx).
export default function ResponsiveGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile ? <MobileDriftGallery /> : <ClaySphereGallery />;
}
