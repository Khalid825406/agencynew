"use client";

import { useState } from "react";
import KineticText from "@/components/KineticText";
import FloatingField from "@/components/FloatingField";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "Flexible"];
const SOURCES = ["Referral", "Google search", "Social media", "Something else"];

export default function ProjectBrief() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-28 sm:py-40 text-white">
      <div className="noise-overlay opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-bright/20 blur-[140px]" />

      <div className="relative mx-auto max-w-[900px] px-6 sm:px-10">
        <Reveal className="text-center">
          <span className="mb-6 block text-xs uppercase tracking-[0.3em] text-gray-soft">
            Project brief
          </span>
          <KineticText
            as="h2"
            text="Tell us about your project."
            gradientWords={["project."]}
            className="mx-auto font-display text-4xl sm:text-6xl font-medium leading-[1.02] tracking-tight"
          />
          <p className="mx-auto mt-6 max-w-md text-white/40">
            The more you tell us up front, the faster we can scope it. Every
            field but the message is optional — send what you have.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 text-center">
              <p className="font-display text-3xl text-gradient-blue">Brief received.</p>
              <p className="mt-3 text-white/50">We&rsquo;ll be in touch within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                <FloatingField label="Full name" name="name" required />
                <FloatingField label="Email address" type="email" name="email" required />
                <FloatingField label="Phone number" type="tel" name="phone" />
                <FloatingField label="Company / business name" name="company" />
                <FloatingField label="Website (if you have one)" type="url" name="website" />
                <FloatingField label="How did you hear about us?" as="select" name="source" defaultValue="">
                  <option value="" disabled hidden />
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </FloatingField>
                <FloatingField label="Service you need" as="select" name="service" defaultValue="" required>
                  <option value="" disabled hidden />
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </FloatingField>
                <FloatingField label="Estimated budget" as="select" name="budget" defaultValue="">
                  <option value="" disabled hidden />
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </FloatingField>
                <FloatingField label="Project timeline" as="select" name="timeline" defaultValue="">
                  <option value="" disabled hidden />
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </FloatingField>
              </div>

              <FloatingField label="Tell us about the project" as="textarea" name="message" required />

              <MagneticButton
                className="chrome-sweep mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-grad-blue px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] text-white shadow-[0_0_40px_rgba(0,174,239,0.35)]"
              >
                Send brief →
              </MagneticButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
