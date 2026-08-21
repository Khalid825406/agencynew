import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAContact from "@/components/sections/CTAContact";
import NoiseOverlay from "@/components/NoiseOverlay";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  const title = project ? `${project.name} — NexBrave Solutions` : "Case study — NexBrave Solutions";
  const description = project?.summary;

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description, url: `/work/${slug}`, type: "article" },
    twitter: { title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.id !== project.id);
  const sameService = others.filter((p) => p.service === project.service);
  const rest = others.filter((p) => p.service !== project.service);
  const more = [...sameService, ...rest].slice(0, 3);

  return (
    <>
      <section
        className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden pb-16 pt-40 text-white"
        style={{ background: project.gradient }}
      >
        <NoiseOverlay />
        <AbstractPattern seed={project.id} nodeCount={10} className="opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            ← All work
          </Link>
          <span className="mb-4 block w-fit rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em] backdrop-blur-sm">
            {project.category}
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
            {project.name}
          </h1>
        </div>
      </section>

      <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal className="flex flex-col gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                Service
              </span>
              <p className="mt-2 font-display text-2xl">{project.service}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                Result
              </span>
              <p className="mt-2 font-display text-2xl text-gradient-blue">{project.result}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
              Overview
            </span>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{project.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <span className="mb-8 block text-xs uppercase tracking-[0.2em] text-white/40">
              More work
            </span>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl p-7 text-white"
                style={{ background: p.gradient }}
              >
                <AbstractPattern
                  seed={p.id}
                  className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="relative z-10 w-fit rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                  {p.category}
                </span>
                <h3 className="relative z-10 font-display text-2xl font-medium transition-transform duration-500 group-hover:-translate-y-1">
                  {p.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTAContact />
    </>
  );
}
