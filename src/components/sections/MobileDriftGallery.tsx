"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import "./MobileDriftGallery.css";

// Local project imagery stands in for the reference's picsum.photos random
// placeholders — no external random-image service belongs on this site.
const IMAGE_POOL = [
  { url: "/web.avif", w: 800, h: 600, caption: "Web development" },
  { url: "/appp.avif", w: 800, h: 600, caption: "App development" },
  { url: "/digital.avif", w: 800, h: 600, caption: "Digital marketing" },
  { url: "/seoo.avif", w: 800, h: 600, caption: "SEO services" },
  { url: "/video.avif", w: 800, h: 600, caption: "Video editing" },
  { url: "/webdeveloper.png", w: 1536, h: 1024, caption: "Web development" },
  { url: "/app.png", w: 928, h: 612, caption: "App development" },
  { url: "/digitalmarketing.png", w: 910, h: 596, caption: "Digital marketing" },
  { url: "/seo.png", w: 922, h: 590, caption: "SEO services" },
  { url: "/videoediting.png", w: 918, h: 612, caption: "Video editing" },
];

type DensityMode = "masonry" | "comfortable" | "spacious";

interface Piece {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
  top: number;
  left: number;
  displayWidth: number;
  displayHeight: number;
  el?: HTMLDivElement | null;
  imgEl?: HTMLImageElement | null;
  contentEl?: HTMLDivElement | null;
  hasContent?: boolean;
  targetScale?: number;
  currentScale?: number;
}

function randomImage(seed: number) {
  return IMAGE_POOL[seed % IMAGE_POOL.length];
}

