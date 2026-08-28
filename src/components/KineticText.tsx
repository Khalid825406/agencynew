"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  gradientWords?: string[];
}

export default function KineticText({
  text,
  className = "",
  delay = 0,
  as = "h1",
  gradientWords = [],
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".kw");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      words,
      { yPercent: 130, opacity: 0, rotateZ: 6 },
      {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        delay,
      }
    );
  }, [delay]);

  const words = text.split(" ");
  const normalize = (w: string) => w.replace(/[.,]/g, "");
  const normalizedGradientWords = gradientWords.map(normalize);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => {
        const isGradient = normalizedGradientWords.includes(normalize(word));
        return (
          <span key={i} className="inline-block overflow-hidden pb-2 align-top">
            <span
              className={`kw inline-block will-change-transform ${
                isGradient ? "text-gradient-blue" : ""
              }`}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
