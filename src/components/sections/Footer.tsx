"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/graphics/SocialIcon";
import Reveal from "@/components/Reveal";
import { useLenis } from "@/components/providers/SmoothScroll";

const SITEMAP = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/brave_solution/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587412182705",
    icon: "facebook",
  },
];

export default function Footer() {
  const lenisRef = useLenis();

  const scrollTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-base-dark-2 pt-20 text-base-white">
      <div className="noise-overlay opacity-[0.04]" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <Reveal>
            <Logo />
            <p className="mt-6 max-w-xs text-xs font-light sm:text-sm text-white/50">
              A full-service digital agency: web, app, marketing, SEO and
              motion, built by people who ship.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <span className="text-xs uppercase tracking-[0.25em] text-gray-soft">
              Sitemap
            </span>
            <ul className="mt-5 flex flex-col gap-3">
              {SITEMAP.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="text-xs uppercase tracking-[0.25em] text-gray-soft">
              Get in touch
            </span>
            <a
              href="mailto:bravesolution43@gmail.com"
              className="mt-5 block text-sm text-white/60 transition-colors hover:text-white"
            >
              bravesolution43@gmail.com
            </a>
            <a
              href="tel:+918002356170"
              className="mt-2 block text-sm text-white/60 transition-colors hover:text-white"
            >
              +91 80023 56170
            </a>
            <p className="mt-3 max-w-[200px] text-xs font-light sm:text-sm text-white/50">
              We reply within one business day, usually faster.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <span className="text-xs uppercase tracking-[0.25em] text-gray-soft">
              Social
            </span>
            <ul className="mt-5 flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-white/30 group-hover:text-blue-bright">
                      <SocialIcon slug={s.icon} className="h-3.5 w-3.5" />
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden border-t border-white/10 py-5">
        <div className="flex w-max animate-marquee-slow gap-12">
          {Array(6)
            .fill("Available for projects, say hello")
            .map((text, i) => (
              <span
                key={i}
                className="shrink-0 text-sm uppercase tracking-[0.25em] text-white/30"
              >
                {text}
              </span>
            ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/40 sm:flex-row sm:px-10">
        <span>© {new Date().getFullYear()} NexBrave Solutions. All rights reserved.</span>
        <button
          onClick={scrollTop}
          className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
