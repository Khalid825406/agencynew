import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoiseOverlay from "@/components/NoiseOverlay";
import CTAContact from "@/components/sections/CTAContact";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const title = post ? `${post.title} — NexBrave Solutions` : "Insights — NexBrave Solutions";
  const description = post?.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post?.date,
    },
    twitter: { title, description },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const BODY_COPY =
  "This is where the full piece would run. We keep our writing short and " +
  "opinionated — no 3,000-word SEO filler, just what we'd tell a client " +
  "over coffee. Reach out if you want the long version, or better yet, " +
  "let's talk about your project instead.";

function readingTime(...text: string[]) {
  const words = text.join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const minutes = readingTime(post.excerpt, BODY_COPY);

  return (
    <>
      <section
        className="relative flex min-h-[55vh] flex-col justify-end overflow-hidden pb-14 pt-40 text-white"
        style={{ background: post.gradient }}
      >
        <NoiseOverlay />
        <AbstractPattern seed={post.slug} nodeCount={9} className="opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 sm:px-10">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            ← All insights
          </Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
            <span>{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{minutes} min read</span>
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-medium leading-tight tracking-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="bg-[#0A0E14] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[720px] px-6 sm:px-10">
          <Reveal>
            <div className="mb-10 flex items-center gap-3 border-b border-white/10 pb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 font-display text-sm font-medium">
                NB
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">The NexBrave team</p>
                <p className="text-white/50">{minutes} min read</p>
              </div>
            </div>
            <p className="text-xl leading-relaxed text-white/80">{post.excerpt}</p>
            <p className="mt-6 leading-relaxed text-white/60">{BODY_COPY}</p>
          </Reveal>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-[#0A0E14] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <Reveal>
              <span className="mb-8 block text-xs uppercase tracking-[0.2em] text-white/40">
                More from the blog
              </span>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl p-7 text-white"
                  style={{ background: p.gradient }}
                >
                  <AbstractPattern
                    seed={p.slug}
                    className="opacity-70 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="relative z-10 w-fit rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                    {p.category}
                  </span>
                  <h3 className="relative z-10 font-display text-2xl font-medium transition-transform duration-500 group-hover:-translate-y-1">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTAContact />
    </>
  );
}
