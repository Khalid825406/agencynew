"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import NoiseOverlay from "@/components/NoiseOverlay";
import JourneyIcon from "@/components/graphics/JourneyIcon";

const STEPS = [
  { n: "01", icon: "discover", name: "Discover", copy: "We dig into your market, users and goals before touching a single pixel." },
  { n: "02", icon: "design", name: "Design", copy: "Concepts that feel distinct, grounded in your brand, tested with real users." },
  { n: "03", icon: "develop", name: "Develop", copy: "Clean, fast, maintainable builds across web, app and everything between." },
  { n: "04", icon: "deploy", name: "Deploy", copy: "Shipped with monitoring, QA and a rollout plan, not a Friday-night gamble." },
  { n: "05", icon: "grow", name: "Grow", copy: "Data-driven iteration: SEO, marketing and product feedback loops, ongoing." },
];

// Steps reveal one at a time as scroll continues (rather than all together),
// each getting its own slice of the [0.5, 0.95] scroll range. The
// connecting line to the NEXT step draws in right after the current one
// lands.
const STEPS_START = 0.5;
const STEPS_END = 0.95;

function StepItem({
  step,
  index,
  total,
  isLast,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  isLast: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = (STEPS_END - STEPS_START) / total;
  const start = STEPS_START + index * segment;
  const end = start + segment;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [24, 0]);
  const lineScale = useTransform(scrollYProgress, [end, Math.min(end + segment * 0.6, 1)], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y, willChange: "transform, opacity" }}
      className="relative flex flex-col items-center text-center"
    >
      {!isLast && (
        <motion.span
          style={{ scaleX: lineScale, willChange: "transform" }}
          className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-56px)] origin-left bg-white/10 sm:block"
        />
      )}
      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-blue-bright sm:h-12 sm:w-12">
        <JourneyIcon slug={step.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <p className="mt-2 font-display text-sm font-medium sm:mt-4 sm:text-lg">{step.name}</p>
      <p className="mt-1 max-w-[160px] text-[11px] font-light leading-relaxed text-white/45 sm:mt-1.5 sm:text-xs">{step.copy}</p>
    </motion.div>
  );
}

