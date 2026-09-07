"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ClaySphereGallery = dynamic(() => import("@/components/sections/ClaySphereGallery"), {
  ssr: false,
  loading: () => <div className="h-[100vh] w-full bg-[#0A0E14]" />,
});
const MobileGallery = dynamic(() => import("@/components/sections/MobileGallery"), {
  ssr: false,
  loading: () => <div className="h-[60vh] w-full bg-[#0A0E14]" />,
});

// Server has no access to viewport width, so `isMobile` starts as `null`
// (unknown) and nothing heavy renders until the client tells us which
// layout to load — avoids ever mounting the expensive desktop sphere
// gallery on a phone just to tear it down again a tick later.
export default function ResponsiveGallery() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (isMobile === null) return <div className="h-[60vh] w-full bg-[#0A0E14]" />;

  return isMobile ? <MobileGallery /> : <ClaySphereGallery />;
}
