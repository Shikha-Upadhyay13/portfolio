import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          borderRadius: 8,
          border: "2px solid #47F1FF",
          color: "#47F1FF",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
