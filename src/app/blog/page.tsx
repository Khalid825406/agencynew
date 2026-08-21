import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTAContact from "@/components/sections/CTAContact";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";

const TITLE = "Insights — NexBrave Solutions";
const DESCRIPTION = "Notes on design, SEO and motion from the NexBrave team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the studio."
        gradientWords={["studio."]}
        description="Short, opinionated writing on design, engineering, SEO and motion — what worked, what didn't."
      />

      <section className="bg-[#0A0E14] py-12 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative flex h-[380px] w-full flex-col justify-between overflow-hidden rounded-2xl p-8 text-white sm:h-[440px] sm:p-12"
              style={{ background: featured.gradient }}
            >
              <AbstractPattern
                seed={featured.slug}
                nodeCount={8}
                className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
                <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                  Latest
                </span>
                <span>{featured.category}</span>
                <span>·</span>
                <span>{formatDate(featured.date)}</span>
              </div>
              <div className="relative z-10 max-w-2xl translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-white/70">{featured.excerpt}</p>
                <span className="mt-6 inline-block text-sm">Read article →</span>
              </div>
              <div className="absolute inset-0 z-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min((i + 1) * 0.08, 0.24)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl p-7 text-white"
                  style={{ background: post.gradient }}
                >
                  <AbstractPattern
                    seed={post.slug}
                    className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="relative z-10 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-medium leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">{post.excerpt}</p>
                  </div>
                  <div className="absolute inset-0 z-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTAContact />
    </>
  );
}
