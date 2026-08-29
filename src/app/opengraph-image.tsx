import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/seo";

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
          background: "#05070a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#0047ab",
            opacity: 0.45,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#14a3ff",
            opacity: 0.3,
            filter: "blur(2px)",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) requires a plain <img>, not next/image */}
        <img
          src={`${SITE_URL}/nexbravelogobackbg.png`}
          width={620}
          height={620 * (260 / 959)}
          alt=""
          style={{ marginBottom: 44 }}
        />

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.55)",
            fontSize: 28,
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
