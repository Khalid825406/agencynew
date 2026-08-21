import type { MetadataRoute } from "next";
import { PROJECTS, BLOG_POSTS } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = ["", "/about", "/services", "/work", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectEntries = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.id}`,
    lastModified: new Date(),
  }));

  const blogEntries = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
