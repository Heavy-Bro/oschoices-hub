import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OSChoices — Smart tools for smarter choices.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "56px", fontWeight: 800, color: "#2563EB" }}>
            OS
          </span>
          <span style={{ fontSize: "56px", fontWeight: 800, color: "#0F172A" }}>
            Choices
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#64748B",
            textAlign: "center",
            margin: 0,
          }}
        >
          Smart tools for smarter choices.
        </p>
        <div
          style={{
            marginTop: "48px",
            background: "#2563EB",
            borderRadius: "8px",
            padding: "12px 28px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#fff", fontWeight: 600 }}>
            oschoices.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
