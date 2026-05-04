import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "OSChoices Blog";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#2563EB" }}>
            OS
          </span>
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A" }}>
            Choices
          </span>
          <span
            style={{
              fontSize: "16px",
              color: "#64748B",
              marginLeft: "12px",
              padding: "4px 12px",
              background: "#F1F5F9",
              borderRadius: "20px",
            }}
          >
            Blog
          </span>
        </div>

        <p
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </p>

        <p style={{ fontSize: "18px", color: "#64748B", margin: 0 }}>
          oschoices.com/blog
        </p>
      </div>
    ),
    size
  );
}
