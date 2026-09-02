"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import { SERVICES } from "@/lib/data";

type Tier = {
  label: string;
  price: string;
  popular?: boolean;
  features: string[];
};

const MARKETING_TIERS: Tier[] = [
  {
    label: "Starter",
    price: "₹15,000",
    features: [
      "8 Reels + 2 Video Ad Creatives",
      "4 Creative Posts + Festival Posts",
      "2 Carousel Posts",
      "FB & Instagram Page Management",
      "Meta & Google Ads Management",
      "Monthly Performance Report",
    ],
  },
  {
    label: "Growth",
    price: "₹18,000",
    popular: true,
    features: [
      "12 Reels + 4 Video Ad Creatives",
      "6 Creative Posts + Festival Posts",
      "3 Carousel Posts",
      "FB & Instagram Page Management",
      "Meta & Google Ads Management",
      "Website Management",
      "Monthly Performance Report",
    ],
  },
  {
    label: "Premium",
    price: "₹30,000",
    features: [
      "16 Reels + 5 Premium Video Ads",
      "10 Creative Posts + Festival Posts",
      "4 Carousel Posts",
      "Complete Website Mgmt & Maintenance",
      "One Page SEO + Landing Page Design",
      "Google Business Profile Optimization",
      "Monthly Performance Report",
    ],
  },
];

function CheckIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`mt-0.5 h-4 w-4 shrink-0 ${muted ? "text-white/40" : "text-blue-bright"}`}
      aria-hidden="true"
    >
      <path
        d="M4 10.5 8 14.5 16 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection() {
  const [region, setRegion] = useState<"india" | "intl">("india");
  const services = SERVICES.filter((s) => s.slug !== "digital-marketing");

  return (
    <section className="relative overflow-hidden bg-[#0A0E14] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-bright/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" />
            Investment
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Pricing built for <span className="text-gradient-blue">every service we offer.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-xs font-light sm:text-sm text-white/60">
            Transparent starting prices for every discipline, plus flexible monthly packages for
            ongoing digital marketing work.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
        >
          <button
            type="button"
            onClick={() => setRegion("india")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
              region === "india" ? "bg-grad-blue text-white" : "text-white/60 hover:text-white"
            }`}
          >
            India
          </button>
          <button
            type="button"
            onClick={() => setRegion("intl")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
              region === "intl" ? "bg-grad-blue text-white" : "text-white/60 hover:text-white"
            }`}
          >
            International
          </button>
        </Reveal>

        {/* Individual service pricing */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className="h-full">
              <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04]">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.gradient}`}>
                  <ServiceIcon slug={s.slug} className="h-5 w-5 text-white" />
                </div>

                <h3 className="mt-5 font-display text-xl font-medium">{s.name}</h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-white/50">{s.blurb}</p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs uppercase tracking-[0.1em] text-white/40">From</span>
                    <span className="font-display text-2xl font-medium">
                      {region === "india" ? s.startingPrice : s.startingPriceIntl}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">{s.priceNote}</span>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-xs text-white/70 sm:text-sm">
                      <CheckIcon />
                      {d}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-all duration-300 group-hover:border-blue-bright group-hover:bg-blue-bright/10"
                >
                  Get Started ↗
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Digital marketing tiers */}
        <div className="mt-28 border-t border-white/10 pt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" />
              Digital marketing
            </span>
            <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Packages built for <span className="text-gradient-blue">your growth stage.</span>
            </h3>
            <p className="mx-auto mt-4 max-w-md text-xs font-light sm:text-sm text-white/60">
              Choose the plan that fits where your brand is right now, upgrade whenever you're ready to scale.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
            {MARKETING_TIERS.map((tier, i) => (
              <Reveal key={tier.label} delay={i * 0.08} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                    tier.popular
                      ? "border-blue-bright bg-white/[0.05] shadow-[0_30px_70px_rgba(0,174,239,0.18)] lg:scale-105"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-grad-blue px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-[0_8px_20px_rgba(0,174,239,0.4)]">
                      Most Popular
                    </span>
                  )}

                  <div className="text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-bright">
                      {tier.label}
                    </span>
                    <div className="mt-3 flex items-baseline justify-center gap-1.5">
                      <span className="font-display text-4xl font-medium">{tier.price}</span>
                      <span className="text-xs text-white/40">/month</span>
                    </div>
                  </div>

                  <div className="my-7 h-px bg-white/10" />

                  <ul className="flex flex-1 flex-col gap-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                      tier.popular
                        ? "bg-white text-[#0A0E14]"
                        : "border border-white/20 text-white hover:border-white/40"
                    }`}
                  >
                    Choose Plan
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
