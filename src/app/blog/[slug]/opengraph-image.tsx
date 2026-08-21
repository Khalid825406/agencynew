import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: post?.gradient ?? "#0A0E14",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.75)",
            fontSize: 26,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          {post?.category ?? "Insights"}
        </div>
        <div style={{ display: "flex", color: "#fff", fontSize: 60, fontWeight: 600, marginTop: 18 }}>
          {post?.title ?? "NexBrave Solutions"}
        </div>
      </div>
    ),
    { ...size }
  );
}
