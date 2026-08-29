import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | NexBrave Solutions",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 text-center text-base-white">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-bright/15 blur-[140px]" />
      <div className="relative">
        <span className="font-display text-gradient-blue text-7xl font-bold sm:text-8xl">404</span>
        <h1 className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-3xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-xs font-light text-white/60 sm:text-sm">
          The page you&rsquo;re looking for may have moved or never existed. Let&rsquo;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-grad-blue px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_rgba(20,163,255,0.35)] transition-transform duration-300 hover:scale-105"
        >
          Back to home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
