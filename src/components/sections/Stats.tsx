"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

const STATS = [
  { value: 180, suffix: "+", label: "Projects shipped" },
  { value: 96, suffix: "", label: "Clients served" },
  { value: 5, suffix: "", label: "Services under one roof" },
  { value: 340, suffix: "%", label: "Avg. ROI lift" },
];

function Counter({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current || !ref.current) return;
    started.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toString();
      },
    });
  }, [trigger, value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => setInView(true),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0A0E14] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-2 gap-y-14 gap-x-6 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="border-l border-white/10 pl-5 sm:pl-6">
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gradient-blue">
                <Counter value={stat.value} suffix={stat.suffix} trigger={inView} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.1em] text-white/50">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
