"use client";

import { useEffect, useState } from "react";
import ScrollExpand from "@/components/ScrollExpand";

const VIDEO_SRC = "/video.mp4";

function StaticReel() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-28 text-white sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gray-soft">
          Our work in motion
        </span>
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          See how we <span className="text-gradient-blue">build</span>
        </h2>

        <div className="relative mt-14 aspect-video w-full overflow-hidden rounded-3xl border border-white/10">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={VIDEO_SRC} />
          </video>
        </div>
      </div>
    </section>
  );
}

export default function VideoReel() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return <StaticReel />;

  return (
    <ScrollExpand
      src={VIDEO_SRC}
      useWindowScroll
      mediaZoom={1.25}
      startWidth={46}
      startHeight={56}
      startRadius={28}
      endRadius={0}
      scrollDistance={1.2}
      holdDistance={0.35}
      overlayScrim={0.35}
      enabled
    />
  );
}
