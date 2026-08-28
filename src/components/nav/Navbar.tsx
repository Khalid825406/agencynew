"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import MagneticButton from "@/components/MagneticButton";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // While the full-screen mobile menu is open, suppress the "scrolled"
  // backdrop so it doesn't fight the menu's own dark background.
  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[600] border-b transition-all duration-500 ${
          solid
            ? "border-white/10 bg-charcoal/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
            : "border-white/10 bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-[padding] duration-500 sm:px-10 ${
            solid ? "py-4" : "py-6"
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-10 md:flex">
            <nav className="flex items-center gap-9">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-[13px] font-medium uppercase tracking-[0.12em] text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-grad-blue transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <span className="h-5 w-px bg-white/15" />

            <MagneticButton
              href="/contact"
              strength={0.25}
              className="inline-flex items-center rounded-full border border-base-white/70 bg-transparent px-6 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] text-base-white transition-colors duration-300 hover:bg-base-white hover:text-charcoal"
            >
              Start a project
            </MagneticButton>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-base-white transition-all duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-base-white transition-all duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[550] flex flex-col justify-center gap-3 bg-charcoal px-8 sm:px-16 text-base-white md:hidden"
          >
            <div className="noise-overlay opacity-[0.04]" />
            {LINKS.concat([{ label: "Contact", href: "/contact" }]).map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="link-hover-gradient font-display text-5xl sm:text-6xl font-medium tracking-tight text-base-white/90"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-xs uppercase tracking-[0.3em] text-gray-soft"
            >
              Available for projects, say hello
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
