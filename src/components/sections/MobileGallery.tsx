"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const ITEMS = [
  { url: "/web.avif", caption: "Web development", desc: "Fast, framework-grade sites and web apps." },
  { url: "/appp.avif", caption: "App development", desc: "Native-feeling iOS and Android builds." },
  { url: "/digital.avif", caption: "Digital marketing", desc: "Campaigns across search, social and paid." },
  { url: "/seoo.avif", caption: "SEO services", desc: "Technical and content SEO that moves rankings." },
  { url: "/video.avif", caption: "Video editing", desc: "Motion design and edits that stop the scroll." },
];

const AUTOPLAY_MS = 3500;

export default function MobileGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((prev) => {
        const next = (prev + 1) % ITEMS.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  // Sync active dot with manual scroll, and pause autoplay briefly on touch
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let resumeTimer: ReturnType<typeof setTimeout>;
    const onTouchStart = () => {
      pausedRef.current = true;
      clearTimeout(resumeTimer);
    };
    const onScrollEnd = () => {
      const { scrollLeft, offsetLeft } = track;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft - offsetLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
      resumeTimer = setTimeout(() => {
        pausedRef.current = false;
      }, 4000);
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("scrollend", onScrollEnd);
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("scrollend", onScrollEnd);
      clearTimeout(resumeTimer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-16 text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-bright/10 blur-[100px]" />

      <div className="relative px-6">
        <Reveal>
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" />
            What we build
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight">
            Five disciplines, <span className="text-gradient-blue">one team.</span>
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-hide relative mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {ITEMS.map((item, i) => (
          <div key={item.url} className="w-[80vw] shrink-0 snap-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs text-white/80 backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Image
                src={item.url}
                alt={item.caption}
                fill
                sizes="80vw"
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
                <p className="font-display text-xl font-medium">{item.caption}</p>
                <p className="mt-1.5 text-xs font-light leading-relaxed text-white/60">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {ITEMS.map((item, i) => (
          <button
            key={item.url}
            type="button"
            aria-label={`Go to ${item.caption}`}
            onClick={() => {
              pausedRef.current = true;
              setActive(i);
              scrollToIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-blue-bright" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
