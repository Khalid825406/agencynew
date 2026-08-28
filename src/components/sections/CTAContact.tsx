"use client";

import { useState } from "react";
import KineticText from "@/components/KineticText";
import FloatingField from "@/components/FloatingField";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";

export default function CTAContact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0A0E14] py-28 sm:py-40 text-white">
      <div className="noise-overlay opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-bright/20 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <span className="mb-6 block text-xs uppercase tracking-[0.3em] text-gray-soft">
              Let&rsquo;s talk
            </span>
            <KineticText
              as="h2"
              text="Let's build something worth bragging about."
              gradientWords={["bragging", "about."]}
              className="font-display text-4xl sm:text-6xl font-medium leading-[1.02] tracking-tight"
            />

            <a
              href="mailto:bravesolution43@gmail.com"
              className="group mt-10 inline-block font-display text-2xl sm:text-3xl text-white/80 transition-colors hover:text-white"
            >
              bravesolution43@gmail.com
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <p className="mt-10 max-w-sm text-xs font-light sm:text-sm text-white/40">
              Prefer a call? Tell us the brief and we&rsquo;ll get back within one
              business day, usually faster.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {submitted ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 text-center">
                <p className="font-display text-3xl text-gradient-blue">Message sent.</p>
                <p className="mt-3 text-xs font-light sm:text-sm text-white/50">We&rsquo;ll be in touch shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-8"
              >
                <FloatingField label="Your name" name="name" required />
                <FloatingField label="Email address" type="email" name="email" required />
                <FloatingField label="Tell us about the project" as="textarea" name="message" required />

                <MagneticButton
                  className="chrome-sweep mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-grad-blue px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] text-white shadow-[0_0_40px_rgba(0,174,239,0.35)]"
                >
                  Send message →
                </MagneticButton>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
