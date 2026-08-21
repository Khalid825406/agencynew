"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { SERVICES } from "@/lib/data";

export default function ServicesNav() {
  const [active, setActive] = useState<string>(SERVICES[0].slug);
  const lenisRef = useLenis();

  const jumpTo = (slug: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(slug);
    if (!target) return;
    e.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(target, { offset: -96, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.pushState(null, "", `#${slug}`);
  };

  useEffect(() => {
    const sections = SERVICES.map((s) => document.getElementById(s.slug)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: sticky rail */}
      <nav className="hidden lg:block">
        <ul className="sticky top-32 flex flex-col gap-1 border-l border-white/10">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                onClick={jumpTo(s.slug)}
                className={`-ml-px flex items-center gap-3 border-l px-4 py-2.5 text-sm transition-colors duration-300 ${
                  active === s.slug
                    ? "border-blue-bright font-medium text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                <span className="font-mono text-xs">{s.n}</span>
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile / tablet: horizontal chip row */}
      <nav className="scrollbar-hide -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 lg:hidden">
        {SERVICES.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            onClick={jumpTo(s.slug)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
              active === s.slug
                ? "border-white bg-white text-charcoal"
                : "border-white/15 text-white/60"
            }`}
          >
            {s.name}
          </a>
        ))}
      </nav>
    </>
  );
}
