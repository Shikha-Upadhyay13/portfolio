import { ImageResponse } from "next/og";

export const alt = "Shikha Upadhyay | AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0b0f",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 16,
            color: "#47F1FF",
          }}
        >
          Shikha Upadhyay
        </div>
        <div style={{ fontSize: 36, color: "#d1d5db", maxWidth: 900 }}>
          AI Engineer building RAG systems and agentic workflows
        </div>
      </div>
    ),
    { ...size }
  );
}
