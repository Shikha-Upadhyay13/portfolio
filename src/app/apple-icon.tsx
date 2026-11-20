import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            background: "#47F1FF",
            borderRadius: 14,
            transform: "rotate(45deg)",
            boxShadow: "0 0 48px rgba(71, 241, 255, 0.45)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}