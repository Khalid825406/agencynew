import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0E14",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 22,
            background: "linear-gradient(135deg, #00AEEF 0%, #0033A0 100%)",
            color: "#fff",
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          NB
        </div>
        <div style={{ display: "flex", color: "#fff", fontSize: 64, fontWeight: 600, letterSpacing: -1 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.5)",
            fontSize: 28,
            marginTop: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Web · App · Marketing · SEO · Motion
        </div>
      </div>
    ),
    { ...size }
  );
}