export default function MobileDriftGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lbBgRef = useRef<HTMLDivElement>(null);
  const lbControlsRef = useRef<HTMLDivElement>(null);
  const lbContentRef = useRef<HTMLDivElement>(null);
  const lbImgRef = useRef<HTMLImageElement>(null);
  const lbCaptionRef = useRef<HTMLParagraphElement>(null);
  const lbPrevRef = useRef<HTMLButtonElement>(null);
  const lbNextRef = useRef<HTMLButtonElement>(null);
  const lbRootRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);

  // No density/drift toggle UI anymore — the gallery always runs in a
  // single fixed mode, so these just need to be stable refs the imperative
  // gallery loop below can read (it's a plain closure over mount-time
  // values, not something driven by React re-renders).
  const densityModeRef = useRef<DensityMode>("comfortable");
  const autoDriftRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const lbEl = lbRootRef.current;
    const lbBg = lbBgRef.current;
    const lbControls = lbControlsRef.current;
    const lbContent = lbContentRef.current;
    const lbImg = lbImgRef.current;
    const lbCaption = lbCaptionRef.current;
    const lbBtnPrev = lbPrevRef.current;
    const lbBtnNext = lbNextRef.current;
    if (!wrapper || !container || !lbEl || !lbBg || !lbControls || !lbContent || !lbImg || !lbCaption || !lbBtnPrev || !lbBtnNext) {
      return;
    }

    const pieces: Piece[] = [];
    const colStats: Record<number, { top: number; bottom: number }> = {};
    let lastGridBounds = { minCol: Infinity, maxCol: -Infinity, minRow: Infinity, maxRow: -Infinity };

    const camera = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const velocity = { x: 0, y: 0 };
    let isDragScrolling = false;
    let driftAngle = Math.random() * Math.PI * 2;
    let selectedItem: Piece | null = null;
    let isClosingLB = false;
    let rafId = 0;

    function getViewport() {
      return { w: wrapper!.clientWidth, h: wrapper!.clientHeight };
    }

    function openLightbox(item: Piece) {
      if (isDragScrolling) return;
      selectedItem = item;
      updateLbBtns();

      lbEl!.style.display = "flex";
      lbImg!.src = item.url;
      lbCaption!.textContent = item.caption;

      const { w: vw, h: vh } = getViewport();
      const targetMaxWidth = vw * 0.9;
      const targetMaxHeight = vh * 0.8;
      const imageRatio = item.width / item.height;
      const screenRatio = targetMaxWidth / targetMaxHeight;
      let targetW: number, targetH: number;
      if (imageRatio > screenRatio) {
        targetW = targetMaxWidth;
        targetH = targetMaxWidth / imageRatio;
      } else {
        targetH = targetMaxHeight;
        targetW = targetMaxHeight * imageRatio;
      }

      const galleryEl = document.getElementById(`drift-gallery-item-${item.id}`);
      const r = galleryEl ? galleryEl.getBoundingClientRect() : { left: vw / 2, top: vh / 2, width: 0, height: 0 };

      gsap.fromTo(lbBg!, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(lbControls!, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.1 });
      gsap.fromTo(lbCaption!, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.5 });

      gsap.fromTo(
        lbContent!,
        { x: r.left + r.width / 2 - vw / 2, y: r.top + r.height / 2 - vh / 2, width: r.width, height: r.height, opacity: 0.5 },
        { x: 0, y: 0, width: targetW, height: targetH, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    function switchLightbox(item: Piece) {
      selectedItem = item;
      updateLbBtns();
      lbImg!.src = item.url;
      lbCaption!.textContent = item.caption;

      const { w: vw, h: vh } = getViewport();
      const targetMaxWidth = vw * 0.9;
      const targetMaxHeight = vh * 0.8;
      const imageRatio = item.width / item.height;
      const screenRatio = targetMaxWidth / targetMaxHeight;
      let targetW: number, targetH: number;
      if (imageRatio > screenRatio) {
        targetW = targetMaxWidth;
        targetH = targetMaxWidth / imageRatio;
      } else {
        targetH = targetMaxHeight;
        targetW = targetMaxHeight * imageRatio;
      }

      gsap.fromTo(
        lbContent!,
        { opacity: 0, scale: 0.95, width: targetW, height: targetH },
        { opacity: 1, scale: 1, width: targetW, height: targetH, duration: 0.3, ease: "power2.out" }
      );
    }

    function closeLightbox() {
      if (!selectedItem || isClosingLB) return;
      isClosingLB = true;

      const { w: vw, h: vh } = getViewport();
      const galleryEl = document.getElementById(`drift-gallery-item-${selectedItem.id}`);
      const r = galleryEl ? galleryEl.getBoundingClientRect() : { left: vw / 2, top: vh / 2, width: 0, height: 0 };

      gsap.to(lbControls!, { opacity: 0, duration: 0.2 });
      gsap.to(lbCaption!, { opacity: 0, duration: 0.2 });
      gsap.to(lbBg!, { opacity: 0, duration: 0.4, ease: "power2.in" });
      gsap.to(lbContent!, {
        x: r.left + r.width / 2 - vw / 2,
        y: r.top + r.height / 2 - vh / 2,
        width: r.width,
        height: r.height,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          selectedItem = null;
          isClosingLB = false;
          lbEl!.style.display = "none";
        },
      });
    }

    function updateLbBtns() {
      const idx = pieces.findIndex((p) => p.id === selectedItem?.id);
      lbBtnPrev!.style.display = idx > 0 ? "block" : "none";
      lbBtnNext!.style.display = idx !== -1 && idx < pieces.length - 1 ? "block" : "none";
    }

    const onLbClose = () => closeLightbox();
    const onLbPrev = (e: Event) => {
      e.stopPropagation();
      if (!selectedItem) return;
      const idx = pieces.findIndex((p) => p.id === selectedItem!.id);
      if (idx > 0) switchLightbox(pieces[idx - 1]);
    };
    const onLbNext = (e: Event) => {
      e.stopPropagation();
      if (!selectedItem) return;
      const idx = pieces.findIndex((p) => p.id === selectedItem!.id);
      if (idx < pieces.length - 1) switchLightbox(pieces[idx + 1]);
    };
    lbBtnPrev.addEventListener("click", onLbPrev);
    lbBtnNext.addEventListener("click", onLbNext);
    const closeBtn = lbEl.querySelector<HTMLButtonElement>("[data-drift-close]");
    closeBtn?.addEventListener("click", onLbClose);

    // Drag panning (pointer events work for touch and mouse alike)
    const onWheel = (e: WheelEvent) => {
      if (selectedItem) return;
      e.preventDefault();
      camera.targetX += e.deltaX;
      camera.targetY += e.deltaY;
    };
    wrapper.addEventListener("wheel", onWheel, { passive: false });

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || selectedItem) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startTargetX = camera.targetX;
      const startTargetY = camera.targetY;
      let lastMoveTime = performance.now();
      let lastMoveX = e.clientX;
      let lastMoveY = e.clientY;
      let velX = 0;
      let velY = 0;

      const onMove = (ev: PointerEvent) => {
        const dx = startX - ev.clientX;
        const dy = startY - ev.clientY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) isDragScrolling = true;

        camera.targetX = startTargetX + dx;
        camera.targetY = startTargetY + dy;

        const now = performance.now();
        const dt = now - lastMoveTime;
        if (dt > 0) {
          velX = (ev.clientX - lastMoveX) / dt;
          velY = (ev.clientY - lastMoveY) / dt;
          lastMoveTime = now;
          lastMoveX = ev.clientX;
          lastMoveY = ev.clientY;
        }
      };
      const onUp = (ev: PointerEvent) => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        const now = performance.now();
        if (now - lastMoveTime > 100) {
          velX = 0;
          velY = 0;
        }
        const totalDeltaX = startX - ev.clientX;
        const totalDeltaY = startY - ev.clientY;

        if (autoDriftRef.current) {
          if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) driftAngle = Math.atan2(-velY, -velX);
          else if (Math.abs(totalDeltaX) > 10 || Math.abs(totalDeltaY) > 10) driftAngle = Math.atan2(totalDeltaY, totalDeltaX);
        }

        if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) {
          velocity.x = velX * 24;
          velocity.y = velY * 24;
        } else {
          velocity.x = 0;
          velocity.y = 0;
        }
        setTimeout(() => (isDragScrolling = false), 50);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
    wrapper.addEventListener("pointerdown", onPointerDown);

    function updateGrid() {
      const { w: vw, h: vh } = getViewport();
      const minX = camera.x - vw * 1.5;
      const maxX = camera.x + vw * 1.5;
      const minY = camera.y - vh * 1.5;
      const maxY = camera.y + vh * 1.5;

      let g = 14;
      let cWidth = 190;
      if (densityModeRef.current === "comfortable") {
        g = 16;
        cWidth = 220;
      } else if (densityModeRef.current === "spacious") {
        g = 20;
        cWidth = 260;
      }

      const newItems: Piece[] = [];
      const stride = cWidth + g;
      let targetMinCol = Math.floor(minX / stride) - 2;
      let targetMaxCol = Math.floor(maxX / stride) + 2;
      let targetMinY = minY - 400;
      let targetMaxY = Math.max(minY, maxY) + 400;

      if (lastGridBounds.minCol === Infinity) {
        lastGridBounds = { minCol: targetMinCol, maxCol: targetMaxCol, minRow: targetMinY, maxRow: targetMaxY };
      } else {
        targetMinCol = Math.min(targetMinCol, lastGridBounds.minCol);
        targetMaxCol = Math.max(targetMaxCol, lastGridBounds.maxCol);
        targetMinY = Math.min(targetMinY, lastGridBounds.minRow);
        targetMaxY = Math.max(targetMaxY, lastGridBounds.maxRow);
        lastGridBounds = { minCol: targetMinCol, maxCol: targetMaxCol, minRow: targetMinY, maxRow: targetMaxY };
      }

      const FORMATS = [
        { w: 1, h: 1 },
        { w: 1, h: 1.4 },
        { w: 1, h: 0.75 },
      ];

      for (let c = targetMinCol; c <= targetMaxCol; c++) {
        let stat = colStats[c];
        if (!stat) {
          const startY = camera.y + (Math.random() - 0.5) * 300;
          colStats[c] = stat = { top: startY, bottom: startY };
        }

        while (stat.bottom < targetMaxY) {
          const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
          const iHeight = cWidth * format.h;
          const idx = Math.floor(Math.random() * 10000000);
          const img = randomImage(idx);
          newItems.push({
            id: `${c}-${Math.floor(stat.bottom)}-${idx}`,
            url: img.url,
            width: img.w,
            height: img.h,
            caption: img.caption,
            top: stat.bottom,
            left: c * stride,
            displayWidth: cWidth,
            displayHeight: iHeight,
          });
          stat.bottom += iHeight + g;
        }

        while (stat.top > targetMinY) {
          const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
          const iHeight = cWidth * format.h;
          const newTop = stat.top - iHeight - g;
          const idx = Math.floor(Math.random() * 10000000);
          const img = randomImage(idx);
          newItems.push({
            id: `${c}-${Math.floor(newTop)}-${idx}`,
            url: img.url,
            width: img.w,
            height: img.h,
            caption: img.caption,
            top: newTop,
            left: c * stride,
            displayWidth: cWidth,
            displayHeight: iHeight,
          });
          stat.top = newTop;
        }
      }

      if (newItems.length > 0) pieces.push(...newItems);

      const bufferX = vw * 1.5;
      const bufferY = vh * 1.5;
      const tooFarLeft = minX - bufferX;
      const tooFarRight = maxX + bufferX;
      const tooFarTop = minY - bufferY;
      const tooFarBottom = maxY + bufferY;

      for (let i = 0; i < pieces.length; i++) {
        const item = pieces[i];
        if (
          item.left + item.displayWidth < tooFarLeft ||
          item.left > tooFarRight ||
          item.top + item.displayHeight < tooFarTop ||
          item.top > tooFarBottom
        ) {
          if (item.el && item.el.parentNode) {
            item.el.parentNode.removeChild(item.el);
            item.el = null;
            item.imgEl = null;
            item.contentEl = null;
          }
          continue;
        }

        const isVisible =
          item.left + item.displayWidth > minX && item.left < maxX && item.top + item.displayHeight > minY && item.top < maxY;

        if (!item.el) {
          item.el = document.createElement("div");
          item.el.className = "drift-gallery-item-wrapper";
          item.el.id = `drift-gallery-item-${item.id}`;
          item.el.style.left = item.left + "px";
          item.el.style.top = item.top + "px";
          item.el.style.width = item.displayWidth + "px";
          item.el.style.height = item.displayHeight + "px";
          item.targetScale = 1.1;
          item.currentScale = 1.1;

          item.el.addEventListener("click", () => {
            if (!isDragScrolling) openLightbox(item);
          });

          container!.appendChild(item.el);
        }

        if (isVisible) {
          if (!item.hasContent) {
            item.hasContent = true;
            item.el.innerHTML = `
              <div class="drift-gallery-item-container">
                <div class="drift-gallery-spinner"></div>
                <img src="${item.url}" class="drift-gallery-image" draggable="false" />
                <div class="drift-gallery-overlay"></div>
              </div>
            `;
            item.imgEl = item.el.querySelector<HTMLImageElement>(".drift-gallery-image");
            item.contentEl = item.el.querySelector<HTMLDivElement>(".drift-gallery-item-container");
            const spinner = item.el.querySelector(".drift-gallery-spinner");

            if (item.contentEl) {
              gsap.fromTo(item.contentEl, { scale: 0.95 }, { scale: 1, duration: 0.6, ease: "power2.out" });
            }

            if (item.imgEl) {
              item.imgEl.onload = () => {
                spinner?.remove();
                if (item.imgEl) gsap.to(item.imgEl, { opacity: 1, duration: 0.4, ease: "none" });
              };
            }
          }
        } else if (item.hasContent) {
          item.hasContent = false;
          item.el.innerHTML = "";
          item.imgEl = null;
          item.contentEl = null;
          item.el.style.backgroundColor = "#171717";
        }
      }
    }

    function tick() {
      if (!isDragScrolling) {
        if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
          camera.targetX -= velocity.x;
          camera.targetY -= velocity.y;
          const vSpeed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
          const friction = Math.max(0.82, 0.96 - vSpeed * 0.002);
          velocity.x *= friction;
          velocity.y *= friction;
        } else if (autoDriftRef.current) {
          driftAngle += (Math.random() - 0.5) * 0.05;
          camera.targetX += Math.cos(driftAngle) * 0.5;
          camera.targetY += Math.sin(driftAngle) * 0.5;
        }
      }

      const prevX = camera.x;
      const prevY = camera.y;
      camera.x += (camera.targetX - camera.x) * 0.12;
      camera.y += (camera.targetY - camera.y) * 0.12;
      const speed = Math.sqrt((camera.x - prevX) ** 2 + (camera.y - prevY) ** 2);

      if (Math.abs(camera.targetX - camera.x) < 0.1) camera.x = camera.targetX;
      if (Math.abs(camera.targetY - camera.y) < 0.1) camera.y = camera.targetY;

      const { w: vw, h: vh } = getViewport();
      const cx = vw / 2;
      const cy = vh / 2;
      container!.style.transform = `translate3d(${-camera.x + cx}px, ${-camera.y + cy}px, 0)`;
      const b = Math.min(speed * 0.015, 2);
      container!.style.filter = b > 0.3 ? `blur(${b}px)` : "none";

      updateGrid();

      for (let i = 0; i < pieces.length; i++) {
        const item = pieces[i];
        if (item.hasContent && item.imgEl) {
          const yCenterScreen = item.top + item.displayHeight / 2 - camera.y + cy;
          const xCenterScreen = item.left + item.displayWidth / 2 - camera.x + cx;
          const distY = yCenterScreen - cy;
          const distX = xCenterScreen - cx;
          const normY = distY / (cy + item.displayHeight / 2);
          const normX = distX / (cx + item.displayWidth / 2);
          const clampY = Math.max(-1, Math.min(1, normY));
          const clampX = Math.max(-1, Math.min(1, normX));

          item.currentScale = (item.currentScale ?? 1) + ((item.targetScale ?? 1) - (item.currentScale ?? 1)) * 0.1;
          item.imgEl.style.transform = `scale(${item.currentScale}) translate3d(${clampX * 6}%, ${clampY * 6}%, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    updateGrid();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      lbBtnPrev.removeEventListener("click", onLbPrev);
      lbBtnNext.removeEventListener("click", onLbNext);
      closeBtn?.removeEventListener("click", onLbClose);
      pieces.forEach((p) => {
        if (p.el && p.el.parentNode) p.el.parentNode.removeChild(p.el);
      });
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-[#0A0E14] px-6 py-16 text-white">
        <div className="grid grid-cols-2 gap-3">
          {IMAGE_POOL.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element -- decorative, non-critical fallback grid
            <img
              key={img.url}
              src={img.url}
              alt={img.caption}
              className="aspect-square w-full rounded-lg border border-white/[0.03] bg-[#171717] object-cover"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a]">
      <div
        ref={wrapperRef}
        className="drift-gallery-wrapper absolute inset-0 h-full w-full select-none overflow-hidden"
      >
        <div ref={containerRef} className="absolute left-0 top-0" style={{ willChange: "transform, filter" }} />
      </div>

      {/* Lightbox */}
      <div ref={lbRootRef} className="fixed inset-0 z-[10000] hidden items-center justify-center">
        <div ref={lbBgRef} className="absolute inset-0 bg-black/90 backdrop-blur-md" style={{ opacity: 0 }} />

        <div ref={lbControlsRef} className="absolute inset-0 z-10" style={{ opacity: 0 }}>
          <button
            data-drift-close
            className="absolute right-4 top-4 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <button
            ref={lbPrevRef}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            ref={lbNextRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/60 active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div ref={lbContentRef} className="absolute flex cursor-default items-center justify-center" style={{ opacity: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- swapped imperatively via ref, not a static optimizable asset */}
          <img ref={lbImgRef} className="h-full w-full rounded-sm object-cover shadow-2xl" alt="" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-center" style={{ opacity: 0 }}>
            <p
              ref={lbCaptionRef}
              className="max-w-2xl rounded-lg bg-black/60 px-4 py-3 text-center text-xs text-zinc-200 shadow-lg backdrop-blur-md sm:text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
