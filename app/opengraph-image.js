import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
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
          justifyContent: "space-between",
          padding: 80,
          background: "#0d0d10",
          color: "#ecebf0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#1c1930",
              color: "#b3a8ff",
              fontSize: 26,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#8b7cf6" }}>
            {site.role}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2 }}>
            <span style={{ color: "#ecebf0" }}>I build full-stack systems</span>
            <span style={{ color: "#8c8b97" }}>and AI-powered software.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#9d9ca8" }}>
          <span>Next.js</span><span>·</span><span>Node.js</span><span>·</span><span>PostgreSQL</span><span>·</span><span>LLM pipelines</span>
        </div>
      </div>
    ),
    size
  );
}
