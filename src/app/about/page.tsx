import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTAContact from "@/components/sections/CTAContact";
import Stats from "@/components/sections/Stats";
import ValueIcon from "@/components/graphics/ValueIcon";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { TEAM } from "@/lib/data";
import TeamSlider from "@/components/sections/TeamSlider";
import { SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "About | NexBrave Solutions";
const DESCRIPTION = "The team behind NexBrave Solutions and how we work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about", images: [SITE_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [SITE_OG_IMAGE.url] },
};

const VALUES = [
  {
    n: "01",
    icon: "craft",
    title: "Craft over template",
    copy: "Every project starts from a blank canvas, not a component library we bent to fit.",
  },
  {
    n: "02",
    icon: "ship",
    title: "Ship, then iterate",
    copy: "We'd rather launch a sharp v1 than polish something nobody's used yet.",
  },
  {
    n: "03",
    icon: "numbers",
    title: "Numbers don't lie",
    copy: "Good design that doesn't move a metric is just decoration. We track both.",
  },
  {
    n: "04",
    icon: "truth",
    title: "Say the hard thing",
    copy: "If your idea won't work, we'll tell you before your budget finds out.",
  },
];

export default function AboutPage() {
  const founder = TEAM[0];

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Boutique scale. Agency muscle."
        gradientWords={["muscle."]}
        description="NexBrave Solutions is a small, senior team that ships web, app, marketing, SEO and motion work, without the account managers, the markup, or the six-week onboarding."
      />

      <Stats />

      <section className="relative overflow-hidden bg-[#05070a] py-20 text-white sm:py-28">
        {/* Same "aurora glow" background as the services stack: two soft
            blue blobs on a near-black base, clipped in their own wrapper so
            they don't affect layout. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-blue-deep/45 blur-[130px]" />
          <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-bright/25 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal
            style={{
              background:
                "radial-gradient(38% 45% at 90% 4%, rgba(40,120,235,0.5), transparent 100%), radial-gradient(34% 40% at 6% 96%, rgba(20,163,255,0.35), transparent 100%), #05070a",
            }}
            className="relative overflow-hidden rounded-3xl border border-white/15 px-6 py-12 shadow-[0_40px_100px_rgba(0,0,0,0.65)] sm:px-14 sm:py-16"
          >
            <AbstractPattern seed="founder-quote" nodeCount={7} className="opacity-[0.05]" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/15 sm:h-24 sm:w-24">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="font-display text-6xl leading-none text-blue-bright/25 sm:text-7xl">
                  &ldquo;
                </span>
                <p className="-mt-4 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
                  We turned down the version of this company that scales
                  fast and cares less. Small enough that every project still
                  gets our full attention. That&rsquo;s the whole
                  bet.
                </p>
                <p className="mt-5 text-xs font-light sm:text-sm text-white/50">
                  {founder.name}, {founder.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-white/40">
              How we work
            </span>
            <h2 className="mb-14 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              What we <span className="text-gradient-blue">won&rsquo;t</span> compromise on
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.06} className="group border-b border-white/10 py-10 pr-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-bright">{v.n}</span>
                  <ValueIcon
                    slug={v.icon}
                    className="h-6 w-6 text-white/20 transition-colors duration-300 group-hover:text-blue-bright"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium">{v.title}</h3>
                <p className="mt-3 text-xs font-light sm:text-sm text-white/60">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-white/40">
              The people
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Small team, <span className="text-gradient-blue">big output</span>
            </h2>
            <p className="mt-5 max-w-lg text-xs font-light sm:text-sm text-white/60">
              No layers, no hand-offs. The four of us cover design, engineering,
              marketing and motion end to end. You talk to the person doing the work.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-white/10 pt-14">
            <TeamSlider />
          </div>
        </div>
      </section>

      <CTAContact />
    </>
  );
}
