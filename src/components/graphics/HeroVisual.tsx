"use client";

import { motion } from "framer-motion";

const BARS = [34, 58, 42, 76, 54, 90, 68];
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.9 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="absolute -left-4 -top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:-left-8"
      >
        <span className="h-2 w-2 rounded-full bg-grad-blue" />
        <span className="text-xs font-medium text-white/90">+64% conversion</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
        className="absolute -right-2 top-20 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:-right-6"
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-br from-chrome-1 to-chrome-3" />
        <span className="text-xs font-medium text-white/90">120K downloads</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_80px_rgba(0,10,30,0.55)] backdrop-blur-2xl sm:p-7"
      >
        <div className="noise-overlay opacity-[0.05]" />

        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-grad-blue text-[10px] font-semibold text-white">
              NB
            </span>
            <span className="text-xs font-medium text-white/70">Growth overview</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e08a]" />
            Live
          </span>
        </div>

        <div className="flex items-end gap-6">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="url(#heroRingGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - 0.86) }}
                transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="heroRingGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00AEEF" />
                  <stop offset="100%" stopColor="#0033A0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-2xl font-medium text-white">86%</span>
              <span className="text-[9px] uppercase tracking-wider text-white/40">On-time ship</span>
            </div>
          </div>

          <div className="flex h-28 flex-1 items-end gap-2">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.7, delay: 0.7 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#0033A0] to-[#00AEEF]"
              />
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/40">
          <span>Q2 performance</span>
          <span className="font-medium text-gradient-blue">+312% ROI avg.</span>
        </div>
      </motion.div>
    </div>
  );
}
