import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoiseOverlay from "@/components/NoiseOverlay";
import CTAContact from "@/components/sections/CTAContact";
import AbstractPattern from "@/components/graphics/AbstractPattern";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/seo";

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
  const title = post ? `${post.title} | NexBrave Solutions` : "Insights | NexBrave Solutions";
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
      images: [SITE_OG_IMAGE],
    },
    twitter: { title, description, images: [SITE_OG_IMAGE.url] },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const BODY_COPY: Record<string, string[]> = {
  "designing-for-speed": [
    "Users don't benchmark your site. They feel it. The gap between a page that responds instantly and one that makes them wait even 400ms shows up as a gut reaction, not a stat, and that reaction shapes whether they trust what they're looking at before they've read a word of it.",
    "We treat performance as a design constraint from the first wireframe, not a cleanup pass before launch. That means choosing image formats and layout strategies that don't fight the browser, deferring anything that isn't needed for the first paint, and testing on the kind of mid-tier phone and patchy connection most of the audience is actually using, not the developer's fiber connection and flagship laptop.",
    "The payoff compounds. Faster sites rank better, convert better, and get abandoned less. But the part that's easy to miss is the brand signal: a site that loads instantly reads as more credible before the visitor has evaluated a single claim on the page. Speed is a design decision that happens to also be an engineering one.",
    "In practice this shows up as unglamorous choices: shipping less JavaScript, sizing images correctly instead of scaling them down in CSS, avoiding layout shift as content loads. None of it is exciting to talk about. All of it is the difference between a site that feels premium and one that feels like it's apologizing for itself.",
  ],
  "seo-in-the-age-of-ai-search": [
    "Search results used to be ten blue links. Increasingly, they're a synthesized answer with citations, and the click a page used to get for ranking first now goes to whichever source the answer engine trusted enough to quote. That's a real shift in how visibility works, not a rebrand of the same old SEO playbook.",
    "The fundamentals still matter: clean technical structure, fast pages, content that actually answers the question in the title. What's changed is the premium on being unambiguous. Answer engines reward pages that state a clear position, back it with specifics, and structure information so it can be lifted cleanly into a summary. Vague, keyword-stuffed pages that used to eke out rankings on volume alone have nowhere left to hide.",
    "Our approach has shifted accordingly: fewer pages chasing the same broad keyword, more pages that each answer one real question thoroughly, with schema markup and clear headings doing the work of making that structure legible to a crawler or a model. We're also watching referral patterns more closely than raw rank: where the click comes from is starting to matter as much as whether you show up at all.",
    "None of this makes technical SEO or content strategy obsolete. It makes sloppy versions of both obsolete. The sites that keep winning are the ones that were already built to be genuinely useful, not just optimized to game a ranking signal that's now half a decade out of date.",
  ],
  "the-30-second-rule-for-launch-films": [
    "Nobody owes your video a second watch. On a feed, the entire pitch has to land before a thumb finishes its next scroll, which in practice means the first three seconds are doing more work than the rest of the edit combined.",
    "We cut backwards from that constraint. Instead of building a narrative arc and hoping the hook survives the edit, we start with the single frame or line that has to stop the scroll, then build outward from it. If the opening doesn't survive on mute with no context, it doesn't survive at all. Most of the audience will never turn their sound on.",
    "That discipline changes what gets cut, not just how it's paced. Establishing shots that would open a traditional trailer get compressed or dropped entirely. Text on screen replaces voiceover setup. The product or the payoff shows up before the viewer has had time to decide whether they care.",
    "It's a different craft than long-form editing, and it rewards a kind of ruthlessness that's uncomfortable if you're precious about the footage. But it's also the only version of a launch film that a platform's algorithm and a distracted viewer will actually let finish playing.",
  ],
};

function readingTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").trim().split(/\s+/).length;
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
  const body = BODY_COPY[post.slug] ?? [post.excerpt];
  const minutes = readingTime([post.excerpt, ...body]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/nexbravelogobackbg.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
            <p className="text-xs font-light sm:text-sm leading-relaxed text-white/80">{post.excerpt}</p>
            {body.map((paragraph, i) => (
              <p key={i} className="mt-6 text-xs font-light sm:text-sm leading-relaxed text-white/60">
                {paragraph}
              </p>
            ))}
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
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTAContact />
    </>
  );
}
