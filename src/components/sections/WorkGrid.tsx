"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import VideoCardPreview from "@/components/VideoCardPreview";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";

export default function WorkGrid() {
  const [filter, setFilter] = useState<(typeof PROJECT_CATEGORIES)[number]>("All work");

  const filtered =
    filter === "All work" ? PROJECTS : PROJECTS.filter((p) => p.service === filter);

  return (
    <section className="bg-[#0A0E14] py-8 text-white sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-8">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                filter === cat
                  ? "bg-white text-charcoal"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto hidden text-xs uppercase tracking-[0.2em] text-white/40 sm:block">
            {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const isVideo = p.service === "Video Editing";

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 0 && filter === "All work" ? "sm:col-span-2" : ""}
                >
                  <Link
                    href={`/work/${p.id}`}
                    className={`group relative flex h-[340px] w-full flex-col justify-between overflow-hidden rounded-2xl p-7 text-white ${
                      i === 0 && filter === "All work" ? "sm:h-[420px]" : ""
                    }`}
                    style={isVideo ? undefined : { background: p.gradient }}
                  >
                    {isVideo ? (
                      <VideoCardPreview src={`/showreel/${p.id}.mp4`} />
                    ) : (
                      <AbstractPattern
                        seed={p.id}
                        className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    )}
                    <span className="relative z-10 w-fit rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em] backdrop-blur-sm">
                      {p.category}
                    </span>
                    <div className="relative z-10 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="font-display text-3xl font-medium">{p.name}</h3>
                      <p className="mt-2 text-sm text-white/70">{p.result}</p>
                    </div>
                    <div className="absolute inset-0 z-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-white/40">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
