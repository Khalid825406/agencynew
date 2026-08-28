"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import VideoCardPreview from "@/components/VideoCardPreview";
import VideoPopOver from "@/components/VideoPopOver";

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  // Mouse-drag-to-scroll state. Touch/trackpad/mouse-wheel input is left
  // entirely to the browser's own native scrolling; this only adds an
  // extra, purely opt-in way for mouse users to browse the cards. Normal
  // wheel scrolling over this section always scrolls the page, never the
  // cards, so it can never feel like the page "got stuck" here.
  const dragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    // Deliberately not using setPointerCapture here; capturing the
    // pointer on the track retargets the browser's derived "click" event
    // to the track itself, so a plain click on a card (no drag at all)
    // never reaches the card's onClick. onPointerLeave below is the
    // fallback that ends the drag if the cursor exits the track quickly.
    dragging.current = true;
    dragMoved.current = false;
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) dragMoved.current = true;
    trackRef.current.scrollLeft = dragStartScroll.current - dx;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const active = PROJECTS.find((p) => p.id === activeId);
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="work" className="relative overflow-hidden bg-[#0A0E14] py-20 sm:py-28">
      <div className="noise-overlay opacity-[0.04]" />

      <div className="mb-10 flex items-end justify-between gap-6 px-6 sm:px-10">
        <Reveal>
          <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gray-soft">
            Selected work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-white">
            Case studies that <span className="text-gradient-chrome">speak</span>
          </h2>
        </Reveal>

        <div className="hidden shrink-0 items-center gap-6 sm:flex">
          <Link
            href="/work"
            className="text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            View all {PROJECTS.length} projects →
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              ←
            </button>
            <button
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="scrollbar-hide flex select-none gap-6 overflow-x-auto px-6 pb-2 sm:gap-10 sm:px-10"
      >
        {featured.map((p, i) => {
          const isVideo = p.service === "Video Editing";

          return (
            <div
              key={p.id}
              data-card
              role="button"
              tabIndex={0}
              onClick={() => {
                if (dragMoved.current) return;
                if (isVideo) setVideoId(p.id);
                else setActiveId(p.id);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                if (isVideo) setVideoId(p.id);
                else setActiveId(p.id);
              }}
              className="group relative flex h-[58vh] w-[82vw] shrink-0 cursor-grab flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] active:cursor-grabbing sm:w-[46vw] lg:w-[32vw]"
            >
              <div className="flex shrink-0 items-center gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="truncate rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/40">
                  nexbravesolutions.in/work/{p.id}
                </span>
              </div>

              <div
                className="relative flex-1 overflow-hidden"
                style={isVideo ? undefined : { background: p.gradient }}
              >
                {isVideo ? (
                  <VideoCardPreview src={`/showreel/${p.id}.mp4`} />
                ) : (
                  <>
                    <AbstractPattern
                      seed={p.id}
                      className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                  </>
                )}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      {p.category}
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="translate-y-2 opacity-90 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-3xl sm:text-4xl font-medium text-white">
                      {p.name}
                    </h3>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <p className="text-xs font-light sm:text-sm text-white/70">{p.result}</p>
                      {!isVideo && (
                        <span className="flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          View case
                          <span aria-hidden="true">→</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[900] flex items-center justify-center bg-[#0A0E14]/90 backdrop-blur-md p-6"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0D1117] text-white"
            >
              <div className="relative h-56 w-full overflow-hidden" style={{ background: active.gradient }}>
                <AbstractPattern seed={active.id} nodeCount={8} />
              </div>
              <div className="p-8 sm:p-10">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-soft">
                  {active.category}
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl font-medium">
                  {active.name}
                </h3>
                <p className="mt-4 text-xs font-light sm:text-sm text-white/70">{active.result}</p>
                <p className="mt-2 text-xs font-light sm:text-sm text-white/50">{active.summary}</p>
                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href={`/work/${active.id}`}
                    className="chrome-sweep relative inline-flex items-center gap-2 rounded-full bg-grad-blue px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-white"
                  >
                    Full case study →
                  </Link>
                  <button
                    onClick={() => setActiveId(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-white hover:border-white/40"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoId && (
          <VideoPopOver src={`/showreel/${videoId}.mp4`} onClose={() => setVideoId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
