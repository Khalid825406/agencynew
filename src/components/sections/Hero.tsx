"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import KineticText from "@/components/KineticText";
import MagneticButton from "@/components/MagneticButton";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Hero() {
  // Pinned scroll effect (same idea as the "PRAGUE" reference): the hero
  // stays fixed in view for an extra stretch of scroll while its own
  // content progressively blurs, scales up slightly and fades out, then
  // the next section slides over it. The wrapper is taller than the
  // viewport so there's scroll distance to drive that transition before
  // the section releases and scrolls away normally.
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <div ref={containerRef} className="relative h-[180vh]">
    <section className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden bg-charcoal text-base-white">
      <NoiseOverlay />

      {/* Two soft glows, one bleeding in from the left edge and one from
          the right: tall ellipses (not circles) stretched past the
          section's top/bottom and heavily blurred so each reads as an
          edge-to-edge color wash rather than a distinct blob shape. Same
          slow float animation, just gentler on scale so the blend never
          pulls back to look "circular". */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-blob absolute -left-[20%] top-1/2 h-[160%] w-[55%] -translate-y-1/2 rounded-full bg-[#5b5bf0]/30 blur-[160px] [animation-delay:0s]" />
        <div className="hero-blob absolute -right-[20%] top-1/2 h-[160%] w-[55%] -translate-y-1/2 rounded-full bg-[#14a3ff]/30 blur-[160px] [animation-delay:-8s]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />

      <motion.div
        style={{
          scale: contentScale,
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10"
      >
        <div className="mt-20 flex flex-col items-center sm:mt-28">
          <span className="mb-3 flex items-center gap-2 text-center text-[10px] uppercase tracking-[0.3em] text-gray-soft sm:text-[12px] sm:tracking-[0.35em]">
            Full-service digital agency
          </span>

          <h1 className="font-display leading-[0.98] tracking-tight">
            <KineticText
              as="span"
              text="We build brands"
              className="block text-[11vw] font-semibold capitalize text-white sm:text-[42px] md:text-[50px]"
            />
            <KineticText
              as="span"
              text="that move"
              gradientWords={["that", "move"]}
              className="block text-[16vw] font-extrabold uppercase sm:text-[70px] md:text-[90px]"
            />
          </h1>

          <p className="mt-4 max-w-xl px-2 text-xs font-light sm:whitespace-nowrap sm:px-0 sm:text-sm text-white/60">
            One team for your website, your app, your marketing, your SEO and your videos.
            <br />
            We skip the meetings that go nowhere and just get things shipped.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="/contact"
              className="chrome-sweep group relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-spectrum-animated px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-base-white shadow-[0_0_40px_rgba(185,134,115,0.35)]"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>

            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white/80 transition-colors hover:border-white/35 hover:text-white"
            >
              See our work
            </Link>
          </div>

         
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-3 px-6 pb-8 sm:px-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <div className="flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border border-white/20 p-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-grad-blue animate-[scrolldot_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
    </div>
  );
}
