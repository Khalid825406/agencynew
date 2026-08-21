import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTAContact from "@/components/sections/CTAContact";
import ServicesNav from "@/components/sections/ServicesNav";
import ServiceIcon from "@/components/graphics/ServiceIcon";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { SERVICES, PROJECTS } from "@/lib/data";

const TITLE = "Services — NexBrave Solutions";
const DESCRIPTION =
  "Web development, app development, digital marketing, SEO and video editing — five disciplines, one team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Five disciplines. One team."
        gradientWords={["team."]}
        description="We don't hand you off between departments. The same team that designs your site writes the SEO strategy that gets it found."
      />

      <section className="bg-[#0A0E14] py-8 text-white sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-[200px_1fr] lg:gap-16">
            <ServicesNav />

            <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
              {SERVICES.map((s) => {
                const related = PROJECTS.find((p) => p.service === s.name && p.featured);

                return (
                  <div key={s.slug} id={s.slug} className="scroll-mt-32 py-16 sm:py-20">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
                      <Reveal>
                        <span className="font-mono text-xs text-blue-bright">{s.n}</span>
                        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                          {s.name}
                        </h2>
                        <p className="mt-4 max-w-md text-white/60">{s.long}</p>

                        <ul className="mt-8 flex flex-col gap-3">
                          {s.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-3 text-sm text-white/70">
                              <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                className="mt-0.5 h-4 w-4 shrink-0 text-blue-bright"
                                aria-hidden="true"
                              >
                                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                                <path
                                  d="M6.5 10.2 8.7 12.5 13.5 7.5"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {d}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-2">
                          {s.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Reveal>

                      <Reveal delay={0.1} className="flex flex-col gap-4">
                        {s.slug === "web-development" ? (
                          <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#050810] sm:h-48">
                            <Image
                              src="/webdeveloper.png"
                              alt="Web development — laptop and phone showing a site being built"
                              fill
                              sizes="(min-width: 1024px) 45vw, 90vw"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br sm:h-48 ${s.gradient}`}
                          >
                            <ServiceIcon slug={s.slug} className="h-16 w-16 text-white/90 sm:h-20 sm:w-20" />
                          </div>
                        )}

                        {related && (
                          <Link
                            href={`/work/${related.id}`}
                            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 p-5 transition-colors duration-300 hover:border-white/25"
                          >
                            <AbstractPattern
                              seed={related.id}
                              nodeCount={5}
                              className="opacity-[0.06] transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="relative">
                              <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                                Recent work
                              </span>
                              <p className="mt-1 font-display text-lg font-medium">
                                {related.name}
                              </p>
                              <p className="text-sm text-gradient-blue">{related.result}</p>
                            </div>
                            <span className="relative shrink-0 text-sm text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                              →
                            </span>
                          </Link>
                        )}
                      </Reveal>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTAContact />
    </>
  );
}
