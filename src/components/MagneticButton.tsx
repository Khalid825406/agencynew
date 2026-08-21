"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.4,
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const move = (el: HTMLElement | null, e: MouseEvent<HTMLElement>) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: "power3.out" });
  };

  const leave = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        onMouseMove={(e) => move(anchorRef.current, e)}
        onMouseLeave={() => leave(anchorRef.current)}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={(e) => move(buttonRef.current, e)}
      onMouseLeave={() => leave(buttonRef.current)}
      className={className}
    >
      {children}
    </button>
  );
}
