"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagicBento from "@/components/graphics/MagicBento";
import Reveal from "@/components/Reveal";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";

// No per-project photography exists yet, so each card falls back to its
// own service's showcase image rather than shipping with no visual at all.
const SERVICE_IMAGES: Record<string, string> = {
  "Web Development": "/web.avif",
  "App Development": "/appp.avif",
  "Digital Marketing": "/digital.avif",
  "SEO Services": "/seoo.avif",
  "Video Editing": "/video.avif",
};

export default function WorkGrid() {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>("All work");

  const filtered =
    filter === "All work" ? PROJECTS : PROJECTS.filter((p) => p.service === filter);

  const bentoCards = filtered.map((p) => ({
    color: "#0A0E14",
    title: p.name,
    description: p.summary,
    label: p.category,
    image: SERVICE_IMAGES[p.service],
  }));

  return (
    <section className="bg-[#0A0E14] py-8 text-white sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-8">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                filter === cat
                  ? "bg-grad-blue text-base-white"
                  : "bg-white/5 text-white/60 hover:scale-105 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto hidden text-xs uppercase tracking-[0.2em] text-white/40 sm:block">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </span>
        </Reveal>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key={`${filter}-empty`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="py-20 text-center text-xs font-light sm:text-sm text-white/40"
            >
              No projects in this category yet.
            </motion.p>
          ) : (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagicBento
                cards={bentoCards}
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="20, 163, 255"
                disableAnimations={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
