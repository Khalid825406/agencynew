"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import KineticText from "@/components/KineticText";
import MagneticButton from "@/components/MagneticButton";
import NoiseOverlay from "@/components/NoiseOverlay";
import Monogram from "@/components/graphics/Monogram";
import { PROJECTS } from "@/lib/data";

const HeroVisual = dynamic(() => import("@/components/graphics/HeroVisual"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-base-white text-charcoal">
      <NoiseOverlay />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 55% at 25% 15%, rgba(185,134,115,0.22), transparent 65%), radial-gradient(50% 50% at 85% 75%, rgba(138,97,82,0.20), transparent 65%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-white via-transparent to-base-white/40" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-14 px-6 pt-36 pb-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-32">
        <div>
          <span className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gray-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-grad-blue" />
            Full-service digital agency
          </span>

          <KineticText
            as="h1"
            text="We build brands that move."
            gradientWords={["move."]}
            className="font-display text-[12vw] sm:text-[7.5vw] lg:text-[4.6vw] font-medium leading-[0.98] tracking-tight"
          />

          <p className="mt-7 max-w-md text-base sm:text-lg text-charcoal/60">
            Web, app, marketing, SEO and motion — under one roof, moving at
            the speed your ambition demands. No fluff. Just work that ships.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              className="chrome-sweep group relative inline-flex shrink-0 items-center gap-3 rounded-full bg-grad-blue px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] text-base-white shadow-[0_0_40px_rgba(185,134,115,0.35)]"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </MagneticButton>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-6 py-4 text-sm font-medium uppercase tracking-[0.1em] text-charcoal/80 transition-colors hover:border-charcoal/35 hover:text-charcoal"
            >
              See our work
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {PROJECTS.slice(0, 5).map((p) => (
                <Monogram key={p.id} name={p.name} className="ring-2 ring-base-white" />
              ))}
            </div>
            <p className="max-w-[220px] text-xs leading-snug text-charcoal/40">
              Trusted by <span className="text-charcoal/70">30+ growing teams</span> across
              fintech, health &amp; retail
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pb-8 sm:px-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-white/15">
          <div className="h-full w-full animate-[scrollbounce_1.8s_ease-in-out_infinite] bg-grad-blue" />
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-grad-blue text-[11px] font-medium text-white">
            180+
          </span>
          <div className="leading-tight">
            <p className="text-xs font-medium text-white">Projects shipped</p>
            <p className="text-[11px] text-white/50">Across web, app &amp; growth</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollbounce {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
