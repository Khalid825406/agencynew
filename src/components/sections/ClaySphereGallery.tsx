"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Local service imagery stands in for the "provided image assets" — no
// external Shopify CDN images belong on this site.
const IMAGES = ["/web.avif", "/appp.avif", "/digital.avif", "/seoo.avif", "/video.avif"];

// Duplicated to fill a dense-looking sphere, same as the reference.
const GALLERY_ITEMS = Array.from({ length: 24 }, (_, i) => IMAGES[i % IMAGES.length]);

const TEXT_CONTENT = [
  {
    title: "Web & app builds",
    desc: "Fast, accessible websites and cross-platform apps engineered to hold up under real traffic and real users.",
  },
  {
    title: "Full-funnel marketing",
    desc: "Paid, social and lifecycle campaigns run with a bias toward channels that compound instead of burning out.",
  },
  {
    title: "Technical SEO",
    desc: "Audits, content strategy and link building that move rankings, and more importantly, move revenue.",
  },
  {
    title: "Motion & post-production",
    desc: "Edits and motion design built to stop the scroll and hold attention long enough to convert.",
  },
];

export default function ClaySphereGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Feature detection is only available post-mount; this one-time read
    // can't be derived during render without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const sphere = sphereRef.current;
    const container = containerRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    if (!sphere || !container || !titleEl || !descEl || reduced) return;

    const radius = window.innerWidth < 768 ? 200 : 380;
    const cards: HTMLElement[] = [];

    // 1. Generate Fibonacci Sphere 3D Layout — identical math to the
    // reference: evenly distributes every card across the sphere's
    // surface with no clustering at the poles.
    GALLERY_ITEMS.forEach((src, i) => {
      const card = document.createElement("div");
      card.className = "clay-card";
      card.style.cssText = `
        position: absolute;
        width: 160px;
        height: 220px;
        left: -80px;
        top: -110px;
        background: #18181b;
        border-radius: 16px;
        padding: 8px;
        transform-style: preserve-3d;
        backface-visibility: visible;
        border: 1px solid rgba(255, 255, 255, 0.03);
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.9),
          -4px -4px 10px rgba(255, 255, 255, 0.02),
          inset 3px 3px 6px rgba(255, 255, 255, 0.04),
          inset -3px -3px 6px rgba(0, 0, 0, 0.6);
        transition: filter 0.4s ease;
      `;

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        filter: brightness(0.75);
        transition: all 0.4s ease;
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.8);
      `;
      card.appendChild(img);

      const phi = Math.acos(1 - (2 * (i + 0.5)) / GALLERY_ITEMS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Calculate rotation so cards face outward relative to the center
      const rotY = Math.atan2(x, z) * (180 / Math.PI);
      const rotX = Math.asin(-y / radius) * (180 / Math.PI);

      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

      card.dataset.index = String(i);
      sphere.appendChild(card);
      cards.push(card);
    });

    // 2. Animate Sphere on Scroll
    const sphereRotation = gsap.to(sphere, {
      rotateY: 360 * 2, // 2 full rotations
      rotateX: 45, // Slight tilt for 3D depth
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => updateActiveCard(self.progress),
      },
    });

    // 3. Highlight Front-Facing Card and Update Text
    function updateActiveCard(progress: number) {
      // Clamp instead of modulo — at progress===1 (the very bottom of the
      // section) `Math.floor(1 * length) % length` wraps back to 0 and
      // snaps the text back to the first entry right as the section ends.
      const textIndex = Math.min(
        TEXT_CONTENT.length - 1,
        Math.floor(progress * TEXT_CONTENT.length)
      );

      if (titleEl!.textContent !== TEXT_CONTENT[textIndex].title) {
        gsap.to([titleEl, descEl], {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            titleEl!.textContent = TEXT_CONTENT[textIndex].title;
            descEl!.textContent = TEXT_CONTENT[textIndex].desc;
            gsap.to([titleEl, descEl], { opacity: 1, duration: 0.2 });
          },
        });
      }

      const focusIndex = Math.floor(progress * GALLERY_ITEMS.length);
      cards.forEach((card, idx) => {
        const active = Math.abs(idx - focusIndex) < 2;
        const img = card.querySelector("img") as HTMLImageElement | null;
        if (active) {
          card.style.filter = "drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))";
          if (img) img.style.filter = "brightness(1)";
        } else {
          card.style.filter = "";
          if (img) img.style.filter = "brightness(0.75)";
        }
      });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      sphereRotation.scrollTrigger?.kill();
      sphereRotation.kill();
      cards.forEach((c) => c.remove());
    };
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0A0E14] text-white"
      style={{ height: reduced ? undefined : "300vh" }}
    >
      {/* Floating text panel — its own sticky sibling to the scene, same
          as the reference (a separate element pinned in place while the
          sphere behind/beside it keeps rotating). */}
      <div
        className={`relative z-10 mx-6 max-w-[300px] pt-24 sm:sticky sm:top-1/2 sm:ml-[10%] sm:mx-0 sm:-translate-y-1/2 sm:pt-0 ${
          reduced ? "sm:pb-16" : ""
        }`}
      >
        <h2
          ref={titleRef}
          className="font-display text-2xl font-medium tracking-tight [text-shadow:0_4px_10px_rgba(0,0,0,0.8)] sm:text-3xl"
        >
          {TEXT_CONTENT[0].title}
        </h2>
        <p ref={descRef} className="mt-3 text-xs font-light leading-relaxed text-white/50 sm:text-sm">
          {TEXT_CONTENT[0].desc}
        </p>
      </div>

      <div
        className={`relative flex h-screen w-full items-center justify-center overflow-hidden [perspective:1200px] ${
          reduced ? "hidden" : "sticky top-0"
        }`}
      >
<div className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          <div ref={sphereRef} className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }} />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
          <path d="M20,0 L80,100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      {reduced && (
        <div className="grid grid-cols-2 gap-3 px-6 pb-16 sm:grid-cols-3 md:grid-cols-4">
          {IMAGES.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element -- decorative, non-critical fallback grid
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[4/5] w-full rounded-2xl border border-white/[0.03] bg-[#18181b] object-cover"
            />
          ))}
        </div>
      )}
    </section>
  );
}