function ConvergingHands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Hands drift in from the sides over a much longer scroll stretch, with an
  // ease-out curve (lots of keyframes, front-loaded spacing) so the motion
  // reads as a smooth glide that decelerates into place rather than a quick,
  // linear snap. Opacity fades in over the same longer window so they don't
  // just pop into view either.
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.42],
    ["-60vw", "-32vw", "-14vw", "-4vw", "0vw"]
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.42],
    ["60vw", "32vw", "14vw", "4vw", "0vw"]
  );
  const handsOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  // Kept small and additive (mix-blend-screen) so the glow reads as a spark
  // at the fingertips rather than an opaque wash that dulls/"blurs" the hands.
  const burstScale = useTransform(scrollYProgress, [0.39, 0.48], [0.3, 1.4]);
  const burstOpacity = useTransform(scrollYProgress, [0.38, 0.42, 0.53], [0, 0.85, 0]);

  // Once a step (or its connector line) has been scrolled into view, it should
  // stay visible even if the user scrolls back up; only the hands themselves
  // stay fully scroll-scrubbed both ways. This tracks the highest progress
  // value ever seen and holds the steps' input at that value.
  const maxStepsProgress = useRef(0);
  const stepsProgress = useTransform(scrollYProgress, (v) => {
    if (v > maxStepsProgress.current) maxStepsProgress.current = v;
    return maxStepsProgress.current;
  });

  return (
    <div ref={sectionRef} className="relative h-[170vh] sm:h-[160vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0E14] px-[20px] pb-[20px] pt-16 text-white sm:pt-28">
        <NoiseOverlay />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,174,239,0.08),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center sm:px-10">
          <span className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-gray-soft sm:mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-grad-blue" />
            How we work
          </span>
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-4xl lg:text-6xl">
            Human Craft. <span className="text-gradient-blue">AI speed.</span>
          </h2>
        </div>

        <div className="relative mt-4 h-[30vw] max-h-[220px] w-full sm:mt-12 sm:h-[46vw] sm:max-h-[520px]">
          <motion.div
            style={{ opacity: handsOpacity, x: leftX, willChange: "transform, opacity" }}
            className="absolute right-1/2 top-[2%] w-[54vw] max-w-[420px] sm:max-w-[980px]"
          >
            <Image
              src="/hand_left.png"
              alt=""
              width={1920}
              height={1263}
              priority={false}
              quality={95}
              sizes="(max-width: 640px) 45vw, 54vw"
              className="h-auto w-full brightness-150 contrast-125 saturate-125 drop-shadow-[0_0_45px_rgba(0,174,239,0.7)] drop-shadow-[0_0_100px_rgba(0,174,239,0.4)]"
            />
          </motion.div>

          <motion.div
            style={{ opacity: handsOpacity, x: rightX, willChange: "transform, opacity" }}
            className="absolute left-1/2 top-[2%] w-[54vw] max-w-[420px] sm:max-w-[980px]"
          >
            <Image
              src="/robo_hand.png"
              alt=""
              width={1920}
              height={1286}
              priority={false}
              quality={95}
              sizes="(max-width: 640px) 45vw, 54vw"
              className="h-auto w-full brightness-150 contrast-125 saturate-125 drop-shadow-[0_0_45px_rgba(139,92,246,0.7)] drop-shadow-[0_0_100px_rgba(139,92,246,0.4)]"
            />
          </motion.div>

          <motion.div
            style={{ opacity: burstOpacity, scale: burstScale, willChange: "transform, opacity" }}
            className="pointer-events-none absolute left-1/2 top-[13%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(139,92,246,0.55)_40%,transparent_72%)] mix-blend-screen sm:h-20 sm:w-20"
          />
        </div>

        <div className="relative z-10 mt-3 w-full max-w-[1200px] px-6 sm:mt-20 sm:px-10">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-5 sm:gap-8">
            {STEPS.map((step, i) => (
              <StepItem
                key={step.n}
                step={step}
                index={i}
                total={STEPS.length}
                scrollYProgress={stepsProgress}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticJourney() {
  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-28 text-white sm:py-36">
      <NoiseOverlay />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center sm:px-10">
        <span className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-gray-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-grad-blue" />
          How we work
        </span>
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-6xl">
          Human craft. <span className="text-gradient-blue">AI speed.</span>
        </h2>

        <div className="relative mx-auto mt-12 h-[42vw] max-h-[400px] w-full max-w-[1200px] sm:mt-16">
          <div className="absolute right-1/2 top-[2%] w-[50vw] max-w-[340px] sm:max-w-[600px]">
            <Image
              src="/hand_left.png"
              alt=""
              width={1920}
              height={1263}
              quality={95}
              sizes="(max-width: 640px) 42vw, 50vw"
              className="h-auto w-full brightness-150 contrast-125 saturate-125 drop-shadow-[0_0_45px_rgba(0,174,239,0.7)] drop-shadow-[0_0_100px_rgba(0,174,239,0.4)]"
            />
          </div>
          <div className="absolute left-1/2 top-[2%] w-[50vw] max-w-[340px] sm:max-w-[600px]">
            <Image
              src="/robo_hand.png"
              alt=""
              width={1920}
              height={1286}
              quality={95}
              sizes="(max-width: 640px) 42vw, 50vw"
              className="h-auto w-full brightness-150 contrast-125 saturate-125 drop-shadow-[0_0_45px_rgba(139,92,246,0.7)] drop-shadow-[0_0_100px_rgba(139,92,246,0.4)]"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-20 sm:grid-cols-5 sm:gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-blue-bright">
                <JourneyIcon slug={step.icon} className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-lg font-medium">{step.name}</p>
              <p className="mt-1.5 max-w-[160px] text-xs font-light leading-relaxed text-white/45">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Journey() {
  // Server has no access to prefers-reduced-motion, so it always renders
  // ConvergingHands. Defaulting to the same thing on the client's first
  // render (before this effect runs) keeps hydration consistent; the swap
  // to StaticJourney only happens after mount, which React treats as a
  // normal post-hydration update rather than a mismatch.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Feature detection is only available post-mount; this one-time read
    // can't be derived during render without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return reduced ? <StaticJourney /> : <ConvergingHands />;
}
