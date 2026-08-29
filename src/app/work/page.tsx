import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAContact from "@/components/sections/CTAContact";
import WorkGrid from "@/components/sections/WorkGrid";
import { PROJECTS } from "@/lib/data";
import { SITE_OG_IMAGE } from "@/lib/seo";

const TITLE = "Work | NexBrave Solutions";
const DESCRIPTION = "Case studies across web, app, marketing, SEO and video.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/work", images: [SITE_OG_IMAGE] },
  twitter: { title: TITLE, description: DESCRIPTION, images: [SITE_OG_IMAGE.url] },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Case Studies That Speak."
        gradientWords={["speak."]}
        description={`${PROJECTS.length} projects across web, app, marketing, SEO and video. Filter by discipline, or browse it all.`}
      />

      <WorkGrid />

      <CTAContact />
    </>
  );
}
