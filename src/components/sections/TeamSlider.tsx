"use client";

import { useRef } from "react";
import Image from "next/image";
import { TEAM } from "@/lib/data";
import Reveal from "@/components/Reveal";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function TeamSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const gap = 24;
    const distance = (card?.offsetWidth ?? 280) + gap;
    track.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0A0E14] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0A0E14] to-transparent sm:w-20" />

      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {TEAM.map((member, i) => (
          <Reveal
            key={member.name}
            delay={i * 0.06}
            className="group w-[240px] shrink-0 snap-start sm:w-[280px]"
          >
            <div
              data-card
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 60vw"
                  className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-medium">{member.name}</p>
                <span className="mt-2 inline-block rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/60">
                  {member.role}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous team member"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next team member"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
