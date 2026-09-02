import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTAContact from "@/components/sections/CTAContact";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";
import { SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Insights | NexBrave Solutions";
const DESCRIPTION = "Notes on design, SEO and motion from the NexBrave team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog", images: [SITE_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [SITE_OG_IMAGE.url] },
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
        description="Short, opinionated writing on design, engineering, SEO and motion: what worked, what didn't."
      />

      <section className="bg-[#0A0E14] py-12 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-white sm:flex-row"
            >
              <div className="relative h-[240px] w-full shrink-0 overflow-hidden sm:h-auto sm:w-1/2">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-8 sm:p-12">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                  <span className="rounded-full border border-blue-bright/25 bg-blue-bright/10 px-3 py-1 text-blue-bright">
                    Latest
                  </span>
                  <span>{featured.category}</span>
                  <span>·</span>
                  <span>{formatDate(featured.date)}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-xs font-light sm:text-sm text-white/60">{featured.excerpt}</p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-blue-bright transition-transform duration-300 group-hover:translate-x-1">
                  Read article →
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min((i + 1) * 0.08, 0.24)} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-white"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="font-display text-xl font-medium leading-snug">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-xs font-light sm:text-sm text-white/60">{post.excerpt}</p>
                  </div>
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
