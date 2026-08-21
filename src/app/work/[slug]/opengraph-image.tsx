import { ImageResponse } from "next/og";
import { PROJECTS } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

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
          background: project?.gradient ?? "#0A0E14",
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
          {project?.category ?? "Case study"}
        </div>
        <div style={{ display: "flex", color: "#fff", fontSize: 72, fontWeight: 600, marginTop: 18 }}>
          {project?.name ?? "NexBrave Solutions"}
        </div>
        {project?.result && (
          <div style={{ display: "flex", color: "rgba(255,255,255,0.9)", fontSize: 32, marginTop: 14 }}>
            {project.result}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
