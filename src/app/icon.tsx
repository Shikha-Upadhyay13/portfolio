import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Brand mark: cyan diamond on dark — no text/initials. */
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            background: "#47F1FF",
            borderRadius: 3,
            transform: "rotate(45deg)",
            boxShadow: "0 0 14px rgba(71, 241, 255, 0.55)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}